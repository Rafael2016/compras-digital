/**
 * @INTEGRAÇÃO GED
 * @implements  SALVAR ANEXOS DO PROCESSO  PEGAR DO FOMRULARIO PARAMETRIZAÇÃO PARA PEGAR TAXONOMIA 
 */

function servicetask82(attempt, message){
    try {

        log.info('wf_cdig_solicitacao_compra.servicetask82');
    
        var numSolicitacao  = getValue("WKNumProces");
        var atividade   = getValue('WKNumState');




        hAPI.setCardValue("statusIntegracao","ok");
        hAPI.setCardValue("errorMensagem", "Integração realizada com Sucesso");

        
    } catch (e) {
        
        var errorMgs = "wf_cdig_solicitacao_compra.servicetask82,SOLICITAÇÃO:"+numSolicitacao+",ATIVIDADE:" + atividade +",ERRO:" + e.toString;

        hAPI.setCardValue("statusIntegracao", "error");
        hAPI.setCardValue("errorMensagem", errorMgs);
        log.error(errorMgs);
        throw e;
        
    }
}