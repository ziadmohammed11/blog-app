const router = require("express").Router();
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken} = require("../middlewares/verifyToken");
const { createPostCtrl, getAllPostsCtrl , getSinglePostCtrl , getPostCountCtrl , deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl} = require("../controllers/postsController.js")
const validateObjectId = require("../middlewares/validateObjectId.js")




// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl )


// /api/posts/count   #12   TypeError: Post.count is not a function 
router.route("/count").get(getPostCountCtrl);


 // /api/posts/:id   #12    15/11/2023
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId , verifyToken , updatePostCtrl)
  
// /api/posts/update-image/:id
router.route("/update-image/:id")
    .put(validateObjectId, verifyToken, photoUpload.single("image"), updatePostImageCtrl);


// /api/posts/like/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);


module.exports = router;