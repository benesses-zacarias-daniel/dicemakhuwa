"use strict"

import caixa_d_alertas from "./caixa_d_alertas.js";

/*Função que possibilita copiar o texto da área do tradutor*/
const copiar_texto = (texto_cop_entrada, texto_cop_trad) => {
    if (texto_cop_entrada !== "" && texto_cop_trad !== "") {
        const texto_copy = `O significado da palavra ${texto_cop_entrada} é ${texto_cop_trad}`;
        navigator.clipboard.writeText(texto_copy);

        caixa_d_alertas("Texto Copiado Para Área De Transferência.", "./img/copy_p.svg")
    }
}

/*Exportação da função*/
export default copiar_texto;