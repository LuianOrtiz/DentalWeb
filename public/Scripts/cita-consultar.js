const url_folio = 'http://127.0.0.1:3000/infocita/:id';

const fechFolio = async() => {
    return await (await fetch(url_folio, {
        method: 'GET',
        credentials: 'include',
        body: JSON.stringify(petiCita),
        headers:{
            'Content-Type': 'application/json'
            }
    }))
}

const consulta = new Vue({
    el: '#consultar-cita',
    
    data:{
        foliocita: '',
    },

    methods:{
        consul_cit(){
            console.log("ahh me picaste " + this.foliocita);
            fechFolio();
        }
    },
})