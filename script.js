// --- SISTEMA DE NAVEGACIÓN Y PESTAÑAS ---
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-content");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active-content");
    evt.currentTarget.className += " active";
    
    // Cerrar menú móvil si está abierto
    if(window.innerWidth <= 768) {
        document.querySelector('.nav-links').classList.remove('active');
    }
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// --- PROBLEMA 1: ANIMACIÓN JARRAS DE AGUA ---
const waterStates = [
    { j5: 0, j3: 0, msg: "Estado Inicial." },
    { j5: 0, j3: 3, msg: "Llenar la jarra de 3L." },
    { j5: 3, j3: 0, msg: "Verter los 3L en la jarra de 5L." },
    { j5: 3, j3: 3, msg: "Llenar la jarra de 3L nuevamente." },
    { j5: 5, j3: 1, msg: "Verter agua de 3L a 5L hasta llenarla. Sobra 1L." },
    { j5: 0, j3: 1, msg: "Vaciar completamente la jarra de 5L." },
    { j5: 1, j3: 0, msg: "Pasar el litro de la jarra de 3L a la de 5L." },
    { j5: 1, j3: 3, msg: "Llenar la jarra de 3L." },
    { j5: 4, j3: 0, msg: "Verter los 3L en la jarra de 5L. ¡Tenemos 4L!" }
];

let animationTimeout;

function playWaterAnimation() {
    clearTimeout(animationTimeout);
    let step = 0;
    
    function nextStep() {
        if (step < waterStates.length) {
            updateJugs(waterStates[step].j5, waterStates[step].j3, waterStates[step].msg);
            step++;
            animationTimeout = setTimeout(nextStep, 1500); // 1.5s por paso
        }
    }
    nextStep();
}

function updateJugs(v5, v3, message) {
    const p5 = (v5 / 5) * 100;
    const p3 = (v3 / 3) * 100;
    
    document.getElementById('water5l').style.height = `${p5}%`;
    document.getElementById('txt5l').innerText = v5;
    
    document.getElementById('water3l').style.height = `${p3}%`;
    document.getElementById('txt3l').innerText = v3;
    
    document.getElementById('waterLog').innerText = `[Acción] ${message}`;
}

function resetWater() {
    clearTimeout(animationTimeout);
    updateJugs(0, 0, "Presiona 'Animar Solución' para comenzar...");
}

// --- PROBLEMA 2: CUADRADOS MÁGICOS (Algoritmo Siamés) ---
function generateMagicSquare() {
    const container = document.getElementById('magicSquareContainer');
    const n = parseInt(document.getElementById('matrixSize').value);
    
    // Limpiar contenedor y establecer grid dinámico
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${n}, 50px)`;
    
    // Crear matriz vacía
    let magicSquare = Array(n).fill().map(() => Array(n).fill(0));
    
    // Algoritmo Siamés
    let i = parseInt(n / 2);
    let j = n - 1;
    
    for (let num = 1; num <= n * n; ) {
        if (i === -1 && j === n) {
            j = n - 2;
            i = 0;
        } else {
            if (j === n) j = 0;
            if (i < 0) i = n - 1;
        }
        
        if (magicSquare[i][j] !== 0) {
            j -= 2;
            i++;
            continue;
        } else {
            magicSquare[i][j] = num++;
        }
        j++;
        i--;
    }
    
    // Renderizar animado en el DOM
    let delay = 0;
    for(let r=0; r<n; r++){
        for(let c=0; c<n; c++){
            let cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.innerText = magicSquare[r][c];
            cell.style.animationDelay = `${delay}s`;
            container.appendChild(cell);
            delay += 0.05; // Efecto de aparición en cascada
        }
    }
}

// Inicializar la matriz de 3x3 por defecto al cargar
window.onload = function() {
    generateMagicSquare();
};
