const { request, response, query } = require('express');
const express = require('express');
const mysql = require('mysql')
const app = express()
app.use(express.json())
const PORT = 3000;

const cors = require("cors");
const res = require('express/lib/response');
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
    console.log(request.params.id);
    $query = 'SELECT A.fecha_cita, A.hora_cita, B.descripcion, C.nombre, D.cedula_profesional from citas A INNER JOIN servicios B ON A.id_servicio=B.id INNER JOIN pacientes C ON A.id_paciente=C.id INNER JOIN dentistas D ON A.id_dentista=D.id WHERE A.id='+request.params.id
    consultar(request, response, $query);
});

app.get('/servicios', (request, response) =>{
    $query = 'SELECT id, descripcion FROM servicios'
    consultar(request, response, $query);
});

app.post('/paciente', (request, response) => {
    
    const sql = 'INSERT INTO pacientes SET ?';

    console.log(request.body);
    
    connection.query(sql, request.body, error => {
        if(error) throw error;
        console.log('Paciente creado');
    });

});


app.post('/sendcita', async (request, response) => {
    const sql = 'INSERT INTO citas SET ?';
    console.log(request.body);

    $query_paciente = "Select max(id) as id FROM pacientes";
    
    $query_servicio = `SELECT id FROM servicios WHERE descripcion = '${request.body.servicio}'`;
    
    let [id_pac,id_ser] = await Promise.all([sub_consultar(request, response, $query_paciente),sub_consultar(request, response, $query_servicio)])

    const citaObj = {
        fecha_cita: request.body.fecha_cita,
        hora_cita: request.body.hora_cita,
        id_servicio: id_ser,
        id_paciente: id_pac,
        id_dentista: 2
    }
    

    connection.query(sql, citaObj, (error, rows, fields) => {
        if(error) console.log(error);
       console.log("cita creada");
    });
    
});

function getIdServicio(request, response){
    const sql = `SELECT max(id) FROM pacientes`;
    consultar(request, response, sql);
}

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

const sub_consultar = async (req,res,$query) => {
    connection.query($query, await function(err,rows,flieds){
        if(err){
            console.log(`Error al ejecutar la query. Error: ${err}`)
            return;
        }

        console.log("Consulta ejecutada con exito ",rows[0].id)
        return rows[0].id;

    })
}


app.listen(PORT, () => console.log(`Server running on port:${PORT}`))