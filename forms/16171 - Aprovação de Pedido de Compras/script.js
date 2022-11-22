$(document).ready(function() {
	carregarFormulario();
}); 

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

window.onload = function(){
	// Component construction by setting the window.
 	myLoading = FLUIGC.loading(window);

 	var atividade = getWKNumState();
 	
 	if (atividade != EM_APROVACAO) {
 		$("#divPainelAprovacao").hide();
 	}
	
 	$("#imgSolicitante").attr("src","/social/api/rest/social/image/profile/" + $("#solicitanteMatricula").val() + "/SMALL_PICTURE");

	$('#collapseDadosSolicitacao, #collapseMapaCotacao, #collapseAprovacao, #collapseResumoAprovacao').collapse('show');
	
 	myLoading.show();
	setTimeout(function() {
		montarPedidoCompras();
		montaTabelaCotacao();
		carregaTabelaAprovacaoJson();
		
		myLoading.hide();
	}, 500);
	
	bindings();

	showHideMotivo();
}

function bindings() {
	$('#cmbAprovacao').on('change', function() {
		showHideMotivo();
	});
}

function showHideMotivo() {
	var acao = $("#cmbAprovacao").val();
	if (acao == "R") {
		$("#div_motivo").show();
	} else {
		$("#div_motivo").hide();
		$("#motivoReprovacao").val("");
		try {
			window["zoomMotivoReprovacao"].clear();
		} catch (e) {
		}
	}
}

function setSelectedZoomItem(sender) {
	var nomeObjeto = sender.inputId;
	
	if (nomeObjeto == "zoomMotivoReprovacao") {
		$("#motivoReprovacao").val(sender["DESCRICAO"]);
	}
}

function removedZoomItem(sender) {
	var nomeObjeto = sender.inputId;
	var atividade = getWKNumState();
	
	if (nomeObjeto == "zoomMotivoReprovacao") {
		$("#motivoReprovacao").val("");
	}
}

function exibirMensagem(titulo, mensagem, tipo){
	// tipos:
	//  - danger
	//  - warning
	//  - success
	//  - info
	if ((tipo == null) || (tipo == undefined) || tipo == ""){
		tipo = "info";
	} // if
	FLUIGC.toast({
		title: titulo,
		message: mensagem,
		type: tipo
	}); // toast
} // exibirMensagem

function carregarFormulario() {
	var titulo = "Aprovação de Pedido de Compras";
		
	$("#lblTitulo").text(titulo);
	$("#lblNumero").text($("#num_pedido_compra").val());
	$("#lblFornecedor").text($("#num_cgc").val() + " - " + $("#nom_fornecedor").val());
	$("#lblDataEmissaoProtheus").text($("#dat_emissao").val());
	$("#lblFilial").text($("#cod_filial").val() + " - " + $("#nom_filial").val());
	$("#lblNomeContato").text($("#nom_contato").val());
	$("#lblCentroCusto").text($("#cod_centro_custo").val() + " - " + $("#dsc_centro_custo").val());
	$("#lblEmailFornecedor").text($("#emailFornecedor").val());
	$("#lblSolicitacaoCotacao").text($("#numSolicitacaoCotacao").val());
	statusAprovacao();
}

function statusAprovacao(){
	var atividade = getWKNumState();
	$("#lblStatus").text($("#situacao").val());
	
	if( atividade == SOLICITACAO_APROVADA){
		$("#divStatus").removeClass("btn btn-info");
		$("#divStatus").addClass("btn btn-success");
	} else if( atividade == SOLICITACAO_REPROVADA){
		$("#divStatus").removeClass("btn btn-info");
		$("#divStatus").addClass("btn btn-danger");
	} 
}

