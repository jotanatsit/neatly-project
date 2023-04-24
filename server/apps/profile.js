import { Router } from "express";
import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";
import {
  profilePictureUpload,
  // handleError,
  validateProfileData,
} from "../middleware/validateProfileData.js";

const profileRouter = Router();

// profileRouter.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store");
//   next();
// });

// profileRouter.disable("etag");

// get user profile data from database
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

// update user profile data to database
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

    const profilePictureUrl = await cloudinaryUpload(req.files);
    if (profilePictureUrl.message) {
      return res.json(profilePictureUrl);
    }
    updatedProfile["profile_picture"] = profilePictureUrl[0]?.url;

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

// get payment method data from database
profileRouter.get("/:id/payment-method", async (req, res) => {
  const userId = req.params.id;

  const result = await pool.query(
    "select card_number, card_owner, expire_date, cvc_cvv from users_credit_card where user_id=$1",
    [userId]
  );

  return res.json({
    data: result.rows[0],
  });
});

// update payment method data to database
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

    updatedCreditCard.card_number = updatedCreditCard.card_number
      ?.split(" ")
      ?.join("");

    await pool.query(
      "update users_credit_card set card_number=$1, card_owner=$2, expire_date=$3, cvc_cvv=$4 where user_id=$5",
      [
        updatedCreditCard.card_number,
        updatedCreditCard.card_owner,
        updatedCreditCard.expire_date,
        updatedCreditCard.cvc_cvv,
        userId,
      ]
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
