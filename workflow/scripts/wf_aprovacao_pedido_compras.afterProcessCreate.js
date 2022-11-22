function afterProcessCreate(processId){
	
	// [Inicio] Campos de controle
	hAPI.setCardValue("numeroSolicitacao", processId);
	var emissao = obterDataCorrente();
	hAPI.setCardValue("dataSolicitacao", emissao);
	hAPI.setCardValue("situacao", "Aguardando Aprovação");
	// [Fim] Campos de controle
	
	var campoDescritor = "Empresa: " + hAPI.getCardValue("nom_empresa") + " - " + hAPI.getCardValue("nom_empresa") + " \n"+
						 "Filial: "  + hAPI.getCardValue("cod_filial") + " - " + hAPI.getCardValue("nom_filial") + " \n"+
						 "Nº PC: " + hAPI.getCardValue("num_pedido_compra");
  	 hAPI.setCardValue("campoDescritor", campoDescritor);
}