function carregaTabelaAprovacaoJson() {
	try {
		var obj = jQuery.parseJSON($("#strJsonTabelaAprovacao").val());
		obj.sort(sortNivel("nivel"));
		
		$.each(obj, function(i, item) {
			montaResumoAprovacao(
					obj[i].nivel, 
					obj[i].nome, 
					obj[i].tipo, 
					obj[i].status,
					obj[i].data,
					obj[i].origem,
					obj[i].aprovador,
					obj[i].observacao,
					obj[i].nomeAprovadorConjunto
					);
		});
		
	} catch (e) {
		console.log("Erro:" + e);
	}
}

function sortNivel(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function montaResumoAprovacao(nivel, nome, tipo, status, data, origem, usuarioAprovador, observacao, nomeAprovadorConjunto) {
	
	console.log("status: " + status);
	console.log("nome: " + nome);
	console.log("usuarioAprovador: " + usuarioAprovador);
	
//	if (status == "A" && usuarioAprovador != nome) {
//		return;
//	}
	
	var strHtml = "";
	var strClass = "text-info";
	var strIcon = "fluigicon-user-pending";
	status = status.toUpperCase();
	
	if ( status == "A" ){
		status = "APROVADO";
	} else
	if ( status == "R" ){
		status = "REPROVADO";
	} else
	if ( status == "" ){
		status = "";
	}
	
	if (status.toUpperCase() == "APROVADO") {
		strClass = "text-success";
		strIcon = "fluigicon-check-circle-on";
	}
	
	if (status.toUpperCase() == "REPROVADO") {
		strClass = "text-danger";
		strIcon = "fluigicon-remove-sign";
	}
	
	if (status == "") {
		strHtml = 
			' <header>' +
			'	<strong>Nível ' + nivel + ' &nbsp;&nbsp;</strong><span class="' + strClass + '"><span class="fluigicon ' + strIcon + ' fluigicon-sm"></span>&nbsp;<strong>AGUARDANDO APROVAÇÃO</strong></span> de ' + nome +
			' </header> ';
	} else {
		var nomeAprovador = "";
		if (nomeAprovadorConjunto != undefined) {
			nomeAprovador = nomeAprovadorConjunto + " (Em nome de " + nome + ")";
		} else {
			nomeAprovador = nome;
		}
		
		strHtml = 
			' <header> ' +
			'	<strong>Nível ' + nivel + ' &nbsp;&nbsp;</strong><span class="' + strClass + '"><span class="fluigicon ' + strIcon + ' fluigicon-sm"></span>&nbsp;<strong>' + status + '</strong></span> por ' + nomeAprovador + ' em ' + data +
			' </header> ';
			
		if (observacao != undefined) {
			strHtml = strHtml +	' <p>Obs: ' + observacao + '</p>';
		}
	}
	$("#divResumoAprovacao").append(strHtml);
}

function alerta(mensagem){
	FLUIGC.message.alert({
	    message: mensagem,
	    title: 'Atenção!',
	    label: 'OK, Entendi'
	}, function(el, ev) {
		
	});
}

function montarPedidoCompras() {
	$("#div_pedido_compra").empty();
	let strHtml = "";
	
	var arrayFornecedores = [];
	arrayFornecedores.push($("#num_cgc").val());
	
	var arrayObj = [];
	var obj = null;
	
	for (i = 0; i < arrayFornecedores.length; i++) {
		  
		var arrayItens = []
	    $('input[id^="codItemSC___"]').each(function(index, value){
			if (value.id.split("___").length > 1) {
				let indice = value.id.split("___")[1];
				
//				var vencedor = $("#cmbVencedor___" + indice).val();
//				var acao = $("#cmbAcao___" + indice).val();
				
//				if (arrayFornecedores[i] == vencedor && acao == 'GerarPC') {
					var item = {
							codItem : $("#codItemSC___" + indice).val(),
							dscItem : $("#dscItemSC___" + indice).val(),
							unidadeMedida : $("#umItemSC___" + indice).val(),
							quantidade : $("#qtdItemSC___" + indice).val()
					}
					arrayItens.push(item); 
//				} 
			}
		});
		
		obj = { 
			vencedor: arrayFornecedores[i],
			itens: arrayItens
		}
		
		arrayObj.push(obj);
	} 
	
	console.dir(arrayObj);
	
	$.each(arrayObj, function(i, o) {
		
		var f = {
			 	cnpj: o.vencedor,
			 	razaoSocial: $("#nom_fornecedor").val()
		 	};
		var c = getDadosCotacaoFornecedor(o.vencedor);
		
		strHtml +=
			' <div class="col-md-12 form-group"> ' +
			' 	<div class="card"> ' +
			' 		<div class="card-body"> ' +
			' 			<h5 class="card-title" style="color:#7aa7c7">Pedido de Compra</h5> ' +
			' 			<table id="tablePC' + o.vencedor + '" style="width: 100%" > ' +
			'				<thead> ' +
		    '					<tr> ' +
		    '  						<th class="headerTableCotacao">Cód. Item</th> ' +
		    '  						<th class="headerTableCotacao">Descrição</th> ' +
		    '  						<th class="headerTableCotacao">UM</th> ' +
		    '  						<th class="headerTableCotacao">Qtd.</th> ' +
		    '  						<th class="headerTableCotacao">Valor Unit.</th> ' +
		    '  						<th class="headerTableCotacao">Desconto</th> ' +
		    '  						<th class="headerTableCotacao">Frete</th> ' +
		    '  						<th class="headerTableCotacao">Total</th> ' +
		    '					</tr> ' +
		    '				</thead> ' +
		    '				<tbody> ';
		
			var total = 0;
			$.each(o.itens, function(j, item) {
				var ic = getItemCotacao(o.vencedor, item.codItem);
				if (ic != null) {
					total = Number(total) + Number(convertStringFloat(ic.valTotal));
					
					strHtml += 	' 	<tr> ' +
					'		<td class="itemTableCotacao">' + item.codItem +' </td> ' +
					' 		<td class="itemTableCotacao"> ' + item.dscItem +' </td> ' +
					' 		<td class="itemTableCotacao"> ' + item.unidadeMedida +' </td> ' +
					' 		<td class="itemTableCotacao"> ' + item.quantidade +' </td> ' +
					' 		<td class="itemTableCotacao" style="text-align: right"> ' + ic.valUnitario +' </td> ' +
					' 		<td class="itemTableCotacao" style="text-align: right"> ' + ic.valDesconto +' </td> ' +
					' 		<td class="itemTableCotacao" style="text-align: right"> ' + ic.valFrete +' </td> ' +
					' 		<td class="itemTableCotacao" style="text-align: right"> ' + ic.valTotal +' </td> ' +
					' 	</tr>';
				}
			});
		    
			strHtml +=	
			'					<tr id="rowTotal"> ' +
			'						<td class="itemTableCotacao" style="background-color: #eee; font-weight: bold; text-align: right !important" colspan=7>Total</td> ' +
			'						<td class="itemTableCotacao" style="background-color: #eee; font-weight: bold; text-align: right !important">' + total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td> ' +
			'					</tr> ' +
			'					<tr id="rowFrete"> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; font-weight: bold; text-align: right !important" colspan=7>Frete</td> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; text-align: right !important">' + c.tipoFrete + '</td> ' +
			'					</tr> ' +
			'					<tr id="rowCondPagto"> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; font-weight: bold; text-align: right !important" colspan=7>Condição Pagto.</td> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; text-align: right !important">' + c.condicaoPagto + '</td> ' +
			'					</tr> ' +
			'					<tr id="rowFormaPagto"> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; font-weight: bold; text-align: right !important" colspan=7>Forma de Pagto.</td> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; text-align: right !important">' + c.formaPagto + '</td> ' +
			'					</tr> ' +
			'					<tr id="rowFormaPagto"> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; font-weight: bold; text-align: right !important" colspan=7>Moeda</td> ' +
			'						<td class="itemTableCotacao" style="background-color: #f8f8f8; text-align: right !important">' + c.moeda + '</td> ' +
			'					</tr> ' +
			'				</tbody> ' +
			' 			</table> ' +
			' 		</div> ' +
			' 	</div> ' +
			' </div> ';
	});

	$("#div_pedido_compra").append(strHtml);
}

function getDadosCotacaoFornecedor(identificador) {
	
	var totalDesconto = 0;
	var totalFrete = 0;
	var totalGeral = 0;

	$("#tabelaAuxCotacao tbody tr").not(':first').each(function(index, tr) {
		 var objIndicePaiFilho = $("input.indiceCotacaoAux", tr).attr('id');
		 var valores = objIndicePaiFilho.split('___');
		 var indicePaiFilho = valores[1];
		 
		 if (identificador.indexOf($("#cnpjAux___" + indicePaiFilho).val()) != -1) {
			 totalDesconto =  Number(totalDesconto) + Number(convertStringFloat($("#valorDescontoAux___" + indicePaiFilho).val()));
			 totalFrete =  Number(totalFrete) + Number(convertStringFloat($("#valorFreteAux___" + indicePaiFilho).val()));
			 totalGeral =  Number(totalGeral) + Number(convertStringFloat($("#valorTotalAux___" + indicePaiFilho).val()));
		 }
	});
	
	return  {
		condicaoPagto : $("#dsc_condicao_pagamento").val(),
		formaPagto : "",
		moeda : $("#dsc_moeda").val(),
		tipoFrete : $("#cod_frete").val(),
		frete : totalFrete.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}),
		desconto : totalDesconto.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}),
		total : totalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
	 } 
}

