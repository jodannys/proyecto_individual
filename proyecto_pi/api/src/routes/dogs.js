const axios = require("axios")
const app = require('express').Router()
const { Dog, Temperament } = require('../db');


// Obtener un listado de las primeras 8 razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
app.get("/dogs1", function (req, res) {
    axios.get("https://api.thedogapi.com/v1/breeds") 
        .then(respuesta => {
            let nuevoarray = respuesta.data.slice(0,8) 
            res.send(nuevoarray)
        })
        .catch(error => {
            console.log(error)
        })
    })

app.get("/dogs", function (req, res) {
axios.get("https://api.thedogapi.com/v1/breeds") 
    .then(respuesta => {
        res.send(respuesta.data)
    })
    .catch(error => {
        console.log(error)
    })
})

//BUSCADOR

app.get("/search-dogs", async function (req, res) {
    let misperros = await Dog.findAll()
    let misperrosParse = []    
    for (let i = 0; i < misperros.length; i++) {
        let perrito = misperros[i];
        let temperaments = await perrito.getTemperaments() 
        perrito = perrito.dataValues;
        temperaments = temperaments.map((el) => el.dataValues.name)
        perrito.temperament = temperaments.toString()
        misperrosParse.push(perrito)
    }
    axios.get(`https://api.thedogapi.com/v1/breeds`)
        .then(respuesta => {
            let resultado = [...misperrosParse, ...respuesta.data].filter((el) => 
                el.name.toLowerCase().includes(req.query.name.toLowerCase()))
            if (resultado.length === 0) {
                res.send([])
            }
            if(resultado.length > 0 && resultado.length < 9) {
                res.send(resultado)
            }
            else if(resultado.length > 8) {
                let nuevoarray = resultado.slice(0, 8)
                res.send(nuevoarray)
            } 
            res.end()
        })        
        .catch(error => {
            console.log(error)

        })
})

//DETALLE DE UN PERRO

app.get("/dogs/:id", async function (req, res) {
    let perrodetalles = []
    let detallesdog = await Dog.findByPk(req.params.id)
    let temperaments = await detallesdog.getTemperaments() 
    let perrito = detallesdog.dataValues;
    temperaments = temperaments.map((el) => el.dataValues.name)
    perrito.temperament = temperaments.toString()
    perrodetalles.push(perrito)

    axios.get(`https://api.thedogapi.com/v1/breeds`)
        .then (respuesta => {
            const perro = [...perrodetalles, ...respuesta.data].find(element => element.id == req.params.id);
            res.send(perro)
        })
        .catch(error => {
            console.log(error)
        }) 
    })


//OBTENER TEMPERAMENTOS

app.get("/temperamentos", async function (req, res) {    
       let traertemperamentos = await Temperament.findAll()
       traertemperamentos = JSON.stringify(traertemperamentos, null, 2) 
       traertemperamentos = JSON.parse(traertemperamentos)
       if(traertemperamentos.length !== 0) {
           res.send(traertemperamentos) 
       } else {
        axios.get("https://api.thedogapi.com/v1/breeds") 
        .then(async respuesta => {
            let temperamentosfinal = []
            let temperamentos = respuesta.data.map((el) => el.temperament) 
            let nuevostemperamentos = temperamentos.map((el) => el && el.split(",")).flat()
            nuevostemperamentos.forEach((el) => {
                if(temperamentosfinal.indexOf(el) < 0) temperamentosfinal.push(el)
            })
            for (let i = 0; i < 5; i++) {
                await Temperament.create({
                    name: temperamentosfinal[i]
                }) 
            }
            res.send(temperamentosfinal.slice(9, 19))
        }) 
        .catch(error => {
            console.log(error)
        })           
       } 
})
 

//CREACION DE PERRO

app.post("/createdog", function (req, res) {
    let temperamentsId = req.body.temperamentsId
    Dog.create({
        name: req.body.perroNuevo.name,
        altura: req.body.perroNuevo.altura,
        peso: req.body.perroNuevo.peso,
        años: req.body.perroNuevo.años,
        id: Date.parse(new Date)
    })
    .then((dog) =>{
        dog.setTemperaments(temperamentsId)
        res.status(200).send(dog)
    })
    .catch((error => console.log(error)))
}) 

//CREACION DE TEMPERAMENTO
app.post('/createtemperament', (req, res) => {
    Temperament.create({
      name: req.body.temperamentonuevo,
      id: Date.parse(new Date)
    })
      .then((temperament) =>{
        res.send(temperament.dataValues)
      } )
      .catch((error) => res.status(400).send(error));
  })

module.exports = app