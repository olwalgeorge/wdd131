document.addEventListener('DOMContentLoaded', initializeCalculator);

function initializeCalculator() {
    const fertilizerSelect = document.getElementById('fertilizerSelect');
    const formulaInput = document.getElementById('formula');
    const calculateButton = document.getElementById('calculateButton');

    populateFertilizerDropdown(fertilizerSelect);
    addEventListeners(fertilizerSelect, formulaInput, calculateButton);
}

function populateFertilizerDropdown(select) {
    fertilizers.forEach(fertilizer => {
        const option = document.createElement('option');
        option.value = fertilizer.formula;
        option.textContent = fertilizer.name;
        select.appendChild(option);
    });
}

function addEventListeners(select, input, button) {
    select.addEventListener('change', updateFormulaInput);
    input.addEventListener('input', formatFormulaInput);
    button.addEventListener('click', calculateMasses);
}

function updateFormulaInput(event) {
    document.getElementById('formula').value = event.target.value;
}

function formatFormulaInput(event) {
    let cursorPosition = event.target.selectionStart;
    event.target.value = event.target.value.replace(/\./g, '·').replace(/\s/g, '');
    event.target.setSelectionRange(cursorPosition, cursorPosition);
}

function calculateMasses() {
    const formula = document.getElementById('formula').value;
    const totalMass = parseFloat(document.getElementById('totalMass').value);
    const resultDiv = document.getElementById('result');
    
    try {
        const periodicTable = makePeriodicTable();
        const parsedFormula = parseFormula(formula, periodicTable);
        
        let totalMolarMass = calculateTotalMolarMass(parsedFormula, periodicTable);
        const moles = totalMass / totalMolarMass;

        let output = generateOutput(formula, totalMolarMass, moles, parsedFormula, periodicTable);
        resultDiv.innerHTML = output;
    } catch (error) {
        handleError(error, resultDiv);
    }
}

function calculateTotalMolarMass(parsedFormula, periodicTable) {
    return parsedFormula.reduce((total, [symbol, quantity]) => {
        return total + periodicTable[symbol][1] * quantity;
    }, 0);
}

function generateOutput(formula, totalMolarMass, moles, parsedFormula, periodicTable) {
    let output = `<h2>Results for ${formula}</h2>`;
    output += `<p>Total molar mass: ${totalMolarMass.toFixed(4)} g/mol</p>`;
    output += `<p>Number of moles: ${moles.toFixed(4)} mol</p>`;
    
    output += `<h3>Element Composition:</h3>`;
    output += `<table>
                 <tr>
                   <th>Element</th>
                   <th>Symbol</th>
                   <th>Count</th>
                   <th>Molar Mass</th>
                   <th>Mass</th>
                 </tr>`;

    parsedFormula.forEach(([symbol, quantity]) => {
        const elementMass = periodicTable[symbol][1] * quantity * moles;
        const elementMolarMass = periodicTable[symbol][1] * quantity;
        output += `<tr>
                     <td>${periodicTable[symbol][0]}</td>
                     <td>${symbol}</td>
                     <td>${quantity}</td>
                     <td>${elementMolarMass.toFixed(4)} g/mol</td>
                     <td>${elementMass.toFixed(4)} g</td>
                   </tr>`;
    });
    
    output += `</table>`;
    return output;
}

function handleError(error, resultDiv) {
    if (error instanceof FormulaError) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    } else {
        resultDiv.innerHTML = `<p>An unexpected error occurred: ${error.message}</p>`;
    }
}