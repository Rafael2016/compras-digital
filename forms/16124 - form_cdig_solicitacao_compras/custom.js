$(document).ready(function() {
	
	FLUIGC.calendar('#dataNecessidade',{
		minDate: new Date()
	});
	
});


/**
 * @TOAST ALERT FLUIG
 */
 fluigToast=(title, messagem, type)=> {
    FLUIGC.toast({
      title: title,
      message: messagem,
      type: type,
    });
  }



 /**
  *@ADD PAI E  FILHO ANEXO 
  */   
adicionarAnexo=()=> {
	var indice = wdkAddChild('tabelaAnexos');
	
	$("#btnViewerDocumento___" + indice).hide();
	$("#btnDownloadDocumento___" + indice).hide();
	
	$("#lblAnexo___" + indice).hide();
	$("#descAnexo___" + indice).hide();
}

 /**
  * 
  */
 /**
 * @REMOVE ITEM PAI E  FILHO
 */
  removerAnexo=(event)=>{
	
	try {
		const tabela = $(event).closest('table')[0];
		const tablename = tabela.getAttribute("tablename");
		const indice = getIndice($(event).closest('tr').find("input")[0].id);
		const descricao = $(`#anexoDocumento___${indice}`).val() || "Sem descrição";
		FLUIGC.message.confirm({
			message: `Deseja remover o item <b>${descricao}</b>?`,
			title: 'Confirmação',
			labelYes: 'Sim, quero remover',
			labelNo: 'Não, quero cancelar',
		}, function(result) {
			if (result) {
				cleanAnexo("anexoDocumento___" + indice, 'Documento', true);
				fnWdkRemoveChild(event);
//				tableRowsCount(tablename);
                fluigToast("Opa!","Arquivo removido com sucesso..","info")
				// exibirMensagem("Sucesso: ", `Item ${descricao} removido da lista`, "success")
			}
		});
	} catch (e) {
		console.error(`Houve um erro inesperado na função ${arguments.callee.name}`)
		console.error(e)
	}
}

/**
 * @SHOW TABLE ESCOPO
 */
showEscopo=(el)=>{
	 
	if(el.value == "servico"){
		document.getElementById("section-escopo").classList.remove("hide")
	}else{
		document.getElementById("section-escopo").classList.add("hide")
	}

}


//#################   FUNÇÂO ULTIL ####################
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



