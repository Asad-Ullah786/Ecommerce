const express = require("express");
const router = express.Router();
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  setOrderStatusController,
  getAllUsersController
} = require("../controller/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});
router.post("/forget-password", forgotPasswordController);

router.put("/profile", requireSignIn, updateProfileController);

router.get('/orders', requireSignIn, getOrdersController)


router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)
router.get('/all-users', requireSignIn, isAdmin, getAllUsersController)
router.put('/order-status/:orderId', requireSignIn, isAdmin, setOrderStatusController)


module.exports = router;