function getItemCotacao(pCnpj, pCodItem) {
	var itemCotacao = null;
	
	$("#tabelaAuxCotacao tbody tr").not(':first').each(function(index, tr) {
		 var objIndicePaiFilho = $("input.indiceCotacaoAux", tr).attr('id');
		 var valores = objIndicePaiFilho.split('___');
		 var indicePaiFilho = valores[1];
		 
		 var cnpjAux = $("#cnpjAux___" + indicePaiFilho).val();
		 var codProdutoAux = $("#codProdutoAux___" + indicePaiFilho).val();
		 
		 if (cnpjAux == pCnpj && codProdutoAux == pCodItem) {
			 itemCotacao = {
			 	valUnitario: $("#valorUnitarioAux___" + indicePaiFilho).val(),
			 	valDesconto: $("#valorDescontoAux___" + indicePaiFilho).val(),
			 	valFrete: $("#valorFreteAux___" + indicePaiFilho).val(),
			 	valTotal: $("#valorTotalAux___" + indicePaiFilho).val()
		 	}
				 	
			return false;
		 }
	});
	
	return itemCotacao;
}

function getConfigColumn(titulo) {
	let widthColumn = "";
	let alignColumn = ""
	
	if (titulo == "#") {
		widthColumn = "40px";
		alignColumn = "center";
	} else if (titulo == "Produto/Serviço") {
		widthColumn = "950px";
		alignColumn = "left";
	} else if (titulo == "Qtd") {
		widthColumn = "70px";
		alignColumn = "center";
	} else if (titulo == "UM") {
		widthColumn = "70px";
		alignColumn = "center";
		
	} else if (titulo == "seq_item") {
		alignColumn = "center";
	} else if (titulo == "nom_item") {
		alignColumn = "left";
	} else if (titulo == "qtd_item") {
		alignColumn = "center";
	} else if (titulo == "um_item") {
		alignColumn = "center";
	} else if (titulo == "prazo") {
		alignColumn = "center";
	} else if (titulo == "previsao_entrega") {
		alignColumn = "center";
	} else if (titulo == "observacao") {
		alignColumn = "left";
	} else if (titulo == "valor_unitario") {
		alignColumn = "right";
	} else if (titulo == "valor_frete") {
		alignColumn = "right";
	} else if (titulo == "valor_desconto") {
		alignColumn = "right";
	} else if (titulo == "valor_total") {
		alignColumn = "right";
	} else {
		widthColumn = "100px";
		alignColumn = "center";
	}
		
	return { 
		width : widthColumn,
		align : alignColumn
	}
}

