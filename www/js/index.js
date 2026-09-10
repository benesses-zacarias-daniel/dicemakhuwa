"use strict"
//Área das importações das funções
import ir_topo from "./ajustar_scroll.js"; //Função responsável por ajustar o scrol da área das palavras
import mudar_icons from "./alterar_icons.js";//Função responsável por alterar os Ícones de cada área
import copiar_texto from "./copiar_texto_.js";//Função responsável por copiar algo da área de tradução
import mudar_lingua from "./mudar_ling.js";//Função responsável por mudar de lingua na área de tradução (Muda o sentido de traução) e favoritos (muda a sequência das palavras)
import mudar_de_tela from "./mudar_telas.js";//Função responsável por mudar de tela / área (Dicionário,Palavra do Dia, Palavras Favoritas, Tradutor, Personalizações, Sobre DicEmakhuwa)
import ocultar_configs, { ocultar_nome, ocultar_pesq_btn } from "./ocultar_configuracoes.js";//Função responsável por ocultar o menu de configurações, ocultar o nome da área (ao clicar para mostrar o menu) e ocultar o botão de pesquisa
import { ouvir_sem_traduzir, parar_audio_, tocar_audio_tr_sequencia, verificar_tocar_audio_pl } from "./ouvir_audio.js";//Função responsável por controlar todo o gerenciamento do áudio
import { alterar_modo_exib, aplicar_preferencias, definir_modo_de_exibicao, definir_tamanho_d_fonte, definir_tipo_d_fonte, redefinir_padrao } from "./personalizacoes.js";//Função responsável por alterar o mode de exibição das palavras na área do dicionário (pt_p_ema 'Mostras somente as palvras em português',ema_p_pt 'Mostra somente as palavras em emakhuwa',ambos 'Mostra as duas palavras em Português e Emakhuwa'), aplica as preferências do usuário, definir o modo de exibição, definir o tamanho de fonte, definir o tipo de fonte e redefinir para o valor padrão (do modo de exibição, tamanho de fonte, tipo de fonte)
import { mostrar_favoritos, resetar_bloco_fav } from "./remover_e_adionar_aos_favoritos.js";//Função responsável por mostrar as palavras da área dos favoritos
import { pl_conceitos, ocultar_p } from "./palavras.js";//Função responsável por controlar a explicação
import pesq_palavras, { ajustar_btn_pesq, mostrar_result_fav, mostrar_resultados, pesquisar_fav } from "./pesquisar_palavra.js"; //Função responsável por tudo que tem há ver com pesquisa: 1. Pesquisar palavras na area dicionário, ajustar a área dos favoritos no caso de clicar no x para apagar o que se quer pesquisar para fazer nova entrada,3 ajustar a área dicionário da mesma forama qe ocorre na área favoritas, e funcao que possibilita pesquisar na área favorito
import mostra_palavra_do_dia, { alterar_icons_fav_dia } from "./palavra_do_dia.js";//Função responsável por mostrar a palavra do dia e função responsável por alterar o icone específico desta aarea
import traduzir_texto from "./tradutor.js";//Função responsável por traduzir os textos
import caixa_d_alertas from "./caixa_d_alertas.js";
import iniciar_app from "./iniciar_app.js";
//Elementos do DOM
//Topo & Sessão
const topo_dic = document.querySelector(".topo_dic");//Área geral do topo
const nome = document.querySelector(".nome"); //Nome que representa a área actual
const campo_pesquisa = document.querySelector(".campo_pesquisa");//Campo de Pesquisa é o mesmo que o Input Pesquisa
const sessao_app = document.querySelector(".sessao_app");//sessão
const topo_e_sessao = [sessao_app, topo_dic]; //Topo & sessão
//Botões de Pesqueisa, Imagem do Botão, Input de Pesquisa & Área geral da pesquisa
const btn_pesq = document.querySelector("#btn_pesq");//Botão de Pesquisa
const pesq_img = document.querySelector(".pesq_img");//Imagem do Botão Pesquisa
const pesquisa = document.querySelector(".pesquisa"); //Área geral
const input_pesq = document.querySelector("#input_pesq");//Input de pesquisa
//Configurações & Botões das diferentes Áreas Do App
const btn_configuracoes = document.querySelector("#btn_configuracoes");
const btn1 = document.querySelector(".btn1"); // Botão de acesso a área Principal (Dicionário)
const btn2 = document.querySelector(".btn2");//Botão de acesso a área Palavra Do Dia
const btn = document.querySelector(".btn");//Botão de acesso a área Palavras Favoritas
const btn3 = document.querySelector(".btn3");//Botão de acesso a área do Tradutor
const btn4 = document.querySelector(".btn4");//Botão de acesso a área das Personalizações
const btn5 = document.querySelector(".btn5");//Botão de acesso a área Sobre DicEmakhuwa
//Elementos das Sessões
//Botões da Área Tradutor
const ouvir_texto_p_tr_btn = document.querySelector("#ouvir_texto_p_tr_btn"); //Botão para ouvir o texto que será traduzido
const ouvir_texto_traduzido_btn = document.querySelector("#ouvir_texto_traduzido_btn");//Botão para ouvir o texto que já foi traduzido
const ouvir_texto_p_tr_img = document.querySelector(".ouvir_texto_p_tr_img");
const copiar_traducao_btn = document.querySelector("#copiar_traducao_btn");//Botão para copiar texto traduzido
const copiar_texto_p_tr_btn = document.querySelector("#copiar_texto_p_tr_btn");///Botão para copiar texto que será traduzido
const texto_p_traduzir = document.querySelector("#texto_p_traduzir");///Texto que será traduzido
const texto_traduzido = document.querySelector("#texto_traduzido");//Texto traduzido
const traduzir_btn = document.querySelector("#traduzir_btn");//Botão para traduzir o texto
//Elementos da área favoritos
const tr_mudar_ling = [...document.querySelectorAll(".tr_mudar_ling")]; //Botões para mudar lingua na área Tradutor
const btn_mudar_favor = document.querySelector("#btn_mudar_favor");//Botão para mudar lingua da área favorita (Muda sequência de exibição)
//Elementos da área de personalizações
const selector_d_fonte = document.querySelector("#selector_d_fonte");//Selecionar o tipo de fonte
const selector_d_tamanho_d_fonte = document.querySelector("#selector_d_tamanho_d_fonte");//Selecionar o tamango da fonte
const radios_ = [...document.querySelectorAll(`input[type="radio"]`)];//Inputs do tipo radio para selecionar o modo de exibição das palavras
const redif = document.querySelector("#redif");//Botão para redefinir as personalizações para o valor padrão
let seleccao = null; //Fonte ou Tamanho de fonte selecionada (Uso esta variável para controlar qual fonte foi selecionada ou qual tamanho foi selecionado)
let tempo;//Variável para controlar a exibição dos resultados da pesquisa
//Eventos
//Cada uma das funções abaixo chamadas são funções que eu exportei nos js (importei neste arquivo principal)
btn_mudar_favor.addEventListener("click", (evt) => {
    mudar_lingua(1);
}); //Evento que muda sequência das palavras nas favoritas

