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
const glOtzif=require("./routes/glOtzif.js")
const glUsersRouter=require("./routes/glUsersRouter.js")
const karzinkaRouter=require("./routes/karzinkaRouter.js")


















  

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const pool =require('./db.js')
// app.use(cors());

app.use(fileUpload())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('./uploads'))
app.use(cors({origin: '*'}))

app.use('/admin',adminRouter)
app.use('/api',glUsersRouter)
app.use('/api',karzinkaRouter)
app.use('/api',glOtzif)
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
    origin: '*',
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", async (data) => {
    console.log(data);
    const query = `INSERT INTO messages (message,user_id,room_id) VALUES ($1,$2,$3) RETURNING *`;
    const values = [data.message,data.chat , data.room];
    await pool.query(query, values);
    const query1 ='SELECT * FROM messages WHERE room_id=$1;'; 
    const result1 = await pool.query(query1,[data.room]);
    const query3 = 'UPDATE users SET online = current_timestamp WHERE id = $1 RETURNING *';
    const values3 = [data.chat];
    await pool.query(query3, values3);
    socket.emit("receive_message" , result1.rows);
  });
});

server.listen(4005, () => {
  console.log("SERVER IS RUNNING");
});



