"use struct"
//Funções que realizam a pesquisa de palavras na área favoritas & dicionário
//Funções importandas
import { resetar_bloco } from "./add_palavras_no_html.js";//Função responsável por resetar o bloco da home
import { resetar_bloco_fav } from "./remover_e_adionar_aos_favoritos.js";
import caixa_d_alertas from "./caixa_d_alertas.js";
import carregar_dicionario from "./carregar_dicionario.js";
import tocar_audio_, { parar_audio_ } from "./ouvir_audio.js";
import mostrar_exp from "./palavras.js";
import remover_dos_favoritos, { mostrar_favoritos } from "./remover_e_adionar_aos_favoritos.js";
import criar_indices, { normalizar_texto } from "./mapa_palavras_pesq_trad.js";

const pesquisar_fav = (texto) => {
    texto = texto.toLowerCase()
    const favorita_ = JSON.parse(localStorage.getItem("favorita_")) || [];

    return favorita_.filter(p =>
        p.palavra_favorita_pt.toLowerCase().includes(texto) || p.palavra_favorita_ema.toLowerCase().includes(texto)
    );
}

const mostrar_result_fav = (lista) => {
    const armazem_favoritas = document.querySelector(".armazem_favoritas");

    armazem_favoritas.innerHTML = "";

    const frag = document.createDocumentFragment();

    lista.forEach(pl_favorita => {
        const pl_fav = criar_divs("", "pl_favorita font_elmentos");
        const area_pl = criar_divs("", "area_pl");
        const remover_ouvir = criar_divs("", "remover_ouvir");
        const p1 = criar_p("p1", `${pl_favorita.palavra_favorita_pt}`);
        const p2 = criar_p("p2", `${pl_favorita.palavra_favorita_ema}`);
        const img_seta = criar_img("img_seta_fav", "./img/setaEsquerdaDireitaD.svg");
        const desfav_btn_ = criar_btn();
        const ouvir_btn_ = criar_btn();
        const img_desfav = criar_img("remover_", "./img/n_favorito_p.svg");
        const img_ouvir = criar_img("ouvir_", "./img/ouvir_p.svg");

        pl_fav.appendChild(area_pl);
        pl_fav.appendChild(remover_ouvir);
        area_pl.appendChild(p1);
        area_pl.appendChild(img_seta);
        area_pl.appendChild(p2);

        ouvir_btn_.appendChild(img_ouvir);
        desfav_btn_.appendChild(img_desfav);
        remover_ouvir.appendChild(ouvir_btn_);
        remover_ouvir.appendChild(desfav_btn_);

        desfav_btn_.addEventListener("click", (evt) => {
            remover_dos_favoritos(pl_favorita.id);
            parar_audio_();
            caixa_d_alertas(`Palavra removida dos favoritos.`, "./img/n_favorito_p.svg");
            pl_fav.remove();
        })

        ouvir_btn_.addEventListener("click", (evt) => {
            tocar_audio_(pl_favorita.src_audio);
            caixa_d_alertas(`Tocando: ${p2.innerHTML}.`, "./img/ouvir_p.svg");
        })

        frag.appendChild(pl_fav);
    })

    armazem_favoritas.appendChild(frag)
}

const pesq_palavras = async (texto) => {
    //Função para pesquisar palavras na área do dicionário
    // const dicionario = JSON.parse(localStorage.getItem("dicionario_")) || [];
    const dicionario = await carregar_dicionario();
    const { mapa_pt, mapa_ema, chaves_palvaras_pt, chaves_palvaras_ema } = criar_indices(dicionario);
    const texto_pesq = normalizar_texto(texto);
    /*dicionario.forEach((palavra) => {
            for (let cont_pesq = 0; cont_pesq < palavra.pesquisa_ema.length; cont_pesq++) {
                let pesq_pl_ema = normalizar_texto(palavra.pesquisa_ema[cont_pesq].texto);
    
                if (pesq_pl_ema.toLowerCase().includes(texto)) {
                    console.log("achou Ema");
                    // console.log(palavra);
                    mostrar_resultados(palavra);
                }
            }
    
            for (let cont_pesq = 0; cont_pesq < palavra.pesquisa_pt.length; cont_pesq++) {
                let pesq_pl_pt = normalizar_texto(palavra.pesquisa_pt[cont_pesq].texto)
    
                if (pesq_pl_pt.toLowerCase().includes(texto)) {
                    console.log("achou pt");
                    mostrar_resultados(palavra);
                }
    
            }
        });*/

    if (!texto_pesq) {
        resetar_bloco()
        return;
    }

    let resultados = [];

    mapa_pt[texto_pesq];
    mapa_ema[texto_pesq];

    for (const chave in mapa_pt) {
        if (chave.startsWith(texto_pesq)) {
            resultados.push(mapa_pt[chave])
        }
    }

    for (const chave in mapa_ema) {
        if (chave.startsWith(texto_pesq)) {
            resultados.push(mapa_ema[chave])
        }
    }


    mostrar_resultados([...new Set(resultados)].slice(0, 20));

}

