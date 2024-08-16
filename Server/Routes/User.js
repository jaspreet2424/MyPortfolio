const express = require("express");
const {
  sendMailMessage,
  registerUser,
  loginUser,
  userAuthentication,
  logoutUser,
  getDetails,
  addProjectToDatabase,
  updatePassword,
  getProjects,
  deleteProject,
} = require("../Controller/User");
const router = express.Router();
const multer = require('multer');

const upload = multer({dest : 'Uploads/'});

router.post("/admin/sign_up", registerUser);
router.post("/admin/sign_in", loginUser);
router.get("/admin/check_auth", userAuthentication);
router.get("/admin/logout", logoutUser);
router.post("/admin/add_project", upload.single('projectImg') ,addProjectToDatabase);
router.post('/admin/update_password' , updatePassword);
router.post("/send_message", sendMailMessage);
router.get("/get_details", getDetails);
router.get("/get_projects", getProjects);
router.get("/delete_project/:id" , deleteProject);

module.exports = router;
