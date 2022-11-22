/**
 * @EVENTO OCORRE APÒS SAIDA 
 */
function afterStateLeave(sequenceId){

    var atividade = getValue('WKNumState');
    var numProcess= getValue("WKNumProces");

    if(atividade == 0 || atividade == 10 || atividade == 17){

        hAPI.setCardValue("atividadeAnterior",atividade);
        hAPI.setCardValue("atividadeCorrente",sequenceId);
        hAPI.setCardValue("numSolicitacao",numProcess);
    }




}