//Funções criadoras de elementos
const criar_divs = (id, cl) => {
    const div = document.createElement("div")
    div.setAttribute("class", `${cl}`);
    if (id !== "") {
        div.setAttribute("id", `${id}`);
    }

    return div
}

const criar_btn = () => {
    const btn = document.createElement("button");
    return btn;
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
const exibicao = (p_pt, p_ema, seta) => {
    const modo_d_exibicao = localStorage.getItem("modo_de_exibicao");

    if (modo_d_exibicao === "pt_p_ema") {
        p_pt.classList.remove("ocultar_");
        p_pt.classList.add("ajustar_texto");
        p_ema.classList.add("ocultar_");
        p_ema.classList.remove("ajustar_texto");
        seta.classList.add("ocultar_");
    } else if (modo_d_exibicao === "ema_p_pt") {
        p_pt.classList.add("ocultar_");
        p_pt.classList.remove("ajustar_texto");
        p_ema.classList.remove("ocultar_");
        p_ema.classList.add("ajustar_texto");
        seta.classList.add("ocultar_");
    } else {
        p_pt.classList.remove("ocultar_");
        p_pt.classList.remove("ajustar_texto");
        p_ema.classList.remove("ocultar_");
        p_ema.classList.remove("ajustar_texto");
        seta.classList.remove("ocultar_");
    }
}
const mostrar_resultados = (lista) => {
    const scrol = document.querySelector("#scrol");

    scrol.innerHTML = "";

    const frag = document.createDocumentFragment();
    // console.log(objs_pesquisa);
    lista.forEach(objs_pesquisa => {
        const id = objs_pesquisa.id
        const div_ = criar_divs(id, "palavra font_elmentos");
        const pt = objs_pesquisa.portugues;
        const ema = objs_pesquisa.emakhuwa;
        const p_pt = criar_p("palavra_pt", pt)
        const p_ema = criar_p("palavra_ema", ema)
        const seta = criar_img("img_seta", "./img/setaEsquerdaDireitaD.svg")
        const significados = objs_pesquisa.significados
        const pesquisa_ema = objs_pesquisa.pesquisa_ema
        const src_audio = objs_pesquisa.audio

        exibicao(p_pt, p_ema, seta);

        div_.appendChild(p_pt);
        div_.appendChild(seta);
        div_.appendChild(p_ema);

        frag.appendChild(div_);

        div_.addEventListener("click", () => {
            mostrar_exp(pt, [...significados], ema, [...pesquisa_ema], src_audio, id);
        })
    })

    requestAnimationFrame(() => {
        scrol.appendChild(frag);
    });
}

const ajustar_btn_pesq = () => {
    //Função que ajusta o Botão de Pesquisa e reseta a exibição para o primeiro bloco
    const input_pesq = document.querySelector("#input_pesq");

    const activa = document.querySelector(".activa");

    if (activa.getAttribute("id") === "home_dicionario") {
        resetar_bloco();
        console.log("Home");
    } else if (activa.getAttribute("id") === "favoritas_") {
        resetar_bloco_fav();
        console.log("Favoritas");
    }

    input_pesq.value = "";
    input_pesq.focus();
}

// const ajusta_area_fav = () => {
//     //Função que ajusta a área favorita & reseta para mostrar as palavras favoritas 
//     const input_pesq = document.querySelector("#input_pesq");
//     mostrar_favoritos();
//     input_pesq.value = "";
//     input_pesq.focus();
// }

//Exportação das funções
export { pesquisar_fav, ajustar_btn_pesq, mostrar_resultados, mostrar_result_fav }
export default pesq_palavras;