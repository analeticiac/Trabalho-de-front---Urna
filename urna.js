/* ============================================================
   URNA ELETRÔNICA
   JAVASCRIPT PRINCIPAL
============================================================ */


/* ============================================================
   CANDIDATOS
============================================================ */

const candidatosPresidente = {

    "10": {
        nome: "Renato Silva",
        partido: "Partido Nacional",
        foto: "imagens/renato.png"
    },

    "20": {
        nome: "Maria Santos",
        partido: "Partido da Democracia",
        foto: "imagens/maria.png"
    },

    "30": {
        nome: "Beatriz Silva",
        partido: "Partido do Brasil",
        foto: "imagens/beatriz.png"
    },

    "40": {
        nome: "Carlos Souza",
        partido: "Partido Popular",
        foto: "imagens/carlos.png"
    }

};


const candidatosGovernador = {

    "50": {
        nome: "Julio Almeida",
        partido: "Partido Nacional",
        foto: "imagens/julio.png"
    },

    "60": {
        nome: "Gabriela Ferreira",
        partido: "Partido da Democracia",
        foto: "imagens/gabriela.png"
    },

    "70": {
        nome: "Augusto Costa",
        partido: "Partido do Brasil",
        foto: "imagens/augusto.png"
    },

    "80": {
        nome: "Soraia Martins",
        partido: "Partido Popular",
        foto: "imagens/soraia.png"
    }

};


/* ============================================================
   VARIÁVEIS
============================================================ */

let etapaAtual = "presidente";

let numeroDigitado = "";

let votoPresidente = null;

let votoGovernador = null;

let cameraAtiva = false;


/* ============================================================
   DADOS DO ELEITOR
   Recuperados do cadastro
============================================================ */

const eleitorNome =
    localStorage.getItem("eleitorNome") || "";

const eleitorCpf =
    localStorage.getItem("eleitorCpf") || "";

const eleitorTitulo =
    localStorage.getItem("eleitorTitulo") || "";


/* ============================================================
   DADOS DO ELEITOR
   Recupera os dados cadastrados anteriormente
============================================================ */

const dadosEleitor =
    JSON.parse(
        localStorage.getItem("dadosEleitor")
    ) || {

        nome: "",

        cpf: "",

        titulo: ""

    };


/* ============================================================
   URL DO GOOGLE APPS SCRIPT
============================================================ */

const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbxDDv5WOBl5n6fhQ0GYA4EQRaH2tiwhAGAtGhGbPqlPhbzQcgFYFoHLWId9GSHx0stS/exec";


/* ============================================================
   ELEMENTOS
============================================================ */

const numeroDisplay =
    document.getElementById(
        "numeroDisplay"
    );


const nomeCandidato =
    document.getElementById(
        "nomeCandidato"
    );


const partidoCandidato =
    document.getElementById(
        "partidoCandidato"
    );


const fotoCandidato =
    document.getElementById(
        "fotoCandidato"
    );


const tipoEleicao =
    document.getElementById(
        "tipoEleicao"
    );


const statusTexto =
    document.getElementById(
        "statusTexto"
    );


const mensagemTela =
    document.getElementById(
        "mensagemTela"
    );


/* ============================================================
   SOM DA TECLA
============================================================ */

function somTecla() {

    const audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();


    const oscilador =
        audioContext.createOscillator();


    const ganho =
        audioContext.createGain();


    oscilador.frequency.value = 700;

    oscilador.type = "square";


    ganho.gain.value = 0.08;


    oscilador.connect(
        ganho
    );


    ganho.connect(
        audioContext.destination
    );


    oscilador.start();


    oscilador.stop(
        audioContext.currentTime + 0.08
    );

}


/* ============================================================
   SOM DE CONFIRMAÇÃO
============================================================ */

