/*
* Copyright (c) 2021 Paulo Vitorino (https://github.com/paulovitorino)
* @return Returns data from Brazilian Government Bonds: Name, Withdraw Value, Withdraw Date, Reference Date.
* @customfunction
**/
function TesouroDireto(valores) {
    let srcURL = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";
    let jsonData = UrlFetchApp.fetch(srcURL);
    let parsedData = JSON.parse(jsonData.getContentText()).response;

    valores = valores.split(" ").join("");
    valores = valores.split(";").join(",");
    const partArray = valores.split(",");

    let atualizacao = new Date(parsedData.TrsrBondMkt.qtnDtTm);
    let cont = 0;
    var valoresArray = [];
    var linha = [];
    let contLinha = 0;

    for (let bond of parsedData.TrsrBdTradgList) {
        for (let part of partArray) {
            linha[contLinha] = RetornaPadrao(bond, part, atualizacao);
            contLinha++;
        }
        valoresArray[cont] = Array.from(linha);
        cont++;
        contLinha = 0;
    }
    return valoresArray;
}
/*
* @return Returns values defined by B3 in JSON file for TesouroDireto function.
* @customfunction
**/
function RetornaPadrao(source, part, atual) {
    switch (part) {
        case "nome":
            return source.TrsrBd.nm;
        case "dataref":
            return atual;
        case "valor":
            return source.TrsrBd.untrRedVal;
        case "datafim":
            return new Date(source.TrsrBd.mtrtyDt);
        default:
            return "#ERROR";
    }
}