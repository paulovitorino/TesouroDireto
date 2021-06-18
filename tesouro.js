/*
* @return Retorns data from Brazilian Government Bonds: Name, Reference Date.
* @customfunction
**/
function TesouroDireto() {
    let srcURL = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";
    let jsonData = UrlFetchApp.fetch(srcURL);
    let parsedData = JSON.parse(jsonData.getContentText()).response;
    
    let atualizacao = new Date(parsedData.TrsrBondMkt.qtnDtTm);
    let cont = 0;
    const valoresArray = [];

    for(let bond of parsedData.TrsrBdTradgList) {
        valoresArray[cont] = [bond.TrsrBd.nm, atualizacao];
        cont++;
    }
    return valoresArray;
}