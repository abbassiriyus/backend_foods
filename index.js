const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
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


const adminRouter=require('./routes/adminRouter.js')
const fileUpload = require("express-fileupload");
app.use(fileUpload())
const cors = require('cors')
const fs=require('fs')
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('./uploads'))
app.use(cors({origin: '*'}))

app.use('/admin',adminRouter)

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
// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO instance
const io = socketIO(server);

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  // Leave a room
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
  });

  // Receive and broadcast messages in a room
  socket.on('sendMessage', async (roomId, message) => {
    try {
      const query = `
        INSERT INTO messages (message) VALUES ($1) RETURNING *
      `;
      const values = [message];
      const result = await pool.query(query, values);

      const savedMessage = result.rows[0];

      io.to(roomId).emit('receiveMessage', savedMessage);
    } catch (error) {
      console.error(error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


app.listen(4003, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  