tr_mudar_ling.map((btn_mudar_ling) => {
    btn_mudar_ling.addEventListener("click", (evt) => {
        mudar_lingua(2);
        mudar_icons(2);
    })
});//Evento que muda sequência de tradução

btn_pesq.addEventListener("click", (evt) => {

    if (pesq_img.getAttribute("src") === "./img/pesq_p.svg") {
        campo_pesquisa.classList.add("mostrar");
        nome.style.display = "none";
        pesq_img.setAttribute("src", "./img/fechar_p.svg");
        pesquisa.classList.add("pesq_b");
        campo_pesquisa.focus();

        const palavra_conceitos = document.querySelector(".palavra_conceitos");
        if (palavra_conceitos !== null) {
            // sessao_app.removeChild(palavra_conceitos);
            palavra_conceitos.remove();
        }

    } else {

        if (input_pesq.value === "") {
            pesq_img.setAttribute("src", "./img/pesq_p.svg");
            pesquisa.classList.remove("pesq_b");
            campo_pesquisa.classList.remove("mostrar");
            nome.style.display = " ";
            ocultar_pesq_btn(2);
            ajustar_btn_pesq();
        } else {
            ajustar_btn_pesq();
        }
    }

});//Botão que controla a exibição do input pesquisa e também da ícone do botão pesquisa

