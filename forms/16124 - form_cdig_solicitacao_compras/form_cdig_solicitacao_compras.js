/***
 * @LOAD 
 */
window.onload = function() {

    setTimeout(() => {
        
        new ActivityView()
        initAnexos()

    }, 100);


}

/**
 * @SELECT ADD ZOOM
 */
setSelectedZoomItem=(selectedItem)=>{

    if(selectedItem.inputId == "zoomItens"){

        document.getElementById("tmp_COD_ITEM").value      = selectedItem["COD_ITEM"]
        document.getElementById("tmp_ITEM").value          = selectedItem["ITEM"]
        document.getElementById("tmp_DESCRICAO").value     = selectedItem["DESCRICAO"]
        document.getElementById("tmp_UNIDADE_MEDIDA").value = selectedItem["UNIDADE_MEDIDA"]
        document.getElementById("tmp_ULTIMO_PRECO").value   = selectedItem["ULTIMO_PRECO"]
        document.getElementById("tmp_DT_ULTIMA_COMPRA").value = selectedItem["DT_ULTIMA_COMPRA"]
    }
    else if(selectedItem.inputId == "zoomCentroCusto"){

        document.getElementById("tpmCentroCustoItem").value = selectedItem["CAMPO_ZOOM"]
    }

}

/**
 * @SELECT REMOVE ZOOM
 */
removedZoomItem=(removeItem)=>{

    if(removeItem.inputId == "zoomItens"){

        document.getElementById("tmp_COD_ITEM").value      = ""
        document.getElementById("tmp_ITEM").value          = ""
        document.getElementById("tmp_DESCRICAO").value     = ""
        document.getElementById("tmp_UNIDADE_MEDIDA").value = ""
        document.getElementById("tmp_QUANTIDADE").value     = ""   
        document.getElementById("tmp_OBSERVACAO").value     = ""   
        document.getElementById("tmp_ULTIMO_PRECO").value   = ""
        document.getElementById("tmp_DT_ULTIMA_COMPRA").value = ""

    }

}

/***
 * @ADD CARD PAI E FILHO
 */
addItemSolicitacao=()=>{

    if(isEmpty(document.getElementById("qtdItem").value)){
        fluigToast("Ops!","Necessário informa os campos:QUANTIDADE,ITEM,CENTO CUSTO","warning")
        return
    }

    var indice = wdkAddChild('tabelaItens');

    document.getElementById("cod_item___"+indice).value         =  document.getElementById("tmp_COD_ITEM").value                      
    document.getElementById("item___"+indice).value             =  document.getElementById("tmp_ITEM").value  
    document.getElementById("descricao___"+indice).value        =  document.getElementById("tmp_DESCRICAO").value 
    document.getElementById("unidade_medida___"+indice).value   = document.getElementById("tmp_UNIDADE_MEDIDA").value
    document.getElementById("quantidade___"+indice).value       = document.getElementById("qtdItem").value 
    document.getElementById("centroCustoItem___"+indice).value  = document.getElementById("tpmCentroCustoItem").value 
    document.getElementById("ultimo_preco___"+indice).value     = document.getElementById("tmp_ULTIMO_PRECO").value
    document.getElementById("dt_ultima_compra___"+indice).value = document.getElementById("tmp_DT_ULTIMA_COMPRA").value


    window["zoomItens"].clear()
    window["zoomCentroCusto"].clear()
    document.getElementById("qtdItem").value =""
    document.getElementById("tpmCentroCustoItem").value=""

    rendeCardSolicitacao()
}

/**
 * @CARD ITENS PAI E  FILHO
 */
rendeCardSolicitacao=()=>{

    $("#section-itens").empty()    // DELE ITENS     

    let elHTML= ""

    $("input[id^='cod_item___']").each(function(i,val){
       // Refactore melhor validação para nulos 
       if(val.id.split("___").length > 1){

            let i  = val.id.split("___")[1]
            
            if(document.getElementById("cod_item___"+i).value !=''){

                elHTML += `
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title" style="color:#7aa7c7"><span class="fluigicon fluigicon-checked icon-sm" aria-hidden="true"></span>
                             ${document.getElementById("descricao___"+i).value}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Código: </strong><span style="color:black">${document.getElementById("cod_item___"+i).value}</span></h6>
                            <h6 class="card-subtitle mb-2 text-muted">C.Custo: </strong><span style="color:black">${document.getElementById("centroCustoItem___"+i).value}</span></h6>
                            <h6 class="card-subtitle mb-2 text-muted">Qtd: </strong><span style="color:black">${document.getElementById("quantidade___"+i).value}</span></h6>
                            <h6 class="card-subtitle mb-2 text-muted">Último Preço: </strong><span style="color:black">${document.getElementById("ultimo_preco___"+i).value}</span></h6>
                            <span class="fluigicon fluigicon-trash icon-sm fs-xs-padding fs-cursor-pointer fs-color-danger pull-right" aria-hidden="true" onclick="removeItemSolicitacao(${i})" style=""></span>
                        </div>
                    </div>
                </div>`;


            } 

       }

    });
    
    if(elHTML !="")
        document.getElementById("section-itens").insertAdjacentHTML("afterbegin",elHTML)

}

/**
 * @REMOVE ITEM PAI E  FILHO
 */
removeItemSolicitacao=(indice)=>{

    try {

        let elCod_item = document.getElementById("cod_item___"+indice).value 

        FLUIGC.message.confirm({
			message: `Deseja Excluir Item da Solicitação`,
			title: 'Confirmação',
			labelYes: 'Sim, quero remover',
			labelNo: 'Não, quero cancelar',
		}, function(result, el,ev){

            if(result){

                if ($("table[tablename='tabelaItens'] tbody tr").length > 1) {
			        $("input[id^='cod_item___']").each(function(index) {
			            
                        let i = $(this).attr("id").split("___")[1];
			            let cod_item = $("#cod_item___" + i).val();
						
			            if (elCod_item == cod_item) {
			            	fnWdkRemoveChild(this);
			            }
			        });
				}

                rendeCardSolicitacao()

            }


        });
        
    } catch (e) {

        console.error(e)
        fluigToast("!ops","Houve erro ao tentar remover item da lista","error")
        
    }

}

