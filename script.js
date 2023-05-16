var ResistenciaCompressao = [];
var Table = [];

function Inicializa() {
  let input = parseFloat(document.getElementById("valorEntrada").value);
  var Sim_Nao = document.getElementsByName("SimEnao");
  var tipo = 0;

  for (let i = 0; i < Sim_Nao.length; i++) {
    if (Sim_Nao[i].checked) {
      tipo = Sim_Nao[i].value;
    }
  }

  console.log(input);

  if (tipo == 0) {
    alert("Escolha uma opção para gerar o gráfico com ou sem MicroSilica");
    return 0;
  }

  if (input < 20 || input > 50 || isNaN(input)) {
    alert("Entre com um número entre 20 e 50");
    return 0;
  }

  if (tipo == 1) {
    GerarCalculo(input, 1);
    MontarTabela();
    RenderizarTabela();
  } else {
    GerarCalculo(input, 2);
    MontarTabela();
    RenderizarTabela();

  }
}

function GerarCalculo(input, tipo) {
  var xaguaTotal_Ligante = (
    -0.138922096637 * Math.log(input) + 1.009468538112
  ).toFixed(2);
  var xliganteTotal = (
    0.006608 * Math.pow(input, 3) -
    0.716135 * Math.pow(input, 2) +
    (26.365430 * input + 36.147371)
  ).toFixed(2);
  var xagua_Total = (xaguaTotal_Ligante * xliganteTotal).toFixed(2);
  var xcimento = (xliganteTotal / 1.1).toFixed(2);
  var xmicrosilica = (xcimento * 0.1).toFixed(2);
  var xagregadoTotal = (
    -0.021425 * Math.pow(input, 3) +
    2.092345 * Math.pow(input, 2) -
    62.579314 * input +
    2467.749326
  ).toFixed(2);
  var xrelacaoPedra = (
    0.000008198 * Math.pow(input, 3) -
    0.001048531 * Math.pow(input, 2) +
    0.044735481 * input +
    0.883475806
  ).toFixed(2);
  var xagregadoGraudo = (xagregadoTotal / (1 + 1 / xrelacaoPedra)).toFixed(2);
  var xareia = (xagregadoTotal - xagregadoGraudo).toFixed(2);
  var xsuper_plastificante = (
    0.000036 * Math.pow(input, 3) -
    0.003036 * Math.pow(input, 2) +
    0.105034 * input +
    0.502114
  ).toFixed(2);
  
  var ValorCimento = (xcimento * 0.86).toFixed(2);
  var ValorMicroSilica = (xmicrosilica * 2.62).toFixed(2);
  var ValorAgua = ((xagua_Total * 5.8) / 1000).toFixed(2);
  var ValorAreia = ((xareia * 84.0) / 2630).toFixed(2);
  var ValorGraudo = ((xagregadoGraudo * 93.75) / 2800).toFixed(2);
  var ValorPlastificante = (xsuper_plastificante * 16.84 * 1.12).toFixed(2);
  var ValorTeorArgamassa = ((parseFloat(xliganteTotal) + parseFloat(xareia) + parseFloat(xagua_Total))/ (parseFloat(xliganteTotal) + parseFloat(xareia) + parseFloat(xagua_Total) + parseFloat(xagregadoGraudo))).toFixed(2);
  var ValorTeorFinos = (((parseFloat(xliganteTotal) + parseFloat(xareia)))/ (parseFloat(xliganteTotal) + parseFloat(xareia) + parseFloat(xagregadoGraudo))).toFixed(2);


  
    console.log(xaguaTotal_Ligante);

  if (tipo == 1) {
    var ValorCimento = (xcimento * 0.86).toFixed(2);

    var ValorTotal = (
      parseFloat(ValorCimento) +
      parseFloat(ValorMicroSilica) +
      parseFloat(ValorAgua) +
      parseFloat(ValorAreia) +
      parseFloat(ValorGraudo) +
      parseFloat(ValorPlastificante)
    ).toFixed(2);

    ResistenciaCompressao.push({
      Mpa: input,
      cimento: xcimento,
      microSilica: xmicrosilica,
      aguaTotal: xagua_Total,
      areia: xareia,
      agregadoGraudo: xagregadoGraudo,
      superPlastificante: xsuper_plastificante,
      PrecoCimento: ValorCimento,
      PrecoMicroSilica: ValorMicroSilica,
      PrecoAgua: ValorAgua,
      PrecoAreia: ValorAreia,
      PrecoGraudo: ValorGraudo,
      PrecoPlastificante: ValorPlastificante,
      Total: ValorTotal,
      Tipo: 1,
      aguaLigante: xaguaTotal_Ligante,
      TeorArgamassa: ValorTeorArgamassa,
      TeorFinos : ValorTeorFinos
    });
  } else {
    var ValorCimento = (xliganteTotal * 0.86).toFixed(2);

    var ValorTotal = (
      parseFloat(ValorCimento) +
      parseFloat(ValorAgua) +
      parseFloat(ValorAreia) +
      parseFloat(ValorGraudo) +
      parseFloat(ValorPlastificante)
    ).toFixed(2);

    ResistenciaCompressao.push({
      Mpa: input,
      cimento: xliganteTotal,
      aguaTotal: xagua_Total,
      areia: xareia,
      agregadoGraudo: xagregadoGraudo,
      superPlastificante: xsuper_plastificante,
      PrecoCimento: ValorCimento,
      PrecoAgua: ValorAgua,
      PrecoAreia: ValorAreia,
      PrecoGraudo: ValorGraudo,
      PrecoPlastificante: ValorPlastificante,
      Total: ValorTotal,
      aguaLigante: xaguaTotal_Ligante,
      TeorArgamassa: ValorTeorArgamassa,
      TeorFinos : ValorTeorFinos


    });
  }
  console.log(ResistenciaCompressao);
}

