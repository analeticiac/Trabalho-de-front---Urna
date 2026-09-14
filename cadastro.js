/* ============================================================
   CADASTRO DO ELEITOR
   cadastro.js

   JavaScript separado do HTML.
   Nenhuma funcionalidade do cadastro foi retirada.
============================================================ */


/* ============================================================
   INICIA VLibras
============================================================ */

new window.VLibras.Widget(
    "https://vlibras.gov.br/app"
);


/* ============================================================
   URL DO GOOGLE APPS SCRIPT
============================================================ */

const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbxDDv5WOBl5n6fhQ0GYA4EQRaH2tiwhAGAtGhGbPqlPhbzQcgFYFoHLWId9GSHx0stS/exec";


/* ============================================================
   ELEMENTOS
============================================================ */

const formulario =
    document.getElementById(
        "formCadastro"
    );


const nome =
    document.getElementById(
        "nome"
    );


const cpf =
    document.getElementById(
        "cpf"
    );


const titulo =
    document.getElementById(
        "titulo"
    );


const botao =
    document.getElementById(
        "botaoConfirmar"
    );


const mensagem =
    document.getElementById(
        "mensagem"
    );


/* ============================================================
   DESTINO DO FORMULÁRIO
============================================================ */

formulario.action =
    URL_SCRIPT;


/* ============================================================
   NOME
============================================================ */

nome.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /[^A-Za-zÀ-ÿ\s]/g,
                ""
            );

    }
);


/* ============================================================
   CPF
============================================================ */

cpf.addEventListener(
    "input",
    function () {

        this.value =
            this.value
                .replace(/\D/g, "")
                .slice(0, 11);

    }
);


/* ============================================================
   TÍTULO
============================================================ */

titulo.addEventListener(
    "input",
    function () {

        this.value =
            this.value
                .replace(/\D/g, "")
                .slice(0, 12);

    }
);


/* ============================================================
   ENVIO
============================================================ */

formulario.addEventListener(
    "submit",
    function (evento) {

        const nomeValor =
            nome.value.trim();


        /* ====================================================
           VALIDA NOME
        ==================================================== */

        if (
            !/^[A-Za-zÀ-ÿ\s]+$/.test(
                nomeValor
            )
        ) {

            evento.preventDefault();

            mostrarMensagem(
                "Digite o nome usando apenas letras.",
                "erro"
            );

            return;

        }


        /* ====================================================
           VALIDA CPF
        ==================================================== */

        if (
            !/^\d{11}$/.test(
                cpf.value
            )
        ) {

            evento.preventDefault();

            mostrarMensagem(
                "O CPF deve possuir exatamente 11 números.",
                "erro"
            );

            return;

        }


        /* ====================================================
           VALIDA TÍTULO
        ==================================================== */

        if (
            !/^\d{12}$/.test(
                titulo.value
            )
        ) {

            evento.preventDefault();

            mostrarMensagem(
                "O título deve possuir exatamente 12 números.",
                "erro"
            );

            return;

        }


        /* ====================================================
           MOSTRA ENVIANDO
        ==================================================== */

        botao.disabled =
            true;


        botao.textContent =
            "ENVIANDO...";


        mostrarMensagem(
            "Enviando cadastro...",
            "sucesso"
        );

    }
);


/* ============================================================
   IFRAME
============================================================ */

const iframe =
    document.getElementById(
        "iframeEnvio"
    );


iframe.addEventListener(
    "load",
    function () {

        if (
            botao.disabled === true
        ) {

            setTimeout(
                function () {


                    /* ========================================
                       MENSAGEM DE SUCESSO
                    ======================================== */

                    mostrarMensagem(
                        "Cadastro realizado com sucesso!",
                        "sucesso"
                    );


                    /* ========================================
                       SALVA OS DADOS DO ELEITOR
                    ======================================== */

                    localStorage.setItem(
                        "dadosEleitor",
                        JSON.stringify({

                            nome:
                                nome.value.trim(),

                            cpf:
                                cpf.value.trim(),

                            titulo:
                                titulo.value.trim()

                        })
                    );


                    /* ========================================
                       MANTÉM OS DADOS INDIVIDUAIS
                    ======================================== */

                    localStorage.setItem(
                        "eleitorNome",
                        nome.value.trim()
                    );


                    localStorage.setItem(
                        "eleitorCpf",
                        cpf.value.trim()
                    );


                    localStorage.setItem(
                        "eleitorTitulo",
                        titulo.value.trim()
                    );


                    /* ========================================
                       LIMPA O FORMULÁRIO
                    ======================================== */

                    formulario.reset();


                    /* ========================================
                       REATIVA O BOTÃO
                    ======================================== */

                    botao.disabled =
                        false;


                    botao.textContent =
                        "CONFIRMAR";


                    /* ========================================
                       ABRE A URNA
                    ======================================== */

                    setTimeout(
                        function () {

                            window.location.href =
                                "urna.html";

                        },
                        1500
                    );


                },
                1000
            );

        }

    }
);


