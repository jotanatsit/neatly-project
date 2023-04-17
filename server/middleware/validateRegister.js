export function validateRegister(req, res, next) {
  // Get the values from the request body
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

  for (const [key, value] of Object.entries(user)) {
    if (value === "") {
      return res.json({ message: `Please fill in ${key}.` });
    }
  }

  // validate birth_date is more than 18 years old.
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
      message: "You must be at least 18 years old to register",
    });
  }

  next();
}
