
function initAnexos(){
	window.parent.$("#ecm-navigation-inputFile-clone").change(function(e){
        var fileName = e.target.files[0].name;
        console.log("Filename: " + fileName);
        console.log("currentIdAnexo: " + currentIdAnexo);
        
        if (!existeArquivo(fileName)) {
        	$("#anexo" + currentIdAnexo).val(fileName);
        	$("#id" + currentIdAnexo).val(currentIdAnexo.split("Documento___")[1])
        	
        	$("#btnAnexo" + currentIdAnexo).hide();
        	$("#btnDownload" + currentIdAnexo).fadeIn("#btnDownload" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$("#btnLimparAnexo" + currentIdAnexo).fadeIn("#btnLimparAnexo" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$("#nomeArquivo" + currentIdAnexo).val($("#anexo" + currentIdAnexo).val())
        } if (existeArquivo(fileName)){
        	$("#anexo" + currentIdAnexo).val(fileName);
        	$("#btnAnexo" + currentIdAnexo).hide();
        	$("#btnDownload" + currentIdAnexo).fadeIn("#btnDownload" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$("#btnLimparAnexo" + currentIdAnexo).fadeIn("#btnLimparAnexo" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$('#tabelaAnexos tbody tr').not(':first').each(function(index, tr) {
	        	var id = $("input.anexo", tr).attr('id');
		   		var indice = id.split("___")[1];
		   		var anexoDocumento = "anexo" + currentIdAnexo
		   		
	        	cleanAnexo(anexoDocumento, 'Documento', true);
		   		$("#nomeArquivo" + currentIdAnexo).val("")
        	});
        	
        	exibirMensagem("Atenção: ", "Este arquivo já foi anexado");
        }
    });
}

function showCameraCustom(id, idInputAnexo, isPaiFilho) {
	
	let parameter = null;
	if (isPaiFilho) {
		var valores = id.split('___');
		indice = valores[1];
		parameter = idInputAnexo + "___" + indice;
	} else {
		parameter = idInputAnexo;
	}

	currentIdAnexo = parameter;
    
	if (!getMobile()) {
		var tabAttachments = parent.document.getElementById("tab-attachments");
		if (tabAttachments) {
			var $tabList = $(tabAttachments).parent();
			if ($tabList.hasClass("active") && !$tabList.hasClass("out")) {
				console.log("scroll");
			} 
			
			if (parent.WCMAPI.isIe9()) {
				$(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
				$("#ecm-navigation-silverlight", parent.document).attr({
					"data-on-camera": "true",
					"data-file-name-camera": parameter
				});
				$(parent.document).on("keyup", this.actionKeyup)
			} else {
				openInputFileCustom("ecm-navigation-inputFile-clone", parameter)
			}
		}
	} else {
		JSInterface.showCamera(parameter);
		$("#" + parameter).val(parameter);
	}
}

function openInputFileCustom(elementId, parameter) {
    var element = parent.document.getElementById(elementId);
    
    if (element && document.createEvent) {
        element.setAttribute("data-on-camera", "true");
//        if (parameter) {
//        	element.setAttribute("data-file-name-camera", $("#" + parameter).val());
            //element.setAttribute("data-file-name-camera", prefixo + $("#" + parameter).val());
//        }
        
        element.click();
    }
}

function downloadAnexo(id, idInputAnexo, isPaiFilho) {	
	let nomeArquivo = null;
	
	if (isPaiFilho) {
		var indice = id.split("___")[1];
		nomeArquivo = $("#anexo" + idInputAnexo + "___" + indice).val();
	} else {
		nomeArquivo = $("#anexo" + idInputAnexo).val();
	}
	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var physicalFileName = attachment.physicalFileName;
		var attachmentName = attachment.name;

		if (getFormMode() == "ADD") {
			if(nomeArquivo == attachmentName) {
				parent.WKFViewAttachment.downloadAttach([i]);
			}
		} else {
			if((nomeArquivo == physicalFileName) || (nomeArquivo == attachmentName)) {
				parent.WKFViewAttachment.downloadAttach([i]);
			}
		}
    });
}

function viewerAnexo(id, idInputAnexo, isPaiFilho) {	
	
	let nomeArquivo = null;
	let documento = null;

	if (isPaiFilho) {
		let indice = id.split("___")[1];
		nomeArquivo = $("#anexo" + idInputAnexo + "___" + indice).val();
	} else {
		nomeArquivo = $("#anexo" + idInputAnexo).val();
	}
	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentName = attachment.name;
		var physicalFileName = attachment.physicalFileName;

		if(nomeArquivo == physicalFileName) {
        	parent.WKFViewAttachment.openAttachmentView('admin', attachment.documentId, 1000);
        }
    });
}

function cleanAnexo(id, idInputAnexo, isPaiFilho) {
	
	let valorAnexo = null;
	let indice = null;
	
	if (isPaiFilho) {
		indice = id.split("___")[1];
		valorAnexo = $("#anexo" + idInputAnexo + "___" + indice).val();
        //Refactore Vaçidacaoção
        if(valorAnexo == ""){
            return false;''
        }
		$("#nomeArquivo" + currentIdAnexo).val("")
	} else {
		valorAnexo = $("#anexo" + idInputAnexo).val();
	}
	
	$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) { 
		
		if(attachment.description == valorAnexo) { 
			parent.WKFViewAttachment.removeAttach([i]); 
			
			if (isPaiFilho) {
				$("#anexo" + idInputAnexo + "___" + indice).val("");
				$("#btnAnexo" + idInputAnexo + "___" + indice).show();
				$("#btnViewer" + idInputAnexo + "___" + indice).hide();
				$("#btnDownload" + idInputAnexo + "___" + indice).hide();
				$("#btnLimparAnexo" + idInputAnexo + "___" + indice).hide();
			} else {
				$("#anexo" + idInputAnexo).val("");
				$("#btnAnexo" + idInputAnexo).show();
				$("#btnViewer" + idInputAnexo).hide();
				$("#btnDownload" + idInputAnexo).hide();
				$("#btnLimparAnexo" + idInputAnexo).hide();
			}
		} 
	}); 
}

