// Variáveis
let peso, altura, imc;

function calcularIMC() {
    // Entrada
    peso = Number(document.getElementById('txtPeso').value);
    altura = Number(document.getElementById('txtAltura').value);
    
    // Processamento
    imc = peso / (altura * altura);
    
    // Saída
    document.getElementById('txtIMC').value = imc.toFixed(2);
    
}
function limparCampos() {
    document.getElementById('txtPeso').value = '';
    document.getElementById('txtAltura').value = '';
    document.getElementById('txtIMC').value = '';
}
