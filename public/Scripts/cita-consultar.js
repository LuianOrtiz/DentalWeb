
const url_folio = `http://127.0.0.1:3000/infocita/`;

const fechFolio = async(foliocita) => {
    return await (await fetch(url_folio+foliocita)).json
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