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

    //$query_paciente = "Select max(id) as id FROM pacientes";
    
    //$query_servicio = `SELECT id FROM servicios WHERE descripcion = '${request.body.servicio}'`;
    
    //let [id_pac,id_ser] = await Promise.all([sub_consultar(request, response, $query_paciente),sub_consultar(request, response, $query_servicio)])
    var id_pac = Promise.resolve(getIdPac(request, response));
    var id_ser = Promise.resolve(getIdSer(request, response));
    
    const citaObj = {
        fecha_cita: request.body.fecha_cita,
        hora_cita: request.body.hora_cita,
        id_servicio: 1,
        id_paciente: 1,
        id_dentista: 2
    }
    
    connection.query(sql, citaObj, (error, rows, fields) => {
        if(error) console.log(error);
       console.log("cita creada");
    });
    
})

function getIdPac (request, response){
    $query_paciente = "Select max(id) as id FROM pacientes";
    var id_pac = Promise.resolve(sub_consultar(request, response, $query_paciente));
    console.log("indi 1" +id_pac);
    return id_pac;
}

function getIdSer(request, response){
    $query_servicio = `SELECT id FROM servicios WHERE descripcion = '${request.body.servicio}'`;
    var id_ser = Promise.resolve( sub_consultar(request, response, $query_servicio));
    console.log("indi 2" +id_ser);
    return id_ser;
}

/*
app.post('/sendcita', async (request, response) => {
    const sql = 'INSERT INTO citas SET ?';
    console.log(request.body);

    //var citCit = getCitas(request, response);
    $query_paciente = "Select max(id) as id FROM pacientes";
    //const id_pac = await sub_consultar(request, response, $query_paciente);
    $query_servicio = `SELECT id FROM servicios WHERE descripcion = '${request.body.servicio}'`;
    //const id_ser = await sub_consultar(request, response, $query_servicio);

    function kk() {
        Promise.resolve(Promise.all([Promise.resolve( sub_consultar(request, response, $query_servicio)),
            Promise.resolve( sub_consultar(request, response, $query_paciente)) 
        ])
        ).then(([p,q]) => {
            const citaObj = {
                fecha_cita: request.body.fecha_cita,
                hora_cita: request.body.hora_cita,
                id_servicio: p,
                id_paciente: q,
                id_dentista: 2
            }
            console.log("papa" +citaObj);
            connection.query(sql, citaObj, (error, rows, fields) => {
                if(error) console.log(error);
                console.log("cita creada");
            })
        })
    }

    const getCitas = async (request, response) => {
        var valorCit = []
        $query_paciente = "Select max(id) as id FROM pacientes";
        valorCit[0] = await sub_consultar(request, response, $query_paciente);
        console.log("valorCit 2:" +valorCit[0]);
        $query_servicio = `SELECT id FROM servicios WHERE descripcion = '${request.body.servicio}'`;
        valorCit[1] = await sub_consultar(request, response, $query_servicio);
        console.log("valorCit 2:" +valorCit[1]);
    
        return citaObj = {
            fecha_cita: request.body.fecha_cita,
            hora_cita: request.body.hora_cita,
            id_servicio: await Promise.resolve( sub_consultar(request, response, $query_servicio)),
            id_paciente: await Promise.resolve( sub_consultar(request, response, $query_paciente)),
            id_dentista: 2
        }
    
    }
    
        kk()

})
*/



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