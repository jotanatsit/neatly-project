import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import { cloudinaryUpload } from "../utils/upload.js";
import jwt from "jsonwebtoken";

// controller for user register
export const register = async (req, res) => {
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

  // เข้ารหัส password ด้วย bcrypt
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // แก้ไข format ของ id_number และ card_number
  user.id_number = user.id_number.split("-").join("");
  user.card_number = user.card_number.split(" ").join("");

  // ต่อข้อมูลเกี่ยวกับ credit_card ให้เป็น string ก้อนเดียว - string - "cardNumber_cardOwner_expireDate_cvcCvv"
  const string_credit_card =
    user.card_number +
    "_" +
    user.card_owner +
    "_" +
    user.expire_date +
    "_" +
    user.cvc_cvv;

  // เอาก้อน string มาเข้ารหัส jwt
  const encrypted_credit_card = jwt.sign(
    {
      string_credit_card,
    },
    process.env.SECRET_KEY,
    { noTimestamp: true }
  );

  try {
    await pool.query(
      `insert into users (username, email, password, created_at, updated_at, last_logged_in, fullname, id_number, birth_date, country, profile_picture, credit_card)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        user.username,
        user.email,
        user.password,
        user.created_at,
        user.updated_at,
        user.last_logged_in,
        user.fullname,
        user.id_number,
        user.birth_date,
        user.country,
        user.profile_picture,
        encrypted_credit_card,
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
};

// controller for user and admin login

export const login = async (req, res) => {
  // filter for admin
  if (req.body.username === "adminneatly") {
    const adminUsername = req.body.username;

    try {
      const admin = await pool.query(
        `select *
                from admins
                where admins.username = $1`,
        [adminUsername]
      );

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        admin.rows[0].password
      );

      if (!isValidPassword) {
        return res.status(401).json({
          message: "password not valid",
        });
      }

      const token = jwt.sign(
        {
          id: admin.rows[0].user_id,
          username: admin.rows[0].username,
          role: admin.rows[0].role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1800000",
        }
      );
      return res.json({
        message: "login successfully",
        token,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  // for user
  const userClient = {
    username: req.body.username,
  };

  try {
    const user = await pool.query(
      `select * from users where users.username = $1 or users.email = $1`,
      [userClient.username]
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
        expiresIn: "1800000",
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
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// controller for register admin on postman

export const registerAdmin = async (req, res) => {
  const admin = {
    username: req.body.username,
    password: req.body.password,
    role: "admin",
    created_at: new Date(),
    updated_at: new Date(),
    last_logged_in: new Date(),
  };

  // เข้ารหัส password ด้วย bcrypt
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  try {
    await pool.query(
      `insert into admins (username, password, created_at, updated_at, last_logged_in, role)
              values ($1, $2, $3, $4, $5, $6)`,
      [
        admin.username,
        admin.password,
        admin.created_at,
        admin.updated_at,
        admin.last_logged_in,
        admin.role,
      ]
    );
  } catch (error) {
    return res.json({ message: error.message });
  }

  return res.status(200).json({
    message: "Admin has been created successfully",
  });
};
