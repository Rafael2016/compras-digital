function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	if (nextSequenceId == FIM_84) {
		hAPI.setCardValue("situacao", "Finalizada");
		hAPI.setCardValue("dataFinalizacaoISO", dataCorrente("yyyy/MM/dd"));
	}
}