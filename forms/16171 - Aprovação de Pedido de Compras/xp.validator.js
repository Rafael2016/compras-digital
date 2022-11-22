var firstElementToScroll = "";

var beforeSendValidate = function(numState, nextState) {
	console.log('beforeSendValidate('+numState+', '+nextState+')');
	
	if ($("#cmbAprovacao").val() == "R" && $("#txt_comentario_aprovacao").val() == "") {
		$("#txt_comentario_aprovacao").attr("placeholder", "Informe aqui o motivo da reprovação...");
		$('body').scrollTo('#txt_comentario_aprovacao', 1000, {offset: -100});
	}
	
	firstElementToScroll = "";
	var isValid = validarForm(numState, nextState);
	return isValid;
}

function validarForm(numState, nextState){
	var msgErro = "";
	var mudandoAtividade = numState != nextState;
	
	if (!mudandoAtividade){
		return true;
	} // if
	
	$('.required').each(function (index, sender) {
	    var tagName = $(this)[0].tagName;
	    if (tagName.toLowerCase() == "label") {
	    	var objeto = $(this).attr('for');
	    	var label = $(this).text();
	    	var attAtividades = $(this).attr('atividades');
	    	var atividades = null;
	    	if (attAtividades != undefined){
	    		atividades = attAtividades.split(",");
	    	} // if
	    	if ((atividades == null) || ((atividades != null) && ((atividades.length == 0) || (atividades.indexOf(numState.toString()) >= 0)))){
	    		var msgSub = subValidacao(objeto, numState, nextState);
	    		if ((msgSub != null) && (msgSub != undefined)){
	    			if (msgSub.trim() != ""){
	    				//msgErro += "- "+msgSub+"<br>";
	    				msgErro += "<li>"+msgSub+"</li>";
	    			} else {
	    				if (campoAtivo(objeto)){
	    					if (($("#"+objeto).val() == null) || (($("#"+objeto).val() != null) && ($("#"+objeto).val() == ""))){
					    		//msgErro += "- "+label+"<br>";
	    						msgErro += "<li>"+label+"</li>";
	    						
	    						if (firstElementToScroll == "")
									firstElementToScroll = objeto;
	    						
					    		atribuiEventoOnChange(objeto);
					    	} // if Valor
	    				} // if campoAtivo
	    			} // else msgSub
	    		} // if msgSub != null && undefined
	    	} // if atividades
	    } // if label
	}); // for each
	
	if (msgErro != ""){
		console.log("firstElementToScroll: " + firstElementToScroll);
		$('body').scrollTo('#' + firstElementToScroll, 1000, {
			  offset: -100
			});
		
		msgErro = "<ul>"+msgErro+"</ul>"
		FLUIGC.message.alert({
		    message: "Favor informar todos os campos obrigatórios:\n"+msgErro+
		    		 "<br><i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI.",
		    title: 'Validação',
		    label: 'OK'
		}); // message
		return false;
	} // if
	return true;
} // validarForm2

function atribuiEventoOnChange(objeto){
	$("#"+objeto).on("change", function() {
		var parent = $(this).parent();
		if (parent.hasClass("input-group")){
			parent = parent.parent();
		} // if

		if ($(this).val() == null || $(this).val() == ""){
			if (!parent.hasClass("has-error")){
				parent.addClass("has-error");	
    		} // if
		} else {
			if (parent.hasClass("has-error")){
				parent.removeClass("has-error");	
			} // if
		} // if
	}).change();
} // atribuiEventoOnChange

function campoAtivo(sender){
	// quando um campo esta desabilitado pelo evento enableFields, o fluig coloca um "_" na frente.
	var objeto = "_"+sender;
	if ($("#"+objeto).length == 0){
		objeto = sender;
	} // if
	var isDisabled = $("#"+objeto).prop("disabled");
	var isReadOnly = $("#"+objeto).prop("readonly");
	if (isDisabled == null || isDisabled == undefined){
		isDisabled = false;
	} // if
	if (isReadOnly == null || isReadOnly == undefined){
		isReadOnly = false;
	} // if
	var semAtributos = isDisabled || isReadOnly; 
	return !semAtributos;
} // campoAtivo