/* ============================================================
   MENSAGEM
============================================================ */

function mostrarMensagem(
    texto,
    tipo
) {

    mensagem.textContent =
        texto;


    mensagem.className =
        tipo;

}


/* ============================================================
   TAMANHO DA FONTE
============================================================ */

let tamanhoFonte =
    100;


function aumentarFonte() {

    if (
        tamanhoFonte < 150
    ) {

        tamanhoFonte += 10;


        document.documentElement.style.fontSize =
            tamanhoFonte + "%";

    }

}


function diminuirFonte() {

    if (
        tamanhoFonte > 80
    ) {

        tamanhoFonte -= 10;


        document.documentElement.style.fontSize =
            tamanhoFonte + "%";

    }

}


/* ============================================================
   CONTRASTE
============================================================ */

function alternarContraste() {

    document.body.classList.toggle(
        "alto-contraste"
    );

}


/* ============================================================
   RESTAURAR ACESSIBILIDADE
============================================================ */

function normalizarAcessibilidade() {

    tamanhoFonte =
        100;


    document.documentElement.style.fontSize =
        "100%";


    document.body.classList.remove(
        "alto-contraste"
    );

}


/* ============================================================
   INTERAÇÃO POR DEDO
============================================================ */

let cameraCadastro =
    null;


let ultimoCliqueDedo =
    0;


let botaoAtualDedo =
    null;


let cameraCadastroAtiva =
    false;


/* ============================================================
   ABRIR CÂMERA
============================================================ */

async function abrirCameraCadastro() {

    if (
        cameraCadastroAtiva
    ) {

        return;

    }


    const cameraArea =
        document.getElementById(
            "cameraArea"
        );


    const video =
        document.getElementById(
            "videoCamera"
        );


    const status =
        document.getElementById(
            "statusCamera"
        );


    cameraArea.classList.add(
        "aberta"
    );


    status.textContent =
        "Iniciando câmera...";


    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({

                    video: {

                        width: 640,

                        height: 480

                    }

                });


        video.srcObject =
            stream;


        cameraCadastroAtiva =
            true;


        status.textContent =
            "Aponte o dedo para um campo e junte indicador + polegar para clicar.";


        iniciarReconhecimentoCadastro(
            video
        );


    } catch (erro) {

        cameraArea.classList.remove(
            "aberta"
        );


        alert(
            "Não foi possível acessar a câmera. Verifique a permissão do navegador."
        );

    }

}


/* ============================================================
   FECHAR CÂMERA
============================================================ */

function fecharCameraCadastro() {

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


        video.srcObject =
            null;

    }


    cameraCadastroAtiva =
        false;


    const ponteiro =
        document.getElementById(
            "ponteiroDedo"
        );


    ponteiro.style.display =
        "none";


    removerDestaqueCadastro();


    botaoAtualDedo =
        null;


    document
        .getElementById(
            "cameraArea"
        )
        .classList.remove(
            "aberta"
        );

}


/* ============================================================
   INICIAR MEDIAPIPE
============================================================ */

