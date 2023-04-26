import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import { cloudinaryUpload } from "../utils/upload.js";
import {
  profilePictureUpload,
  validateProfileData,
} from "../middleware/validateProfileData.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

// create user data to database
authRouter.post(
  "/register",
  profilePictureUpload,
  validateProfileData,
  async (req, res) => {
    const user = {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      id_number: req.body.id_number,
      birth_date: req.body.birth_date,
      country: req.body.country,
      card_number: req.body.card_number,
      card_owner: req.body.card_owner,
      expire_date: req.body.expire_date,
      cvc_cvv: req.body.cvc_cvv,
      created_at: new Date(),
      updated_at: new Date(),
      last_logged_in: new Date(),
    };

    // upload profile picture file to cloudinary
    const profilePictureUrl = await cloudinaryUpload(req.files);
    if (profilePictureUrl.message) {
      return res.json(profilePictureUrl);
    }
    user["profile_picture"] = profilePictureUrl[0]?.url;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.id_number = user.id_number.split("-").join("");
    user.card_number = user.card_number.split(" ").join("");

    try {
      await pool.query(
        `insert into users (username, email, password, created_at, updated_at, last_logged_in)
          values ($1, $2, $3, $4, $5, $6)`,
        [
          user.username,
          user.email,
          user.password,
          user.created_at,
          user.updated_at,
          user.last_logged_in,
        ]
      );

      // get user_id from lastest register
      let lastest_user_id = await pool.query(
        `select user_id from users order by user_id desc limit $1`,
        [1]
      );

      await pool.query(
        `insert into users_profile (user_id, fullname, id_number, birth_date, country, profile_picture)
          values ($1, $2, $3, $4, $5, $6)`,
        [
          lastest_user_id.rows[0].user_id,
          user.fullname,
          user.id_number,
          user.birth_date,
          user.country,
          user.profile_picture,
        ]
      );

      await pool.query(
        `insert into users_credit_card (user_id, card_number, card_owner, expire_date, cvc_cvv)
          values ($1, $2, $3, $4, $5)`,
        [
          lastest_user_id.rows[0].user_id,
          user.card_number,
          user.card_owner,
          user.expire_date,
          user.cvc_cvv,
        ]
      );
    } catch (error) {
      // alert message for fail register
      if (
        error.message ===
        `duplicate key value violates unique constraint "users_username_key"`
      ) {
        return res.json({ message: "Username has already been taken" });
      } else if (
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

    return res.status(200).json({
      message: "User has been created successfully",
    });
  }
);

authRouter.post("/login", async (req, res) => {
  const userClient = {
    username: req.body.username,
  };

  const user = await pool.query(
    `select *
          from users
          inner join users_profile
          on users.user_id = users_profile.user_id
          where users.username = $1 or users.email = $2`,
    [userClient.username, userClient.username]
  );

  if (!user.rows[0]) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.rows[0].password
  );

  if (!isValidPassword) {
    return res.status(401).json({
      message: "password not valid",
    });
  }

  const token = jwt.sign(
    {
      id: user.rows[0].user_id,
      username: user.rows[0].username,
      fullname: user.rows[0].fullname,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "900000",
    }
  );

  // update user's last_logged_in
  const last_logged_in = new Date();
  const user_id = user.rows[0].user_id;

  await pool.query("update users set last_logged_in=$1 where user_id=$2", [
    last_logged_in,
    user_id,
  ]);

  return res.json({
    message: "login successfully",
    token,
  });
});

export default authRouter;
