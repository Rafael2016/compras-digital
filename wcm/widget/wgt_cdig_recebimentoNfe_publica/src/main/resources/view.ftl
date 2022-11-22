<div id="receberNfeComprasDigitais${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="receberNfeComprasDigitais.instance()">
    <div class="container-fluid">
        <#-- SCRIPT'S -->
            <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
            <#-- CABEÇALHO -->
                <div class="header-vallide" style="height: 70px; padding-left: 5%; padding-right: 5%">
                    <div class="header-child-vallide">
                        <img style="margin-top:-20px; height: 50px" src="/wgt_cdig_cotacao_publica/resources/images/logo_image.png">
                    </div>
                </div>
                <form id="divNfe" style="margin-top:5% !important">
                    <div class="row section-custom-xlp" style="padding-left: 5%; margin-right: 5%; margin-top: 0px">
                        <div class="col-md-10">
                            <span class="fluigicon fluigicon-money-circle fluigicon-md"></span>&nbsp;
                            <label style="margin-top:10px; font-size: 20px; color: #7aa7c7; font-weight: bold;">Compras Digital - Ordem de Compras Fornecedor</label>
                        </div>
                        <div class="col-md-2">
                            <div class="form-horizontal" style="float: right; margin-right:3%; margin-top:5px; width: 100%">
                                <div class="form-group form-group-resumo" style="background-color: #eee">
                                    <label for="lblCotacao" class="col-sm-6 control-label label-custom" style="text-align: right; padding: 3px">COTAÇÃO:</label>
                                    <div class="col-sm-6">
                                        <label id="lblCotacao" class="col-sm-6 control-label label-custom" style="text-align: right; padding: 3px"></label>
                                    </div>
                                </div>
                                <div class="form-group form-group-resumo" style="background-color: #eee">
                                    <label for="lblIdFluig" class="col-sm-6 control-label label-custom" style="text-align: right; padding: 3px">NºPEDIDO:</label>
                                    <div class="col-sm-6">
                                        <label id="lblIdFluig" class="col-sm-6 control-label label-custom" style="text-align: right; padding: 3px"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <#--  CAMPOS HIDDEN  -->
                     <input type="hidden"  name="numCotacao" id="numCotacao" >
                      <input type="hidden" name="numPedido" id="numPedido" >
                    <#-- DADOS FORNECEDOR/COMPRADOR -->
                        <div class="row  section-custom-xlp" style="padding-left: 5%; margin-right: 5%; margin-top: 10px">
                            <div class="col-md-6">
                                <div class="col-md-12" style="border-top-style: solid; border-top-width: 2px; border-color: #7aa7c7; color: #7aa7c7; padding-top: 7px; margin-bottom:3px;">
                                    <span class="flaticon flaticon-company icon-sm"></span>
                                    <font style="font-weight: bold">&nbsp;DADOS EMPRESA</font>
                                </div>
                                <div class="row" style="margin-left: 5px">
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblRazaoSocial">Razão Social</label>
                                        <input type="text" class="form-control customCell" name="razaSocial" id="razaSocial" readonly>
                                    </div>
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblCnpjTomador">CNPJ</label>
                                        <input type="text" class="form-control customCell" name="cnpjTomador" id="cnpjTomador" readonly>
                                    </div>
                                </div>
                                <div class="row" style="margin-left: 5px">
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblComprador">Comprador</label>
                                        <input type="text" class="form-control customCell" name="comprador" id="comprador" readonly>
                                    </div>
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblEmailTomador">E-mail</label>
                                        <input type="text" class="form-control customCell" name="emailTomador" id="emailTomador" readonly>
                                    </div>
                                </div>
                                <div class="row" style="margin-left: 5px">
                                    <div class="col-md-12 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblEnderecoEntrega">
                                            Endereço para Entrega
                                        </label>
                                        <input type="text" class="form-control customCell" name="enderecoEntrega" id="enderecoEntrega" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-12" style="border-top-style: solid; border-top-width: 2px; border-color: #7aa7c7; color: #7aa7c7; padding-top: 7px;">
                                    <span class="flaticon flaticon-handshake icon-sm"></span>
                                    <font style="font-weight: bold">&nbsp;DADOS FORNECEDOR</font>
                                </div>
                                <br></br>
                                <div class="row" style="margin-left: 5px">
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblRazaoSocialFornecedor">Razão Social</label>
                                        <input type="text" class="form-control customCell" name="razacaoSocialFornecedor" id="razacaoSocialFornecedor" readonly>
                                    </div>
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblCnpjFornecedor">CNPJ</label>
                                        <input type="text" class="form-control customCell" name="cnpjFornecedor" id="cnpjFornecedor" readonly>
                                    </div>
                                </div>
                                <div class="row" style="margin-left: 5px">
                                    <div class="col-md-4 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblEstadoFornecedor">Estado</label>
                                        <input type="text" class="form-control customCell" name="estadoFornecedor" id="estadoFornecedor" readonly>
                                    </div>
                                    <div class="col-md-4 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblCidadeFornecedor">Cidade</label>
                                        <input type="text" class="form-control customCell" name="cidadeFornecedor" id="cidadeFornecedor" readonly>
                                    </div>
                                </div>
                                <div class="row" style="margin-left: 5px">
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblEmailFornecedor">E-mail</label>
                                        <input type="text" class="form-control customCell" name="emailFornecedor" id="emailFornecedor" readonly>
                                    </div>
                                    <div class="col-md-6 form-group form-group-custom">
                                        <label class="control-label label-custom" for="lblTelefoneFornecedor">Telefone</label>
                                        <input type="text" class="form-control customCell" name="telefoneFornecedor" id="telefoneFornecedor" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <#-- ITENS DA NOTAS -->
                            <div class="section-custom-xlp" style="padding-left: 5%; margin-right: 5%">
                                 
                                <div class="row">
                                    <div class="col-md-12" style="border-top-style: solid; border-top-width: 2px; border-color:#7aa7c7; color: #7aa7c7; padding-top: 7px;margin-bottom:3px;">
                                        <span class="flaticon flaticon-form-list icon-sm"></span>
                                        <font style="font-weight: bold">&nbsp;ITENS DA NOTA</font>
                                    </div>
                                </div>

                                <div class="row table-responsive" style="margin-left: 5px; margin-right: 5px">
                                    <table id="tabelaItens" class="display table" style="width:100%">
                                        <thead class="fs-no-padding">
                                            <tr style="border: 1px solid #dddddd;">
                                                <th style="vertical-align: middle; text-align: center" >Cód. Item</th>
                                                <th style="vertical-align: middle; text-align: center">Descrição</th>
                                                <th style="vertical-align: middle; text-align: center" data-toggle="tooltip" data-placement="top" title="Unidade de Medida do Item">U.Medida</th>
                                                <th style="vertical-align: middle; text-align: center" data-toggle="tooltip" data-placement="top" title="Quantidade do Pedido">Qtd</th>
                                                <th style="vertical-align: middle; text-align: center">Valor Unit.</th>
                                                <th style="vertical-align: middle; text-align: center">Desconto</th>
                                                <th style="vertical-align: middle; text-align: center" data-toggle="tooltip" data-placement="top" title="valor total"><strong>Total</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody id="listItens">
                                        </tbody>
                                    </table>
			                    </div>
                            </div>
                            <#-- CONDIÇÃO DE PAGAMETNOS -->
                                <div class="row section-custom-xlp" style="padding-left: 5%; margin-right: 5%">
                                    <div class="col-md-12">
                                        <div class="col-md-12" style="border-top-style: solid; border-top-width: 2px; border-color: #7aa7c7; color: #7aa7c7; padding-top: 7px; margin-bottom:3px;">
                                            <span class="flaticon flaticon-monetization-on icon-sm"></span>
                                            <font style="font-weight: bold">&nbsp;CONDIÇÃO DE PAGAMENTOS</font>
                                        </div>
                                        <br></br>
                                        <div class="row" style="margin-left: 5px">
                                            <div class="col-md-6 form-horizontal">
                                                <div class="form-group form-group-resumo">
                                                    <label for="totalItens" class="col-sm-6 control-label label-custom required" style="text-align: right">Total dos Itens</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control customCell campo-moeda" style="text-align: right" id="totalItens" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group form-group-resumo">
                                                    <label for="descontos" class="col-sm-6 control-label label-custom" style="text-align: right">Descontos</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control customCell campo-moeda" style="text-align: right" id="descontos" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group form-group-resumo">
                                                    <div class="col-sm-6" style="text-align: right">
                                                        <label for="frete" class="control-label label-custom" style="text-align: right">Frete</label>
                                                        <select class="form-control customCell" name="cmbTipoFrete" id="cmbTipoFrete" style="width:80px; display: inline">
                                                            <option value="CIF">CIF</option>
                                                            <option value="FOB">FOB</option>
                                                            <option value="Terceiros">Terceiros</option>
                                                            <option value="Sem Frete">Sem Frete</option>
                                                            <option value="Transp. Próprio Remetente">Transp. Próprio Remetente</option>
                                                            <option value="Transp. Próprio Destinatário">Transp. Próprio Destinatário</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-sm-6" style="margin-botton: 5px">
                                                        <input type="text" class="form-control customCell " style="text-align: right" id="frete" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 form-horizontal">
                                                <div class="form-group form-group-resumo">
                                                    <label for="cmbCondicaoPagamento" class="col-sm-6 control-label label-custom required" style="text-align: right">Condição de Pagto.</label>
                                                    <div class="col-sm-6">
                                                        <input type="hidden" name="codCondicaoPagamento" id="codCondicaoPagamento" />
                                                        <input type="text" class="form-control customCell" name="cmbCondicaoPagamento" id="cmbCondicaoPagamento" readonly />
                                                    </div>
                                                </div>
                                                <div class="form-group form-group-resumo">
                                                    <label for="cmbMoeda" class="col-sm-6 control-label label-custom required" style="text-align: right">Moeda</label>
                                                    <div class="col-sm-6">
                                                        <input type="hidden" name="codMoeda" id="codMoeda" />
                                                        <input type="text" class="form-control customCell" name="cmbMoeda" id="cmbMoeda" readonly />
                                                    </div>
                                                </div>
                                                <div class="form-group form-group-resumo">
                                                    <label for="formaPagamento" class="col-sm-6 control-label label-custom required" style="text-align: right">Forma de Pagto.</label>
                                                    <div class="col-sm-6">
                                                        <div class="radio">
                                                            <label>
                                                                <input name="formaPagamento" id="formaPagamento" value="Boleto" type="radio">
                                                                <span class="">Boleto</span>
                                                            </label>
                                                        </div>
                                                        <div class="radio">
                                                            <label>
                                                                <input name="formaPagamento" id="formaPagamento" value="Depósito em Conta" type="radio">
                                                                <span class="">Depósito em Conta</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group form-group-resumo">
                                                    <label for="cmbMoeda" class="col-sm-6 control-label label-custom required" style="text-align: right">Total com Imposto</label>
                                                    <div class="col-sm-6">
                                                        <div class="input-group">
                                                            <span class="input-group-addon">
                                                            R$
                                                            </span>
                                                            <input type="text" class="form-control customCell" name="totalSemImposto" id="totalSemImposto" readonly style="color:black !important;font-weight: 900;" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group form-group-resumo">
                                                    <label for="cmbMoeda" class="col-sm-6 control-label label-custom required" style="text-align: right">Total com Imposto</label>
                                                    <div class="col-sm-6">
                                                        <div class="input-group">
                                                            <span class="input-group-addon">
                                                            R$
                                                            </span>
                                                            <input type="text" class="form-control customCell" name="totalcomImposto" id="totalcomImposto" readonly style="color:black !important;font-weight: 900;" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <#-- IMPOSTO -->
                                    <div class="row section-custom-xlp mb-md-4" style="padding-left: 5%; margin-right: 5%">
                                        <div class="col-md-12">
                                            <div class="col-md-12" style="border-top-style: solid; border-top-width: 2px; border-color: #7aa7c7; color: #7aa7c7; padding-top: 7px; margin-bottom:3px;">
                                                <span class="flaticon flaticon-monetization-on icon-sm"></span>
                                                <font style="font-weight: bold">&nbsp;IMPOSTOS</font>
                                            </div>
                                            <div class="row" style="margin-left: 5px">
                                                <div class="form-group form-group-resumo">
                                                    <div class="col-md-12" style="text-align: right">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover" id="table-imposto">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="th-table-imposto text-center">IPI</th>
                                                                        <th class="th-table-imposto text-center">ICMS</th>
                                                                        <th class="th-table-imposto text-center">ISS</th>
                                                                        <th class="th-table-imposto text-center">IRRF</th>
                                                                        <th class="th-table-imposto text-center">PISRF</th>
                                                                        <th class="th-table-imposto text-center">CSRF</th>
                                                                        <th class="th-table-imposto text-center">COFRF</th>
                                                                        <th class="th-table-imposto text-center">CSLRF</th>
                                                                        <th class="text-center"><strong style="color:#000000">TOTAL</strong></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="listImpostoNfe">
                                                                   
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <#-- OBSERVAÇÃO DE PEDIDO -->
                                        <div class="row section-custom-xlp mb-md-4" style="padding-left: 5%; margin-right: 5%">
                                            <div class="col-md-12" style="border-top-style: solid; border-top-width: 2px; border-color: #7aa7c7; color: #7aa7c7; padding-top: 7px; margin-bottom:3px;">
                                                    <span class="flaticon flaticon-message icon-sm"></span>
                                             <font style="font-weight: bold">&nbsp;OBSERVAÇÃO</font>
                                        </div>
                                            <div class="col-md-12">
                                                <div class="table-responsive">
                                                    <table class="table table-striped" tablename"tblObservacao" id="tblObservacao" noaddbutton="true" nodeletebutton="true" addbuttonlabel="Adicionar Obsevação">
                                                        <thead>
                                                            <tr>
                                                                <th>Data</th>
                                                                <th>Nome</th>
                                                                <th>Observação</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <input type="date" name="dataObservacao" id"dataObservacao" class="inputTable" />
                                                                </td>
                                                                <td>
                                                                    <input type="text" name="nomeObservacao" id"nomeObservacao" class="inputTable" />
                                                                </td>
                                                                <td>
                                                                    <textarea name="observacao" id="observacao"     cols="100">
                                                                    </textarea>
                                                                </td>
                                                            </td>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <#-- ANEXOS NOTAS E XML -->
                                            <div class="row section-custom-xlp mb-md-4" style="padding-left: 5%; margin-right: 5%">
                                                <div class="col-md-12  mb-md-4">
                                                    <div class="col-md-12 " style="border-top-style: solid; border-top-width: 2px; border-color: #7aa7c7; color: #7aa7c7; padding-top: 7px; margin-bottom:3px;">
                                                        <span class="fluigicon fluigicon-process-attach fluigicon-sm"></span>
                                                        <font style="font-weight: bold">&nbsp;ANEXOS</font>
                                                    </div>
                                                    <div class="row" style="margin-left: 5px">
                                                        <#-- Anexar Nota Fiscal -->
                                                            <div class="col-xs-12 col-md-3">
                                                                <div class="form-group">
                                                                    <label class="control-label" for="btnAnexosNfe"></label>
                                                                    <button type="button" name="btnAnexosNfe" id="btnAnexosNfe" class="btn  form-control button-anexo" data-toggle="tooltip" data-placement="bottom" title="Enviar Nota Fiscal" data-input="anexoNfe">
                                                                        Upload NFe
                                                                    </button>
                                                                    <input type="file" accept=".doc, .docx, .pdf, .png, .jpeg, .jpg" data-description="anexoNfe" class="enviarAnexo" name="anexoNfe" id="anexoNfe" style="display: none;">
                                                                </div>
                                                                <div class="form-group">
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            Nº NOTA
                                                                        </div>
                                                                        <input type="text" name="numNfe" id="numNfe" style="width: 140px !important" />
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            SÉRIE
                                                                        </div>
                                                                        <input type="text" name="serieNfe" id="serieNfe" style="width: 160px !important" />
                                                                    </div>
                                                                </div>
                                                                <ul id="listanexoNfe"></ul>
                                                            </div>
                                                            <div class="col-xs-12 col-md-4">
                                                                <div class="form-group">
                                                                    <label class="control-label" for="btnAnexoXML"></label>
                                                                    <button type="button" name="btnAnexoXML" id="btnAnexoXML" class="btn  form-control button-anexo" data-toggle="tooltip" data-placement="bottom" title="Enviar XML da Nota" data-input="anexoXML">
                                                                        Upload ⟨XML⟩
                                                                    </button>
                                                                    <input type="file" accept=".xml" data-description="anexoXML" class="enviarAnexo" name="anexoXML" id="anexoXML" style="display: none;">
                                                                </div>
                                                                <ul id="listanexoXML"></ul>
                                                            </div>
                                                            <div class="col-xs-12 col-md-4">
                                                                <div class="form-group">
                                                                    <label class="control-label" for="btnAnexosNfes"></label>
                                                                    <button type="button" name="btnAnexoFiles" id="btnAnexoFiles" class="btn  form-control button-anexo" data-toggle="tooltip" data-placement="bottom" title="Enviar Arquivos" data-input="anexoFiles">
                                                                        <span class="flaticon flaticon-description icon-sm"></span> &nbsp;
                                                                        Upload Arquivos
                                                                    </button>
                                                                    <input type="file" multiple accept=".doc, .docx, .pdf, .png, .jpeg, .jpg" data-description="anexoFiles" class="enviarAnexo" name="anexoFiles" id="anexoFiles" style="display: none;">
                                                                </div>
                                                                <ul id="listanexoFiles"></ul>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--SUBMIT ENVIAR -->
                                            <div class="row" style="padding-left: 5%; margin-right: 5%; text-align:center">
                                                <button id="btnEnviar" type="button" class="btn btn-default" style="background-color: #7aa7c7; color: white" data-enviar-nfe>
                                                    <span class="text">ENVIAR NOTA FISCAL</span>
                                                    <img class="fs-display-none" src="/wgt_cdig_recebimentoNfe_publica/resources/images/loading.gif" width="16" height="16" />
                                                </button>
                                            </div>
                </form>
    </div>
</div>