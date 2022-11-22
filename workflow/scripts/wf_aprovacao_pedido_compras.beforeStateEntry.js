function beforeStateEntry(sequenceId){
	var dataCorrente = obterDataCorrente();
	
	if (sequenceId == GATEWAY_SELECIONAR_APROVADORES){ 
		var matriculas = obtemMatriculaAprovadoresProximoNivel(hAPI.getCardValue("strJsonTabelaAprovacao"));
		hAPI.setCardValue("matriculaAprovadorAtual", matriculas);
	}

	if (sequenceId == EM_APROVACAO){ 
		hAPI.setCardValue('codSituacao', '1');
		hAPI.setCardValue('situacao', 'Em Aprovação');
		hAPI.setCardValue('dataAtividade', dataCorrente);
		hAPI.setCardValue('cmbAprovacao', '');
		hAPI.setCardValue('txt_comentario_aprovacao', '');
		
		adicionaRegistroSituacao("1", "Em Aprovação", dataCorrente, "Aguardando aprovação do(s) usuário(s) " + hAPI.getCardValue("matriculaAprovadorAtual"));
	}

	if (sequenceId == GATEWAY_TODOS_APROVARAM){ 
		marcaAprovacaoOuReprovacaoJsonAprovacoes("A", getValue("WKUser"));
		var matriculas = obtemMatriculaAprovadoresProximoNivel(hAPI.getCardValue("strJsonTabelaAprovacao"));
		hAPI.setCardValue("matriculaAprovadorAtual", matriculas);
	}


	if (sequenceId == SOLICITACAO_APROVADA){ 
		hAPI.setCardValue('codSituacao', '2');
		hAPI.setCardValue('situacao', 'Aprovado');
		hAPI.setCardValue("dataAtividade", dataCorrente);
//		notificarUsuario("Aprovada", 
//						hAPI.getCardValue("solicitanteEmail"), 
//						hAPI.getCardValue("email_comprador"), 
//						hAPI.getCardValue("num_pedido_compra"));
		
		adicionaRegistroSituacao("2", "Aprovado", dataCorrente, "Pedido de Compra aprovado pelo usuário " + getValue("WKUser"));
	}

	if (sequenceId == SOLICITACAO_REPROVADA){ 
		marcaAprovacaoOuReprovacaoJsonAprovacoes("R", getValue("WKUser"));
		hAPI.setCardValue('codSituacao', '3');
		hAPI.setCardValue('situacao', 'Reprovado');
		hAPI.setCardValue("dataAtividade", dataCorrente);
//		notificarUsuario("Reprovada", 
//				hAPI.getCardValue("solicitanteEmail"), 
//				hAPI.getCardValue("email_comprador"), 
//				hAPI.getCardValue("num_pedido_compra"));
		
		adicionaRegistroSituacao("3", "Reprovado", dataCorrente, "Pedido de Compra reprovado pelo usuário " + getValue("WKUser"));
	}

	if (sequenceId == TRATAMENTO_ERRO_APROVACAO){ 
		hAPI.setCardValue('codSituacao', '4');
		hAPI.setCardValue("dataAtividade", dataCorrente);
		hAPI.setCardValue('situacao', 'Em tratamento de erro de Aprovação');
		
		adicionaRegistroSituacao("4", "Tratamento de erro", dataCorrente, "Erro ao aprovar no Protheus");
	}

	if (sequenceId == TRATAMENTO_ERRO_REPROVACAO){ 
		hAPI.setCardValue('codSituacao', '4');
		hAPI.setCardValue("dataAtividade", dataCorrente);
		hAPI.setCardValue('situacao', 'Em tratamento de erro de Reprovação');

		adicionaRegistroSituacao("4", "Tratamento de erro", dataCorrente, "Erro ao reprovar no Protheus");
	}
	
}

function obtemMatriculaAprovadoresProximoNivel(strJsonTabelaAprovacao) {
	var aprovadores = JSON.parse(strJsonTabelaAprovacao);
	var strAprovadores = "";
	var strAux = "";
	var nivelAtual = obtemNivelAtual();
	
	for each(objAprovador in aprovadores){
		if (parseInt(objAprovador.nivel) == nivelAtual) {
			if (objAprovador.status == null || objAprovador.status == "") {
				strAprovadores = strAprovadores + strAux + obtemUsuarioFluigPeloEmail(objAprovador.email);
				strAux = ",";
			}
		}
	}
	
	return strAprovadores;
}

function marcaAprovacaoOuReprovacaoJsonAprovacoes(status, matricula) {
	var aprovadores = JSON.parse(hAPI.getCardValue("strJsonTabelaAprovacao"));
	var email = obtemEmailPeloUsuarioFluig(matricula);
	var isOU = false;
	var nivelOU = "";
	var nomeAprovadorConjunto = "";
	
	for each(objAprovador in aprovadores){
		if (objAprovador.email == email && (objAprovador.status == null || objAprovador.status == "")) {
			
			objAprovador.status = status;
			objAprovador.data = obterDataCorrente();
			
			var motivoReprovacao = hAPI.getCardValue("motivoReprovacao");
			var strObservacao = (motivoReprovacao != null && motivoReprovacao != "" && motivoReprovacao != undefined) ? motivoReprovacao + " - ": "";
			strObservacao = strObservacao + (hAPI.getCardValue("txt_comentario_aprovacao") != null ? hAPI.getCardValue("txt_comentario_aprovacao").trim() : "Nenhum comentário");
			
			objAprovador.observacao = strObservacao;

			if (objAprovador.tipo == "U") {
				continue;
			}

			if (objAprovador.tipo == "N") {
				isOU = true;
				nivelOU = objAprovador.nivel;
				nomeAprovadorConjunto = objAprovador.nome; 
			}
		}
	}
	
	if (isOU) {
		for each(objAprovador in aprovadores){
			if (objAprovador.status == null || objAprovador.status == "") {
				if (objAprovador.nivel == nivelOU) {
					objAprovador.status = status;
					objAprovador.data = obterDataCorrente();
					objAprovador.observacao = "Aprovação em conjunto";
					objAprovador.nomeAprovadorConjunto = nomeAprovadorConjunto;
				}
			}
		}
	}
	
	hAPI.setCardValue("strJsonTabelaAprovacao", JSONUtil.toJSON(aprovadores));
}

function obtemNivelAtual() {
	var aprovadores = JSON.parse(hAPI.getCardValue("strJsonTabelaAprovacao"));
	var menorNivel = null;
	
	for each(objAprovador in aprovadores){
		if (objAprovador.status == null || objAprovador.status == "") {
			if (menorNivel == null || (menorNivel > parseInt(objAprovador.nivel))) {
				menorNivel = parseInt(objAprovador.nivel);
			}
		}
	}
	
	return menorNivel;
}

