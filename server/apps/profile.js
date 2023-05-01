import { Router } from "express";
import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";
import {
  profilePictureUpload,
  // handleError,
  validateProfileData,
} from "../middleware/validateProfileData.js";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

const profileRouter = Router();

// ------------------------------------- get user profile data from database -------------------------------------------

profileRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;

  const table1 = await pool.query(
    "select fullname, id_number, birth_date, country, profile_picture from users_profile where user_id=$1",
    [userId]
  );

  const table2 = await pool.query("select email from users where user_id=$1", [
    userId,
  ]);

  const result = { ...table1.rows[0], ...table2.rows[0] };

  return res.json({
    data: result,
  });
});

// ------------------------------------- update user profile data to database -------------------------------------------

profileRouter.put(
  "/:id",
  profilePictureUpload,
  // handleError,
  validateProfileData,
  async (req, res) => {
    console.log("C");
    const userId = req.params.id;

    const updatedProfile = {
      ...req.body,
      updated_at: new Date(),
    };

    // upload profile picture file to cloudinary
    const profilePictureUrl = await cloudinaryUpload(req.files);
    if (profilePictureUrl.message) {
      return res.json(profilePictureUrl);
    }
    updatedProfile["profile_picture"] = profilePictureUrl[0]?.url;

    // แก้ไข format ของ id_number
    updatedProfile.id_number = updatedProfile.id_number?.split("-")?.join("");

    try {
      await pool.query(
        "update users_profile set fullname=$1, id_number=$2, birth_date=$3, country=$4, profile_picture=$5 where user_id=$6",
        [
          updatedProfile.fullname,
          updatedProfile.id_number,
          updatedProfile.birth_date,
          updatedProfile.country,
          updatedProfile.profile_picture,
          userId,
        ]
      );
      await pool.query(
        "update users set email=$1, updated_at=$2 where user_id=$3",
        [updatedProfile.email, updatedProfile.updated_at, userId]
      );
    } catch (error) {
      if (
        error.message ===
        `duplicate key value violates unique constraint "users_email_key"`
      ) {
        return res.json({ message: "Email has already been taken" });
      } else if (
        error.message ===
        `duplicate key value violates unique constraint "users_profile_id_number_key"`
      ) {
        return res.json({ message: "ID Number has already been taken" });
      } else {
        return res.json({ message: error.message });
      }
    }

    return res.json({
      message: "Profile has been successfully updated",
    });
  }
);

// ------------------------------------- get payment method data from database -------------------------------------------

profileRouter.get("/:id/payment-method", async (req, res) => {
  const userId = req.params.id;

  let result;
  try {
    result = await pool.query(
      "select credit_card from users_profile where user_id=$1",
      [userId]
    );
  } catch (error) {
    return res.json({ message: error.message });
  }

  // ถอดรหัส jwt - ตัวอย่างหลังถอดรหัส => {"string_credit_card":"cardNumber_cardOwner_expireDate_cvcCvv"}
  const encrypted_credit_card = result.rows[0].credit_card;

  const decrypted_credit_card = JSON.stringify(
    jwtDecode(encrypted_credit_card, process.env.SECRET_KEY)
  );

  // เอาข้อมูลที่ถอดรหัสแล้ว มาแยกเป็น Array - [cardNumber, cardOwner, expireDate, cvcCvv]
  const split_credit_card = decrypted_credit_card.split('"')[3].split("_");

  // เอาข้อมูลจาก Array มาเก็บเป็น Object
  const credit_card = {
    card_number: split_credit_card[0],
    card_owner: split_credit_card[1],
    expire_date: split_credit_card[2],
    cvc_cvv: split_credit_card[3],
  };

  return res.json({
    data: credit_card,
  });
});

// ------------------------------------- update payment method data to database -------------------------------------------

profileRouter.put(
  "/:id/payment-method",
  profilePictureUpload,
  validateProfileData,
  async (req, res) => {
    const userId = req.params.id;

    const updatedCreditCard = {
      ...req.body,
      updated_at: new Date(),
    };

    // แก้ไข format ของ card_number
    updatedCreditCard.card_number = updatedCreditCard.card_number
      ?.split(" ")
      ?.join("");

    // เอาข้อมูลจาก req.body มาต่อเป็นก้อน string - "cardNumber_cardOwner_expireDate_cvcCvv"
    const string_credit_card =
      updatedCreditCard.card_number +
      "_" +
      updatedCreditCard.card_owner +
      "_" +
      updatedCreditCard.expire_date +
      "_" +
      updatedCreditCard.cvc_cvv;

    // เอาก้อน string มาเข้ารหัส jwt
    const encrypted_credit_card = jwt.sign(
      {
        string_credit_card,
      },
      process.env.SECRET_KEY,
      { noTimestamp: true }
    );

    await pool.query(
      "update users_profile set credit_card=$1 where user_id=$2",
      [encrypted_credit_card, userId]
    );

    await pool.query("update users set updated_at=$1 where user_id=$2", [
      updatedCreditCard.updated_at,
      userId,
    ]);

    return res.json({
      message: "Credit card has been successfully updated",
    });
  }
);

export default profileRouter;
