const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const userCollection = require("../Modal/User");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const saltRound = 10;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) {
      return res.status(422).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: "User Already exist with email",
      });
    }

    const hashpassword = await bcrypt.hash(password, saltRound);

    const newInstance = new userCollection({
      name,
      email,
      password: hashpassword,
      number,
    });

    const savedUser = await newInstance.save();

    res.status(201).json({
      success: true,
      message: "New User Created",
      User: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occured in creating new User ${error}`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const existingUser = await userCollection.findOne({ email });

    if (!existingUser) {
      return res.status(422).json({
        success: false,
        message: "No User found with this email",
      });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(422).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await jwt.sign(
      { userId: existingUser._id },
      process.env.SECRET_KEY
    );

    existingUser.token = token;
    const savedUser = await existingUser.save();

    res.cookie("userToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      success: true,
      User: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occured in Logging to account ${error}`,
    });
  }
};

const userAuthentication = async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access. No user found",
      });
    }

    await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized access",
        });
      } else {
        const savedUser = await userCollection.findById(decoded.userId);
        return res.status(200).json({
          success: true,
          User: savedUser,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured ${error}`,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access. No user found",
      });
    }

    await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized access",
        });
      } else {
        const savedUser = await userCollection.findById(decoded.userId);
        savedUser.token = null;
        await savedUser.save();
        res.clearCookie("userToken");
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured ${error}`,
    });
  }
};

const sendMailMessage = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !mobile || !subject || !message) {
      return res.status(422).json({
        success: false,
        message: "Fill all the details.",
      });
    }

    const mailMessage = {
      from: email,
      to: process.env.GMAIL,
      subject: "New message from Client",
      text: `
        Name : ${name}
        email : ${email}
        Number : ${mobile}
        Subject : ${subject}
        Message : ${message}
        `,
    };

    await transport.sendMail(mailMessage, (err, info) => {
      if (err) {
        return res.status(422).json({
          success: false,
          message: "Failed to send message",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Message sent Successfully",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occured in sending message ${error}`,
    });
  }
};

const getDetails = async (req, res) => {
  try {
    const user = await userCollection.find();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Error Occured in fetching data",
      });
    }

    res.status(200).json({
      success: true,
      Details: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error Occured in fetching data ${error}`,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const details = await userCollection.find();

    if (!details) {
      return res.status(400).json({
        success: false,
        message: "Error Occured in fetching data",
      });
    }

    const projectDetail = details[0].projects;

    res.status(200).json({
      success: true,
      Projects: projectDetail,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error Occured in fetching data ${error}`,
    });
  }
};

const addProjectToDatabase = async (req, res) => {
  try {
    const { title, description, languages } = req.body;
    const token = req.cookies.userToken;

    if (!title || !description || !languages) {
      return res.status(422).json({
        success: false,
        message: "Missing Input fields",
      });
    }
    const response = await cloudinary.uploader.upload(req.file.path);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file is selected",
      });
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User is not logged in",
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "Please Login first to upload Data",
      });
    }

    const user = await userCollection.findById(decoded.userId);

    const newItem = {
      title: title,
      description: description,
      languages: languages,
      projectImg: response.secure_url,
    };

    user.projects.push(newItem);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Project Upload Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured in uploading project detail ${error}`,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Missing input fields, fill all details",
      });
    }

    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(422).json({
        success: false,
        message: "No user found with this email",
      });
    }

    const hashpassword = await bcrypt.hash(password, saltRound);

    const updateUser = await userCollection.findByIdAndUpdate(
      user._id,
      { password: hashpassword },
      { new: true }
    );

    res.status(200).json({
      success: true,
      User: updateUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occured in updating password ${error}`,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.userToken;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User is not logged in",
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "Please Login first to upload Data",
      });
    }

    const user = await userCollection.findById(decoded.userId);

    console.log(user);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occured in deleting project ${error}`,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendMailMessage,
  userAuthentication,
  logoutUser,
  getDetails,
  addProjectToDatabase,
  updatePassword,
  getProjects,
  deleteProject,
};
