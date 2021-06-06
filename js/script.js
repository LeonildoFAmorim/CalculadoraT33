// variáveis globais (podem serem vistas por qualquer funçao)
let numerosParaMMC_MDC = [],
    numerosOriginais = [],
    calculoMMCExecutado = false,
    calculoMDCExecutado = false,
    tecladoDisponivel = true,
    displayEstahVazio = true,
    calculoPrimoExecutado = false,
    mmc = 1,
    mdc = 1;

function lerDados() {
    let valorDigitado = eval(document.getElementById('display').innerHTML);
    return valorDigitado;
}

function exibirMensagem(mensagem) {
    document.getElementById('display').innerHTML = mensagem;
}

function limparDisplay() {
    document.getElementById('display').innerHTML = '';
}

function reiniciar() {
    document.getElementById('vetor').innerHTML = '';
    document.getElementById('display').innerHTML = '';
    calculoMMCExecutado = false;
    calculoMDCExecutado = false;
    tecladoDisponivel = true;
    numerosParaMMC_MDC = [];
    numerosOriginais = [];
    mmc = 1;
    mdc = 1;
}

function captarValoresDoTeclado(valor) {
    if (tecladoDisponivel == true) {
        if (displayEstahVazio == false) {
            limparDisplay();
            document.querySelector('.display').innerHTML += valor;
        } else {
            document.querySelector('.display').innerHTML += valor;
        }
        displayEstahVazio = true;
        calculoPrimoExecutado = false;
    }
}

function calculoAritmetico() {
    if (tecladoDisponivel == true) {
        let resultado = '';
        try {
            resultado = lerDados();
        } catch (erro) {
            alert('sentença inválida!');
        }
        (resultado != undefined) ? exibirMensagem(resultado) : '';
    }
    displayEstahVazio = false;
}

function verificaSeEhPrimo() {
    if (calculoPrimoExecutado == false) {
        let divisores = 0,
            primo = '',
            valordoDisplay = 0;
        try {
            valordoDisplay = parseInt(lerDados());
        } catch (erro) {
            alert('valor inválido!');
        }
        if (isNaN(valordoDisplay) == false) {
            for (let i = 1; i <= valordoDisplay; i++) {
                if (valordoDisplay % i == 0) {
                    divisores++;
                }
            }
            (divisores == 2 ? primo = 'é primo' : primo = 'não é primo');
            exibirMensagem(valordoDisplay + " " + primo);
            displayEstahVazio = false;
            calculoPrimoExecutado = true;
        }
    } else {
        exibirMensagem(valordoDisplay + " " + primo);
    }
}
// inserir números no vetor
function inserirNumeros() {
    let numeroRepetido = false;
    if (tecladoDisponivel == true) {
        let valorDigitado = Math.abs(parseInt(document.getElementById('display').innerHTML)); // números decimais serão considerado apenas a parte inteira. Números negativos serão convertidos para positivos.
        if (valorDigitado > 1 && isNaN(valorDigitado) == false) {
            for (let i = 0; i < numerosParaMMC_MDC.length; i++) {
                if (valorDigitado == numerosParaMMC_MDC[i]) {
                   numeroRepetido = true;
                }
            }
            if (numeroRepetido == false) {
                numerosParaMMC_MDC.push(valorDigitado);
                numerosOriginais.push(valorDigitado);
                limparDisplay();
                document.getElementById('vetor').innerText = numerosParaMMC_MDC;
            } else {
                exibirMensagem('valor já inserido');
                displayEstahVazio = false;
            }
        } else {
            exibirMensagem('valor inválido p/ MMC-MDC');
            displayEstahVazio = false;
        }
    }
}

// somar todos os valores de um vetor para calcular MMC
function somarNumeros(vetor) {
    var somaValores = 0;
    for (let i = 0; i < vetor.length; i++) {
        somaValores += parseInt(vetor[i]);
    }
    return somaValores;
}

function calcularMMC() {
    if (calculoMMCExecutado == false) {
        if (numerosParaMMC_MDC != '') {
            var somaDosNumeros = somarNumeros(numerosParaMMC_MDC);
            var divisor = 2;
            while (somaDosNumeros != numerosParaMMC_MDC.length) {
                let houveDivisivel = false;
                for (let i = 0; i < numerosParaMMC_MDC.length; i++) {
                    if (numerosParaMMC_MDC[i] % divisor == 0) {
                        numerosParaMMC_MDC[i] /= divisor;
                        houveDivisivel = true;
                    }
                }
                (houveDivisivel == true ? mmc *= divisor : divisor++);
                somaDosNumeros = somarNumeros(numerosParaMMC_MDC); // atualizando a soma dos valores do vetor
            }
            calculoMMCExecutado = true;
            exibirMensagem(`MMC: ${mmc}`);
            tecladoDisponivel = false;
            numerosParaMMC_MDC = numerosOriginais;
        }
    } else {
        exibirMensagem(`MMC: ${mmc}`);
    }
    calculoPrimoExecutado = false;
}

function calcularMDC() {
    if (calculoMDCExecutado == false) {
        if (numerosParaMMC_MDC != '') {
            var divisor = 2;
            var algumNumeroFatorado = false;
            while (algumNumeroFatorado == false) {
                var divioresComum = 0;
                var houveDivisivel = false;
                for (i = 0; i < numerosParaMMC_MDC.length; i++) {
                    if (numerosParaMMC_MDC[i] % divisor == 0) {
                        numerosParaMMC_MDC[i] /= divisor;
                        houveDivisivel = true;
                        divioresComum++;
                    }
                    if (numerosParaMMC_MDC[i] == 1) {
                        algumNumeroFatorado = true;
                    }
                }
                if (divioresComum == numerosParaMMC_MDC.length) {
                    mdc *= divisor;
                }
                if (houveDivisivel == false) {
                    divisor++;
                }
            }
            calculoMDCExecutado = true;
            exibirMensagem(`MDC: ${mdc}`);
            tecladoDisponivel = false;
            numerosParaMMC_MDC = numerosOriginais;
        }
    } else {
        exibirMensagem(`MDC: ${mdc}`);
    }
    calculoPrimoExecutado = false;
}
