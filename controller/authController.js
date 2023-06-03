const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModel");
const { hashedPassword, comparedPassword } = require("../helpers/helpers");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;

    // validation
    console.log(name, email, password, phone, address);

    if (!name) {
      // console.log(name,email,password,phone,address,"asad")

      res.status(400).json({
        success: false,
        message: "Name is required",
      });
    } else if (!address) {
      res.status(404).json({
        success: false,
        message: "address is required",
      });
    } else if (!email) {
      res.status(404).json({
        success: false,
        message: "Email is required",
      });
    } else if (!password) {
      res.status(404).json({
        message: "Password is required",
      });
    } else if (!phone) {
      res.status(404).json({
        success: false,
        message: "Phone is required",
      });
    } else if (!question) {
      res.status(404).json({
        success: false,
        message: "Question is required",
      });
    } else {
      //existing user

      const existingUser = await userModel.findOne({ email });
      // console.log(existingUser,"hello")
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "Already register plz login ",
        });
      } else {
        // register user
        const hashedPasswords = await hashedPassword(password);

        // save
        const user = await new userModel({
          name,
          phone,
          address,
          password: hashedPasswords,
          address,
          email,
          question,
        }).save();

        res.status(200).json({
          success: true,
          message: "user registered successfully",
          user: user,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error: error.message,
    });
  }
};
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "invaid user name or password",
      });
    }

    const user = await userModel.findOne({ email });
    // console,log(user,"user")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not found",
      });
    }

    const match = await comparedPassword(password, user.password);
    if (!match) {
      return res.status(200).json({
        success: false,
        message: "invalid Password",
      });
    }
    //token

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error in login",
    });
  }
};

exports.test = (req, res) => {
  res.send("send");
};
exports.forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).json({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).json({ message: "Password is required" });
    }

    const user = await userModel.findOne({ email, question: answer });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong email /credentials",
      });
    }
    const hashed = await hashedPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;

    const user = await userModel.findById(req.userAuth?._id);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.userAuth?._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated successful",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed updating profile",
      error: error.message,
    });
  }
};
exports.getOrdersController = async (req, res) => {
try {
    const orders = await orderModel
    .find({ buyer: req.userAuth._id })
    .populate("products", "-photo")
    .populate("buyer", "name");

    console.log("orders",orders)
    res.status(200).json({
        success : true,
        message : "Orders of users ",
        orders
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: "failed updating profile",
        error: error.message,
      });   
}
};
exports.getAllOrdersController = async (req, res) => {
try {
    const orders = await orderModel
    .find({  })
    .populate("products", "-photo")
    .populate("buyer", "name")
    .sort({createdAt:"-1"})

    // console.log("orders",orders)
    res.status(200).json({
        success : true,
        message : "all Orders for admin   ",
        orders
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: "failed geting order",
        error: error.message,
      });   
}
};

exports.setOrderStatusController = async (req,res) => {
    try {
        const { orderId } = req.params
        const { status} = req.body
        

        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.status(200).json({
            success : true,
            message : "Status udated successful",
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed updating Status",
            error: error.message,
          });   
    }
    }

    exports.getAllUsersController = async (req, res) => {
      try {
        const users = await userModel.find({ _id: { $ne: req.userAuth._id } }) 
        res.status(200).json({
          success: true,
          message: "all users",
          users
        });   
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "failed fetching users",
          error: error.message,
        });   
      }
    }