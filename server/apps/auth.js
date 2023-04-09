import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const authRouter = Router();

// 🐨 Todo: Exercise #1
// ให้สร้าง API เพื่อเอาไว้ Register ตัว User แล้วเก็บข้อมูลไว้ใน Database ตามตารางที่ออกแบบไว้

authRouter.post("/register", async (req, res) => {
  const user = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    id_number: req.body.id_number,
    birth_date: req.body.birth_date,
    country: req.body.country,
    // profile_picture: req.body.profile_picture,
    profile_picture:
      "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    card_number: req.body.card_number,
    card_owner: req.body.card_owner,
    expire_date: req.body.expire_date,
    cvc_cvv: req.body.cvc_cvv,
    created_at: new Date(),
    updated_at: new Date(),
    last_logged_in: new Date(),
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

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

  return res.json({
    message: "User has been created successfully",
  });
});

// 🐨 Todo: Exercise #3
// ให้สร้าง API เพื่อเอาไว้ Login ตัว User ตามตารางที่ออกแบบไว้

authRouter.post("/login", async (req, res) => {});

export default authRouter;