function getDataCotacao() {
	
	//Fornecedores
	var fornecedores = [];
	 $('input[id^="cnpjAux___"]').each(function(index, value){
		 let indice = value.id.split("___")[1];
		 var forn = { 
	 		CNPJ : $("#cnpjAux___" + indice).val(),
	 		NOME : $("#razaoSocialAux___" + indice).val()
		 }
		 
		 if(!jaExisteFornecedor(fornecedores, $("#cnpjAux___" + indice).val()))
			 fornecedores.push(forn);
	 });
	 
	//Itens
	 var itens = [];
	 $('input[id^="codItemSC___"]').each(function(index, value){
		 let indice = value.id.split("___")[1];
		 var item = { 
			COD_ITEM : $("#codItemSC___" + indice).val(),
			DSC_ITEM : $("#dscItemSC___" + indice).val(),
			QTD_ITEM : $("#qtdItemSC___" + indice).val(),
			UM_ITEM  : $("#umItemSC___" + indice).val(),
		 }
		 
		 itens.push(item);
	 });
	
	var colunas = [];
	colunas.push({ name : "#", subcolumns : [{ name: ""}]});
	colunas.push({ name : "Produto/Serviço", subcolumns : [{ name: ""}]});
	colunas.push({ name : "Qtd", subcolumns : [{ name: ""}]});
	colunas.push({ name : "UM", subcolumns : [{ name: ""}]});
	
	for(var i = 0; i < fornecedores.length; i++) {
		var cnpj = fornecedores[i].CNPJ;
		var razao_social = fornecedores[i].NOME;
		var identificador = razao_social + " - " + cnpj;
		
		colunas.push({ name : identificador,
					   subcolumns : [
						   { name: "Prazo de Entrega (Dias)"}, 
						   { name : "Prev. Entrega"},
						   { name : "Obs"},
						   { name : "Valor Unit."},
						   { name : "Desconto"},
						   { name : "Frete"},
						   { name : "Valor Total"}
					]});
	}
	
	var dados = [];
	for(var i = 0; i < itens.length; i++) {
		var seq_item = i+1;
		var desc_item = itens[i].COD_ITEM + " - " + itens[i].DSC_ITEM;
		var qtd_item = itens[i].QTD_ITEM;
		var um_item = itens[i].UM_ITEM;
		
		var arrayDados = [];
		arrayDados.push({value: seq_item, field:"seq_item", fornecedor:""});
		arrayDados.push({value: desc_item, field:"nom_item", fornecedor:""});
		arrayDados.push({value: qtd_item, field:"qtd_item", fornecedor:""});
		arrayDados.push({value: um_item, field:"um_item", fornecedor:""});
		
		for(var j = 0; j < fornecedores.length; j++) {
			var cnpj = fornecedores[j].CNPJ;
			var razao_social = fornecedores[j].NOME;
			
			arrayDados.push({value: getValorTabelaAuxCotacao(cnpj, itens[i].COD_ITEM, "prazo"), field: "prazo", fornecedor: cnpj + " - " + razao_social});
			arrayDados.push({value: getValorTabelaAuxCotacao(cnpj, itens[i].COD_ITEM, "previsao_entrega"), field: "previsao_entrega", fornecedor: cnpj + " - " + razao_social});
			arrayDados.push({value: getValorTabelaAuxCotacao(cnpj, itens[i].COD_ITEM, "observacao"), field: "observacao", fornecedor: cnpj + " - " + razao_social});
			arrayDados.push({value: getValorTabelaAuxCotacao(cnpj, itens[i].COD_ITEM, "valor_unitario"), field: "valor_unitario", fornecedor: cnpj + " - " + razao_social});
			arrayDados.push({value: getValorTabelaAuxCotacao(cnpj, itens[i].COD_ITEM, "valor_desconto"), field: "valor_desconto", fornecedor: cnpj + " - " + razao_social});
			arrayDados.push({value: getValorTabelaAuxCotacao(cnpj, itens[i].COD_ITEM, "valor_frete"), field: "valor_frete", fornecedor: cnpj + " - " + razao_social});
			arrayDados.push({value: getValorTabelaAuxCotacao(cnpj, itens[i].COD_ITEM, "valor_total"), field: "valor_total", fornecedor: cnpj + " - " + razao_social});
		}
		
		dados.push(arrayDados);
	}
	
	var colunas = {columns : colunas};
	var linhas = {data : dados};
	
	return { header : colunas, rows: linhas	};
}

