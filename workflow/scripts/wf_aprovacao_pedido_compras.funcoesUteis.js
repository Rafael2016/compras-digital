function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
} 

function notificarUsuario(status, email_solicitante, email_comprador, num_pc){
	if (num_pc == null || num_pc == undefined || num_pc == ""){
		return false;
	}

	if (status == null || status == undefined || status == ""){
		return false;
	}
	
	var processo = getValue("WKNumProces");
	try{
		var parametros = new java.util.HashMap();
		parametros.put("subject", "Aprovação do Pedido de Compras - Fluig ["+processo+"] - " + status);
		parametros.put("SOLICITACAO", ""+num_pc);
		parametros.put("STATUS", ""+status);
		
		var destinatarios = new java.util.ArrayList();
		
		var possui_cotacao = (email_solicitante != null && email_solicitante != "");
		
		if (possui_cotacao) {
			if (status == "Aprovada") {
				destinatarios.add(email_solicitante);
				destinatarios.add(email_comprador);
			}
			
			if (status == "Reprovada") {
				destinatarios.add(email_solicitante);
			}
		} else {
			destinatarios.add(email_comprador);
		}
		
		notifier.notify("admin", "template_email_pc", parametros, destinatarios, "text/html");
		return true;
	}catch(e){
		log.error("Erro ao notificar o usuário do processo["+processo+"]: " + e)
		return false;
	} // try catch
} // notificarUsuario

function format2Number(valor){
	if (valor == null || valor == undefined || valor == ""){
		return 0;
	}
	while (valor.indexOf(".") >= 0){
		valor = valor.replace(".", "");
	}
	if (valor.indexOf(",") >= 0){
		valor = valor.replace(",", ".");
	}
	var novoValor = Number(valor);
	if (isNaN(novoValor)){
		novoValor = 0;
	}
	return novoValor;
} // format2Number

function verificaAprovacao() {
	var strJsonTabelaAprovacao = hAPI.getCardValue("strJsonTabelaAprovacao");
	var aprovadores = JSON.parse(strJsonTabelaAprovacao);
	
	for each(objAprovador in aprovadores){
		if (objAprovador.status == null || objAprovador.status == "") {
			return "N";
		}
	}
	
	return "S";
}

function obtemUsuarioFluigPeloEmail(email) {
	if (email == null || email == undefined || email == "undefined" || email.trim() == ""){
		return false;
	}
	var c1 = DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST);
	c1.setLikeSearch( true );
	var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	var filtros = new Array(c1, c2);
	var fields = new Array("colleaguePK.colleagueId", "mail");
	var dsUsuario = DatasetFactory.getDataset("colleague", fields, filtros, null);
	return dsUsuario.getValue(0, "colleaguePK.colleagueId");
}

function obtemEmailPeloUsuarioFluig(matricula) {
	if (matricula == null || matricula == undefined || matricula == "undefined" || matricula.trim() == ""){
		return false;
	}
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	c1.setLikeSearch( true );
	var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	var filtros = new Array(c1, c2);
	var fields = new Array("mail");
	var dsUsuario = DatasetFactory.getDataset("colleague", fields, filtros, null);
	return dsUsuario.getValue(0, "mail");
}

function adicionaRegistroSituacao(codSituacao, situacao, datSituacao, obs) {
	var childData = new java.util.HashMap();
	childData.put("codSituacaoAux", codSituacao);
	childData.put("situacaoAux", situacao);
	childData.put("datSituacaoAux", datSituacao);
	childData.put("obsSituacaoAux", obs);
	hAPI.addCardChild("tabelaAuxSituacao", childData);
}