btn_configuracoes.addEventListener("click", (evt) => {
    ocultar_configs(0);
    mudar_icons(1);
    ocultar_pesq_btn(2);

    const img_ocultar_menu = document.querySelector(".img_ocultar_menu");

    if (img_ocultar_menu.getAttribute("src") !== "./img/abrir_menu_p.svg") {
        ocultar_nome(1);
    } else {
        ocultar_nome(0);
    }

    parar_audio_();
    ajustar_btn_pesq();
});//Botão que controla o menu de configurações

topo_e_sessao.map((t_s) => {
    t_s.addEventListener("mousemove", (evt) => {
        ocultar_configs(1);
        mudar_icons(1);
        ocultar_nome(0);
    })
});//controle para ocultar menu ao clicar num elemento da sessão ou do topo

input_pesq.addEventListener("input", async (evt) => {
    let val_pest = evt.target.value.trim();
    const activa = document.querySelector(".activa");

    if (activa.getAttribute("id") === "home_dicionario") {
        // const resultados = await pesq_palavras(val_pest);

        clearTimeout(tempo)

        tempo = setTimeout(() => {
            pesq_palavras(val_pest);
            console.log(tempo);
        }, 150);
        console.log(tempo);

        // mostrar_resultados(resultados);
    } else {
        const resultados_pesq_fav = await pesquisar_fav(val_pest);
        console.log(resultados_pesq_fav);

        mostrar_result_fav(resultados_pesq_fav);
        // filtrar_ambos(texto_pt, texto_ema, filtro, [palavra], cont);
    }
});//Input de pesquisa

btn1.addEventListener("click", (evt) => {
    mudar_de_tela("home_dicionario", "DicEmakhuwa");
    ocultar_configs(0);
    mudar_icons(1);
    pl_conceitos();
    ir_topo(1);
    ocultar_pesq_btn(2);
    ocultar_nome(0);
    ocultar_p();
    aplicar_preferencias(1, 1, 1);
});//Botão para área dicionário

btn2.addEventListener("click", async (evt) => {
    mudar_de_tela("palavra_d_dia", "Palavra Do Dia");
    ocultar_configs(0);
    mudar_icons(1);
    pl_conceitos();
    ocultar_pesq_btn(1);
    ocultar_nome(0);
    await mostra_palavra_do_dia();
    alterar_icons_fav_dia();
    aplicar_preferencias(0, 1, 1);
});//Botão para área palavra do dia

btn.addEventListener("click", (evt) => {
    mudar_de_tela("favoritas_", "Favoritas");
    ocultar_configs(0);
    mudar_icons(1);
    pl_conceitos();
    ir_topo(0);
    ocultar_pesq_btn(2);
    ocultar_nome(0);
    ocultar_p();
    resetar_bloco_fav();
    mostrar_favoritos();
});//Botão para área favoritas

btn3.addEventListener("click", (evt) => {
    mudar_de_tela("tradutor", "Tradutor DicEmakhuwa");
    ocultar_configs(0);
    mudar_icons(1);
    pl_conceitos();
    mudar_icons(2);
    ocultar_pesq_btn(1);
    ocultar_nome(0);
    texto_p_traduzir.value = "";
    texto_traduzido.value = "";
    texto_p_traduzir.focus();
});//Botão para área tradutor

btn4.addEventListener("click", (evt) => {
    mudar_de_tela("personalizacoes", "Personalizações DicEmakhuwa");
    ocultar_configs(0);
    mudar_icons(1);
    pl_conceitos();
    ocultar_pesq_btn(1);
    ocultar_nome(0);
    alterar_modo_exib();
});//Botão para área personalizações

btn5.addEventListener("click", (evt) => {
    mudar_de_tela("sobre_dicemakhuwa", "Sobre DicEmakhuwa");
    ocultar_configs(0);
    mudar_icons(1);
    pl_conceitos();
    ocultar_pesq_btn(1);
    ocultar_nome(0);
});//Botão para área sobre dicemakhuwa

