function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    try {
        let expression = document.getElementById('display').value;
        let result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Resultado inválido. Verifique os cálculos.');
        }
        document.getElementById('display').value = result;
        addToHistory(expression, result);
    } catch (error) {
        document.getElementById('display').value = error.message;
    }
}


function clearDisplay() {
    document.getElementById('display').value = '';
}

function clearBack() {
    var result = document.getElementById('display').value;
    document.getElementById('display').value = result.substring(0, result.length -1);
}

function addToHistory(expression, result) {
    const history = document.getElementById('history');
    const historyEntry = document.createElement('div');
    historyEntry.textContent = `${expression} = ${result}`;
    historyEntry.onclick = () => {
        document.getElementById('display').value = result;
    };
    history.appendChild(historyEntry);
}

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

function clearHistory() {
    document.getElementById('history').innerHTML = '';
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const modeButton = document.getElementById('mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        modeButton.textContent = 'Modo Claro';
    } else {
        modeButton.textContent = 'Modo Escuro';
    }
}

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000); // Atualiza a cada segundo

