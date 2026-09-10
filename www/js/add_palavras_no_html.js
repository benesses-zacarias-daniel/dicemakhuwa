"use strict"
import caixa_d_alertas from "./caixa_d_alertas.js";
import { simular_mudancao_de_tela } from "./mudar_telas.js";
//Função responsável por adicionar e fazer todo o gerenciamento das palavras da área dicionário e favoritas
import mostrar_exp from "./palavras.js";

const scrol = document.querySelector("#scrol");

/* Funções criadora de elementos*/
const criar_divs = (id, cl) => {
    const div = document.createElement("div")
    div.className = cl
    div.id = id
    return div
}

const criar_p = (cl, texto) => {
    const p = document.createElement("p")
    p.className = cl
    p.textContent = texto
    return p
}

const criar_img = (cl, src) => {
    const img = document.createElement("img")
    img.className = cl
    img.src = src
    return img
}

/*Controle da lista*/
let dicionario_cache = [];
let inicio = 0;
const bloco = 38;

/*Função que controla a exibição de palavras*/
const carregar_bloco = () => {

    if (inicio >= dicionario_cache.length) {
        return;
    }

    const modo_d_exibicao = localStorage.getItem("modo_de_exibicao");

    const frag = document.createDocumentFragment();
    const limite = Math.min(inicio + bloco, dicionario_cache.length);
    /*Trecho que cria as palavras */
    for (let cont = inicio; cont < limite; cont++) {
        const palavra = dicionario_cache[cont];
        const id = palavra.id;
        const pl_pt = palavra.portugues;
        const pl_ema = palavra.emakhuwa;
        const significados = palavra.significados;
        const pesquisa_ema = palavra.pesquisa_ema;
        const audio = palavra.audio;
        const div_ = criar_divs(id, "palavra");
        const p_pt = criar_p("palavra_pt font_elmentos", pl_pt);
        const img_ = criar_img("img_seta", "./img/setaEsquerdaDireitaD.svg");
        const p_ema = criar_p("palavra_ema font_elmentos", pl_ema);
        //Verificação da exibição das palavras, seta
        if (modo_d_exibicao == "pt_p_ema") {
            p_pt.classList.remove("ocultar_");
            p_pt.classList.add("ajustar_texto");
            p_ema.classList.add("ocultar_");
            p_ema.classList.remove("ajustar_texto");
            img_.classList.add("ocultar_");
        } else if (modo_d_exibicao == "ema_p_pt") {
            p_pt.classList.add("ocultar_");
            p_pt.classList.remove("ajustar_texto");
            p_ema.classList.remove("ocultar_");
            p_ema.classList.add("ajustar_texto");
            img_.classList.add("ocultar_");
        } else {
            p_pt.classList.remove("ocultar_");
            p_pt.classList.remove("ajustar_texto");
            p_ema.classList.remove("ocultar_");
            p_ema.classList.remove("ajustar_texto");
            img_.classList.remove("ocultar_");
        }

        div_.appendChild(p_pt);
        div_.appendChild(img_);
        div_.appendChild(p_ema);
        //Data set para guardar as palavras da propriedade pesquisa
        // div_.dataset.pesquisa = JSON.stringify(palavra.pesquisa)

        div_.addEventListener("click", () => {
            mostrar_exp(pl_pt, [...significados], pl_ema, [...pesquisa_ema], audio, id);

            simular_mudancao_de_tela("tradutor");
        })
        // aplicar_modo_bloco(div_, modo_d_exibicao);
        frag.appendChild(div_);
    }

    requestAnimationFrame(() => {
        scrol.appendChild(frag);
        inicio = limite;
    });

}

/*Varifica o scrol para controlar se deve adicionar outras palavras*/
const verificar_scroll = () => {
    const posicao = scrol.scrollTop + scrol.clientHeight
    const altura = scrol.scrollHeight

    if (posicao >= altura - 50) {
        carregar_bloco()
    }
}
//Aplica o modo de exibição para ocultar palavras ou mostrar dependendo do modo
const aplicar_modo_bloco = (div_, modo) => {
    const pl_pt = div_.querySelector(".palavra_pt")
    const pl_ema = div_.querySelector(".palavra_ema")
    const img_seta = div_.querySelector(".img_seta")

    if (modo === "pt_p_ema") {
        pl_pt.classList.remove("ocultar_")
        pl_ema.classList.add("ocultar_")
        img_seta.classList.add("ocultar_")
    } else if (modo === "ema_p_pt") {
        pl_pt.classList.add("ocultar_")
        pl_ema.classList.remove("ocultar_")
        img_seta.classList.add("ocultar_")
    } else { // ambos
        pl_pt.classList.remove("ocultar_")
        pl_ema.classList.remove("ocultar_")
        img_seta.classList.remove("ocultar_")
    }
}
//Função par ordenar as palavras
const ordenar_dicionario = (modo) => {
    if (modo === "ema_p_pt") {
        // ordena pelo Emakhuwa
        dicionario_cache.sort((a, b) => a.emakhuwa.localeCompare(b.emakhuwa, 'pt', { sensitivity: 'base' }))
    } else {
        // ordena pelo Português
        dicionario_cache.sort((a, b) => a.portugues.localeCompare(b.portugues, 'pt', { sensitivity: 'base' }))
    }
}
/*Função para resetar a exibição de palavras no dicionário ou na favorita*/
const resetar_bloco = () => {
    scrol.innerHTML = ""   // limpa tudo
    inicio = 0             // reseta contador
    scrol.scrollTop = 0    // volta para o topo
    carregar_bloco();
    console.log("Chamou");
    // carrega primeiro bloco
}

/*adiciona as palavras no dom*/
const adicionar_palavras_ = (dados) => {
    // const dados = JSON.parse(localStorage.getItem("dicionario_"))
    if (!dados) {
        console.log(dados);
        console.log("Dicionário não carregado");
        caixa_d_alertas("Dicionário não carregado. Tente fechar e abrir novamente!", "./img/alerta.svg")
        return;

    }
    // const modo_d_exibicao = localStorage.getItem("modo_de_exibicao");
    dicionario_cache = dados;
    // ordenar_dicionario(modo_d_exibicao)
    resetar_bloco() // garante que apenas o primeiro bloco seja carregado
    scrol.removeEventListener("scroll", (evt) => {
        verificar_scroll()
    });
    scrol.addEventListener("scroll", (evt) => {
        verificar_scroll();
    });
}

/*Exportação das funções*/
export { resetar_bloco };
export default adicionar_palavras_;