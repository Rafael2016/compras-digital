function beforeCancelProcess(colleagueId,processId){
	
	hAPI.setCardValue("situacao", "Cancelada");
	hAPI.setCardValue("dataFinalizacaoISO", dataCorrente("yyyy/MM/dd"));
}