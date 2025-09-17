import { User } from "../model/User.js";

export const addUser = async (req, res) => {
  const { firstName, lastName, email, number } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.json({ message: "User Already Register", success: false });
    user = await User.create({ firstName, lastName, email, number });
    res.json({
      message: "User Register Successfully...!",
      user,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);

//   try {
//     let user = await User.findOne({ email });
//     if (!user) return res.json({ message: "User Not Found", sucess: false });
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword)
//       return res.json({ message: "Invalid credential", sucess: false });
//     const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", {
//       expiresIn: "365d",
//     });
//     res.json({ message: `Welcome ${user.name}`, token, sucess: true });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

//Get Users

export const getUsers = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    exports.json(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, number } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, number },
    );

    res.json({
      message: "User updated successfully!",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


export const removeUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ message: "User removed", success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
