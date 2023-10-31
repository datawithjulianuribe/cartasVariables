let n = [];
let datos = [];
let promediosFila = [];
let rangos = [];
let desviaciones = [];
let nfilas = [];
let promedioPromedios, promedioRangos, promedioDesviaciones;
let resultado_X_LSC, resultado_X_LIC, resultado_X_VAR, resultado_R_LSC, resultado_R_LIC, resultado_R_VAR;
let resultado_S_LSC, resultado_S_LIC, resultado_S_VAR, resultado_XS_LSC, resultado_XS_LIC, resultado_XS_VAR;
let LSE, LIE;
let indiceCentramiento = [];

const valores = [
    [0, 0, 1.880, 1.023, 0.729, 0.577, 0.483, 0.419, 0.373, 0.337, 0.308, 0.285, 0.266, 0.249, 0.235, 0.223, 0.212, 0.203, 0.194, 0.187, 0.180, 0.173, 0.167, 0.162, 0.157, 0.153],
    [0, 0, 2.659, 1.954, 1.628, 1.427, 1.287, 1.182, 1.099, 1.032, 0.975, 0.927, 0.886, 0.850, 0.817, 0.789, 0.763, 0.739, 0.718, 0.698, 0.680, 0.663, 0.647, 0.633, 0.619, 0.606],
    [0, 0, 0.798, 0.886, 0.921, 0.940, 0.952, 0.959, 0.965, 0.969, 0.974, 0.978, 0.982, 0.986, 0.989, 0.992, 0.994, 0.996, 0.998, 1.000, 1.002, 1.003, 1.005, 1.006, 1.008, 1.009],
    [0, 0, 3.267, 2.574, 2.282, 2.114, 2.004, 1.924, 1.864, 1.816, 1.777, 1.744, 1.717, 1.693, 1.672, 1.653, 1.637, 1.620, 1.606, 1.592, 1.580, 1.568, 1.559, 1.548, 1.538, 1.529],
    [0, 0, 2.575, 2.282, 2.115, 2.004, 1.924, 1.864, 1.816, 1.777, 1.744, 1.717, 1.693, 1.672, 1.653, 1.637, 1.620, 1.606, 1.592, 1.580, 1.568, 1.559, 1.548, 1.538, 1.529],
    [0, 0, 0.000, 0.000, 0.000, 0.000, 0.076, 0.136, 0.184, 0.223, 0.256, 0.284, 0.307, 0.328, 0.347, 0.363, 0.378, 0.391, 0.404, 0.415, 0.425, 0.434, 0.443, 0.451, 0.459, 0.466],
    [0, 0, 3.267, 2.282, 2.281, 2.114, 2.004, 1.924, 1.864, 1.816, 1.777, 1.744, 1.717, 1.693, 1.672, 1.653, 1.637, 1.620, 1.606, 1.592, 1.580, 1.568, 1.559, 1.548, 1.538, 1.529]
];

function crearLista(n) {
    const lista = [];
    for (let i = 1; i <= n; i++) {
        lista.push(i);
    }
    return lista;
}

nfilas = crearLista(n);

function crearTabla() {
    const n = parseInt(document.getElementById('n').value);
    const m = parseInt(document.getElementById('m').value);

    if (isNaN(n) || isNaN(m)) {
        alert('Por favor, ingresa números válidos para tamaño de muestra (n) y número de muestras (m).');
        return;
    }

    const tablaContainer = document.getElementById('tabla-container');

    const tabla = document.createElement('table');

    for (let i = 0; i < m; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            const celda = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('input-dinamico'); // Asigna la clase 'input-dinamico' para CSS
            celda.appendChild(input);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    tablaContainer.innerHTML = '';
    tablaContainer.appendChild(tabla);
}

function guardarDatos() {
    const tabla = document.querySelector('table');
    const filas = tabla.querySelectorAll('tr');
    datos = [];
    promediosFila = [];
    rangos = [];
    desviaciones = [];

    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        datos[i] = [];
        celdas.forEach((celda, j) => {
            const input = celda.querySelector('input');
            const valor = parseFloat(input.value || 0);
            datos[i][j] = valor;
        });

        const promedioFila = parseFloat((datos[i].reduce((total, valor) => total + valor, 0) / datos[i].length).toFixed(4));
        promediosFila.push(promedioFila);
        const max = Math.max(...datos[i]);
        const min = Math.min(...datos[i]);
        const rangoFila = parseFloat((max - min).toFixed(2));
        rangos.push(rangoFila);
        const desviacionFila = calcularDesviacion(datos[i], promedioFila);
        desviaciones.push(desviacionFila);
    });
    calcularCartas();
    mostrarResultados();

}

