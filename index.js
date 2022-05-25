//config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Pessoas = require('./models/Pessoas')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API - Aula 02
app.post('/pessoas', async(req,res)=>{
    const {nome,salario,aprovado} = req.body
    //{nome: "Bia", salario: 10000, aprovado: true}
    if(!nome){
        res.status(422).json({error:'Nome é obrigatório'})
    }
    const pessoas = {
        nome,
        salario,
        aprovado
    }
    try {
        await Pessoas.create(pessoas)
        res.status(201).json({message:'Pessoa inserida com sucesso!'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//rota inicial ==> endpoint
app.get('/',(req,res)=>{
    //mostrar requisição
    res.json({
        message:'Olá mundoo!!!'
    })
})

//entregar uma porta
const DB_USER = 'bea'
const DB_PASSWORD= '1HEMw7OxAdxKxxij'
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



