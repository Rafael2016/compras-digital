/**
 * @INTEGRAÇÃO PROTHEUS
 * @implements  Quando started fluxo integrar Solicitação de Compra com status bloqueado
 *  após aprovação gestor atualizar status liberado
 */
function servicetask58(attempt, message){

    try {

        log.info('wf_cdig_solicitacao_compra.servicetask58');
    
        var numSolicitacao  = getValue("WKNumProces");
        var atividade   = getValue('WKNumState');




        hAPI.setCardValue("statusIntegracao","ok");
        hAPI.setCardValue("errorMensagem", "Integração realizada com Sucesso");

        
    } catch (e) {
        
        var errorMgs = "wf_cdig_solicitacao_compra.servicetask58,SOLICITAÇÃO:"+numSolicitacao+",ATIVIDADE:" + atividade +",ERRO:" + e.toString;

        hAPI.setCardValue("statusIntegracao", "error");
        hAPI.setCardValue("errorMensagem", errorMgs);
        log.error(errorMgs);
        throw e;
        
    }
}