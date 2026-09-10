"use strict"
import caixa_d_alertas from "./caixa_d_alertas.js";
//Função responsável por adicionar, remover algo da lista das favoritas & mostrar a lista das favoritas
import tocar_audio_, { parar_audio_ } from "./ouvir_audio.js";
//Função que remove a palavra da lista dos favoritas 
const armazem_favoritas = document.querySelector(".armazem_favoritas");

const criar_lista_d_favoritas = () => {
    if (!localStorage.getItem("favorita_")) {
        localStorage.setItem("favorita_", "[]");
    }
}

const remover_dos_favoritos = (id) => {

    criar_lista_d_favoritas();
    const favoritas_ = JSON.parse(localStorage.getItem("favorita_")) || [];

    const novo_favoritas_ = favoritas_.filter((palavra) => palavra.id != id)
    const fav_ = JSON.stringify(novo_favoritas_);

    localStorage.setItem("favorita_", fav_);
    parar_audio_();
}
//Função para adicionar uma palavra a lista dos favoritos
const adicionar_aos_favoritos = (pt, ema, id, src_audio) => {
    console.log("Sim entrou");

    criar_lista_d_favoritas();
    const array_fav = JSON.parse(localStorage.getItem("favorita_")) || [];

    const nova_fav = {
        id: id,
        src_audio: src_audio,
        palavra_favorita_pt: pt,
        palavra_favorita_ema: ema
    };

    if (nova_fav.id != undefined && nova_fav.src_audio != undefined && nova_fav.palavra_favorita_pt != undefined && nova_fav.palavra_favorita_ema != undefined) {
        array_fav.push(nova_fav);

        console.log(nova_fav);
        const novo_obj = JSON.stringify(array_fav);

        localStorage.setItem("favorita_", novo_obj);
    }

    parar_audio_();
}
/*Controle da lista*/
let dicionario_cache_fav_bloco = [];
let inicio = 0;
const limite = 38;
let controle_d_palavras = false;
let acabou = false;
//Função para mostrar as palavras favoritas
const mostrar_favoritos = () => {
    //Função que mostra as palavras favoritas
    /*Criadores de elementos*/
    const criar_divs = (cl) => {
        const div = document.createElement("div");
        div.setAttribute("class", `${cl}`);

        return div;
    }

    const criar_p = (cl, texto) => {
        const p = document.createElement("p");
        p.setAttribute("class", `${cl}`);

        p.innerHTML = texto;

        return p;
    }

    const criar_btn = () => {
        const btn = document.createElement("button");

        return btn;
    }

    const criar_img = (cl, src) => {
        const img = document.createElement("img");
        img.setAttribute("class", `${cl}`);
        img.setAttribute("src", `${src}`);

        return img;
    }

    criar_lista_d_favoritas();
    const todas_favoritas = JSON.parse(localStorage.getItem("favorita_")) || [];
    dicionario_cache_fav_bloco = todas_favoritas.slice(inicio, inicio + limite);
    // console.log(dicionario_cache_fav_bloco);

    if (inicio >= todas_favoritas.length) {
        acabou = true;
        return;
    }

    dicionario_cache_fav_bloco.forEach((palavra_favorita) => {

        const pl_favorita = criar_divs("pl_favorita");
        const area_pl = criar_divs("area_pl");
        const remover_ouvir = criar_divs("remover_ouvir");
        const p1 = criar_p("p1", `${palavra_favorita.palavra_favorita_pt}`);
        const p2 = criar_p("p2", `${palavra_favorita.palavra_favorita_ema}`);
        const img_seta = criar_img("img_seta_fav", "./img/setaEsquerdaDireitaD.svg");
        const img_desfav_btn_ = criar_btn();
        const img_ouvir_btn_ = criar_btn();
        const img_desfav = criar_img("remover_", "./img/n_favorito_p.svg");
        const img_ouvir = criar_img("ouvir_", "./img/ouvir_p.svg");

        pl_favorita.appendChild(area_pl);
        pl_favorita.appendChild(remover_ouvir);
        area_pl.appendChild(p1);
        area_pl.appendChild(img_seta);
        area_pl.appendChild(p2);

        img_ouvir_btn_.appendChild(img_ouvir);
        img_desfav_btn_.appendChild(img_desfav);
        remover_ouvir.appendChild(img_ouvir_btn_);
        remover_ouvir.appendChild(img_desfav_btn_);

        img_desfav_btn_.addEventListener("click", (evt) => {
            remover_dos_favoritos(palavra_favorita.id);
            parar_audio_();
            caixa_d_alertas(`Palavra removida dos favoritos.`, "./img/n_favorito_p.svg");
            pl_favorita.remove();
        })

        img_ouvir_btn_.addEventListener("click", (evt) => {
            tocar_audio_(palavra_favorita.src_audio);
            caixa_d_alertas(`Tocando: ${p2.innerHTML}!`, "./img/ouvir_p.svg");
        })

        armazem_favoritas.appendChild(pl_favorita);
    });

    inicio = limite;

};

const verificar_scroll_favoritas = () => {

    if (controle_d_palavras || acabou) {
        return;
    }

    if (armazem_favoritas.scrollTop + armazem_favoritas.clientHeight >= armazem_favoritas.scrollHeight - 50) {
        controle_d_palavras = true;
        mostrar_favoritos();
        setTimeout(() => {
            controle_d_palavras = false;
            verificar_scroll_favoritas();
        }, 30)
    }
}

const resetar_bloco_fav = () => {
    inicio = 0;
    armazem_favoritas.scrollTop = 0;
    // controle_d_palavras = false;
    // acabou = false;
    armazem_favoritas.innerHTML = "";
    mostrar_favoritos();
}

armazem_favoritas.addEventListener("scroll", (evt) => {
    verificar_scroll_favoritas();
});
//Exportaçõa das funções
export { adicionar_aos_favoritos, mostrar_favoritos, resetar_bloco_fav };
export default remover_dos_favoritos;