
let citaValores = [];
var petiCita = {};
const url_cita = 'http://127.0.0.1:3000/sendcita';


function convertirJson(citaValores, petiCita){
    petiCita.nombre_completo = citaValores[0];
    petiCita.correo = citaValores[1];
    petiCita.telefono = citaValores[2];
    petiCita.servicio  = citaValores[3];
    petiCita.fecha  = citaValores[4];
    petiCita.hora = citaValores[5];
}

const fechCita = async() => {
    return await (await fetch(url_cita, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(petiCita),
        headers:{
            'Content-Type': 'application/json'
            }
    }))
}

//fetch('http://127.0.0.1:8000/api/citas', {method: 'POST', body: citaValores}).then(results => results.json()).then(console.log);

const agendar = new Vue({
    el: '#agendar-cita',
  
    data:{
        todos : [
            {id : 'fullName', type : 'text', name: 'nombre_completo' ,des: 'Nombre completo', valor: ''},
            {id : 'email', type : 'email',  name: 'correo' ,des: 'Correo' , valor: ''},
            {id : 'phone', type : 'number', name: 'telefono' , des: 'Telefono' , valor: ''},
            {id : 'service', type : 'text', name: 'servicio' , des: 'Servicio' , valor: ''},
            {id : 'date', type : 'date', name: 'fecha' , des: 'Fecha' , valor: ''},
            {id : 'time', type : 'time',  name: 'hora' ,des: 'Hora' , valor: ''}
        ]
    },

    methods:{
        agregar_form(){
            this.todos.forEach(todo => {
                this.valor=todo.valor;
                citaValores.push(this.valor);
            });

            convertirJson(citaValores, petiCita); 
            console.log(petiCita); 
            fechCita();
            console.log("DONE");
        },  

    },
})



//fetch('http://example.com/movies.json').then(response => response.json()).then(data => console.log(data));

