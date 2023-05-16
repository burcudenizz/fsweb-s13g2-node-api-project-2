// posts için gerekli routerları buraya yazın
const router = require("express").Router();

const Posts = require("./posts-model");

//GET ile tüm postları çektik.
router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => res.status(500).json({ message: "Gönderiler alınamadı" }));
});

/* -------async/await ile-------
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});
*/

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

/* -------async/await ile-------
router.get("/:id", async (req, res) => {
  try {
    const postWithId = await Posts.findById(req.params.id);
    if (!postWithId) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      res.json(postWithId);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
  }
});
*/

//POST ile yeni bir post ekledik.

router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      message: "Lütfen gönderi için bir title ve contents sağlayın",
    });
  } else {
    try {
      let { id } = await Posts.insert({ title, contents });
      let insersedPost = await Posts.findById(id);
      res.status(201).json(insersedPost);
    } catch (err) {
      console.log(err); // erroru saklamış oluruz.
      res
        .status(500)
        .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
    }
  }
});

//PUT ile belirli bir id'ye sahip postu güncelledik.

router.put("/:id", async (req, res) => {
  try {
    let willFoundPost = await Posts.findById(req.params.id);
    if (!willFoundPost) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      let { title, contents } = req.body;
      if (!title || !contents) {
        res
          .status(400)
          .json({ message: "Lütfen gönderi için title ve contents sağlayın" });
      } else {
        let willUpdatePostId = await Posts.update(req.params.id, req.body);
        let updatedPost = await Posts.findById(willUpdatePostId);
        res.status(200).json(updatedPost);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});

//DELETE ile belirli bir id'ye sahip postu sildik.

router.delete("/:id", async (req, res) => {
  try {
    let willFoundPost = await Posts.findById(req.params.id);
    if (!willFoundPost) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      await Posts.remove(req.params.id);
      res.status(200).json(willFoundPost);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});

//GET ile belirli bir id'ye sahip commentsleri getirdik.

router.get("/:id/comments", async (req, res) => {
  try {
    let willFoundPost = await Posts.findById(req.params.id);
    if (!willFoundPost) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      let comments = await Posts.findPostComments(req.params.id);
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
  }
});
module.exports = router;
