const { getAllUsersCtr1,
     getUserProfileCtrl,
     updateUserProfileCtrl,
       getUsersCountCtr1,
     profilePhotoUploadCtrl,
     deleteUserProfileCtrl
    } = require("../controllers/userscontrller");
const { verifyTokenAndAdmin,
     verifyTokenAndOnlyUser,
      verifyToken, 
      verifyTokenAndAuthorization
    } = require("../middlewares/verifyToken"); 

const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");


const router = require("express").Router();



// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin ,getAllUsersCtr1); 

// /api/users/profile/:id
router.route("/profile/:id").get(validateObjectId, getUserProfileCtrl)
                            .put(validateObjectId, verifyTokenAndOnlyUser , updateUserProfileCtrl)
                            .delete(validateObjectId , verifyTokenAndAuthorization ,deleteUserProfileCtrl)



// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);






// /api/users/count
router.route("/count").get(/*verifyTokenAndAdmin , */ getUsersCountCtr1); 


module.exports = router;