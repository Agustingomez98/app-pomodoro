const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const tiempoEnPantalla = document.querySelector("#timer");
const pomodorContainer = document.querySelector(".pomodoro__contaiener");
const explicacion = document.querySelector("#explicacion");

const musica = new Audio ('./sonidos/luna-rise-part-one.mp3');
const sonidoStop = new Audio ('./sonidos/pause.mp3');
const sonidoStart = new Audio ('./sonidos/play.wav');
const sonidoFinish = new Audio ('./sonidos/beep.mp3');

let timepoTranscurridoEnSegundo = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

botonCorto.addEventListener('click', () => {
    timepoTranscurridoEnSegundo = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', () => {
    timepoTranscurridoEnSegundo = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click', () => {
    timepoTranscurridoEnSegundo = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');

})

function addDisplaNone() {
    pomodorContainer.classList.add('none');
}

function cambiarContexto(contexto) {

    mostrarTiempo();
    botones.forEach( (contexto) => {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            explicacion.innerHTML = `<p class="app__text">Durante este intervalo de tiempo, tu objetivo principal es concentrarte en una sola tarea. Elimina distracciones, establece metas claras y comprométete a trabajar de manera ininterrumpida durante estos 25 minutos. Al finalizar cada pomodoro, tómate un breve descanso para recargar energías.</p>`;

            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Que tal tomar un respiro?,<br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`;
            explicacion.innerHTML=`<h4 class="app__title__secundary-pomodoro">Importancia del descanso corto</h4>
            <p class="app__text">Aunque pueda parecer contradictorio, los descansos cortos son esenciales para mantener la productividad y la concentración a lo largo del día. Estos breves intervalos permiten que tu mente se relaje, reduciendo la fatiga mental y aumentando la capacidad de concentración para el próximo pomodoro.</p>
    
            <h4 class="app__title__secundary-pomodoro">Actividades recomendadas</h4>
            <p class="app__text">Durante estos 5 minutos, te recomendamos actividades que te ayuden a desconectar por completo de la tarea anterior. Puedes estirarte, dar un breve paseo, tomar un refrigerio ligero o simplemente cerrar los ojos y respirar profundamente. El objetivo es despejar tu mente y recargar energías para el siguiente periodo de enfoque.</p>`

            addDisplaNone();
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie,<br>
                <strong class="app__title-strong">¡Haz una pausa larga!</strong>`;
             explicacion.innerHTML=`<h4 class="app__title__secundary-pomodoro">Importancia del descanso largo</h4>
            <p class="app__text">El descanso largo es una oportunidad para desconectar completamente del trabajo y recargar tanto mente como cuerpo. A diferencia del descanso corto, este periodo extendido permite una verdadera pausa, lo que resulta en una mayor revitalización y una mejora en la creatividad y el bienestar general</p>
    
            <h4 class="app__title__secundary-pomodoro">Actividades recomendadas</h4>
            <p class="app__text">Durante estos 15 minutos, aprovecha para realizar actividades que te relajen y te ayuden a recargar energías de manera más profunda. Puedes practicar ejercicios de respiración, meditar, tomar una siesta corta, leer un libro o simplemente disfrutar de un momento de tranquilidad. El objetivo es renovarte completamente para enfrentar con energía renovada la siguiente sesión de trabajo.</p>`

            addDisplaNone();
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if (timepoTranscurridoEnSegundo <= 0){
        sonidoFinish.play();
        alert ("Tiempo final");
        reiniciar();
        return;
    }
    botonIniciarPausar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagenes/pause.png" alt="">
    <span>Pausar</span>`;
    timepoTranscurridoEnSegundo -= 1;
    mostrarTiempo();
}

botonIniciarPausar.addEventListener('click',iniciarPausar)

function iniciarPausar (){
    if (idIntervalo){
        sonidoStop.play();
        reiniciar()
        return;
    }
    sonidoStart.play();
    idIntervalo = setInterval(cuentaRegresiva,1000);
}

function reiniciar (){
    clearInterval(idIntervalo)
    idIntervalo = null;
    botonIniciarPausar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagenes/play_arrow.png" alt="">
    <span>Comenzar</span>`;
}

function mostrarTiempo(){
    const tiempo = new Date(timepoTranscurridoEnSegundo*1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo();