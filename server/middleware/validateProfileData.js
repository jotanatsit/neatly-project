import multer from "multer";

// get data from formData() and validate type and size of profile picture
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"), false);
  }
};

const multerUpload = multer({
  dest: "uploads/",
  limits: { fileSize: 10000000 },
  fileFilter: fileFilter,
});

export const profilePictureUpload = multerUpload.fields([
  { name: "profile_picture", maxCount: 1 },
]);

// validate profile data
export function validateProfileData(req, res, next) {
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
  };

  // validate that all fields have been filled in without profile picture.
  for (const [key, value] of Object.entries(user)) {
    if (value === "") {
      return res.json({ message: `Please fill in ${key}.` });
    }
  }

  // validate birth_date is more than 18 years old.
  if (user.birth_date) {
    const now = new Date();

    const eighteenYearsAgo = new Date(
      now.getFullYear() - 18,
      now.getMonth(),
      now.getDate()
    );

    const birthDate = new Date(user.birth_date);

    const isMoreThan18YearsAgo = birthDate < eighteenYearsAgo;

    if (!isMoreThan18YearsAgo) {
      return res.json({
        message: "You must be at least 18 years old to register.",
      });
    }
  }

  next();
}
