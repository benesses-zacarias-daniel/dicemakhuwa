"use strict"

const body = document.body;

const remover_duplicata = () => {
    const caixa_ = document.querySelector(".caixa_")
    if (caixa_) {
        caixa_.remove();
    }
}

const caixa_d_alertas = (msg, src_icone_oper,) => {

    const caixa_d_mens = document.createElement("div");
    const mensg = document.createElement("span");
    const icone_oper = document.createElement("img");

    caixa_d_mens.setAttribute("class", "caixa_");
    mensg.setAttribute("class", "texto_caixa");
    icone_oper.setAttribute("src", `${src_icone_oper}`)
    // console.log("caixa");

    mensg.innerHTML = msg;
    remover_duplicata()

    caixa_d_mens.appendChild(icone_oper);
    caixa_d_mens.appendChild(mensg);
    body.appendChild(caixa_d_mens);

    setTimeout(() => { caixa_d_mens.remove() }, 1950);
}

export {
    remover_duplicata
}
export default caixa_d_alertas;