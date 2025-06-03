const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config(); 

const authroute = require('./routes/auth.route');
const postroute = require('./routes/post.route');
const testroute = require('./routes/test.route');
const userroute = require('./routes/user.route');
const messageroute = require('./routes/message.route');
const chatroute = require('./routes/chat.route');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], 
  credentials: true
}));

// Routes
app.use(authroute);
app.use(testroute);
app.use(userroute);
app.use(postroute);
app.use("/messages", messageroute);
app.use("/chats", chatroute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
// app.listen(8080, () => {
//    console.log(` Server is running on port`);
//  });
