const apiController = new ApiController();
var  numPedido     ="";

var receberNfeComprasDigitais = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: async function () {

        /**
         * @Validação utlizar numero do pedido aprovado na cotação
         */
        const url = String(window.location.pathname).split("/");
        numPedido = url[url.length - 1];


        if (isEmpty(numPedido) && 2 == 1) {

            fluigToast(
                'Ops!<p>',
                'Acesso Negado!<p>Dúvidas procurar o setor de compras',
                'danger'
            );

            document.getElementById('divNfe').innerHTML = ''
            return false;
        }

        await loadPage();

    },

    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },

    executeAction: function (htmlElement, event) {
    },


});
/**
 * @CARREGAMENTO PÁGINA 
 */
async function loadPage() {

    let loading = load()
    loading.show()

    const dados = await apiController.loadView(numPedido);

    rendView(dados)

    loading.hide()
}

/**
 * @RENDERIZA VIEW
 */

async function rendView(dados){

    //Pedido
    document.getElementById("lblCotacao").innerText = dados.cotacao;
    document.getElementById("lblIdFluig").innerText = dados.pedido;

    //Empresa
    document.getElementById("razaSocial").value     = dados.empresa;
    document.getElementById("cnpjTomador").value    = dados.CNPJEmpresa;
    document.getElementById("comprador").value      = dados.comprador;
    document.getElementById("emailTomador").value   = dados.emailComprador;
    document.getElementById("estadoFornecedor").value           = dados.uf;
    document.getElementById("cnpjFornecedor").value             = dados.CNPJFornecedor;
    document.getElementById("razacaoSocialFornecedor").value    = dados.razaoSocial
    document.getElementById("cidadeFornecedor").value           = dados.cidade;
    document.getElementById("telefoneFornecedor").value          = dados.telefone;
    document.getElementById("enderecoEntrega").value            = dados.endereco;
    document.getElementById("emailFornecedor").value            = dados.emailFornecedor;
    document.getElementById("emailFornecedor").value            = dados.emailFornecedor;

    //Tabela Itens 
    let listItens       = ""
    let totalItens      = 0;
    let totalDesc       = 0;
    let totalSemImposto = 0;

    dados.itensNota.forEach((value,i) =>{

        listItens += `
                    <tr>
                        <td class="text-center">${value.item || "-"}</td>
                        <td class="text-center">${value.descricao || "-"}</td>
                        <td class="text-center">${value?.um || "-"}</td>
                        <td class="text-center">${value?.quantidade}</td>
                        <td class="text-center">${value?.valorUnit}</td>
                        <td class="text-center">${value?.desconto || "-"}</td>
                        <td class="text-center">${value?.valorTotal}</td>
                    </tr>`

        totalItens++;
        totalDesc       += Number(value?.desconto)
        totalSemImposto += Number(value?.valorTotal)

    });

    let $tobyItens  = document.getElementById("listItens")
    $tobyItens.insertAdjacentHTML('afterbegin',listItens)

    //Condições de Pagamentos
    document.getElementById("totalItens").value = totalItens;
    document.getElementById("descontos").value = totalDesc || 0;
    document.getElementById("totalSemImposto").value = totalSemImposto;
    // document.getElementById("totalcomImposto").value = totalSemImposto - totalDesc;


    //Impostos
    let listImpostos = ""
    let totalImposto  = 0;

    dados.imposto.forEach(val => {

        totalImposto += Number(val?.IPI) + Number(val?.ICMS) +  Number(val?.IRRF) + Number(val?.CSRF) + Number(val?.COFRF);

        listImpostos += `
            <tr>
                <td class="text-center">${val?.IPI || "x"}</td>
                <td class="text-center">${val?.ICMS || "x"}</td>
                <td class="text-center">${val?.ISS || "x"}</td>
                <td class="text-center">${val?.IRRF || "x"}</td>
                <td class="text-center">${val?.PISRF || "x"}</td>
                <td class="text-center">${val?.CSRF || "X"}</td>
                <td class="text-center">${val?.COFRF || "x"}</td>
                <td class="text-center">${val?.CSLRF || "x"}</td>
                <td class="text-center">${totalImposto || 00}</td>
            </tr>
        
        
        `
    });

    $listImpostos = document.getElementById("listImpostoNfe")
    $listImpostos.insertAdjacentHTML('afterbegin',listImpostos)
    
}


/**
 *@LOADING ...   
 */
function load(text = 'Compras Digital,Aguarde....') {

    return FLUIGC.loading(window, {
        textMessage: text,
        overlayCSS: {
            backgroundColor: '#000',
            // opacity: 0.6,
            cursor: 'wait'
        },
        baseZ: 1000,
        fadeIn: 200,
        fadeOut: 400,
        timeout: 0,
    });

}

