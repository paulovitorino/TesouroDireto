/*
* Copyright (c) 2021 Paulo Vitorino (https://github.com/paulovitorino)
*
***************** MAIN FUNCTIONS ****************
*
* @return Returns data from Brazilian Government Bonds: Name, Withdraw Value, Withdraw Date, Reference Date (English Language).
* @customfunction
**/
function BrazilianBond(valores) {
    let parsedData = getData();
    const partArray = partes(valores);

    let atualizacao = new Date(parsedData.TrsrBondMkt.qtnDtTm);
    let cont = 0;
    var valoresArray = [];
    var linha = [];
    let contLinha = 0;

    for (let bond of parsedData.TrsrBdTradgList) {
        for (let part of partArray) {
            linha[contLinha] = RetornaPadraoEn(bond, part, atualizacao);
            contLinha++;
        }
        valoresArray[cont] = Array.from(linha);
        cont++;
        contLinha = 0;
    }
    return valoresArray;
}
/*
* @return Returns data from Brazilian Government Bonds: Name, Withdraw Value, Withdraw Date, Reference Date (Portuguese Language).
* @customfunction
**/
function TesouroDireto(valores) {
    let parsedData = getData();
    const partArray = partes(valores);

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
*************** SUPPORT FUNCTIONS ***************
*
* @return Returns array for supporting functions.
* @customfunction
**/
function partes(values) {
    values = values.split(" ").join("");
    values = values.split(";").join(",");
    let partArray = values.split(",");
    return partArray;
}
/*
* @return Returns basic data for supporting functions.
* @customfunction
**/
function getData() {
    let srcURL = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";
    let jsonData = UrlFetchApp.fetch(srcURL);
    let data = JSON.parse(jsonData.getContentText()).response;
    return data;
}
/*
* @return Returns values defined by B3 in JSON file for TesouroDireto function (Portuguese Language).
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
/*
* @return Returns values defined by B3 in JSON file for BrazilianBonds function (English Language).
* @customfunction
**/
function RetornaPadraoEn(source, part, atual) {
    switch (part) {
        case "name":
            return source.TrsrBd.nm;
        case "refdate":
            return atual;
        case "wtdvalue":
            return source.TrsrBd.untrRedVal;
        case "wtddate":
            return new Date(source.TrsrBd.mtrtyDt);
        default:
            return "#ERROR";
    }
}