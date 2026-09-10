"use strict"
/*Função responsável por adicionar o dicionario ao local storage*/

const carregar_dicionario = async () => {
    try {
        const req = await fetch("./data/Dicionario.json");

        if (!req.ok) {
            throw new Error(`Erro Ao Carregar Dicionário`);
        }

        const palavras = await req.json();

        return palavras;

    } catch (error) {
        console.error(`Não foi possível Carregar o Dicionário ${error}`);
    }

}
/*Exportação da função*/

export default carregar_dicionario;