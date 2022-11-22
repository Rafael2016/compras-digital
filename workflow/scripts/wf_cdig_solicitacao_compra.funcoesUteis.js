/**
 * Retorna a data atual formatada
 * @param {String} format Parâmetro obrigatório, formato de retorno da data
 * @example
 * dataCorrente("dd/MM/yyyy") - Retorna a data atual no formato Dia/Mês/Ano
 * @example
 * dataCorrente("yyyy/MM/dd") - Retorna a data atual no formato Ano/Mês/Dia
 * @link https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html
 * @return {String} Retorna a data atual formatada
 * @author Sérgio Machado
 */
function dataCorrente(format) {
	try {
		var locale = java.util.Locale("pt", "BR");
		var hoje = java.util.Calendar.getInstance();
		var dt = (java.text.SimpleDateFormat(format, locale)).format(hoje.getTime());
		return dt;
	} catch (erro) {
		throw "function " + arguments.callee.name + " => " + erro.toString();
	}
}

/**
 * Retorna data formatada
 * @param {String} formatIn Parâmetro obrigatório, formato de entrada da data
 * @param {String} data Parâmetro obrigatório, data que deseja formatar
 * @param {String} formatOut Parâmetro obrigatório, formato de retorno da data
 * @example
 * formatarData("17/08/2021", "yyyy-MM-dd'T'HH:mm:ss") - Retorna a data "2021-08-17T00:00:00"
 * @example
 * formatarData("17/08/2021", "yyyy/MM/dd") - Retorna a data "2021/08/17"
 * @example
 * formatarData("17/08/2021", "'Hoje é' EEEE 'dia' dd 'de' MMMMM 'de' yyyy") - Retorna "Hoje é terça-feira dia 17 de agosto de 2021"
 * @link https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html
 * @return {String} Retorna a data formatada
 * @author Sérgio Machado <sergio.machado@xplanning.com.br>
 */
function formatarData(formatIn, date, formatOut) {
	try {
		var locale = java.util.Locale("pt", "BR");
		var sdf = java.text.SimpleDateFormat(formatIn, locale).parse(date);
		var dt = java.text.SimpleDateFormat(formatOut, locale).format(sdf);
		return dt;
	} catch (err) {
		throw "function " + arguments.callee.name + " => " + err.toString();
	}
}