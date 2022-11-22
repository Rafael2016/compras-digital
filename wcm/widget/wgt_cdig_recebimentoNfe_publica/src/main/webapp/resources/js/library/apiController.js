class ApiController {


    constructor() { }

    /***
     * @LOADING DADOS PÁGINA
     * @param {Número do Pedido Aprovado na Cotaçãot}
     */
    async loadView(numPedido) {


        try {

            const response = await axios({
                method: 'get',
                url: '/wgt_cdig_recebimentoNfe_publica/resources/js/dados.json',
                // Headers: {
                    // authorization: 'Bearer ' + token
                // }
            })
            console.log(response)
            return response.data;
        } catch (err) {
            console.log(err)
        }
         
    }


}