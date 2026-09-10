"use strict"
//Função responsável por controlar a exibição do menu de confiurações

const area_config = document.querySelector(".area_config");
const nome = document.querySelector(".nome");
const pesquisa = document.querySelector(".pesquisa");
const campo_pesquisa = document.querySelector(".campo_pesquisa");
const pesq_img = document.querySelector(".pesq_img");
const body = document.body;

const ocultar_configs = (tipo_ocultar) => {
    //Função que oculta
    if (tipo_ocultar == 0) {
        area_config.classList.toggle("mostrar_configs");
    } else {
        if (area_config.classList.contains("mostrar_configs")) {
            ocultar_configs(0);
        }
    }
}

const ocultar_pesq_btn = (tipo_ocult_) => {
    //Função que oculta o Botão de Pesquisa e Remove ele
    if (tipo_ocult_ === 1) {
        pesquisa.classList.add("ocultar_nome");
        nome.style.display = "";
    } else if (tipo_ocult_ === 2) {
        const activa = document.querySelector(".activa");

        if (activa.getAttribute("id") === "home_dicionario" || activa.getAttribute("id") === "favoritas_") {
            pesquisa.classList.remove("ocultar_nome");
        }

        pesquisa.classList.remove("pesq_b");
        campo_pesquisa.classList.remove("mostrar");
        nome.style.display = "block";
        pesq_img.setAttribute("src", "./img/pesq_p.svg");
    }
}

const ocultar_nome = (f_ocult) => {
    //Oculta o nome da sessão
    if (f_ocult === 1) {
        nome.style.opacity = "0";
        pesquisa.style.opacity = "1";
    } else {
        nome.style.opacity = "1"
    }

    if (body.clientWidth >= 530) {
        nome.style.opacity = "1";
    }
}

const checar_tamanho = () => {
    const largura = body.clientWidth;
    const altura = body.clientHeight;
    const area_config = document.querySelector(".area_config");

    if (largura > altura) {
        if (area_config.classList.contains("mostrar_configs")) {
            nome.style.opacity = "1";
        } else {
            nome.style.opacity = "1";
        }
    } else if (largura < altura) {
        if (area_config.classList.contains("mostrar_configs")) {
            nome.style.opacity = "0";
        } else {
            nome.style.opacity = "1";
        }
    }
}
//Função pra mostrar o nome da área! 
window.addEventListener("resize", (evt) => {
    setTimeout(() => {
        checar_tamanho();
    }, 0);
});
//Exportação das funções
export {
    ocultar_pesq_btn,
    ocultar_nome,
    checar_tamanho
};

export default ocultar_configs;