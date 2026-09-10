"use strict"

import carregar_dicionario from "./carregar_dicionario.js";//Função responsável por carregar o dicionário (Tudo referente as palavras)
import adicionar_palavras_ from "./add_palavras_no_html.js";//Função responsável por adicionara as palavras na área do dicionário
import { aplicar_preferencias, sombras_ } from "./personalizacoes.js";

let iniciado = false;

const iniciar_app = async () => {
    try {

        if (iniciado) return;
        iniciado = true;

        console.log("_App Iniciado__");

        const palavras = await carregar_dicionario();

        requestAnimationFrame(() => {
            adicionar_palavras_(palavras);

            requestAnimationFrame(() => {
                aplicar_preferencias(1, 1, 1);
                sombras_();
            })
        });

        history.pushState({ tela: "home_dicionario" }, "", "#home_dicionario");
        history.pushState({ tela: "home_dicionario" }, "", "#home_dicionario");

    } catch (erro) {
        console.error("Erro ao iniciar:", erro);
    }
}

export default iniciar_app;