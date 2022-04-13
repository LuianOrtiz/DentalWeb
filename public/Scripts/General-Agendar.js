const resenias = new Vue({
    el: '#grid-rs',
    data:{
        prt : [
            {text : " Me gusta el ambiente relajado y te van explicando los procedimientos de forma que crea\nseguridad ir al dentista. Eso combinado con su excelente calidad de servicio al cliente y su nivel de\nlimpieza los pone por mucho por encima de otros consultorios dentales.",
                name: "Juan Carlos"},
            {text : " Todo mi cuidado dental lo he llevado en esta clínica desde hace años. Siempre he tenido\nbuenas experiencias ahí.",
                name: "Cesar Chavez"},
            {text : " A diferencia del trauma que normalmente nos puede causar, el saber que tendremos que\nenfrentarnos a un sillón en un consultorio dental, para mí ha sido una experiencia totalmente diferente,\ndebido al trato tan profesional, gracias!.",
                name: "Rocio Durcal"}
        ]
    }
})



const servicios = new Vue({
    el : '#servicios',
    data : {
        todoData : [
            {buttonText: 'Spa Dental', privateid: '#spadental', id: 'spadental', cardText:'Dentro de Dental Group contamos con el servicio de SPA DENTAL, que consiste en consentir\na\nsu\nboca para\nlograr una buena salud dental.\nUtilizamos un sistema LÁSER que permite tratar las siguientes molestias:\n\n',
            liData: [
                {text:'Inflamación causadas por extracciones.',des:''},
                {text:'Inflamación causadas por infecciones.',des:''},
                {text:'Dolor post-operatorio.',des:''},
                {text:'Agilizar la cicatrización.',des:''},
                {text:'Estres muscular causadas por las muelas del juicio.',des:''}
            ],
            li: 'true'},
            {buttonText: 'Limpieza dental', privateid: '#limpiezadental', id: 'limpiezadental', cardText: 'La limpieza dental consiste en retirar el sarro, manchas generadas por el tabaco, café,\nbebidas\nde color\noscuro, refresco de cola, comida.\nEsta limpieza se hace con un sistema de vibración ultrasónico que permite desprender con\nmayor\nfacilidad\nel sarro sin generar dolor en las encías.\nDespués de un tratamiento de ortodoncia generalmente se debe de realizar una limpieza\npara\nretirar los\nresiduos de pegamento para los brackets y manchas de comida.\nSe recomienda una limpieza periódicamente para prevenir enfermedades de las encías y\nalgunas\notras que\npudieran provocar la pérdida prematura de dientes.\n\n', 
            liData: [
                {text:'Inflamación causadas por extracciones.',des:''},
                {text:'Inflamación causadas por infecciones.',des:''},
                {text:'Dolor post-operatorio.',des:''},
                {text:'Agilizar la cicatrización.',des:''},
                {text:'Estres muscular causadas por las muelas del juicio.',des:''}
            ],
            li: 'true'},
            {buttonText: 'Endodoncia', privateid: '#endodoncia', id: 'endodoncia', cardText: 'Este tratamiento se realiza cuando se presentan algunas lesiones que causan infección en\nel\ninterior del\ndiente donde están contenidos los vasos sanguíneos y nervios.\nCuando una infección ha dañado el nervio y no puede repararse así mismo, pierde su\nresistencia.\nLas causas más comunes para la práctica de la endodoncia son:\n\n', 
            liData: [
                {text: 'Caries profundas.',des:''},
                {text: 'Fracturas de los dientes.',des:''},
                {text: 'Enfermedad periodontal.',des:''},
                {text: 'Todas ellas pueden permitir la entrada de bacterias y sus productos al interior\ndel\ndiente.',des:''}
            ],
            li: 'true'},
            {buttonText: 'Periodoncia', privateid: '#periodoncia', id: 'periodoncia' ,cardText: 'Las enfermedades periodontales son infecciones que afectan a los tejidos y al hueso que\nsirve de sostén\na los dientes (raíces).\nEstos son algunos signos de advertencia pueden indicar que hay un problema periodontal:\n\n', 
            liData: [
                {text: 'Encías que sangran con facilidad.',des:''},
                {text: 'Encías enrojecidas, hinchadas o sensibles.',des:''},
                {text: 'Mal aliento persistente.',des:''},
                {text: 'Dientes sueltos o que están separándose.',des:''},
                {text: 'Pus entre los dientes y la encía, etc.',des:''}
            ],
            li: 'true'},
            {buttonText: 'Implantología', privateid: '#implantologia', id: 'implantologia' ,cardText: '¿Cómo son los implantes?', 
            liData: [{text: '',des:'Los implantes dentales oseointegrados son unos dispositivos de titanio, con diferentes\ntratamientos y\nrecubrimientos de superficie.\nSu función es la de sustituir las raíces de los dientes naturales, sirviendo de soporte\npara la\nconexión, a través de los componentes protésicos,\ncon la restauración definitiva, proporcionando confort, ajuste y estética.\n\n¿Cómo se colocan?\n\nA cualquier edad, siempre y cuando la calidad y cantidad del hueso receptor sea la\nadecuada. En el caso\nde que la cantidad de hueso sea insuficiente,\nse podrán aplicar técnicas de aporte óseo mediante injertos.\n\n¿A quién se colocan?\n\nLos implantes están indicados en la mayoría de las personas que llevan prótesis\ncompletas, o bien\nprecisan la colocación de un puente o pieza dentaria aislada,\nya que en este caso no es necesario modificar los dientes adyacentes que pudieran estar\nsanos. Las\ncontraindicaciones absolutas por otras enfermedades son escasas.'}],
            li: 'false'},
            {buttonText: 'Diseño de sonrisa', privateid: '#disenosonrisa', id: 'disenosonrisa', cardText: 'El diseño de sonrisa es un proceso de estética dental que brinda formas y alineación\ncorrecta a sus\ndientes acordes con las características de su rostro.', 
            liData: [{text: '',des:''}],
            li: ''},
            {buttonText: 'Estetica dental', privateid: '#estetica', id: 'estetica', cardText: 'Dentro de la estética dental contamos con los siguientes servicios:', 
            liData: [
                {text: 'Blanqueamiento Dental.',des:'Que consiste en dejar los dientes más\nblancos, esto se\nrealiza en una sola sesión, con el apoyo del láser.'},
                {text: 'Composites.',des:'Se realiza el reemplazo de amalgamas con mercurio\n(tóxico) por\ncomposites del color del diente.'},
                {text: 'Incrustaciones Esteticas.',des:'Reemplazan a incrustaciones metálicas por\nincrustaciones\nestéticas (del color del diente).'},
                {text: 'Diseño de Sonrisa.', des:'Consiste en la toma de fotografías y estudios de\ndiagnóstico de\nla mordida del paciente, para poder crear una mejor apariencia.'}
            ],
            li: 'true'},
            {buttonText: 'Rehabilitación', privateid: '#rehabilitacion', id: 'rehabilitacion', cardText: 'Es un servicio que le permite al paciente devolver la forma y la funcionalidad a sus\ndientes, es decir,\nvolver a darle apariencia y estética al diente\na través de la aplicación de composites (resina nano híbrida) e incrustaciones\nestéticas, las cuales son\ncolocadas y secadas a través de la aplicación\nde luz ultravioleta para un mejor sellado, rápido y eficiente.\nEl procedimiento de rehabilitación dental también se aplica:\n\n', 
            liData: [
                {text: 'Retirar una caries.',des:''},
                {text: 'Después de un tratamiento de endodoncia.',des:''},
                {text: 'Cuando se fractura un diente.',des:''},
                {text: 'Cuando ha perdido alguna o varias piezas dentales.',des:''}
            ],
            li: 'true'},
            {buttonText: 'Cirugía Bucal', privateid: '#cirugia', id: 'cirugia', cardText: 'En Dental Group contamos con el servicio de cirugía bucal.\nSe recurre a esta atención cuando se trata de alguna anomalía, tal como:', 
            liData: [
                {text: 'Dientes superiores que se desvían de su posición normal y aparecen en el\npaladar; esto\nrepresenta un riesgo para las otras piezas.',des:''},
                {text: 'Extracciones de muelas del juicio.',des:''},
                {text: 'Extracción de quistes de origen dental.',des:''}
            ],
            li: 'true'},
            {buttonText: 'Apicectomía', privateid: '#apicectomia', id: 'apicectomia', cardText: 'La apicectomía se realiza cuando se ha presentado una infección en un diente y a pesar\nde haber\nrecurrido a la endodoncia, ésta persiste o continúa.\nConsiste en cortar la punta de la raíz de un diente aproximadamente de 2 a 3mm para\neliminar dicha\ninfección.\n\n', 
            liData: [{text: '',des:''}],
            li: ''},
            {buttonText: 'Ortodoncia', privateid: '#ortodoncia', id: 'ortodoncia', cardText: 'Área que se encarga de tratar y corregir las alteraciones de las irregularidades de los\ndientes,\nmordidas y maxilares,\npara mejorar la calidad de vida, buscando equilibrar el funcionamiento de todos los\nelementos que son\nimportantes para masticar correctamente.\n\n', 
            liData: [{text: '',des:''}],
            li: ''}
        ]
    }
})
