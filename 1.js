// Definición del Espacio de Estados (Solución Óptima)
const solutionPath = [
    { a: 0, b: 0, action: "Estado Inicial (0, 0)" },
    { a: 0, b: 3, action: "Llenar Jarra B (0, 3)" },
    { a: 3, b: 0, action: "Verter Jarra B en Jarra A (3, 0)" },
    { a: 3, b: 3, action: "Llenar Jarra B (3, 3)" },
    { a: 5, b: 1, action: "Verter Jarra B en A hasta llenarla. Sobra 1L en B (5, 1)" },
    { a: 0, b: 1, action: "Vaciar Jarra A (0, 1)" },
    { a: 1, b: 0, action: "Verter 1L de Jarra B a Jarra A (1, 0)" },
    { a: 1, b: 3, action: "Llenar Jarra B (1, 3)" },
    { a: 4, b: 0, action: "Verter Jarra B en Jarra A (4, 0)", success: true }
];

let simulationInterval;
const btnStart = document.getElementById('btnStart');

function startSimulation() {
    // Evitar múltiples ejecuciones
    btnStart.disabled = true;
    btnStart.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ejecutando...';
    
    const logContainer = document.getElementById('stateLog');
    logContainer.innerHTML = ''; // Limpiar logs anteriores
    
    let currentStep = 0;

    function executeStep() {
        if (currentStep < solutionPath.length) {
            const state = solutionPath[currentStep];
            
            // 1. Actualizar Gráficos (Agua)
            const percentageA = (state.a / 5) * 100;
            const percentageB = (state.b / 3) * 100;
            
            document.getElementById('water5l').style.height = `${percentageA}%`;
            document.getElementById('water3l').style.height = `${percentageB}%`;
            
            // 2. Actualizar Textos
            document.getElementById('txt5l').innerText = state.a;
            document.getElementById('txt3l').innerText = state.b;

            // 3. Escribir en el Log
            const li = document.createElement('li');
            li.innerHTML = `[Paso ${currentStep}] ${state.action}`;
            
            if (state.success) {
                li.classList.add('success');
                btnStart.disabled = false;
                btnStart.innerHTML = '<i class="fas fa-check"></i> Completado';
            }
            
            logContainer.appendChild(li);
            
            // Auto-scroll del panel de logs
            logContainer.parentElement.scrollTop = logContainer.parentElement.scrollHeight;

            currentStep++;
            simulationInterval = setTimeout(executeStep, 1500); // 1.5 segundos entre estados
        }
    }

    // Arrancar la simulación
    executeStep();
}

function resetSimulation() {
    clearTimeout(simulationInterval);
    
    // Restaurar Botón
    btnStart.disabled = false;
    btnStart.innerHTML = '<i class="fas fa-play"></i> Iniciar Búsqueda';
    
    // Restaurar Gráficos
    document.getElementById('water5l').style.height = '0%';
    document.getElementById('water3l').style.height = '0%';
    document.getElementById('txt5l').innerText = '0';
    document.getElementById('txt3l').innerText = '0';
    
    // Restaurar Logs
    const logContainer = document.getElementById('stateLog');
    logContainer.innerHTML = '<li class="system-msg">Simulador reiniciado. Esperando ejecución...</li>';
}