function iniciarReconhecimentoCadastro(
    video
) {

    const hands =
        new Hands({

            locateFile:
                (arquivo) => {

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
        detectarMaoCadastro
    );


    cameraCadastro =
        new Camera(
            video,
            {

                onFrame:
                    async () => {

                        if (
                            cameraCadastroAtiva
                        ) {

                            await hands.send({

                                image:
                                    video

                            });

                        }

                    },

                width: 640,

                height: 480

            }
        );


    cameraCadastro.start();

}


/* ============================================================
   DETECTAR MÃO
============================================================ */

function detectarMaoCadastro(
    resultados
) {

    const ponteiro =
        document.getElementById(
            "ponteiroDedo"
        );


    if (
        !resultados.multiHandLandmarks ||
        resultados.multiHandLandmarks.length === 0
    ) {

        ponteiro.style.display =
            "none";


        removerDestaqueCadastro();


        botaoAtualDedo =
            null;


        return;

    }


    ponteiro.style.display =
        "block";


    const pontos =
        resultados.multiHandLandmarks[0];


    const indicador =
        pontos[8];


    /* ========================================================
       CONVERTE A POSIÇÃO DO DEDO PARA A TELA

       O vídeo está espelhado.
    ======================================================== */

    const telaX =
        (1 - indicador.x) *
        window.innerWidth;


    const telaY =
        indicador.y *
        window.innerHeight;


    /* ========================================================
       POSICIONA O CURSOR VIRTUAL
    ======================================================== */

    ponteiro.style.left =
        telaX + "px";


    ponteiro.style.top =
        telaY + "px";


    /* ========================================================
       ENCONTRA O ELEMENTO APONTADO
    ======================================================== */

    const elemento =
        encontrarElementoCadastro(
            telaX,
            telaY
        );


    destacarElementoCadastro(
        elemento
    );


    /* ========================================================
       VERIFICA PINÇA
    ======================================================== */

    verificarCliqueCadastro(
        pontos,
        elemento
    );

}


/* ============================================================
   ENCONTRAR ELEMENTO PELO DEDO

   CORREÇÃO:
   Agora a câmera também reconhece os botões que estão
   dentro do novo menu .controles-cadastro.
============================================================ */

function encontrarElementoCadastro(
    x,
    y
) {

    const elementos =
        document.querySelectorAll(

            "input, " +

            "#botaoConfirmar, " +

            "#botaoCamera, " +

            ".controles-cadastro button, " +

            ".acessibilidade button, " +

            "#fecharCamera, " +

            "[vw-access-button]"

        );


    let elementoEncontrado =
        null;


    elementos.forEach(
        elemento => {

            /* =================================================
               NÃO PERMITE ELEMENTOS DESABILITADOS
            ================================================= */

            if (
                elemento.disabled
            ) {

                return;

            }


            /* =================================================
               NÃO CONSIDERA ELEMENTOS INVISÍVEIS
            ================================================= */

            const estilo =
                window.getComputedStyle(
                    elemento
                );


            if (
                estilo.display === "none" ||
                estilo.visibility === "hidden"
            ) {

                return;

            }


            const rect =
                elemento.getBoundingClientRect();


            if (

                x >= rect.left &&

                x <= rect.right &&

                y >= rect.top &&

                y <= rect.bottom

            ) {

                elementoEncontrado =
                    elemento;

            }

        }
    );


    return elementoEncontrado;

}


/* ============================================================
   DESTACAR ELEMENTO
============================================================ */

function destacarElementoCadastro(
    elemento
) {

    if (
        botaoAtualDedo !== elemento
    ) {

        removerDestaqueCadastro();

    }


    if (
        elemento
    ) {

        elemento.classList.add(
            "cursor-dedo"
        );

    }


    botaoAtualDedo =
        elemento;

}


/* ============================================================
   REMOVER DESTAQUE
============================================================ */

function removerDestaqueCadastro() {

    document
        .querySelectorAll(
            ".cursor-dedo"
        )
        .forEach(
            elemento => {

                elemento.classList.remove(
                    "cursor-dedo"
                );

            }
        );

}


/* ============================================================
   VERIFICAR CLIQUE COM PINÇA
============================================================ */

function verificarCliqueCadastro(
    pontos,
    elemento
) {

    if (
        !elemento
    ) {

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


    /* ========================================================
       INDICADOR + POLEGAR JUNTOS = CLIQUE
    ======================================================== */

    const fezPinca =
        distancia < 0.07;


    if (
        !fezPinca
    ) {

        return;

    }


    const agora =
        Date.now();


    /* ========================================================
       EVITA CLIQUES REPETIDOS
    ======================================================== */

    if (
        agora -
        ultimoCliqueDedo <
        900
    ) {

        return;

    }


    ultimoCliqueDedo =
        agora;


    /* ========================================================
       SE FOR INPUT:
       COLOCA O FOCO
    ======================================================== */

    if (
        elemento.tagName ===
        "INPUT"
    ) {

        elemento.focus();

        return;

    }


    /* ========================================================
       PARA BOTÕES:
       EXECUTA O CLIQUE
    ======================================================== */

    elemento.click();

}


/* ============================================================
   FIM DO JAVASCRIPT
============================================================ */