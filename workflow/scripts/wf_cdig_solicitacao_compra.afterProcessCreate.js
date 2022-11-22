function afterProcessCreate(processId){
	
	var usuario = fluigAPI.getUserService().getCurrent();
	//var userId 	= getValue("WKUser"); //Código do usuário corrente
	
	hAPI.setCardValue("solicitanteCode", usuario.getCode());
	hAPI.setCardValue("situacao", "Aberta");
	hAPI.setCardValue("dataCriacaoISO", dataCorrente("yyyy/MM/dd"));
	hAPI.setCardValue("numeroSolicitacao", processId);
	hAPI.setCardValue("dataSolicitacao", dataCorrente("dd/MM/yyyy"));
	hAPI.setCardValue("solicitanteNome", usuario.getFullName());
	hAPI.setCardValue("solicitanteEmail", usuario.getEmail());
	
	var dataNecessidade = String(hAPI.getCardValue("dataNecessidade"))
	var dataNecessidadeISO = formatarData("dd/MM/yyyy", dataNecessidade, "yyyy/MM/dd")
	hAPI.setCardValue("dataNecessidadeISO", dataNecessidadeISO);
	
}



