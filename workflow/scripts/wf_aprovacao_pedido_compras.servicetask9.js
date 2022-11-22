function servicetask9(attempt, message) {
//Apovar no Protheus
	
//	try {
//		var processo = getValue("WKNumProces");
//		log.info("servicetask9 - Aprovar PC no Protheus - NUMERO DO PROCESSO:::::::::::::" + processo);
//		
//		var cod_empresa = hAPI.getCardValue("cod_empresa"); 
//		var cod_filial = hAPI.getCardValue("cod_filial"); 
//		var num_pedido_compra = hAPI.getCardValue("num_pedido_compra");
//		var cod_fornecedor = hAPI.getCardValue("cod_fornecedor");
//		var cod_loja = hAPI.getCardValue("cod_loja");
//		var email = obtemEmailPeloUsuarioFluig(getValue("WKUser"));
//		
//		var dataset = null;
//		var constraints = null;
//		
//		var constraints  = [];
//		constraints.push(DatasetFactory.createConstraint("EMPRESA", cod_empresa, cod_empresa, ConstraintType.MUST));
//		constraints.push(DatasetFactory.createConstraint("FILIAL", cod_filial, cod_filial, ConstraintType.MUST));
//		constraints.push(DatasetFactory.createConstraint("NUMERO", num_pedido_compra, num_pedido_compra, ConstraintType.MUST));
//		constraints.push(DatasetFactory.createConstraint("FORNECEDOR", cod_fornecedor, cod_fornecedor, ConstraintType.MUST));
//		constraints.push(DatasetFactory.createConstraint("LOJA", cod_loja, cod_loja, ConstraintType.MUST));
//		constraints.push(DatasetFactory.createConstraint("EMAIL", email, email, ConstraintType.MUST));
//
//		log.dir(constraints);
//
//		//var dataset = DatasetFactory.getDataset("dsAprovaPCProtheus", null, constraints, null);
//		
//		if(dataset.getValue(0, 'STATUS') == "ERROR"){
//			throw dataset.getValue(0, 'MESSAGE_ERROR')
//		}
//
//	} catch (erro) {
//		log.info("### Ocorreu um erro inesperado na função servicetask9")
//		log.dir(erro)
//		throw erro
//	}
}