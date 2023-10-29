function graficarCartas() {
    graficar_X();
    graficar_R();
    graficar_S();
    graficar_XS();
}
function graficar(data, containerId, promedio, lic, lsc, varName, color) {
    const n = parseInt(document.getElementById('n').value);
    const nfilas = crearLista(n);

    const margin = { top: 20, right: 40, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([1, n])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(promediosFila.concat(promedioPromedios, resultado_X_LIC, resultado_X_LSC))])
        .range([height, 0]);

    // Dibujar líneas horizontales
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(promedio))
        .attr("x2", width)
        .attr("y2", yScale(promedio))
        .attr("stroke", "red")
        .attr("stroke-dasharray", "5,5");

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(lic))
        .attr("x2", width)
        .attr("y2", yScale(lic))
        .attr("stroke", "green")
        .attr("stroke-dasharray", "5,5");

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(lsc))
        .attr("x2", width)
        .attr("y2", yScale(lsc))
        .attr("stroke", "orange")
        .attr("stroke-dasharray", "5,5");

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(varName))
        .attr("x2", width)
        .attr("y2", yScale(varName))
        .attr("stroke", "orange")
        .attr("stroke-dasharray", "5,5");

    // Dibujar las líneas de los datos
    const line = d3.line()
        .x((d, i) => xScale(nfilas[i]))
        .y(d => yScale(d));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

    // Agregar círculos en los puntos
    svg.selectAll("circle")
        .data(data.concat(promedio, lic, lsc, varName))
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(nfilas[i]))
        .attr("y", d => yScale(d) - 10)
        .attr("text-anchor", "middle")
        .attr("fill", color)
        .style("font-size", "12px"); // Ajustar el tamaño de fuente
    // Agregar números en los puntos
    svg.selectAll("text")
        .data(data.concat(promedio, lic, lsc, varName))
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", (d, i) => xScale(nfilas[i]))
        .attr("y", d => yScale(d) - 10)
        .attr("text-anchor", "middle")
        .attr("fill", color)
        .style("font-size", "12px"); // Ajustar el tamaño de fuente

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)) // Eje X
        .style("font-size", "12px"); // Ajustar el tamaño de fuente del eje X

    svg.append("g")
        .call(d3.axisLeft(yScale)) // Eje Y
        .style("font-size", "12px"); // Ajustar el tamaño de fuente del eje Y
}

function graficar_X() {
    const contenedorGrafica = document.getElementById('chart-container_X');

    // Elimina cualquier contenido anterior en el contenedor
    d3.select(contenedorGrafica).selectAll("*").remove();

    //necesito imprimir promediospromedios " X " tambien las otras _x_lic
    const promediosFilaFormateados = promediosFila.map(valor => valor.toFixed(3));
    graficar(promediosFilaFormateados, 'chart-container_X', promedioPromedios, resultado_X_LIC, resultado_X_LSC, resultado_X_VAR, 'black');
}

function graficar_R() {
    const promediosRangoFormateados = rangos.map(valor => valor.toFixed(3));
    graficar(promediosRangoFormateados, 'chart-container_R', promedioRangos, resultado_R_LIC, resultado_R_LSC, resultado_R_VAR, 'black');
}

function graficar_S() {
    const promediosDesviacionesFormateados = desviaciones.map(valor => valor.toFixed(3));
    graficar(promediosDesviacionesFormateados, 'chart-container_S', promedioDesviaciones, resultado_S_LIC, resultado_S_LSC, resultado_S_VAR, 'black');
}

function graficar_XS() {
    const promediosFilaFormateados = promediosFila.map(valor => valor.toFixed(3));
    graficar(promediosFilaFormateados, 'chart-container_XS', promedioPromedios, resultado_XS_LIC, resultado_XS_LSC, resultado_XS_VAR, 'black');
}