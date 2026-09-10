"use strict"
//Função responsavel por traduzir os textos da área do tradutor & caixa de alertas
import mudar_icons from "./alterar_icons.js";
import caixa_d_alertas from "./caixa_d_alertas.js";
import carregar_dicionario from "./carregar_dicionario.js";
import criar_indices, { normalizar_texto } from "./mapa_palavras_pesq_trad.js";

const texto_traduzido = document.querySelector("#texto_traduzido");
let ultima_trad = "";

const traduzir_texto = async () => {

    const texto_p_traduzir = document.querySelector("#texto_p_traduzir");
    const ouvir_texto_traduzido_img = document.querySelector(".ouvir_texto_traduzido_img");
    const tr_ling_1 = document.querySelector("#tr_ling_1");

    // const dicionario_ = JSON.parse(localStorage.getItem("dicionario_")) || [];
    const dicionario_ = await carregar_dicionario();
    const { mapa_pt, mapa_ema } = criar_indices(dicionario_)
    const palavras_p_traducao = texto_p_traduzir.value;

    let resultado = [], audios = [];
    let enccontrado = false;

    const palavras = palavras_p_traducao.trim().split(/\s+/).map(normalizar_texto);


    palavras.forEach(palavra => {
        const palavra_normalizada = normalizar_texto(palavra)
        let pal = null;

        if (tr_ling_1.innerHTML === "Português") {
            pal = mapa_pt[palavra_normalizada];
            if (pal) {
                console.log("Encontrou Pt");

                resultado.push(pal.pesquisa_ema[0].texto);
                audios.push(pal.audio);
            } else {
                console.log("Entrou sem PT");
                caixa_d_alertas(`Verifique a sequência de tradução.`, "./img/alerta.svg");
                return;
            }
        } else {
            pal = mapa_ema[palavra_normalizada];
            if (pal) {
                console.log("Encontrou Ema");

                resultado.push(pal.pesquisa_pt[0].texto);
                audios.push(pal.audio);
            } else {
                console.log("Encontrou Sem Ema");
                caixa_d_alertas(`Verifique a sequência de tradução.`, "./img/alerta.svg");
                return;
            }
        }
    });


    console.log(resultado.length);

    if (resultado.length === 0) return;
    console.log(resultado);

    const todos_result = resultado.join(" ");
    const novo_resultado = todos_result.replace(/\s+/g, " ").trim();

    // mudar_icons(2);

    if (novo_resultado !== ultima_trad) {
        ultima_trad = novo_resultado;

        texto_traduzido.value = novo_resultado;
        texto_traduzido.dataset.audios = JSON.stringify(audios);

        requestAnimationFrame(() => {
            setTimeout(() => {
                texto_traduzido.scrollTop = texto_traduzido.scrollHeight
            }, 0)
        });
        mudar_icons(2);
        caixa_d_alertas("Nova tradução.", "./img/alerta.svg");
    }


}

//Exportação da função
export default traduzir_texto;