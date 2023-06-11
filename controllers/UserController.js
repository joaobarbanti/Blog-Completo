const jwt = require("jsonwebtoken");
const db = require("../mysql/db");

const GetAllUsers = (req, res) => {
  try {
    const q = req.query.username
      ? "SELECT username, userpicture FROM users WHERE username = ? "
      : "SELECT * FROM users";

    db.query(q, [req.query.username], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetSpecificUserInformations = (req, res) => {
  try {
    let userid = req.params.id;

    const q =
      "SELECT `name`, `username`, `userpicture`, `title`, `description`, `postpicture` FROM posts JOIN users ON posts.userid = users.id WHERE users.id=? ";

    db.query(q, [userid], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetProfileInformation = (req, res) => {
  try {
    const token = req.cookies.Acess_Token;

    if (!token)
      return res.status(400).json({ message: "Faça Login Para Continuar" });

    jwt.verify(token, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido, tente logar novamente" });

      const q =
        "SELECT `name`, `username`, `userpicture`, `title`, `description`, `postpicture` FROM posts JOIN users ON posts.userid = users.id WHERE users.id=? ";
      db.query(q, [result.userid], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(200).json(result);
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.GetAllUsers = GetAllUsers;
exports.GetSpecificUserInformations = GetSpecificUserInformations;
exports.GetProfileInformation = GetProfileInformation;
