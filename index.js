const { request, response, query } = require('express');
const express = require('express');
const mysql = require('mysql')
const app = express()
app.use(express.json())
const PORT = 3000;

const cors = require("cors")
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        credentials: true,
    })
)

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'luchoSql123',
    database:'dentalweb'
})

connection.connect(function(err){
    if(err){
        console.log(err.code)
        console.log(err.fatal)
    }else{
        console.log("Connected!")
    }
})

app.get('/infocita/:id', (request, response) =>{
    console.log(request.body)
    //$query = 'SELECT A.fecha_cita, A.hora_cita, B.descripcion, C.nombre, D.cedula_profesional from citas A INNER JOIN servicios B ON A.id_servicio=B.id INNER JOIN pacientes C ON A.id_paciente=C.id INNER JOIN dentistas D ON A.id_dentista=D.id WHERE A.id='+request.params.id
    //consultar(request, response, $query);
});

app.get('/servicios', (request, response) =>{
    $query = 'SELECT id, descripcion FROM servicios'
    consultar(request, response, $query);
});

app.post('/paciente', (request, response) => {
    console.log(request.body);
});


app.post('/sendcita', (request, response) => {
    console.log(request.body);
});

const consultar = async (req,res,$query) => {
    connection.query($query, await function(err,rows,flieds){
        if(err){
            console.log(`Error al ejecutar la query. Error: ${err}`)
            return;
        }

        console.log("Consulta ejecutada con exito ",rows)

        res.status(200).send({
            rows
        })
    })
}

app.listen(PORT, () => console.log(`Server running on port:${PORT}`))