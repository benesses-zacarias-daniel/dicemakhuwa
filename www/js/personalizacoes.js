"use strict"
//Função responsável por controlar toda parte de personalizações
//Função importada
import { resetar_bloco } from "./add_palavras_no_html.js";

const selector_d_tamanho_d_fonte = document.querySelector("#selector_d_tamanho_d_fonte");//Tamanho da Fonte
const selector_d_fonte = document.querySelector("#selector_d_fonte");//Tipo de Fonte

const criar_modo_d_exib_tipo_e_tamanho_d_fonte = (tipo_d_criacao) => {
    if (tipo_d_criacao === 0) {
        if (!localStorage.getItem("modo_de_exibicao")) {
            localStorage.setItem("modo_de_exibicao", "ambos");
        }
    } else if (tipo_d_criacao === 1) {
        if (!localStorage.getItem("tipo_d_fonte")) {
            localStorage.setItem("tipo_d_fonte", "padrao");
        }
    } else if (tipo_d_criacao === 2) {

        if (!localStorage.getItem("tamanho_d_fonte")) {
            localStorage.setItem("tamanho_d_fonte", "normal");
        }
    }
}

const definir_modo_de_exibicao = (novo_modo) => {
    //Função que controla o modo d exibição
    localStorage.setItem("modo_de_exibicao", `${novo_modo}`);
    criar_modo_d_exib_tipo_e_tamanho_d_fonte(1);
    const modo_d_exibicao = localStorage.getItem("modo_de_exibicao");
    const palavra_pt = [...document.querySelectorAll(".palavra_pt")];

    const palavra_ema = [...document.querySelectorAll(".palavra_ema")];
    const img_seta = [...document.querySelectorAll(".img_seta")];
    console.log("Chamou Resetar");

    if (modo_d_exibicao === "pt_p_ema") {
        palavra_pt.map((pl) => {
            pl.classList.remove("ocultar_");
            pl.classList.add("ajustar_texto");
        });

        palavra_ema.map((pl) => {
            pl.classList.add("ocultar_");
            pl.classList.remove("ajustar_texto");
        });

        img_seta.map((icon_img_seta) => {
            icon_img_seta.classList.add("ocultar_");
        });

    } else if (modo_d_exibicao === "ema_p_pt") {

        palavra_pt.map((pl) => {
            pl.classList.add("ocultar_");
            pl.classList.remove("ajustar_texto");
        });

        palavra_ema.map((pl) => {
            pl.classList.remove("ocultar_");
            pl.classList.add("ajustar_texto");
        });

        img_seta.map((icon_img_seta) => {
            icon_img_seta.classList.add("ocultar_");
        });

    } else {

        palavra_ema.map((pl) => {
            pl.classList.remove("ocultar_");
            pl.classList.remove("ajustar_texto");
        });

        palavra_pt.map((pl) => {
            pl.classList.remove("ocultar_");
            pl.classList.add("ajustar_texto");
        });

        img_seta.map((icon_img_seta) => {
            icon_img_seta.classList.remove("ocultar_");
        });
    }

    resetar_bloco();
}

const alterar_selects = (tipo, fonte_tam) => {
    //Função que altera as opcões selecionadas
    if (tipo === 1) {
        //Altera a opção do selecionada do select do tipo de fonte
        for (let font = 0; font < selector_d_fonte.children.length; font++) {
            if (selector_d_fonte.children[font].value === fonte_tam) {
                selector_d_fonte.children[font].selected = true;
            }
        }
    } else {
        //Altera a opção do selecionada do select do tamanha da fonto
        for (let font = 0; font < selector_d_tamanho_d_fonte.children.length; font++) {
            if (selector_d_tamanho_d_fonte.children[font].value == fonte_tam) {
                selector_d_tamanho_d_fonte.children[font].selected = true;
            }
        }
    }
}

const alterar_modo_exib = () => {
    criar_modo_d_exib_tipo_e_tamanho_d_fonte(0);
    const modo_d_exibicao = localStorage.getItem("modo_de_exibicao");
    const radios_ = [...document.querySelectorAll(`input[type="radio"]`)];

    radios_.map((radio_) => {
        if (radio_.value === modo_d_exibicao) {
            radio_.checked = true;
        }
    })
}
const definir_tamanho_d_fonte = (tamanho_novo, tam_font_mostrar) => {
    localStorage.setItem("tamanho_d_fonte", `${tamanho_novo}`);

    criar_modo_d_exib_tipo_e_tamanho_d_fonte(2);

    const tam_select = localStorage.getItem("tamanho_d_fonte");
    console.log(tam_select);

    if (tam_font_mostrar === 1) {
        const pl_explicacao = document.querySelector("#pl_explicacao");

        if (tam_select === "medio") {
            pl_explicacao.classList.add("medio");
            pl_explicacao.classList.remove("normal");
            pl_explicacao.classList.remove("grande");
            console.log(pl_explicacao);
        } else if (tam_select === "grande") {
            pl_explicacao.classList.add("grande");
            pl_explicacao.classList.remove("medio");
            pl_explicacao.classList.remove("normal");
        } else {
            pl_explicacao.classList.add("normal");
            pl_explicacao.classList.remove("medio");
            pl_explicacao.classList.remove("grande");
        }

    } else if (tam_font_mostrar === 2) {
        const explicacao = document.querySelector(".explicacao");
        if (tam_select === "medio") {
            explicacao.classList.toggle("medio");
        } else if (tam_select === "grande") {
            explicacao.classList.toggle("grande");
        } else {
            explicacao.classList.toggle("normal");
        }
    }

    alterar_selects(0, tamanho_novo);
}