function somConfirmacao() {

    const audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();


    const frequencias = [
        500,
        700,
        900
    ];


    frequencias.forEach(
        (frequencia, indice) => {

            const oscilador =
                audioContext.createOscillator();


            const ganho =
                audioContext.createGain();


            oscilador.frequency.value =
                frequencia;


            ganho.gain.value = 0.12;


            oscilador.connect(
                ganho
            );


            ganho.connect(
                audioContext.destination
            );


            oscilador.start(
                audioContext.currentTime +
                indice * 0.18
            );


            oscilador.stop(
                audioContext.currentTime +
                indice * 0.18 +
                0.15
            );

        }
    );

}


/* ============================================================
   PRESSIONAR TECLA
============================================================ */

function pressionarTecla(numero) {

    if (
        numeroDigitado.length >= 2
    ) {

        return;

    }


    somTecla();


    numeroDigitado += numero;


    numeroDisplay.textContent =
        numeroDigitado;


    verificarCandidato();

}


/* ============================================================
   VERIFICAR CANDIDATO
============================================================ */

function verificarCandidato() {

    let candidato = null;


    if (
        etapaAtual === "presidente"
    ) {

        candidato =
            candidatosPresidente[
                numeroDigitado
            ];

    }


    if (
        etapaAtual === "governador"
    ) {

        candidato =
            candidatosGovernador[
                numeroDigitado
            ];

    }


    if (candidato) {

        mostrarCandidato(
            candidato
        );

        return;

    }


    if (
        numeroDigitado.length === 2
    ) {

        nomeCandidato.textContent =
            "VOTO NULO";

        partidoCandidato.textContent =
            "Número não corresponde a candidato.";

        fotoCandidato.style.display =
            "none";

        mensagemTela.textContent =
            "Confira o número ou corrija o voto.";

    }

}


/* ============================================================
   MOSTRAR CANDIDATO
============================================================ */

function mostrarCandidato(
    candidato
) {

    nomeCandidato.textContent =
        candidato.nome;


    partidoCandidato.textContent =
        candidato.partido;


    fotoCandidato.src =
        candidato.foto;


    fotoCandidato.style.display =
        "block";


    mensagemTela.textContent =
        "Confira os dados e pressione CONFIRMA.";

}


/* ============================================================
   CORRIGIR
============================================================ */

function corrigirVoto() {

    somTecla();


    numeroDigitado = "";


    numeroDisplay.textContent = "";


    nomeCandidato.textContent =
        "DIGITE O NÚMERO";


    partidoCandidato.textContent =
        "Escolha seu candidato";


    fotoCandidato.style.display =
        "none";


    mensagemTela.textContent =
        "Use o teclado para votar.";

}


/* ============================================================
   CONFIRMAR VOTO
============================================================ */

function confirmarVoto() {

    somTecla();


    if (
        !numeroDigitado
    ) {

        mensagemTela.textContent =
            "Digite um número antes de confirmar.";

        return;

    }


    let candidatoValido = false;


    if (
        etapaAtual === "presidente"
    ) {

        candidatoValido =
            candidatosPresidente[
                numeroDigitado
            ] !== undefined;

    }


    if (
        etapaAtual === "governador"
    ) {

        candidatoValido =
            candidatosGovernador[
                numeroDigitado
            ] !== undefined;

    }


    if (!candidatoValido) {

        mensagemTela.textContent =
            "Número inválido. Corrija o voto.";

        return;

    }


    /* ================================================
       SALVAR VOTO PARA PRESIDENTE
    ================================================= */

    if (
        etapaAtual === "presidente"
    ) {

        votoPresidente =
            numeroDigitado;


        etapaAtual =
            "governador";


        numeroDigitado = "";


        atualizarTelaGovernador();


        return;

    }


    /* ================================================
       SALVAR VOTO PARA GOVERNADOR
    ================================================= */

    if (
        etapaAtual === "governador"
    ) {

        votoGovernador =
            numeroDigitado;


        finalizarVotacao();

    }

}


/* ============================================================
   MUDAR PARA GOVERNADOR
============================================================ */

function atualizarTelaGovernador() {

    tipoEleicao.textContent =
        "GOVERNADOR";


    statusTexto.textContent =
        "VOTO PARA GOVERNADOR";


    numeroDisplay.textContent = "";


    nomeCandidato.textContent =
        "DIGITE O NÚMERO";


    partidoCandidato.textContent =
        "Escolha seu candidato";


    fotoCandidato.style.display =
        "none";


    mensagemTela.textContent =
        "Agora escolha seu candidato para governador.";

}