function MontarTabela() {
  let Tabela = document.getElementById("TabelaResistencia");
  Tabela.innerHTML = "";
  var text = "";
  for (let i = 0; i < ResistenciaCompressao.length; i++) {
    text += `                
                <br></br>
                <capion>Tabela:${i+1}</caption>
              <table class="table  table-responsive table-hover table-dark ">
                  <tr class="table-active">
                    <th  scope = "col">Resistência à compressão = ${ResistenciaCompressao[i].Mpa} Mpa</th>
                    <th scope = "col">Em massa </th>
                    <th scope = "col">Em volume </th>
                    <th scope = "col">Valor</th>
                </tr> 
      
                <tr>
                <th class="table-active" scope = "row">Cimento</th>
                <td>${ResistenciaCompressao[i].cimento} kg/m³</td>
                
                <td>-</td>
                <td class="right">R$ ${ResistenciaCompressao[i].PrecoCimento}</td>

                </tr>`;
    if (ResistenciaCompressao[i].Tipo == 1) {
      text += `
                  <tr>
                  <th class="table-active" scope = "row">Micro-sílica</th>
                  <td>${ResistenciaCompressao[i].microSilica} kg/m³</td>
                  <td>-</td>
                  <td class="right">R$ ${ResistenciaCompressao[i].PrecoMicroSilica}</td>

                  </tr>
                  `;
    }
    text += `
                <th class="table-active" scope = "row">Água Total</th>
                <td>${ResistenciaCompressao[i].aguaTotal} kg/m³</td>
                <td>${((ResistenciaCompressao[i].aguaTotal)/1000).toFixed(2)} m³</td>
                <td class="right">R$ ${ResistenciaCompressao[i].PrecoAgua}</td>

                </tr>
                <tr>
                <th class="table-active" scope = "row">Areia</th>
                <td>${ResistenciaCompressao[i].areia} kg/m³</td>
                <td>${((ResistenciaCompressao[i].areia)/2630).toFixed(2)} m³</td>

                <td class="right">R$ ${ResistenciaCompressao[i].PrecoAreia}</td>

                </tr>
                <tr>
                <th class="table-active" scope = "row">Agregado graúdo</th>
                <td>${ResistenciaCompressao[i].agregadoGraudo} kg/m³</td>
                <td>${((ResistenciaCompressao[i].agregadoGraudo)/2800).toFixed(2)} m³</td>
                <td class="right">R$ ${ResistenciaCompressao[i].PrecoGraudo}</td>

                </tr>
                <tr>
                <th class="table-active" scope = "row">Superplastificante</th>
                <td>-</td>
                <td>${ResistenciaCompressao[i].superPlastificante} L</td>

                <td class="right">R$ ${ResistenciaCompressao[i].PrecoPlastificante}</td>

                </tr> 
                <tfoot>
                <tr>
                  <th class="right table-active" colspan="2">Total (por m³)</th>
                  <td class="right "></td>
                  <td class="right ">R$ ${ResistenciaCompressao[i].Total}</td>
                 
                </tr>
              </tfoot>
                </table>

                
                <table class="table table-hover table-dark ">
                  <tr class="table-active">
                  <th  scope = "col">Teores para resistência de ${ResistenciaCompressao[i].Mpa} MPa</th>
                  
                    <th scope = "col"> </th>
                    
                </tr> 

                <tr>
                <th class="table-active" scope = "row">a/c</th>
                <td>${ResistenciaCompressao[i].aguaLigante}</td>
                </tr>

                <tr>
                <th class="table-active" scope = "row">m</th>
                <td>${ResistenciaCompressao[i].TeorFinos}</td>

                </tr>

                <tr>
                <th class="table-active" scope = "row">α</th>
                <td>${ResistenciaCompressao[i].TeorArgamassa}</td>

                </tr>

                </table>
                  <hr/>
                `;
                 
  }
  Table.push({text});   
  //Tabela.innerHTML = text;
}

function RenderizarTabela() {
  let arrayLength = Table.length;
  console.log(arrayLength);
  let Tabela = document.getElementById("TabelaResistencia");
  
  Tabela.innerHTML = " ";
  for (let i = 0; i < arrayLength; i++) {
    Tabela.innerHTML = Table[i].text;
    
  }
}

function Limpar() {
  let arrayLengthTable = Table.length;
  let arrayLengthResistencia = ResistenciaCompressao.length

    for (let i = 0; i <= arrayLengthTable; i++) {
    Table.pop();
  }

  for (let i = 0; i <= arrayLengthResistencia; i++) {
    ResistenciaCompressao.pop();
  }

  let TabelaJogadores = document.getElementById("TabelaResistencia");
  TabelaJogadores.innerHTML = " ";
}
