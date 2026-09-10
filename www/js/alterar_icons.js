"use strict"
/*Função responsável por controlar os incons da configuração & tradutor*/
/*Configurações*/
const area_config = document.querySelector(".area_config");
const img_ocultar_menu = document.querySelector(".img_ocultar_menu");
/*Elementos da Área do Tradutor*/
const tr_ling_1 = document.querySelector("#tr_ling_1");
const texto_p_traduzir = document.querySelector("#texto_p_traduzir");
const ouvir_texto_p_tr_img = document.querySelector(".ouvir_texto_p_tr_img");
const copiar_texto_p_tr_img = document.querySelector(".copiar_texto_p_tr_img");
const ouvir_texto_traduzido_img = document.querySelector(".ouvir_texto_traduzido_img");
const copiar_traducao_img = document.querySelector(".copiar_traducao_img");
const texto_traduzido = document.querySelector(".texto_traduzido");

const mudar_icons = (tipo_mudanca) => {
    if (tipo_mudanca === 1) {
        //Altera o Icone de Configurações
        if (area_config.classList.contains("mostrar_configs")) {
            img_ocultar_menu.setAttribute("src", "./img/fechar_menu_p.svg");
        } else {
            img_ocultar_menu.setAttribute("src", "./img/abrir_menu_p.svg");
        }
    } else if (tipo_mudanca === 2) {
        //Altera o Icone da área de Tradução
        if ((tr_ling_1.innerHTML === "Português" || tr_ling_1.innerHTML === "Emakhuwa") && texto_p_traduzir.value === "") {
            ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
            copiar_texto_p_tr_img.setAttribute("src", "./img/n_copy_p.svg");
            ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
            copiar_traducao_img.setAttribute("src", "./img/n_copy_p.svg");
        } else {
            if ((tr_ling_1.innerHTML === "Português") && texto_p_traduzir.value !== "" && texto_traduzido.value === "") {
                ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
                copiar_texto_p_tr_img.setAttribute("src", "./img/copy_p.svg");
                ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
                copiar_traducao_img.setAttribute("src", "./img/n_copy_p.svg");
            } else if ((tr_ling_1.innerHTML === "Português") && texto_p_traduzir.value !== "" && texto_traduzido.value !== "") {
                copiar_texto_p_tr_img.setAttribute("src", "./img/copy_p.svg");
                ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_p.svg");
                copiar_traducao_img.setAttribute("src", "./img/copy_p.svg");
            } else if ((tr_ling_1.innerHTML === "Emakhuwa") && texto_p_traduzir.value != "" && texto_traduzido.value === "") {
                ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_p.svg");
                copiar_texto_p_tr_img.setAttribute("src", "./img/copy_p.svg");
                ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
                copiar_traducao_img.setAttribute("src", "./img/n_copy_p.svg");
            } else if ((tr_ling_1.innerHTML === "Emakhuwa") && texto_p_traduzir.value !== "" && texto_traduzido.value !== "") {
                ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_p.svg");
                copiar_texto_p_tr_img.setAttribute("src", "./img/copy_p.svg");
                ouvir_texto_traduzido_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
                copiar_traducao_img.setAttribute("src", "./img/copy_p.svg");
            }
        }
    }
}

/*Exportação da função*/
export default mudar_icons;