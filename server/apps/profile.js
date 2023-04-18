import { Router } from "express";
import { pool } from "../utils/db.js";
import { cloudinaryUpload } from "../utils/upload.js";
import {
  profilePictureUpload,
  validateProfileData,
} from "../middleware/validateProfileData.js";

const profileRouter = Router();

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

profileRouter.put(
  "/:id",
  profilePictureUpload,
  validateProfileData,
  async (req, res) => {
    const userId = req.params.id;

    const updatedProfile = {
      ...req.body,
      updated_at: new Date(),
    };

    // const profilePictureUrl = await cloudinaryUpload(req.files);
    // if (profilePictureUrl.message) {
    //   return res.json(profilePictureUrl);
    // }
    // updatedProfile["profile_picture"] = profilePictureUrl[0]?.url;

    updatedProfile.id_number = updatedProfile.id_number.split("-").join("");

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

    return res.json({
      message: "Profile has been successfully updated",
    });
  }
);

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

profileRouter.put("/:id/payment-method", async (req, res) => {
  const userId = req.params.id;

  const updatedCreditCard = {
    ...req.body,
    updated_at: new Date(),
  };

  updatedCreditCard.card_number = updatedCreditCard.card_number
    .split(" ")
    .join("");

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
});

export default profileRouter;