/* ============================================================
   FINALIZAR VOTAÇÃO
   REGISTRA O VOTO NO GOOGLE PLANILHAS
============================================================ */

function finalizarVotacao() {

    /* ========================================================
       SOM FINAL DA URNA
    ======================================================== */

    somFinalUrna();


    /* ========================================================
       ABRE O MODAL FINAL
    ======================================================== */

    document
        .getElementById("modalFinal")
        .classList.add("ativo");


    mensagemTela.textContent =
        "Votação finalizada.";


    /* ========================================================
       DADOS QUE SERÃO ENVIADOS
    ======================================================== */

    const dadosVoto = {

        tipo: "voto",

        nome:
            dadosEleitor.nome,

        cpf:
            dadosEleitor.cpf,

        titulo:
            dadosEleitor.titulo,

        presidente:
            votoPresidente,

        governador:
            votoGovernador

    };


    /* ========================================================
       ENVIA PARA O GOOGLE APPS SCRIPT
    ======================================================== */

    fetch(
        URL_SCRIPT,
        {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "application/x-www-form-urlencoded"

            },

            body:
                new URLSearchParams(
                    dadosVoto
                ).toString()

        }
    )

    .then(
        () => {

            console.log(
                "Voto enviado para o Google Planilhas."
            );

        }
    )


    .catch(
        (erro) => {

            console.error(
                "Erro ao enviar voto:",
                erro
            );

        }
    );

}


/* ============================================================
   NOVA VOTAÇÃO
============================================================ */

function novaVotacao() {

    location.href =
        "cadastro.html";

}


/* ============================================================
   ABRIR CÂMERA
============================================================ */

async function abrirCamera() {

    const cameraArea =
        document.getElementById(
            "cameraArea"
        );


    cameraArea.classList.add(
        "aberta"
    );


    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    video: true
                });


        const video =
            document.getElementById(
                "videoCamera"
            );


        video.srcObject =
            stream;


        iniciarReconhecimentoDaMao(
            video
        );


    } catch (erro) {

        alert(
            "Não foi possível acessar a câmera. Verifique a permissão do navegador."
        );

    }

}


/* ============================================================
   FECHAR CÂMERA
============================================================ */

function fecharCamera() {

    const video =
        document.getElementById(
            "videoCamera"
        );


    if (
        video.srcObject
    ) {

        video.srcObject
            .getTracks()
            .forEach(
                track =>
                    track.stop()
            );


        video.srcObject = null;

    }


    document
        .getElementById(
            "cameraArea"
        )
        .classList.remove(
            "aberta"
        );

}


/* ============================================================
   MEDIAPIPE HANDS
   CÂMERA FUNCIONANDO COMO MOUSE
============================================================ */

let ultimoClique = 0;

let botaoAtual = null;


/* ============================================================
   INICIAR RECONHECIMENTO DA MÃO
============================================================ */

function iniciarReconhecimentoDaMao(video) {

    const hands = new Hands({

        locateFile: (arquivo) => {

            return (
                "https://cdn.jsdelivr.net/npm/@mediapipe/hands/" +
                arquivo
            );

        }

    });


    hands.setOptions({

        maxNumHands: 1,

        modelComplexity: 1,

        minDetectionConfidence: 0.7,

        minTrackingConfidence: 0.7

    });


    hands.onResults(
        detectarMao
    );


    const camera = new Camera(
        video,
        {

            onFrame: async () => {

                await hands.send({
                    image: video
                });

            },


            width: 640,

            height: 480

        }
    );


    camera.start();

}


/* ============================================================
   DETECTAR MÃO
============================================================ */