function montaTabelaCotacao() {
	
	$("#cotacaotable tr").remove();
	$("#rowHeader th").remove();
	$("#rowSubheader th").remove();

	$("#cotacaotable").append('<tr id="rowHeader"></tr>');
	$("#cotacaotable").append('<tr id="rowSubheader"></tr>');
	
	var jsonData = getDataCotacao();
    
    var widthColumn = "100px";
    
    //Cabeçalho
    $.each(jsonData, function(i, item) {
    	
    	$.each(jsonData[i].columns, function(j, item) {
    		var coluna = jsonData[i].columns[j].name;
    		var objColuna = getConfigColumn(coluna);
    		var isMenorCotacao = false;
    		
    		$("#rowHeader").append("<th style='width: " + objColuna.width + "; text-align: " + objColuna.align + ";" + ((isMenorCotacao) ? " background-color: #cdffcd !important" : "")  +"' class='headerTableCotacao' colspan=" + jsonData[i].columns[j].subcolumns.length + ">" + jsonData[i].columns[j].name +"</th>");
    		
    		$.each(jsonData[i].columns[j].subcolumns, function(h, item) {
    			$("#rowSubheader").append("<th class='subHeaderTableCotacao' style='width: " + objColuna.width + "; text-align: " + objColuna.align + "'>" + jsonData[i].columns[j].subcolumns[h].name +"</th>");
    		});
    	});
    });

    //Dados
    $.each(jsonData.rows, function(k, rows) {
    	$.each(rows, function(j, data) {
    		var idRow = "row" + j;
    		$("#cotacaotable").append("<tr id=" + idRow + ">");
    		$.each(data, function(l, value) {
    			var objColuna = getConfigColumn(value.field);
    			$("#" + idRow).append("<td class='itemTableCotacao' style='text-align: " + objColuna.align + " !important'>" + value.value + "</td>");
    		});
    		$("#cotacaotable").append("</tr>");
    	});
    });
    
    //Rodapé
    $.each(jsonData, function(i, item) {
    	$.each(jsonData[i].columns, function(j, item) {
    		var titulo = jsonData[i].columns[j].name;
    		
    		var colspan = 4;
    		if (titulo == "#" || titulo == "Produto/Serviço" || titulo == "Qtd") {
    			
    		} else {
    			var align = "right";
    			var tipoFrete = "";
    			var condicaoPagto = "";
    			var formaPagto = "";
    			var moeda = "";
    			var frete = "";
    			var desconto = "";
    			var total = "";
    			
    			if (titulo != "UM") {
    				colspan = jsonData[i].columns[j].subcolumns.length;
    				var obj = getDadosCotacaoFornecedor(titulo);
    				
    				if (obj != null) {
    					condicaoPagto = obj.condicaoPagto;
    					formaPagto = obj.formaPagto;
    					moeda = obj.moeda;
    					tipoFrete = obj.tipoFrete;
    					frete = "[" + tipoFrete + "]     "  + obj.frete;
    					desconto = obj.desconto;
    					total = obj.total;
    				}
    			} else {
    				align = "center";
    				condicaoPagto = "Condição Pagto.";
					formaPagto = "Forma de Pagto.";
					moeda = "Moeda";
//					tipoFrete = obj.tipoFrete;
    				frete = "Frete";
    				desconto = "Desconto";
    				total = "Total";
    			}

    			$("#cotacaotable").append("<tr id='rowFreteMapa'>");
    			$("#rowFreteMapa").append("<td class='itemTableCotacao' style='background-color: #eee; font-weight: bold; text-align: " + align + " !important' colspan=" + colspan + ">" + frete + "</td>");
    			$("#cotacaotable").append("</tr>");

    			$("#cotacaotable").append("<tr id='rowDescontoMapa'>");
    			$("#rowDescontoMapa").append("<td class='itemTableCotacao' style='background-color: #eee; font-weight: bold; text-align: " + align + " !important' colspan=" + colspan + ">" + desconto + "</td>");
    			$("#cotacaotable").append("</tr>");

    			$("#cotacaotable").append("<tr id='rowTotalMapa'>");
    			$("#rowTotalMapa").append("<td class='itemTableCotacao' style='background-color: #eee; font-weight: bold; text-align: " + align + " !important' colspan=" + colspan + ">" + total + "</td>");
    			$("#cotacaotable").append("</tr>");

    			$("#cotacaotable").append("<tr id='rowMoedaMapa'>");
    			$("#rowMoedaMapa").append("<td class='itemTableCotacao' style='background-color: #f8f8f8; font-weight: normal; text-align: " + align + " !important' colspan=" + colspan + ">" + moeda + "</td>");
    			$("#cotacaotable").append("</tr>");

    			$("#cotacaotable").append("<tr id='rowCondPagtoMapa'>");
    			$("#rowCondPagtoMapa").append("<td class='itemTableCotacao' style='background-color: #f8f8f8; font-weight: normal; text-align: " + align + " !important' colspan=" + colspan + ">" + condicaoPagto + "</td>");
    			$("#cotacaotable").append("</tr>");

    			$("#cotacaotable").append("<tr id='rowFormaPagtoMapa'>");
    			$("#rowFormaPagtoMapa").append("<td class='itemTableCotacao' style='background-color: #f8f8f8; font-weight: normal; text-align: " + align + " !important' colspan=" + colspan + ">" + formaPagto + "</td>");
    			$("#cotacaotable").append("</tr>");
    		}
    	});
    });
}

