"use strict"
import caixa_d_alertas from "./caixa_d_alertas.js";
//Função responsável por criar a tela de explicação ao clicar na palavra na área dicionário
import { ocultar_pesq_btn } from "./ocultar_configuracoes.js";
import tocar_audio_ from "./ouvir_audio.js";
import { aplicar_preferencias, definir_tamanho_d_fonte, definir_tipo_d_fonte } from "./personalizacoes.js";
import remover_dos_favoritos, { adicionar_aos_favoritos } from "./remover_e_adionar_aos_favoritos.js";

const sessao_app = document.querySelector(".sessao_app");
/*Funções criadoras de elementos*/
const criar_span = (id, cls, texto) => {
    const span = document.createElement("span");
    span.setAttribute("id", `${id}`);
    span.setAttribute("class", `${cls}`);
    span.innerHTML = texto;

    return span;
}
const criar_btn = (cl) => {
    const btn = document.createElement("button");
    btn.setAttribute("class", `${cl}`);

    return btn;
}

const criar_divs = (cls) => {
    const div_ = document.createElement("div");
    div_.setAttribute("class", `${cls}`);

    return div_;
}

const criar_imgs = (cls, src) => {
    const img = document.createElement("img");
    img.setAttribute("class", `${cls}`);
    img.setAttribute("src", `${src}`);

    return img;
}
/*Função para verificar texto*/
const verificar_texto = (sp, explicacao, exemplo) => {

    if (explicacao !== "") {
        sp.innerHTML += ` - Explicação - ${explicacao}`;
    }

    if (exemplo !== "") {
        sp.innerHTML += ` - Exemplo - ${exemplo}`;
    }
}
/*Função para criar variações em Emakhuwa*/
const criar_variacoes_ema = (sp, variacoes) => {


    variacoes.map((pl, pos) => {
        if (pos === 1) {
            sp.innerHTML = "Variações em Emakhuwa: <br>"
        }
        if (pos > 0) {
            sp.innerHTML += `- ${pl}<br>`
        }
    })
}
/*Função para criar variações em Português*/
const criar_variacoes_pt = (sp) => {
    sp.innerHTML += "Variações em Português: <br>"
}
/*Função para mostrar a explicação ao clicar na palavra*/
const mostrar_exp = (pl, [...significados], em, [...pesquisa_ema], src_audio, id) => {

    const palavra_conceitos = criar_divs("palavra_conceitos");
    palavra_conceitos.setAttribute("id", "palavra_conceitos");
    const titulo_conceito = criar_divs("titulo_conceito font_elmentos");
    const palavra_exp = criar_divs("palavra_exp");
    const div = criar_divs("div");
    const div_ = criar_divs("div_");
    const favoritar_ouvir = criar_divs("favoritar_ouvir");
    const explicacao = criar_divs("explicacao");
    const sp1 = criar_span("titu", "", "Explicação");
    const sp3 = criar_span("con", "font_elmentos", `${pl}`);
    const sp2 = criar_span("con", "font_elmentos", `${em}`);
    const img = criar_imgs("con img_seta_fav", `./img/setaEsquerdaDireitaD.svg`);
    const img_fav = criar_imgs("img_fav", "./img/favorito_p.svg");
    const img_ou = criar_imgs("img_ou", "./img/ouvir_p.svg");
    const btn_fav_pl = criar_btn("btn_fav_pl");
    const btn_ouvir_pl = criar_btn("btn_ouvir_pl");

    const favorita_ = JSON.parse(localStorage.getItem("favorita_")) || [];
    let ids = [];

    for (let cont_id = 0; cont_id < favorita_.length; cont_id++) {
        ids[cont_id] = favorita_[cont_id].id;

        if (id === ids[cont_id]) {
            img_fav.setAttribute("src", "./img/n_favorito_p.svg");
        }
    }
    const sp = criar_span(`exp_`, "", ``);
    const variacoes_ema = pesquisa_ema.map((texto) => { return texto.texto; })
    criar_variacoes_ema(sp, variacoes_ema);
    // if()
    // for (let cont_expl = 0; cont_expl < significados.length; cont_expl++) {
    //     if (significados.length > 0 && (significados[cont_expl].traducao !== "" || significados[cont_expl].explicacao !== "" || significados.exemplo !== "")) {
    //         verificar_texto(sp, significados[cont_expl].explicacao, significados[cont_expl].exemplo);
    //     }
    // }
    significados.map((traducao, pos) => {
        if ((traducao.traducao !== "" || traducao.explicacao !== "" || traducao.exemplo !== "") && pos === 0) {
            criar_variacoes_pt(sp);
        }

        traducao.traducao !== "" ? sp.innerHTML += `- ${traducao.traducao} <br>` : sp.innerHTML += "";
        traducao.explicacao !== "" ? sp.innerHTML += `- Explicação - ${traducao.explicacao} <br>` : sp.innerHTML += "";
        traducao.exemplo !== "" ? sp.innerHTML += `- Exemplo - ${traducao.exemplo} <br>` : sp.innerHTML += "";
    })

    explicacao.appendChild(sp);
    /*Processo de adicionar os elementos no dom*/
    titulo_conceito.appendChild(sp1);
    palavra_conceitos.appendChild(titulo_conceito);
    palavra_exp.appendChild(div);
    palavra_exp.appendChild(explicacao);
    div_.appendChild(sp2);
    div_.appendChild(img);
    div_.appendChild(sp3);
    div.appendChild(div_);
    div.appendChild(favoritar_ouvir);
    favoritar_ouvir.appendChild(btn_fav_pl);
    favoritar_ouvir.appendChild(btn_ouvir_pl);
    btn_fav_pl.appendChild(img_fav);
    btn_ouvir_pl.appendChild(img_ou);
    palavra_conceitos.appendChild(palavra_exp);
    sessao_app.prepend(palavra_conceitos);
    /*Eventos do elementos*/
    btn_ouvir_pl.addEventListener("click", (evt) => {
        tocar_audio_(`${src_audio}`);
        if (img_ou.getAttribute("src") === "./img/ouvir_p.svg") {
            img_ou.setAttribute("src", "./img/ouvir_desabilitado_p.svg")
            caixa_d_alertas(`Tocando: ${em}`, "./img/ouvir_p.svg");
        } else {
            img_ou.setAttribute("src", "./img/ouvir_p.svg")
            caixa_d_alertas(`Tocando: ${em}`, "./img/ouvir_p.svg");
        }
    })

    btn_fav_pl.addEventListener("click", (evt) => {
        if (img_fav.getAttribute("src") === "./img/favorito_p.svg") {
            adicionar_aos_favoritos(pl, em, id, src_audio);
            console.log("entrou");

            img_fav.setAttribute("src", "./img/n_favorito_p.svg");
            caixa_d_alertas("Palavra adicionada aos favoritos", "./img/favorito_p.svg");
        } else {
            remover_dos_favoritos(id)
            img_fav.setAttribute("src", "./img/favorito_p.svg");
            caixa_d_alertas("Palavra removida dos favoritos", "./img/n_favorito_p.svg");
        }

    })


    // const fonte_select = localStorage.getItem("tipo_d_fonte");
    // const tam_select = localStorage.getItem("tamanho_d_fonte");

    // definir_tamanho_d_fonte(`${tam_select}`, 2);
    // definir_tipo_d_fonte(`${fonte_select}`, 2);
    ocultar_pesq_btn(2);
    aplicar_preferencias(0, 2, 2);
    history.pushState({ tela: "tradutor" }, "", "#tradutor")
}
/*Funções que remover a área de explicação e o mostrar o área de pesquisa (para que o botão de pesquisa apareça) */
const pl_conceitos = () => {
    //Funcção que remove a explicação
    const palavra_conceitos = document.querySelector(".palavra_conceitos");
    if (palavra_conceitos !== null) {
        palavra_conceitos.remove();
    }
}

const ocultar_p = () => {
    //função que mostra a área pesquisa
    const palavra_conceitos = document.querySelector(".palavra_conceitos");
    const pesquisa = document.querySelector(".pesquisa");
    if (palavra_conceitos === null) {
        pesquisa.style.display = "";
    }
}

export { pl_conceitos, ocultar_p }
export default mostrar_exp;