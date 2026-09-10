"use strict"
//Função responsável por mudar a lingua (na área favorita & tradutor)
//Importação de funções
import mudar_icons from "./alterar_icons.js";

const tr_ling_1 = document.querySelector("#tr_ling_1");
const tr_ling_2 = document.querySelector("#tr_ling_2");
const favor_ling_1 = document.querySelector("#favor_ling_1");
const favor_ling_2 = document.querySelector("#favor_ling_2");

let pls1 = [];
let pls2 = [];

const mudar_lingua = (tipo) => {
    const p1 = [...document.querySelectorAll(".p1")]
    const p2 = [...document.querySelectorAll(".p2")]
    if (tipo == 1) {
        //Muda a lingua na área favorita
        if (favor_ling_1.innerHTML === "Português" && favor_ling_2.innerHTML === "Emakhuwa") {
            favor_ling_1.innerHTML = "Emakhuwa";
            favor_ling_2.innerHTML = "Português";
        } else {
            favor_ling_1.innerHTML = "Português";
            favor_ling_2.innerHTML = "Emakhuwa";
        }

        p1?.map((pl, p) => {
            pls1[p] = pl.innerHTML;
        })
        p2?.map((pl, p) => {
            pls2[p] = pl.innerHTML;
        })

        console.log(pls1);
        console.log("Palavras da Direita");

        console.log(pls2);


        p1?.map((el, pos) => {
            el.innerHTML = pls2[pos];
        })
        p2?.map((el, pos) => {
            el.innerHTML = pls1[pos];
        })
    } else {
        //Muda a sequência de tradução
        const texto_p_traduzir = document.querySelector("#texto_p_traduzir");
        const texto_traduzido = document.querySelector("#texto_traduzido");
        if (tr_ling_1.innerHTML === "Português" && tr_ling_2.innerHTML === "Emakhuwa") {
            tr_ling_1.innerHTML = "Emakhuwa";
            tr_ling_2.innerHTML = "Português";
        } else {
            tr_ling_1.innerHTML = "Português";
            tr_ling_2.innerHTML = "Emakhuwa";
        }

        texto_traduzido.value = ""
        texto_p_traduzir.value = "";
        texto_p_traduzir.focus();
        mudar_icons(2);
    }
}

//Exportação da função
export default mudar_lingua;