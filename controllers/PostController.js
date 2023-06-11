const jwt = require("jsonwebtoken");
const db = require("../mysql/db");

const GetAllPosts = (req, res) => {
  try {
    const q = req.query.category
      ? "SELECT * FROM posts WHERE category = ?"
      : "SELECT * FROM posts";

    db.query(q, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetSpecificPost = (req, res) => {
  try {
    let postid = req.params.id;

    const q =
      "SELECT `name`, `username`,`userpicture`,`title`, `description`, `postpicture`,`category` FROM users JOIN posts ON users.id = posts.userid   WHERE posts.id = ?";

    db.query(q, [postid], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const MakePost = (req, res) => {
  try {
    const token = req.cookies.Acess_Token;

    const file = req.file;

    if (!token)
      return res.status(400).json({
        message:
          "Você não tem acesso a essa página, faça login para continuar!",
      });

    jwt.verify(token, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido, tente fazer login novamente!" });

      const q = "INSERT INTO posts SET ?";

      db.query(
        q,
        {
          title: req.body.title,
          description: req.body.description,
          postpicture: file.path,
          userid: result.userid,
          category: req.body.category,
        },
        (err, result) => {
          if (err) return res.status(500).json({ message: err.message });

          return res.status(200).json(result);
        }
      );
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const DeletePost = (req, res) => {
  try {
    const token = req.cookies.Acess_Token;

    if (!token)
      return res.status(400).json({
        message:
          "Você não tem acesso a essa página, faça login para continuar!",
      });

    jwt.verify(token, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido, tente fazer login novamente!" });

      const q = "DELETE from posts WHERE posts.id = ? AND posts.userid = ?";

      db.query(q, [req.params.id, result.userid], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Postagem Deletada com Sucesso" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const UpdatePost = (req, res) => {
  try {
    const token = req.cookies.Acess_Token;

    const file = req.file;

    if (!token)
      return res.status(400).json({
        message:
          "Você não tem acesso a essa página, faça login para continuar!",
      });

    jwt.verify(token, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido, tente fazer login novamente!" });

      const q =
        "UPDATE posts SET `title`=?, `description`=?, `category`=?, `postpicture`=?  WHERE posts.id = ? AND posts.userid = ?";

      const values = [
        req.body.title,
        req.body.description,
        req.body.category,
        file.path,
      ];

      db.query(q, [...values, req.params.id, result.userid], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Postagem Atualizada com Sucesso" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const MakeComment = (req, res) => {
  try {
    const token = req.cookies.Acess_Token;

    if (!token)
      return res.status(400).json({
        message:
          "Você não tem acesso a essa página, faça login para continuar!",
      });

    jwt.verify(token, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido, tente fazer login novamente!" });

      const q =
        "INSERT INTO comments(`title`,`description`,`userid`, `postid`) VALUES (?)";

      const values = [
        req.body.title,
        req.body.description,
        result.userid,
        req.params.id,
      ];

      db.query(q, [values], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(200).json(result);
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetComments = (req, res) => {
  try {
    const q =
      "SELECT comments.*, username, userpicture FROM comments JOIN users ON users.id = comments.userid WHERE comments.postid = ?";

    db.query(q, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.GetAllPosts = GetAllPosts;
exports.GetSpecificPost = GetSpecificPost;
exports.MakePost = MakePost;
exports.DeletePost = DeletePost;
exports.UpdatePost = UpdatePost;
exports.MakeComment = MakeComment;
exports.GetComments = GetComments