texto_p_traduzir.addEventListener("keydown", (evt) => {
    mudar_icons(2);

    if ((evt.key === "Enter" || evt.keyCode === 13) && !evt.shiftKey) {
        evt.preventDefault();
        traduzir_texto();
    }
    const tam_max = 600;
    const evt_val = evt.target.value.length;

    if (tam_max === evt_val) {
        caixa_d_alertas("Número máximo de Caracteres Atingido.", "./img/alerta.svg");
    }

});//Textarea onde será digitado o texto para ser traduzido

ouvir_texto_p_tr_btn.addEventListener("click", (evt) => {
    if (verificar_tocar_audio_pl(1)) {
        ouvir_sem_traduzir();
        // icones_trad();
        //caixa_d_alertas("Tocando Áudio.", "./img/ouvir_p.svg");
        //ouvir_texto_p_tr_img.setAttribute("src", "./img/ouvir_desabilitado_p.svg");
    }
});//Botão para traduzir o texto que será traduzido
ouvir_texto_traduzido_btn.addEventListener("click", (evt) => {
    const audios_ = JSON.parse(texto_traduzido.dataset.audios) || [];
    if (verificar_tocar_audio_pl(2)) {
        tocar_audio_tr_sequencia(audios_);
    }
});
copiar_texto_p_tr_btn.addEventListener("click", (evt) => {
    const texto_p_tr = texto_p_traduzir.value;
    const texto_tr = texto_traduzido.value;

    copiar_texto(texto_p_tr, texto_tr);
});//Botã que copia texto que será traduzido
copiar_traducao_btn.addEventListener("click", (evt) => {
    const texto_p_tr = texto_p_traduzir.value;
    const texto_tr = texto_traduzido.value;

    copiar_texto(texto_p_tr, texto_tr);
});//Botão que copia tradução
redif.addEventListener("click", (evt) => {
    redefinir_padrao();
    caixa_d_alertas("Definições Restauradas ao Valor Padrão.", "./img/alerta.svg");
});//Redefine a personalização para o estado padrão

selector_d_fonte.addEventListener("change", (evt) => {
    // definir_tipo_d_fonte("padrao");

    const ops = [...evt.target.children];
    console.log(ops);
    ops.map((op) => {
        seleccao = op.value;
        setTimeout(() => {
            if (op.selected === true) {
                definir_tipo_d_fonte(`${seleccao}`, 1);
            }
        }, 1000);
    });

    caixa_d_alertas("Tipo de Fonte Salva com sucesso", "./img/alerta.svg");
});//Selector de tipo de fonte

selector_d_tamanho_d_fonte.addEventListener("change", (evt) => {
    // definir_tamanho_d_fonte("grande");
    const ops = [...evt.target.children];
    console.log(ops);
    ops.map((op) => {
        setTimeout(() => {
            if (op.selected === true) {
                seleccao = op.value;
                definir_tamanho_d_fonte(`${seleccao}`, 1);
            }
        }, 1000);
        caixa_d_alertas("Tamanho de Fonte Salva com sucesso", "./img/alerta.svg");
    });

});//Selector de tamanho de fonte

radios_.map((input_radio) => {
    input_radio.addEventListener("click", (evt) => {
        const val_input = input_radio.value;
        setTimeout(() => {
            definir_modo_de_exibicao(val_input);
        }, 1000);
        caixa_d_alertas("Exibição das Palavras Alterada Com Sucesso", "./img/alerta.svg");
    });

});//Inputs tipo radio (Possibilitam escolher o modo de exibição de palavras)

traduzir_btn.addEventListener("click", (evt) => {
    traduzir_texto();

});//Botão que efecctua a tradução

document.addEventListener("deviceready", async (evt) => {
    try {
        await iniciar_app();
        console.log(" Inciado por Device Ready");

    } catch (error) {
        console.log(`App não iniciado Device Ready ${error.message}`);

    }
}); //Acção executada ao abrir o App

document.addEventListener("DOMContentLoaded", async (evt) => {
    try {

        await iniciar_app();
        console.log("Iniciado por DOMContentLoaded");

    } catch (error) {
        console.log(`App não iniciado DOMContentLoaded ${error.message}`);
    }
});//Acção executada ao entrar no site