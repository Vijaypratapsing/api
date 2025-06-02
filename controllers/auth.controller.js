const bcrypt=require('bcrypt');
const prisma=require('../lib/prisma');
const jwt=require('jsonwebtoken');

 async function register(req, res) {
  const {username,password,email}=req.body;
  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 8);
    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
   
    res.status(201).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false , message: "Invalid Credentials!"});
  }
};
  
async function login(req, res) {
  // const { username, password } = req.body;
  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });
    if (!user) return res.status(400).send({success: false, message: "User not found!" });
    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(req.body.password , user.password);
    if (!isPasswordValid)
      return res.status(400).send({success: false, message: "Password Invalid" });
    // GENERATE COOKIE TOKEN AND SEND TO THE USER
     //res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({id: user.id,},process.env.JWT_SECRET_KEY,{ expiresIn: age });
    const { password, ...userInfo } = user;
    // cookie("name",value)
    res.cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .send({success: true , data:userInfo});
  } catch (err) {
    console.log(err);
    res.status(500).send({success: false, message: "fail to login!" });
}
}

function logout(req, res) {
  res.clearCookie("token").status(200).send({success: true, message: "logout successfully" });

}
module.exports = {
    register,
    login,
    logout
}