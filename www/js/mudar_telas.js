"use strict"

import caixa_d_alertas from "./caixa_d_alertas.js";
import { ocultar_pesq_btn } from "./ocultar_configuracoes.js";
import { resetar_bloco_fav } from "./remover_e_adionar_aos_favoritos.js";

//Função responsável por mudar a área da tela
const nome = document.querySelector(".nome");
let tela_act = "home_dicionario";

const mudar_de_tela = (tela, inner_tela) => {
    const todas_tela = [...document.querySelectorAll(".tela")];

    todas_tela.forEach(tel => {
        tel.classList.remove("activa");
    })

    nome.innerHTML = inner_tela;
    nome.classList.remove("ocultar_nome");

    tela_act = tela;

    const tela_mostrar = document.querySelector(`#${tela}`);
    tela_mostrar.classList.add("activa");

    if (tela !== "home_dicionario") {
        history.pushState({ tela: tela }, "", `#${tela}`);
    }

    if (tela !== "favoritas_") {
        resetar_bloco_fav();
        ocultar_pesq_btn(2);
    }
}

const simular_mudancao_de_tela = (tela = "tradutor") => {
    history.pushState({ tela: tela }, "", `#${tela}`);
    tela_act = "tradutor";
}

window.addEventListener('popstate', (evt) => {
    sair_voltar();
});

const sair_voltar = () => {
    const palavra_conceitos = document.querySelector(".palavra_conceitos");

    if (palavra_conceitos) {
        palavra_conceitos.remove();
        return;
    }

    if (tela_act !== "home_dicionario") {
        mudar_de_tela("home_dicionario", "DicEmakhuwa");
        history.pushState({ tela: 'home_dicionario' }, '', '#home_dicionario');
        tela_act = "home_dicionario";
    } else {
        if (tela_act === "home_dicionario") {
            // Primeiro voltar: impede sair e avisa
            history.pushState({ tela: 'tradutor' }, '', '#tradutor'); // Recoloca no histórico
            caixa_d_alertas("Pressione voltar novamente para sair", "./img/alerta.svg");
            ocultar_pesq_btn(2);
        } else {
            caixa_d_alertas("Pressione voltar novamente para sair", "./img/alerta.svg");
            const palavra_conceitos = document.querySelector(".palavra_conceitos");

            if (palavra_conceitos) {
                palavra_conceitos.remove();
                return;
            }
        }
    }
}
//Exportação da função
export { simular_mudancao_de_tela };
export default mudar_de_tela;