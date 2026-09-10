"use strict"
import caixa_d_alertas from "./caixa_d_alertas.js";
import carregar_dicionario from "./carregar_dicionario.js";
import tocar_audio_ from "./ouvir_audio.js";
import remover_dos_favoritos, { adicionar_aos_favoritos } from "./remover_e_adionar_aos_favoritos.js";

const criar_variacoes_ema = (sp, variacoes) => {
    variacoes.forEach((pl, pos) => {
        console.log(pl.texto);
        if (pos !== 0) {
            if (pos === 1) {
                sp.innerHTML = "Variações em Emakhuwa: <br>"
            }
            sp.innerHTML += `- ${pl.texto}<br>`
        }
    })
}

const criar_variacoes_pt = (sp) => {
    sp.innerHTML += "Variações em Português: <br>"
}

const palavra_do_dia = (dicionario_) => {
    if (dicionario_.length === 0) {
        return;
    }

    const data = new Date();

    const dia = data.getDate();
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const num_dia = (ano * 1000) + (mes * 100) + dia;
    const tam_dic = dicionario_.length
    const indice = num_dia % tam_dic;

    return indice;
}

const alterar_icons_fav_dia = () => {
    const favorita_ = JSON.parse(localStorage.getItem("favorita_")) || [];
    const pl_dia_pt = document.querySelector(".pl_dia_pt");
    const pl_dia_ema = document.querySelector(".pl_dia_ema");
    const img_fav_dia = document.querySelector(".img_fav_dia");
    const portugues = pl_dia_pt.innerHTML, emakhuwa = pl_dia_ema.innerHTML;

    favorita_.forEach((palavra) => {
        if (palavra.palavra_favorita_ema === emakhuwa && palavra.palavra_favorita_pt === portugues) {
            img_fav_dia.setAttribute("src", "./img/n_favorito_p.svg");
        } else {
            img_fav_dia.setAttribute("src", "./img/favorito_p.svg");
        }
    })

}

const mostra_palavra_do_dia = async () => {
    const dicionario_ = await carregar_dicionario() || [];
    const indice = palavra_do_dia(dicionario_);
    const favorita_ = JSON.parse(localStorage.getItem("favorita_")) || [];

    const id = dicionario_[indice].id;
    const ema = dicionario_[indice].emakhuwa;
    const pt = dicionario_[indice].portugues;
    const variacoes_ema = dicionario_[indice].pesquisa_ema;
    const significados = dicionario_[indice].significados;
    const src_audio = dicionario_[indice].audio
    const pl_dia_pt = document.querySelector(".pl_dia_pt");
    const pl_dia_ema = document.querySelector(".pl_dia_ema");
    const btn_fav_pl_dia = document.querySelector(".btn_fav_pl_dia");
    const img_fav_dia = document.querySelector(".img_fav_dia");
    const btn_ouvir_pl_dia = document.querySelector(".btn_ouvir_pl_dia");
    const pl_explicacao = document.querySelector("#pl_explicacao");
    const div_expl_cont = document.querySelector("#div_expl_cont");

    pl_dia_ema.innerHTML = ema;
    pl_dia_pt.innerHTML = pt;
    const portugues = pl_dia_pt.innerHTML, emakhuwa = pl_dia_ema.innerHTML;

    div_expl_cont.innerHTML = "";

    if (variacoes_ema[0]) {
        criar_variacoes_ema(div_expl_cont, [...variacoes_ema]);
    }

    if (significados[0]) {
        criar_variacoes_pt(div_expl_cont);
    }

    significados.forEach((obj) => {
        if (obj.traducao !== "") {
            div_expl_cont.innerHTML += `- ${obj.traducao} <br>`
        }

        if (obj.explicacao !== "") {

            div_expl_cont.innerHTML += `- Explicaçã - ${obj.explicacao} <br>`
        }

        if (obj.exemplo !== "") {
            div_expl_cont.innerHTML += `- Exemplo - ${obj.exemplo} <br>`;
        }
    });

    btn_fav_pl_dia.addEventListener("click", (evt) => {
        if (img_fav_dia.getAttribute("src") == "./img/favorito_p.svg") {
            const inner_ema = pl_dia_ema.innerHTML;
            const inner_pt = pl_dia_pt.innerHTML;

            adicionar_aos_favoritos(inner_pt, inner_ema, id, src_audio);
            img_fav_dia.setAttribute("src", "./img/n_favorito_p.svg");
            caixa_d_alertas("Palavra adicionada aos favoritos", "./img/favorito_p.svg");
        } else {
            remover_dos_favoritos(id);
            img_fav_dia.setAttribute("src", "./img/favorito_p.svg");
            caixa_d_alertas("Palavra removida dos favoritos", "./img/n_favorito_p.svg");
        }

        alterar_icons_fav_dia();
    });

    btn_ouvir_pl_dia.addEventListener("click", (evt) => {
        tocar_audio_(src_audio);
        caixa_d_alertas(`Tocando: ${ema}`, "./img/ouvir_p.svg");
    })
}

export {
    alterar_icons_fav_dia
};

export default mostra_palavra_do_dia;