function getValorTabelaAuxCotacao(pCnpj, pCodItem, pField) {
	let retorno = "";
	
	if ($("table[tablename='tabelaAuxCotacao'] tbody tr").length > 1) {
        $("input[id^='cnpjAux___']").each(function(index) {
            var indice = $(this).attr("id").split("___")[1];

            var cnpj = $("#cnpjAux___" + indice).val();
            var codItem = $("#codProdutoAux___" + indice).val();
			
            if (pCnpj == cnpj && pCodItem == codItem) {
            	if (pField == "prazo") {
            		retorno = $("#prazoAux" + "___" + indice).val();
            		return true;
            	}
            	
            	if (pField == "previsao_entrega") {
            		retorno = $("#prevEntregaAux" + "___" + indice).val();
            		return true;
            	}
            	
            	if (pField == "observacao") {
            		retorno = $("#obsAux" + "___" + indice).val();
            		return true;
            	}
            	
            	if (pField == "valor_unitario") {
            		retorno = $("#valorUnitarioAux" + "___" + indice).val();
            		return true;
            	}

            	if (pField == "valor_frete") {
            		retorno = $("#valorFreteAux" + "___" + indice).val();
            		return true;
            	}
            	
            	if (pField == "valor_desconto") {
            		retorno = $("#valorDescontoAux" + "___" + indice).val();
            		return true;
            	}
            	
            	if (pField == "valor_total") {
            		retorno = $("#valorTotalAux" + "___" + indice).val();
            		return true;
            	}
            }
        });
	}
	
	return retorno;
}


function jaExisteFornecedor(arrayFornecedor, cnpj) {
	var existe = false;
	for(var i = 0; i < arrayFornecedor.length; i++) {
		if (arrayFornecedor[i].CNPJ == cnpj)
			existe = true;
	}
	
	return existe;
}