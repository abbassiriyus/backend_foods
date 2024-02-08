const express = require('express')
const app = express()

const userRouter=require('./routes/usersRouter.js')




const cors = require('cors')
const fs=require('fs')

app.use(express.json());


app.use(cors({origin: '*'}))




app.listen(4003, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  




