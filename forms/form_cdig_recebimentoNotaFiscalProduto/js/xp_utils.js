function alerta(mensagem){
	
	FLUIGC.message.alert({
	    message: mensagem,
	    title: 'Atenção!',
	    label: 'OK, Entendi'
	}, function(el, ev) {
		
	});
}

function scrollToPanel(id) {
	$('body').scrollTo('#' + id, 1000, {
		offset: -100
	});
}
/***
 * @TOAST ALERT FLUIG 
 */
function exibirMensagem(titulo ='Ops!', mensagem, tipo = 'info'){
    FLUIGC.toast({
        title: title,
        message: messagem,
        type: type,
      });
}

function isPreenchido(valor) {
	if (valor == null || valor == undefined || valor == "") {
		return false;
	}
	
	return true;
}

function convertStringFloat(valor) {
	if (valor == null || valor == undefined || valor == ""){
		return 0;
	}
	
    if (valor.indexOf(',') == -1) {
	    } else {
        valor = String(valor).split(".").join("").replace(",",".");
    }
    
    valor = parseFloat(valor).toFixed(2);

    return valor;
}

/**
 * Retorna o índice da linha da tabela pai e filho com base em uma string que pode ser o name ou id de um campo qualquer 
 * @param {String} id Parâmetro obrigatório, id ou name de um campo qualquer da tabela pai e filho
 * @example
 * getIndice("dependenteNome___8") - Retorna o índice 8
 * @return {String}
 * @author Sérgio Machado
 */
function getIndice(id) {
	return id.split('___').pop();
}

function aplicaMask(){
	var inputs = $("[mask]");
	MaskEvent.initMask(inputs);
}

function returnsIndicesTable(tablename) {
	let indices = [];
	let lines = $("table[tablename='" + tablename + "'] tbody tr");
	for(var i = 1; i < lines.length; i++) {
		let input = $(lines[i]).find("input")[0];
		let field = input == undefined ? $(lines[i]).find("span")[0] : input;
		if(field !== undefined)
			indices.push(field.id.split("___")[1]);
	}
	return indices;
}

/***
 * @REMOVER CARACTER DE CNPJ E CPF
 */
function removerCaracterCNPJ(cnpj){
    return  cnpj.replace(/\D/g, '');
}