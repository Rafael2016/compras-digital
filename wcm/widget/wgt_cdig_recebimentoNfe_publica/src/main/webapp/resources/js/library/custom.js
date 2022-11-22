/***
 * @VARIAVEIS GOBAIS 
 */
let objFiles = new Set()

/**
 * @CARREGAR AS FUNÇÔES 
 */
window.onload = function () {

  //@Upload Files   
  document.getElementById("btnAnexosNfe").addEventListener("click", anexarNfe, false);
  document.getElementById("btnAnexoXML").addEventListener("click", anexarNfe, false);
  document.getElementById("btnAnexoFiles").addEventListener("click", anexarNfe, false);
  
  //@Submit
  document.getElementById("btnEnviar").addEventListener("click", sendFiles, false);

}


/**
 * @ANEXOS
 */
anexarNfe = async (event) => {


  let idInputFile = event.target.getAttribute("data-input")
  let $inputFile = document.getElementById(idInputFile)
  let listFile = []

  $inputFile.click()
   
  $inputFile.addEventListener('change', function (ev) {

    const files = ev.target.files;

    for (let file of files) {

      if (file.size < 0) {

        fluigToast(
          "Ops!",
          "Arquivo não localizado ou Corrompido",
          "warning"
        )

        return false
      }

      if (objFiles.has(file.name)) {

        fluigToast(
          "Ops!",
          "Arquivo já existente",
          "warning"
        )

        return false
      }

      file.inputFile = idInputFile
      objFiles.add(file.name)
      listFile.push(file)

    }

    rendListFile(listFile)

  })

}
/** 
 *@RENDERIZA LISTA ANEXOS
 */
rendListFile = async (objFiles) => {

  objFiles.forEach(value => {

    let listAnexos = `
      <li class= "listAnexo" data-file="${value.name}">
        <span class="flaticon flaticon-file icon-sm"></span> ${value.name || "NO_NAME"} 
        <button type="button" class="remove-file" data-removeFile="${value.name}" onclick="removeFile(this)" >
          <span class="flaticon flaticon-close icon-sm label-danger" style="color: #FFF" data-toggle="tooltip" data-placement="right" title="Remove Arquivo"></span>
        </button>
      </li>`;

    let idInput = 'list' + value.inputFile
    let $Ulist = document.getElementById(idInput)
    $Ulist.insertAdjacentHTML('afterbegin', listAnexos)

  });
}

/***
 * @REMOVE ANEXOS
 */
 removeFile= async(event)=>{

  let fileName = event.getAttribute('data-removeFile')
  let $liFile =  event.parentNode

  $liFile.remove()
  objFiles.delete(fileName)

}


/***
 * @SEND  ENVIAR NFE 
 */
sendFiles = async (ev) => {

  ev.preventDefault();
  const formDados = new FormData(document.getElementById("divNfe"))

  for (const [key, value] of formDados) {
    console.log(`${key}: ${value}\n`);
  }



}