const express =require("express")
const cors =require("cors");
const mongoose =require("mongoose");
const userRoutes = require('./routes/userRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js')
const socket =require("socket.io");
const app=express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)

mongoose.connect(process.env.MONGO_URL,{
 useNewUrlParser: true,
}).then(()=>
{
    console.log("DataBase Connected")
}).catch((e) => 
{ 
    console.log(e);
});
const port =process.env.PORT||8000;
const server =app.listen(port,()=>
{
    console.log(`Server Started at ${port}`);  
})
const io = socket(server,
{
    cors:
    {
        origin: "https://chat-frontend-two.vercel.app",
        credentials: true
    },
});
global.onlineUsers = new Map();
io.on("connection",(socket) =>
{
    global.chatSocket = socket;
    socket.on("add-user", (userId) => 
    {
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
      });
})