const definir_tipo_d_fonte = (fonte_nova, tipo_fonte_mos) => {
    localStorage.setItem("tipo_d_fonte", `${fonte_nova}`);
    criar_modo_d_exib_tipo_e_tamanho_d_fonte(1);
    const fonte_select = localStorage.getItem("tipo_d_fonte");
    console.log(fonte_select);

    if (tipo_fonte_mos === 1) {
        const pl_explicacao = document.querySelector("#pl_explicacao");

        if (fonte_select === "arial") {
            pl_explicacao.classList.add("arial");
            pl_explicacao.classList.remove("palatino");
            pl_explicacao.classList.remove("geneva");
            pl_explicacao.classList.remove("padrao");
        } else if (fonte_select === "palatino") {
            pl_explicacao.classList.add("palatino");
            pl_explicacao.classList.remove("arial");
            pl_explicacao.classList.remove("geneva");
            pl_explicacao.classList.remove("padrao");
        } else if (fonte_select === "geneva") {
            pl_explicacao.classList.add("geneva");
            pl_explicacao.classList.remove("palatino");
            pl_explicacao.classList.remove("arial");
            pl_explicacao.classList.remove("padrao");
        } else {
            pl_explicacao.classList.add("padrao");
            pl_explicacao.classList.remove("arial");
            pl_explicacao.classList.remove("geneva");
            pl_explicacao.classList.remove("palatino");
        }

    } else if (tipo_fonte_mos === 2) {

        const explicacao = document.querySelector(".explicacao");
        if (fonte_select === "arial") {
            explicacao.classList.toggle("arial");
        } else if (fonte_select === "palatino") {
            explicacao.classList.toggle("palatino")
        } else if (fonte_select === "geneva") {
            explicacao.classList.toggle("geneva");
        } else {
            explicacao.classList.toggle("padrao");
        }

    }

    alterar_selects(1, fonte_nova);
}

const redefinir_padrao = () => {
    const pt_p_ema = document.querySelector("#pt_p_ema");//Valor Padrão

    localStorage.setItem("modo_de_exibicao", "pt_p_ema");
    localStorage.setItem("tamanho_d_fonte", "normal");
    localStorage.setItem("tipo_d_fonte", "padrao");

    pt_p_ema.checked = true;
    selector_d_fonte.children[0].selected = true;
    selector_d_tamanho_d_fonte.children[0].selected = true;
}

const sombras_ = () => {
    const sombras = [document.querySelector(".dic_emakhuwa_mens"), ...document.querySelectorAll(".traducao")];
    //                                          Área Trad Sombras                                                                           Área Trad Sombras                             Área Sobre-DicEmakhuwa
    const sombras_css = ["-6px 0 12px rgba(0, 0, 0, 0.1), 6px 0 12px rgba(0, 0, 0, 0.1)", "-6px 0 12px rgba(46, 62, 234, 0.089), 6px 0 12px rgba(46, 62, 234, 0.089)", " 0px 4px 20px rgba(13, 0, 255, 0.3)"]
    const aleat = Math.floor(Math.random() * 10);
    if (aleat % 2 === 0) {
        if (aleat > 10) {
            console.log(aleat);
            sombras.map((elementos_sobra) => {
                elementos_sobra.style.boxShadow = sombras_css[0];
            })
        } else {
            console.log(aleat + " ---------- 2 ");
            sombras.map((elementos_sobra) => {
                elementos_sobra.style.boxShadow = sombras_css[1];
            })
        }
    } else {
        console.log(aleat + " Impar");
        sombras.map((elementos_sobra) => {
            elementos_sobra.style.boxShadow = sombras_css[2];
        })
    }
}

const aplicar_preferencias = (tipo_aplicar_preferencias, tipo_fonte_mos, tam_font_mostrar) => {
    //Modo de Exibição , Selector de Fonte & Selector de Tamanho
    const modo_d_exibicao = localStorage.getItem("modo_de_exibicao") || "ambos";
    const fonte_select = localStorage.getItem("tipo_d_fonte") || "padrao";
    const tam_select = localStorage.getItem("tamanho_d_fonte") || "normal";

    if (tipo_aplicar_preferencias === 1) {
        definir_modo_de_exibicao(`${modo_d_exibicao}`);
        definir_tamanho_d_fonte(`${tam_select}`, tam_font_mostrar);
        definir_tipo_d_fonte(`${fonte_select}`, tipo_fonte_mos);
    } else {
        definir_tamanho_d_fonte(`${tam_select}`, tam_font_mostrar);
        definir_tipo_d_fonte(`${fonte_select}`, tipo_fonte_mos);
    }

}

export {
    definir_modo_de_exibicao,
    definir_tamanho_d_fonte,
    definir_tipo_d_fonte,
    redefinir_padrao,
    aplicar_preferencias,
    alterar_modo_exib,
    sombras_
};