const { request, response, query } = require('express');
const express = require('express');
const mysql = require('mysql')
const app = express()
app.use(express.json())
const PORT = 3000;

const cors = require("cors");
const res = require('express/lib/response');
const req = require('express/lib/request');
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        credentials: true,
    })
)

const connection = mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:''
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

    //$query_paciente = "Select max(id) as id FROM pacientes";
    
    $query_servicio = `SELECT id FROM servicios WHERE descripcion = '${request.body.servicio}'`;
    
    //let [id_pac,id_ser] = await Promise.all([sub_consultar(request, response, $query_paciente),sub_consultar(request, response, $query_servicio)])
    sub_consultar(request, response, $query_servicio,sql)
    
    
})

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

const sub_consultar = async (req,res,$query, sql) => {
    var id_ser;
    $query_paciente = "Select max(id) as id FROM pacientes";
    connection.query($query, await function(err,rows,flieds){
        if(err){
            console.log(`Error al ejecutar la query. Error: ${err}`)
            return;
        }

        console.log("Consulta ejecutada con exito ",rows[0].id)
        id_ser = rows[0].id;
        console.log("index: " + id_ser);
        subsub_consultar(req, res, $query_paciente, sql, id_ser);
    })
}

const subsub_consultar = async (req,res,$query, sql, id_ser) => {
    
    var id_pac;
    connection.query($query, await function(err,rows,flieds){
        if(err){
            console.log(`Error al ejecutar la query. Error: ${err}`)
            return;
        }

        console.log("Consulta ejecutada con exito ",rows[0].id)
        id_pac = rows[0].id;
        console.log("index-1: " + id_pac);
        insertarCita(req, res, sql, id_ser, id_pac);

    })
    console.log("index 0: " + id_pac);
    console.log("index 1: " + id_ser);
      
}

function insertarCita (request , response, sql, id_ser, id_pac){
    console.log("--> " +request.body);
    console.log("index 2: " + id_pac);
    console.log("index 3: " + id_ser);
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
}


app.listen(PORT, () => console.log(`Server running on port:${PORT}`))