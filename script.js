// Atualizar o visor da calculadora
let calculationDone = false; // Indica se o cálculo foi concluído
let operatorClicked = false; // Indica se um operador foi clicado após o cálculo
function appendToDisplay(value) {
    const display = document.getElementById('display');

    // Se o cálculo foi concluído e o valor clicado for um número, limpa o visor
    if (calculationDone && !isNaN(value)) {
        display.value = value;
        calculationDone = false; // Reseta a variável para permitir novas operações
    } else {
        // Se um operador foi clicado, adicione ao display sem limpar
        if (calculationDone && isNaN(value)) {
            display.value += value;
            operatorClicked = true; // Marca que o operador foi clicado
            calculationDone = false; // Evita limpar o resultado ao clicar em outro operador
        } else if (operatorClicked && !isNaN(value)) {
            // Se o operador foi clicado e agora é um número, limpa o display
            display.value = value;
            operatorClicked = false; // O operador foi utilizado, reseta a variável
        } else {
            display.value += value;
        }
    }
}

// Função de calcular com mapeamento de operadores visuais para operadores do JavaScript
function calculate() {
    try {
        let expression = document.getElementById('display').value;
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');

        let result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Resultado inválido. Verifique os cálculos.');
        }
        document.getElementById('display').value = result;
        addToHistory(expression, result);
        calculationDone = true; // Indica que o cálculo foi realizado
    } catch (error) {
        document.getElementById('display').value = error.message;
    }
}

// Função para calcular a raiz quadrada
function calculateSqrt() {
    try {
        let expression = document.getElementById('display').value;
        let result = Math.sqrt(eval(expression));
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Resultado inválido. Verifique os cálculos.');
        }
        document.getElementById('display').value = result;
        addToHistory(`√(${expression})`, result);
    } catch (error) {
        document.getElementById('display').value = error.message;
    }
}

// Função para calcular o percentual
function calculatePercentage() {
    try {
        let expression = document.getElementById('display').value;
        let result = eval(expression) / 100;
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Resultado inválido. Verifique os cálculos.');
        }
        document.getElementById('display').value = result;
        addToHistory(`${expression}%`, result);
    } catch (error) {
        document.getElementById('display').value = error.message;
    }
}

// Função para calcular a potência (base^expoente)
function calculateExponent(base, exponent) {
    try {
        let result = Math.pow(base, exponent);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Resultado inválido. Verifique os cálculos.');
        }
        document.getElementById('display').value = result;
        addToHistory(`${base}^${exponent}`, result);
    } catch (error) {
        document.getElementById('display').value = error.message;
    }
}

// Limpa completamente tudo
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Limpa o ultimo caracter colocado
function clearBack() {
    var result = document.getElementById('display').value;
    document.getElementById('display').value = result.substring(0, result.length -1);
}

// Adicionar no Historico
function addToHistory(expression, result) {
    const history = document.getElementById('history');
    const historyEntry = document.createElement('span');
    historyEntry.textContent = `${expression} = ${result}`;
    historyEntry.onclick = () => {
        document.getElementById('display').value = result;
    };
    history.appendChild(historyEntry);
}

// Função para identificar as Teclas
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        clearBack();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Limpa todo o historico 
function clearHistory() {
    document.getElementById('history').innerHTML = '';
}

// Altera entre Modo Claro e Escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const modeButton = document.getElementById('mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        modeButton.textContent = 'Modo Claro';
    } else {
        modeButton.textContent = 'Modo Escuro';
    }
}

// Relogio
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

// Atualiza a cada segundo
setInterval(updateClock, 1000); 