function calcularCartas() {
    const n = parseInt(document.getElementById('n').value);

    // Valores de las tablas
    const valorA2 = valores[0][n];
    const valorA3 = valores[1][n];
    const valorc4 = valores[2][n];
    const valord2 = valores[3][n];
    const valord3 = valores[4][n];
    const valorD3 = valores[5][n];
    const valorD4 = valores[6][n];

    // Cálculo de promedios
    promediosFixed = promediosFila.reduce((total, promedio) => total + promedio, 0) / promediosFila.length;
    promedioPromedios = parseFloat(promediosFixed.toFixed(3));  // Aplica el formato después del cálculo

    rangosFixed = rangos.reduce((total, rango) => total + rango, 0) / rangos.length;
    promedioRangos = parseFloat(rangosFixed.toFixed(3));  // Aplica el formato después del cálculo

    desviacionesFixed = desviaciones.reduce((total, desviacion) => total + desviacion, 0) / desviaciones.length;
    promedioDesviaciones = parseFloat(desviacionesFixed.toFixed(3));  // Aplica el formato después del cálculo


    // Cálculo de límites y varianzas
    resultado_X_LSC = (promedioPromedios + valorA2 * promedioRangos).toFixed(3); // Calcular X LIC
    resultado_X_LIC = (promedioPromedios - valorA2 * promedioRangos).toFixed(3); // Calcular X LIC
    resultado_X_VAR = (promedioRangos / valord2).toFixed(3); // Calcular X VAR
    resultado_R_LSC = (valorD4 * promedioRangos).toFixed(3); // Calcular R LSC
    resultado_R_LIC = (valorD3 * promedioRangos).toFixed(3); // Calcular R LIC
    resultado_R_VAR = (valord3 * (promedioRangos / valord2)).toFixed(3); // Calcular R VAR

    // Calcular límites y varianzas de S
    const sFactor = (3 * promedioDesviaciones) / valorc4;
    const sqrtPart = Math.sqrt(1 - Math.pow(valorc4, 2));
    resultado_S_LSC = (promedioDesviaciones + sFactor * sqrtPart).toFixed(3);
    resultado_S_LIC = (promedioDesviaciones - sFactor * sqrtPart).toFixed(3);
    resultado_S_VAR = (promedioDesviaciones / valorc4).toFixed(3);

    // Cálculo de límites y varianzas de X-S
    resultado_XS_LSC = (promedioPromedios + valorA3 * promedioDesviaciones).toFixed(3); // Calcular X-S LSC
    resultado_XS_LIC = (promedioPromedios - valorA3 * promedioDesviaciones).toFixed(3); // Calcular X-S LIC
    resultado_XS_VAR = (promedioRangos / valord2).toFixed(3); // Calcular X-S VAR
}

function calcularDesviacion(valores, promedio) {
    const sumatoriaDiferencias = valores.reduce((total, valor) => total + Math.pow(valor - promedio, 2), 0);
    const varianza = sumatoriaDiferencias / valores.length;
    return parseFloat(Math.sqrt(varianza).toFixed(4));
}

