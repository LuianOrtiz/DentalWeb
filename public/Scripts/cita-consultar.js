const url_folio = '';

const consulta = new Vue({
    el: '#consultar-cita',
    
    data:{
        foliocita: '',
    },

    methods:{
        consul_cit(){
            console.log("ahh me picaste " + this.foliocita);
        }
    },
})