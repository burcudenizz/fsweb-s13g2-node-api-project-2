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
