const bodyParser = require('body-parser');
const fs=require('fs')
const fileUpload = require("express-fileupload");



const userRouter=require('./routes/usersRouter.js')
const userPovarRouter=require('./routes/userPovarRouter.js')
const categoryRouter=require('./routes/categoryRouter.js')
const povarCategoryRouter=require('./routes/povarCategoryRouter.js')
const myKitchenRouter=require('./routes/myKitchenRouter.js')
const documentRouter=require('./routes/documentRouter.js')
const diplomaRouter=require('./routes/diplomaRouter.js')
const foodRouter=require('./routes/foodRouter.js')
const advantagesRouter=require('./routes/advantagesRouter.js')
const foodAdvantagesRouter=require('./routes/foodAdvantagesRouter.js')
const necessaryRouter=require('./routes/necessaryRouter.js')
const foodSellerRouter=require('./routes/foodSellerRouter.js')
const headerShirinliklar=require('./routes/headerShirinliklar.js')
const companyRouter=require('./routes/companyRouter.js')
const userCategoryRouter=require('./routes/userCategoryRouter.js')
const roomRouter=require('./routes/roomRouter.js')
const forCooksRouter=require('./routes/forCooksRouter.js')
const messagesRouter=require('./routes/messagesRouter.js')
const voprosRouter=require('./routes/voprosRouter.js')
const userProgRouter=require('./routes/userProgRouter.js')
const foodmarkRouter=require('./routes/foodmarkRouter.js')
const headerSizUchun=require('./routes/headerSizUchun.js')
const ishyonalishiRouter=require('./routes/ishyonalishiRouter.js')
const headeroshpazdanTaom=require('./routes/headeroshpazdanTaom.js')
const headerSoglom=require('./routes/headerSoglom.js')
const glDesertRouter=require('./routes/glDesertRouter.js')
const glFoodsRouter=require('./routes/glFoodsRouter.js')
const glProductRouter=require('./routes/glProductRouter.js')
const adminRouter=require('./routes/adminRouter.js')

















  

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// app.use(cors());

app.use(fileUpload())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('./uploads'))
app.use(cors({origin: '*'}))

app.use('/admin',adminRouter)
app.use('/api',glDesertRouter)
app.use('/api',userCategoryRouter)
app.use('/api',glFoodsRouter)
app.use('/api',glProductRouter)
app.use('/api',forCooksRouter)
app.use('/api',headerSizUchun)
app.use('/api',foodmarkRouter)
app.use('/api',userProgRouter)
app.use('/api',userRouter)
app.use('/api',voprosRouter)
app.use('/api',userPovarRouter)
app.use('/api',categoryRouter)
app.use('/api',povarCategoryRouter)
app.use('/api',myKitchenRouter)
app.use('/api',documentRouter)
app.use('/api',diplomaRouter)
app.use('/api',advantagesRouter)
app.use('/api',foodRouter)
app.use('/api',foodAdvantagesRouter)
app.use('/api',necessaryRouter)
app.use('/api',ishyonalishiRouter)
app.use('/api',headeroshpazdanTaom)
app.use('/api',headerSoglom)
app.use('/api',foodSellerRouter)
app.use('/api',headerShirinliklar)
app.use('/api',companyRouter)
app.use('/api',roomRouter)
app.use('/api',messagesRouter)

app.get('/doc', (_req, res) => {
  const data = fs.readFileSync('./uploads/index.html',
  { encoding: 'utf8', flag: 'r' });
res.status(200).send(data)
})
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data,"asas");
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(4003, () => {
  console.log("SERVER IS RUNNING");
});



