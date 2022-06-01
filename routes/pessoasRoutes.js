const router = require('express').Router()
const Pessoas = require('../models/Pessoas')

//rotas da API - Aula 02
//CREATE
router.post('/', async(req,res)=>{
    const {nome,salario,aprovado} = req.body
    //{nome: "Bia", salario: 10000, aprovado: true}
    if(!nome){
        res.status(422).json({error:'Nome é obrigatório'})
        return
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

//SELECT
router.get('/', async (req, res) =>{
    try {
        const people = await Pessoas.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//SELECT
router.get('/:id', async (req, res) =>{

    //extrair dado da requisição
    const id = req.params.id

    try {
        const person = await Pessoas.findOne({_id: id})

        if(!person){
            res.status(422).json({message:'Não encontrado :('})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

// update 

router.patch('/:id', async (req, res) =>{

    //extrair dado da requisição
    const id = req.params.id
    const {nome,salario,aprovado} = req.body
    const person = {
        nome,
        salario,
        aprovado
    }

    try {
        const updatePerson = await Pessoas.updateOne({_id: id}, person)
        res.status(200).json(person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message:'Não encontrado !'})
            return
        }

    } catch (error) {
        res.status(500).json({error:error})
    }
})

//DELETE
router.delete('/:id', async (req, res) =>{

    //extrair dado da requisição
    const id = req.params.id
    const person = await Pessoas.findOne({_id: id})

    try {
        if(!person){
            res.status(422).json({message:'Não encontrado :('})
            return
        }

        await person.deleteOne({_id: id})

        res.status(200).json({message:'Usuário Removido'})

    } catch (error) {
        res.status(500).json({error:error})
    }
})


module.exports = router



