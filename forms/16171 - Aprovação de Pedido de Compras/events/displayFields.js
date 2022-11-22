function displayFields(form, customHTML){ 
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);	

	var atividade = getValue("WKNumState");
	customHTML.append("<script>function getWKNumState(){ return " + atividade + "; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return " + getValue("WKCompany") + "; }</script>");
	customHTML.append("<script>function getMobile(){ return " + form.getMobile() + "; }</script>");
	
}