function existeArquivo(nomeArquivo) {
	
	var existe = false;
	$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) { 
		if(attachment.description == nomeArquivo) {
			existe = true;
		} 
	});
	
	return existe;
}

function controlaAnexo(termoBotaoAnexo) {
	var atividade = getWKNumState();
	var mode = getFormMode();
	
	var canShowAnexo = (atividade == ABERTURA || atividade == INICIO) && (mode != 'VIEW');
	var canShowLimpar = (atividade == ABERTURA || atividade == INICIO) && (mode != 'VIEW');
	
	var specialChar = ((atividade != ABERTURA && atividade != INICIO) && mode != 'VIEW') ? "_" : "";
	
	var anexo_str = $("#anexo" + termoBotaoAnexo).val();
	if ((anexo_str != null && anexo_str != "") && existeArquivo(anexo_str)) {
		$("#" + specialChar + "btnAnexo" + termoBotaoAnexo).hide();
		
		$("#" + specialChar + "btnViewer" + termoBotaoAnexo).show();
		$("#" + specialChar + "btnViewer" + termoBotaoAnexo).prop("disabled", false);
		
		$("#" + specialChar + "btnDownload" + termoBotaoAnexo).show();
		$("#" + specialChar + "btnDownload" + termoBotaoAnexo).prop("disabled", false);
		
		if(canShowLimpar) {
			$("#" + specialChar + "btnLimparAnexo" + termoBotaoAnexo).show();
		}
	} else {
		$("#" + specialChar + "anexo" + termoBotaoAnexo).val("");
		
		if (canShowAnexo) {
			$("#" + specialChar + "btnAnexo" + termoBotaoAnexo).show();
		} else {
			$("#" + specialChar + "btnAnexo" + termoBotaoAnexo).hide();
		}
		
		$("#" + specialChar + "btnViewer" + termoBotaoAnexo).hide();
		
		$("#" + specialChar + "btnLimparAnexo" + termoBotaoAnexo).hide();
	}
}

/***
 * @CONTOLE ANEXOS EXIBIÇÃO
 */
function showHideControleAnexos() {
	$('#tabelaAnexos tbody tr').not(':first').each(function(index, tr) {
		 var id = $("input.anexo", tr).attr('id');
		 var indice = id.split("___")[1];
		 
		 controlaAnexo("Documento___" + indice);
    });
}


console.log('xp_attach')