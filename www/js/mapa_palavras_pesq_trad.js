"use strict"

let mapa_pt = {};
let mapa_ema = {};
let chaves_palvaras_ema = [];
let chaves_palvaras_pt = [];

const criar_indices = (dicionario) => {
    dicionario.forEach(palavrar => {
        // Português
        palavrar.pesquisa_pt?.forEach(campo_pesq => {
            const chave = normalizar_texto(campo_pesq.texto);
            mapa_pt[chave] = palavrar;
        });

        // Emakhuwa
        palavrar.pesquisa_ema?.forEach(campo_pesq => {
            const chave = normalizar_texto(campo_pesq.texto);
            mapa_ema[chave] = palavrar;
        });

    });

    chaves_palvaras_ema = Object.keys(mapa_ema);
    chaves_palvaras_pt = Object.keys(mapa_pt);

    return { mapa_pt, mapa_ema, chaves_palvaras_pt, chaves_palvaras_ema }
}

const normalizar_texto = (txt) => {
    return txt?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

export {
    normalizar_texto
}

export default criar_indices;