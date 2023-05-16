// posts için gerekli routerları buraya yazın
const router = require("express").Router();

const Posts = require("./posts-model");
module.exports = router;

//GET ile tüm postları çektik.
router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => res.status(500).json({ message: "Gönderiler alınamadı" }));
});

//GET ile belirli id'deki postu çektik.

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((postWithId) => {
      if (!postWithId) {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li gönderi bulunamadı" });
      } else {
        res.json(postWithId);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
    });
});

//POST ile post ekledik.
