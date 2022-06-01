//config inicial
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()



app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rota inicial ==> endpoint
// rotas da API

const PersonRoutes = require('./routes/pessoasRoutes')

app.use('/pessoas',PersonRoutes)


app.get('/',(req,res)=>{
    //mostrar requisição
    res.json({
        message:'Olá mundoo!!!'
    })
})


//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD= process.env.DB_PASSWORD

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qjrsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Conectamos ao DB na Nuvem!')
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
    console.log('Deu ruim')
})



