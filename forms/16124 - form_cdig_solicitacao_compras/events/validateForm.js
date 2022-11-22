function validateForm(form) {

	var atividade = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO;
	var modo = form.getFormMode();
	var origemStart = String(form.getValue("origemStart"));

	try {

		var erros = [];

		if (modo == "ADD") {
			if (campoVazio(form, "tipoSolicitacao")) {
				erros.push("Tipo de Solicitação");
			}
			
			if (campoVazio(form, "zoomEmpresa") || campoVazio(form, "codEmpresaProtheus")) {
				erros.push("Empresa");
			}
			
			if (campoVazio(form, "zoomFilial") || campoVazio(form, "codFilialProtheus")) {
				erros.push("Filial");
			}
			
			if(!validarData(String(form.getValue("dataNecessidade")))){
				erros.push("Informe uma data válida para Data da Necessidade");
			}
		}


		if (erros.length) {
			if (origemStart != "fluig") {
				throw "@erros" + JSON.stringify(erros)
			}
			throw formatarErros(erros);
		}

	} catch (e) {
		throw e;
	}

}



function campoVazio(form, fieldname) {
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")) {
		return true;
	}
	return false;
}


/**
 * Formata os erros 
 * @param {String[]} erros Parâmetro obrigatório, array com os erros
 * @returns {String} - Retorna uma string contendo todos os erros dentro de uma tag li
 * @author Sérgio Machado
 */
function formatarErros(erros) {
	var strErros = "";
	for (var i = 0; i < erros.length; i++) {
		strErros += "<li style='margin-bottom: 10px;'>" + erros[i] + "</li>";
	}
	var listErros = "<ul style='padding-left: 17px;color: red;list-style: disc;'>" + strErros + "</ul><br/>";
	return "Favor informar os campos obrigatórios:<br/>" + listErros;
}

/**
 * Valida data
 * @param {String} dateStr Parâmetro obrigatório, data no formato dd/MM/yyyy
 * @example
 * validarData("30/02/2020") - Retorna false
 * @example
 * validarData("31/10/2020") - Retorna true
 * @returns {boolean} Retorna true se a data for válida
 * @author Sérgio Machado
 */
function validarData(dateStr) {
    var s = dateStr.split('/');
    var d = new Date(+s[2], s[1] - 1, +s[0]);
    if (Object.prototype.toString.call(d) === "[object Date]") {
        if (!isNaN(d.getTime()) && d.getDate() == s[0] && d.getMonth() == (s[1] - 1)) {
            return true;
        }
    }
    return false;
}
