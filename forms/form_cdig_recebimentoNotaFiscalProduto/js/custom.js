/**
 * @LOAD 
 */
window.onload= function(){

    new ActivityView()

}

/**
 * @EVENTO CLASSIFICAÇÃO FISCAL
 */
 informationCompleter=(ev)=>{

    let $labelBtn       = ev;
    let $radioSelect    = document.querySelector('input[name="informacaoComplementar"]:checked')

    $(".labelInform").removeClass("btn-info")
    $labelBtn.parentNode.classList.add("btn-info")

    if($radioSelect.value == "notificacaoFornecedor" ){
        document.getElementById('section-notificarFornecedor').classList.remove('hide')
    }else{
        document.getElementById('section-notificarFornecedor').classList.add('hide')
    }
    
 }

 /***
  * @FILTER CAMPO ZOOM PEDIDO
  * @example Fitra pedidos conforme Fornecedor escolhido
  */
  adicionarPedido=()=>{

    var cnpj    = document.getElementById('cnpj').value;
    var index   = wdkAddChild("tabelaPedidos");

    // if(isEmpty(cnpj)){
    //     exibirMensagem('','Necessário informa Fornecedor','waning')
    // }

    // reloadZoomFilterValues("ipZoomPedido" + "___" + index, "EMPRESA_SIGA,"+$("#cod_empresa_siga").val()+",FILIAL_SIGA,"+$("#cod_filial_siga").val()+",DOCUMENTO,"+cnpj);

  }

  /***
   *@REMOVE PEDIDOS 
   */
removerPedido=(el)=>{

    var numeroPedido = $(el).closest('tr').find("input[id^='ipPedido']").val();
	// removerItensDoPedido(numeroPedido);
	fnWdkRemoveChild(el);
	// calcularTotais();

}