function detectarMao(resultados) {

    const ponteiro =
        document.getElementById(
            "ponteiroDedo"
        );


    const video =
        document.getElementById(
            "videoCamera"
        );


    if (
        !resultados.multiHandLandmarks ||
        resultados.multiHandLandmarks.length === 0
    ) {

        ponteiro.style.display =
            "none";


        removerDestaque();


        botaoAtual = null;


        return;

    }


    ponteiro.style.display =
        "block";


    const pontos =
        resultados.multiHandLandmarks[0];


    const indicador =
        pontos[8];


    const x =
        (1 - indicador.x) *
        video.clientWidth;


    const y =
        indicador.y *
        video.clientHeight;


    ponteiro.style.left =
        x + "px";


    ponteiro.style.top =
        y + "px";


    const botao =
        encontrarBotao(
            x,
            y
        );


    destacarBotao(
        botao
    );


    verificarClique(
        pontos,
        botao
    );

}


/* ============================================================
   ENCONTRAR BOTÃO PELO DEDO
   O CURSOR É PROJETADO DIRETAMENTE SOBRE O TECLADO
============================================================ */

function encontrarBotao(x, y) {

    const teclado =
        document.querySelector(
            ".teclado"
        );


    if (!teclado) {

        return null;

    }


    const botoes =
        teclado.querySelectorAll(
            ".tecla"
        );


    const cameraVideo =
        document.querySelector(
            ".camera-video"
        );


    const larguraCamera =
        cameraVideo.clientWidth;


    const alturaCamera =
        cameraVideo.clientHeight;


    const proporcaoX =
        x / larguraCamera;


    const proporcaoY =
        y / alturaCamera;


    const tecladoRect =
        teclado.getBoundingClientRect();


    const telaX =
        tecladoRect.left +
        (
            proporcaoX *
            tecladoRect.width
        );


    const telaY =
        tecladoRect.top +
        (
            proporcaoY *
            tecladoRect.height
        );


    const ponteiro =
        document.getElementById(
            "ponteiroDedo"
        );


    if (ponteiro) {

        ponteiro.style.position =
            "fixed";


        ponteiro.style.left =
            telaX + "px";


        ponteiro.style.top =
            telaY + "px";

    }


    let botaoEncontrado =
        null;


    botoes.forEach(
        botao => {

            const rect =
                botao.getBoundingClientRect();


            if (

                telaX >= rect.left &&

                telaX <= rect.right &&

                telaY >= rect.top &&

                telaY <= rect.bottom

            ) {

                botaoEncontrado =
                    botao;

            }

        }
    );


    return botaoEncontrado;

}


/* ============================================================
   DESTACAR BOTÃO
============================================================ */

function destacarBotao(
    botao
) {

    if (
        botaoAtual !== botao
    ) {

        removerDestaque();

    }


    if (botao) {

        botao.classList.add(
            "cursor-dedo"
        );

    }


    botaoAtual =
        botao;

}


/* ============================================================
   REMOVER DESTAQUE
============================================================ */

function removerDestaque() {

    document
        .querySelectorAll(
            ".cursor-dedo"
        )
        .forEach(
            botao => {

                botao.classList.remove(
                    "cursor-dedo"
                );

            }
        );

}


/* ============================================================
   VERIFICAR CLIQUE COM PINÇA
============================================================ */

function verificarClique(
    pontos,
    botao
) {

    if (!botao) {

        return;

    }


    const polegar =
        pontos[4];


    const indicador =
        pontos[8];


    const distancia =
        Math.sqrt(

            Math.pow(
                indicador.x -
                polegar.x,
                2
            )

            +

            Math.pow(
                indicador.y -
                polegar.y,
                2
            )

        );


    const fezPinca =
        distancia < 0.07;


    if (!fezPinca) {

        return;

    }


    const agora =
        Date.now();


    if (
        agora -
        ultimoClique <
        800
    ) {

        return;

    }


    ultimoClique =
        agora;


    botao.click();

}


/* ============================================================
   FIM DA CÂMERA COMO MOUSE
============================================================ */


/* ============================================================
   SOM FINAL DA URNA
   Usa o arquivo MP3 de confirmação do voto
============================================================ */

function somFinalUrna() {

    const audioConfirmacao =
        new Audio("sons/confirma-urna.mp3");

    audioConfirmacao.currentTime = 0;

    audioConfirmacao.play();

}