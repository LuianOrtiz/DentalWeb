
const url_folio = `http://127.0.0.1:3000/infocita/`;

const fechFolio = async(foliocita) => {
    return await (await fetch(url_folio+foliocita)).json
}
const renderCita = (data) => {
    
    const cita = [];
    let pilaCita = [];

    data.forEach(cita => {
        pilaCita.unshift(cita);
    });
    
    pilaCita.forEach(cita => {
        const tmp = {
            fecha_cita: cita.fecha_cita,
            hora_cita: cita.hora_cita,
            servicio: cita.descripcion,
            paciente: cita.nombre,
            cedula_profesional: cita.cedula_profesional
        }
        cita.push(tmp);
    });

    const folio = new Vue({
        el: '#folio-citaa',
        data:{
            todo: cita
        }
    })

}

const consulta = new Vue({
    el: '#consultar-cita',
    
    data:{
        foliocita: '',
    },

    methods:{
        consul_cit(){
            console.log("ahh me picaste " + this.foliocita);
            //id_folio = this.foliocita;
            fechFolio(this.foliocita);
        }
    },
})