const db = require("../mysql/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { name, username } = req.body;

  const file = req.file;

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length > 0) {
      return res.status(400).json({ message: "Usuário Já Existente" });
    }

    const salt = await bcryptjs.genSalt();

    const hashpassword = await bcryptjs.hash(req.body.password, salt);

    const q = "INSERT INTO users SET ?";

    db.query(
      q,
      {
        name: name,
        email: req.body.email,
        userpicture: file.path,
        username: username,
        password: hashpassword,
      },
      (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Usuário Registrado com Sucesso" });
      }
    );
  });

  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const Login = (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (!result)
        return res.status(400).json({ message: "Email não Encontrado" });

      const checkpassword = await bcryptjs.compare(
        req.body.password,
        result[0].password
      );

      if (!checkpassword)
        return res.status(400).json({ message: "Senha ou Email Incorretos" });

      const token = jwt.sign(
        { email: result[0].email, userid: result[0].id },
        process.env.TOKEN
      );

      const { password, ...other } = result[0];

      res
        .cookie("Acess_Token", token, {
          HttpOnly: true,
        })
        .status(200)
        .json(other);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const Logout = (req, res) => {
  try {
    res.clearCookie("Acess_Token", {
      HttpOnly: true,
    });

    return res.status(200).json({ message: "Deslogado com Sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.Register = Register;
exports.Login = Login;
exports.Logout = Logout;
