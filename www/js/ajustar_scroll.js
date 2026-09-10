"use strict"
/*Função responsável por controlar o scrol (Fazer com que sepre vá para cima)*/

const armazem_favoritas = document.querySelector(".armazem_favoritas");
const scrol = document.querySelector(".scrol");
const nome = document.querySelector(".nome");

const ir_topo = (tipo) => {
    if (tipo == 1) {
        scrol.scrollTop = 0
        nome.classList.remove("ocultar_nome");
    } else {
        armazem_favoritas.scrollTop = 0
    };
}

/* Exportação da Função */
export default ir_topo;