class ActivityView {


    constructor() {
        this.init()
    }


    init=()=> {

        const CODUSER = getUser()
        const ATIVIDADE = getWKNumState()

        document.getElementById("imgSolicitante").setAttribute("src", "/social/api/rest/social/image/profile/" + CODUSER + "/SMALL_PICTURE")
        this.currentTask()

        //Eventos 
        // showHideControleAnexos()

        //Pai e FIlho "Itens da Solicitação"
        // if(ATIVIDADE != ABERTURA && ATIVIDADE != INICIO){
        //     rendeCardSolicitacao()
        // }

        // if(ATIVIDADE == INICIO || ATIVIDADE == ABERTURA){

        //     document.getElementById("aprovacaoGestor").classList.add("hide");
        //     document.getElementById("integracaoSistema").classList.add("hide");

        // }
        // else if(ATIVIDADE == APROVACAO_GESTOR){

        //     document.getElementById("integracaoSistema").classList.add("hide");            


        // }
        // else if(ATIVIDADE == AJUSTE_SOLICITACAO_COMPRA){

        //     document.getElementById("integracaoSistema").classList.add("hide");
        // }


    }
    /**
     * @SETA ATIVIDADE NAVEBAR
     */
    currentTask = () => {

        switch (ATIVIDADE_ATUAL) {
            case "0" || "13":
                document.getElementById("inicio_task").classList.add("current");
                break;
            case "17":
                document.getElementById("receberNotaFiscal_task").classList.add("current");
                break;
            case "14":
                document.getElementById("classificacaoFiscal_task").classList.add("current");
                break;
            case "9":
                document.getElementById("informacoesComplementares_task").classList.add("current");
            break;
            default:
            break;
        }

    }
}