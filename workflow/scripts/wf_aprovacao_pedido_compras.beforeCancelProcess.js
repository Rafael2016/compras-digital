function beforeCancelProcess(colleagueId,processId){
	var dataCorrente = obterDataCorrente();

	hAPI.setCardValue("codSituacao", "5");
	hAPI.setCardValue("situacao", "Cancelado");
	hAPI.setCardValue("dataAtividade", dataCorrente);
}