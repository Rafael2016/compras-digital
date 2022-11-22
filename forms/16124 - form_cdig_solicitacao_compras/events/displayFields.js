function displayFields(form, customHTML) {


	var atividade = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO;

	customHTML.append("<script>function getWKNumState(){ return " + atividade + "; }</script>");
	customHTML.append("<script> var ATIVIDADE_ATUAL = '" + atividade + "';</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return " + getValue("WKCompany") + "; }</script>");
	customHTML.append("<script>function getMobile(){ return " + form.getMobile() + "; }</script>");

	var modo = form.getFormMode();

	if (modo == "ADD") {

		var usuario = fluigAPI.getUserService().getCurrent();

		form.setValue("origemStart", "fluig");
		form.setValue("dataSolicitacao", obterDataCorrente());
		form.setValue("solicitanteNome", usuario.getFullName());
		form.setValue("solicitanteEmail", usuario.getEmail());
		form.setValue("solicitanteCode", usuario.getCode());
		form.setValue("gestorImediatoMat", usuario.getCode());  //HARDCODE

	}

}

/**
 * @function OBTEM DATA CORRENTE 
 */
function obterDataCorrente() {
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
}  