function mostrarResultados() {
    const resultadoEstadisticos = document.getElementById('resultado');
    resultadoEstadisticos.innerHTML = "Promedios de cada fila: " + JSON.stringify(promediosFila) + "<br>Rangos de cada fila: " + JSON.stringify(rangos) + "<br>Desviación de cada fila: " + JSON.stringify(desviaciones) + "<br> ";

    const resultadoCartas = document.getElementById('resultadoCartas');
    resultadoCartas.innerHTML = "<br> X : " + promedioPromedios + "<br> X LSC: " + resultado_X_LSC + "<br> X LIC: " + resultado_X_LIC + "<br> X VAR: " + resultado_X_VAR + "<br> ";
    resultadoCartas.innerHTML += "<br> R : " + promedioRangos + "<br> R LSC: " + resultado_R_LSC + "<br> R LIC: " + resultado_R_LIC + "<br> R VAR: " + resultado_R_VAR + "<br> ";
    resultadoCartas.innerHTML += "<br> S : " + promedioDesviaciones + "<br> S LSC: " + resultado_S_LSC + "<br> S LIC: " + resultado_S_LIC + "<br> S VAR: " + resultado_S_VAR + "<br> ";
    resultadoCartas.innerHTML += "<br> X : " + promedioPromedios + "<br> X-S LSC: " + resultado_XS_LSC + "<br> X-S LIC: " + resultado_XS_LIC + "<br> X-S VAR: " + resultado_XS_VAR;
}

function Capacidad() {
    const LSE = parseFloat(document.getElementById('LSE').value);
    const LIE = parseFloat(document.getElementById('LIE').value);

    if (isNaN(LSE) || isNaN(LIE)) {
        alert('Por favor, ingresa números válidos para los límites de la especificación.');
        return;
    }

    if ((LSE < LIE) || (LSE == LIE)) {
        alert('La especificación superior no puede ser menor a la especificación inferior o las especificaciones son iguales. Favor revisar.');
        return;
    }

    Cp_x = ((LSE - LIE) / (6*(resultado_X_VAR))).toFixed(3);
    Cpk_x = ((promedioPromedios - LIE) / (3*(resultado_X_VAR))).toFixed(3);
    Cpk_x_su = ((LSE - promedioPromedios) / (3*(resultado_X_VAR))).toFixed(3);
    const  result_cap= document.getElementById('resultadoCapacidad');
    result_cap.innerHTML = "Resultado indice de capacidad de proceso Cp: " + Cp_x + "<br>Resultado indice de centramiento de capacidad de proceso Cpk: " + Cpk_x +" , "+ Cpk_x_su;

    /* indiceCentramiento.push(Cpk_x);
    indiceCentramiento.push(Cpk_x_su);
    var indiceC = Math.min(...indiceCentramiento); */
    
    if (Cp_x < 0.67) {
        alert('Indice de capacidad de proceso: No es adecuado para el trabajo. Requiere muy serias modificaciones.');
        return;
    } else if (Cp_x >= 0.67 && Cp_x < 1) {
        alert('Indice de capacidad de proceso: No es adecuado para el trabajo. Se requiere un análisis del proceso. Requiere modificaciones serias para alcanzar una calidad satisfactoria.');
        return;
    } else if (Cp_x >= 1 && Cp_x < 1.33){
        alert('Indice de capacidad de proceso: Parcialmente adecuado. Requiere un control estricto.');
        return;
    } else if (Cp_x >= 1.33 && Cp_x < 2) {
        alert('Indice de capacidad de proceso: Adecuado.');
        return;
    } else {
        alert('Indice de capacidad de proceso: Es un proceso de calidad. Se tiene seis sigma.');
        return;
    }

    /* if (indiceC > 1){
        alert('Indice de centramiento de capacidad de proceso: El proceso produce productos que cumplen con las especificaciones.');
        return;
    } else if (indiceC > 0 && indiceC <= 1){
        alert('Indice de centramiento de capacidad de proceso: El proceso produce productos fuera de las especificaciones.');
        return;
    } else {
        alert('Indice de centramiento de capacidad de proceso: Valores menores que 0 indica que la media del proceso está fuera de las especificaciones requeridas.');
        return;
    } */

}