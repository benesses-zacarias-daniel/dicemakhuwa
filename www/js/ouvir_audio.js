"use strict"

import caixa_d_alertas, { remover_duplicata } from "./caixa_d_alertas.js";
import carregar_dicionario from "./carregar_dicionario.js";
import criar_indices, { normalizar_texto } from "./mapa_palavras_pesq_trad.js";

// Funções que controlam a gestão do áudio

const tocar_audio = document.querySelector("#tocar_audio");

const ouvir_texto_traduzido_img = document.querySelector(".ouvir_texto_traduzido_img");
const ouvir_texto_p_tr_img = document.querySelector(".ouvir_texto_p_tr_img");
const copiar_texto_p_tr_img = document.querySelector(".copiar_texto_p_tr_img");

const tr_ling_1 = document.querySelector("#tr_ling_1");
const texto_p_traduzir = document.querySelector("#texto_p_traduzir");
const texto_traduzido = document.querySelector("#texto_traduzido");

const tocar_audio_ = (src_audio) => {
    //Função que reproduz o áudio
    tocar_audio.pause();
    tocar_audio.src = src_audio;
    tocar_audio.currentTime = 0;
    tocar_audio.play().catch(() => {
        // caixa_d_alertas("Erro ao reproduzir áudio.", "./img/alerta.svg");
    });

    eventos_tocar_audio();
}

const parar_audio_ = () => {
    //Função que para a reprodução do áudio
    tocar_audio.pause();
}


const verificar_tocar_audio_pl = (tipo_v) => {
    //Função que verifica se é para tocar o áudio na área de tradução
    if (tr_ling_1.innerHTML === "Emakhuwa") {
        if (texto_p_traduzir.value !== "") {
            if (tipo_v === 1) {
                return true;
            }
        }
    } else {
        if (texto_traduzido.value !== "") {
            if (tipo_v === 2) {
                return true;
            }
        }
    }
}

const tocar_audio_tr_sequencia = (audio_array) => {
    //Função que toca a sequência de áudios
    if (!audio_array || audio_array.length === 0) {
        remover_duplicata();
        caixa_d_alertas("Áudio não encontrado.", "./img/ouvir_desabilitado_p.svg");
        return;
    }
    remover_duplicata();
    caixa_d_alertas("Tocando Àudio", "./img/ouvir_p.svg");

    let cont_audio = 0;

    const tocar_proximo = () => {
        //Função que toca o próximo áudio
        if (cont_audio >= audio_array.length) {
            remover_duplicata();
            caixa_d_alertas("Reprodução terminada.", "./img/ouvir_desabilitado_p.svg");
            ajustar_icones_audio();
            // ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_p.svg");
            return;
        }

        tocar_audio.src = audio_array[cont_audio];
        tocar_audio.play().catch(() => { });
        tocar_audio.onended = () => {
            cont_audio++;
            tocar_proximo();
        };

    }

    ajustar_icones_audio();
    tocar_proximo();
}

const ouvir_sem_traduzir = async () => {
    //Função para ouvir o áudio sem traduzir
    const texto_p_traduzir = document.querySelector("#texto_p_traduzir");

    // const dicionario_ = JSON.parse(localStorage.getItem("dicionario_")) || [];
    const dicionario_ = await carregar_dicionario() || [];
    const palavras_p_traducao = normalizar_texto(texto_p_traduzir.value).split(/\s+/);//.split(" ")
    const { mapa_ema } = criar_indices(dicionario_);
    let resultado = [], audios = [];

    palavras_p_traducao.forEach(palavra_trad => {
        const resposta = mapa_ema[palavra_trad]
        if (resposta?.audio) {
            audios.push(resposta.audio);
        }
    });

    texto_p_traduzir.dataset.audios_sd = JSON.stringify(audios);

    const audios_ = JSON.parse(texto_p_traduzir.dataset.audios_sd || "[]");
    tocar_audio_tr_sequencia(audios_);
}

const ajustar_icones_audio = () => {
    const img_ou = document.querySelector(".img_ou");

    if (img_ou) {
        if (img_ou.getAttribute("src") !== "./img/ouvir_p.svg") {
            img_ou.setAttribute("src", "./img/ouvir_p.svg")
        }
    }

    icones_trad();
}

const icones_trad = () => {
    if (tr_ling_1.innerHTML === "Emakhuwa") {
        if (ouvir_texto_p_tr_img.getAttribute("src") === "./img/ouvir_p.svg") {
            ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
            ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
        } else {
            ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_p.svg");
        }
    }

    if (tr_ling_1.innerHTML === "Português") {
        if (ouvir_texto_traduzido_img.getAttribute("src") === "./img/ouvir_p.svg") {
            ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
            ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
        } else {
            ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_p.svg");
        }
    }
}

const eventos_tocar_audio = () => {
    tocar_audio.addEventListener("ended", (evt) => {
        ajustar_icones_audio();
        remover_duplicata();
        caixa_d_alertas("Reprodução terminada.", "./img/ouvir_desabilitado_p.svg");
    });

    tocar_audio.addEventListener("error", (evt) => {
        ajustar_icones_audio();
        remover_duplicata();
        caixa_d_alertas("Áudio não encontrado.", "./img/ouvir_desabilitado_p.svg");
    });
}
//Exportação das funções
export { parar_audio_, verificar_tocar_audio_pl, tocar_audio_tr_sequencia, ouvir_sem_traduzir, icones_trad };
export default tocar_audio_; 