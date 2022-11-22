function validateForm(form) {

	var activity = getValue('WKNumState');
	
	var CURRENT_STATE = getValue("WKNumState");
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask") == "true");

	var msg;
	var errorMsg = "";
	var lineBreaker = "\r\n";
	
	if( activity == INICIO_NULL || activity == INICIO_0 || activity == INICIO ) {
		
		if (campoVazio(form, "cod_empresa")) {
			errorMsg += "Código da Empresa." + lineBreaker;
		}
		
		if (campoVazio(form, "nom_empresa")) {
			errorMsg += "Nome da Empresa." + lineBreaker;
		}
		
		if (campoVazio(form, "cod_filial")) {
			errorMsg += "Código da Filial." + lineBreaker;
		}
		
		if (campoVazio(form, "email_comprador")) {
			errorMsg += "E-mail do comprador." + lineBreaker;
		}

		if (campoVazio(form, "nom_filial")) {
			errorMsg += "Nome da Filial." + lineBreaker;
		}

		if (campoVazio(form, "num_pedido_compra")) {
			errorMsg += "Número do Pedido de Compra." + lineBreaker;
		}
		
		if (campoVazio(form, "cod_fornecedor")) {
			errorMsg += "Código do Fornecedor." + lineBreaker;
		}

		if (campoVazio(form, "cod_loja")) {
			errorMsg += "Loja do Fornecedor." + lineBreaker;
		}

		if (campoVazio(form, "num_cgc")) {
			errorMsg += "CGC do Fornecedor." + lineBreaker;
		}

		if (campoVazio(form, "dat_emissao")) {
			errorMsg += "Data de Emissão." + lineBreaker;
		}

		if (campoVazio(form, "cod_centro_custo")) {
			errorMsg += "Código do Centro de Custo." + lineBreaker;
		}

		if (campoVazio(form, "dsc_centro_custo")) {
			errorMsg += "Descrição do Centro de Custo." + lineBreaker;
		}

		if (campoVazio(form, "cod_condicao_pagamento")) {
			errorMsg += "Código da Condição de Pagamento." + lineBreaker;
		}

		if (campoVazio(form, "dsc_condicao_pagamento")) {
			errorMsg += "Descrição da Condição de Pagamento." + lineBreaker;
		}

		if (errorMsg != "") {
			throw "Informe os campos obrigatórios: " + errorMsg;
		}
		
		//Validando a lista de aprovadores
		var aprovadores = JSON.parse(form.getValue("strJsonTabelaAprovacao"));
		for each(objAprovador in aprovadores){
			if (objAprovador.email == null || objAprovador.email == "") {
				throw "Aprovador " + objAprovador.nome + " sem e-mail";
			}
			
			if (!existeNoFluig(objAprovador.email)) {
				throw "O e-mail " + objAprovador.email + " não existe no fluig";
			}
		}
	}
	
	if( activity == EM_APROVACAO ) {
		
		if (campoVazio(form, "cmbAprovacao")) {
			errorMsg += "<li>Ação</li>";
		}
		
		if (form.getValue("cmbAprovacao") == "R") {
			if (campoVazio(form, "zoomMotivoReprovacao")) {
				errorMsg += "<li>Motivo da Reprovação</li>";
			}

			if (campoVazio(form, "txt_comentario_aprovacao")) {
				errorMsg += "<li>Comentário da Reprovação</li>";
			}
		}
		
		if (errorMsg != ""){
			errorMsg = "<ul>" + errorMsg + "</ul>";
			exibirMensagem(form, "Informe os campos <b>obrigatórios:</b><br/>" + errorMsg);
		}
	}
}

function existeNoFluig(email) {
	if (email == null || email == undefined || email == "undefined" || email.trim() == ""){
		return false;
	}
	var c1 = DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST);
	c1.setLikeSearch( true );
	var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	var filtros = new Array(c1, c2);
	var fields = new Array("colleaguePK.colleagueId", "mail");
	var dsUsuario = DatasetFactory.getDataset("colleague", fields, filtros, null);
	return ((dsUsuario!=null) && (dsUsuario.rowsCount > 0));
}

function campoVazio(form, fieldname){
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")){
		return true;
	} // if
	return false;
}

function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
	
	if (mobile) {
		throw mensagem;
	} else {
		throw "<div class='alert alert-warning' role='alert'>" +
				"<strong>Atenção:</strong> " + mensagem +
				"</div>"+
				"<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI.";		
	} // else if
} // exibirMensagem