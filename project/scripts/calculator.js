// calculator.js

let currentElementIndex = 0;
const elements = Object.keys(essentialElements);
let currentStage = 1;
let calculatedValues = {}; // Object to store calculated values for each element

document.addEventListener('DOMContentLoaded', initializeCalculator);

function initializeCalculator() {
    const fertilizerSelect = document.getElementById('fertilizerSelect');
    const formulaInput = document.getElementById('formula');
    const calculateButton = document.getElementById('calculateButton');
    const injectorRatioInput = document.getElementById('injectorRatio');
    const stockTankCapacityInput = document.getElementById('stockTankCapacity');

    addEventListeners(fertilizerSelect, formulaInput, calculateButton, injectorRatioInput, stockTankCapacityInput);
    
    // Add stage selection
    const stageSelect = document.createElement('select');
    stageSelect.id = 'stageSelect';
    stageSelect.innerHTML = `
        <option value="1">Stage 1</option>
        <option value="2">Stage 2</option>
        <option value="3">Stage 3</option>
    `;
    stageSelect.addEventListener('change', (e) => {
        currentStage = parseInt(e.target.value);
        currentElementIndex = 0;
        calculatedValues = {}; // Reset calculated values when changing stages
        setupCurrentElement();
    });
    
    document.querySelector('.form-container').insertBefore(stageSelect, fertilizerSelect);
    
    // Add current element display
    const currentElementDiv = document.createElement('div');
    currentElementDiv.id = 'currentElement';
    document.querySelector('.form-container').insertBefore(currentElementDiv, document.getElementById('result'));
    
    setupCurrentElement();
    populateRecipeTable();
    updateRecipeTable({}); // Initialize with empty actual masses
}

function addEventListeners(select, input, button, injectorRatioInput, stockTankCapacityInput) {
    select.addEventListener('change', updateFormulaInput);
    input.addEventListener('input', formatFormulaInput);
    button.addEventListener('click', handleCalculateOrContinue);

    // Validate Injector Ratio
    injectorRatioInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
    });

    // Validate Stock Tank Capacity
    stockTankCapacityInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
    });
}

function updateFormulaInput(event) {
    const selectedFertilizer = fertilizers.find(f => f.name === event.target.value);
    if (selectedFertilizer) {
        document.getElementById('formula').value = selectedFertilizer.formula;
    }
}

function formatFormulaInput(event) {
    let cursorPosition = event.target.selectionStart;
    event.target.value = event.target.value.replace(/\./g, '·').replace(/\s/g, '');
    event.target.setSelectionRange(cursorPosition, cursorPosition);
}

function setupCurrentElement() {
    if (currentElementIndex < elements.length) {
        const element = elements[currentElementIndex];
        const sources = essentialElements[element];
        
        updateFertilizerDropdown(sources);
        
        const recipeValue = getRecipeValue(element, currentStage);
        const calculatedValue = calculatedValues[element] || 0;
        const remainingValue = Math.max(0, recipeValue - calculatedValue);
        document.getElementById('totalMass').value = remainingValue.toFixed(2);
        
        let statusMessage = '';
        const calculateButton = document.getElementById('calculateButton');
        if (remainingValue <= 0) {
            statusMessage = ' (Not required or target amount met)';
            calculateButton.textContent = 'Continue';
        } else {
            calculateButton.textContent = 'Calculate';
        }
        calculateButton.disabled = false;
        
        document.getElementById('currentElement').textContent = `Current Element: ${element}${statusMessage}`;
        document.getElementById('currentElement').style.fontWeight = 'bold';
    } else {
        document.getElementById('currentElement').textContent = "All elements processed";
        document.getElementById('calculateButton').disabled = true;
        document.getElementById('calculateButton').textContent = 'Calculate';
    }
}

function updateFertilizerDropdown(sources) {
    const select = document.getElementById('fertilizerSelect');
    select.innerHTML = '<option value="">Select a fertilizer</option>';
    sources.forEach(source => {
        const option = document.createElement('option');
        option.value = source;
        option.textContent = source;
        select.appendChild(option);
    });
    // Clear the formula input when updating the dropdown
    document.getElementById('formula').value = '';
}

function getRecipeValue(element, stage) {
    const rowIndex = recipeData.Nutrient.findIndex(nutrient => nutrient === element);
    if (rowIndex === -1) return 0;
    return recipeData[`Stage_${stage}`][rowIndex];
}

function handleCalculateOrContinue() {
    const element = elements[currentElementIndex];
    const recipeValue = getRecipeValue(element, currentStage);
    const calculatedValue = calculatedValues[element] || 0;
    const remainingValue = recipeValue - calculatedValue;
    
    if (remainingValue <= 0) {
        if (confirm(`${element} is not required or its target amount has been met. Continue to the next element?`)) {
            currentElementIndex++;
            setupCurrentElement();
        }
    } else {
        calculateCurrentElement();
    }
}

function calculateCurrentElement() {
    const formula = document.getElementById('formula').value;
    const totalMass = parseFloat(document.getElementById('totalMass').value);
    const injectorRatio = parseInt(document.getElementById('injectorRatio').value);
    const stockTankCapacity = parseInt(document.getElementById('stockTankCapacity').value);
    const resultDiv = document.getElementById('result');
    const currentElement = elements[currentElementIndex];
    
    try {
        const periodicTable = makePeriodicTable();
        const parsedFormula = parseFormula(formula, periodicTable);
        
        let totalMolarMass = 0;
        for (const [symbol, quantity] of parsedFormula) {
            totalMolarMass += periodicTable[symbol][1] * quantity;
        }

        // Calculate the required mg/L of the compound needed
        const requiredCompoundMg = totalMass / (periodicTable[currentElement][1] * getElementQuantity(parsedFormula, currentElement) / totalMolarMass);

        let output = `<h2>Results for ${formula}</h2>`;
        output += `<p>Target ${currentElement} mass: ${totalMass.toFixed(2)} mg/L</p>`;
        output += `<p>Required ${formula}: ${requiredCompoundMg.toFixed(2)} mg/L</p>`;
        
        output += `<h3>Element Composition per Liter:</h3>`;
        output += `<table>
                     <tr>
                       <th>Element</th>
                       <th>Mass (mg/L)</th>
                     </tr>`;

        let actualMasses = {};
        for (const [symbol, quantity] of parsedFormula) {
            const elementMass = (periodicTable[symbol][1] * quantity / totalMolarMass) * requiredCompoundMg;
            actualMasses[symbol] = elementMass;
            calculatedValues[symbol] = (calculatedValues[symbol] || 0) + elementMass;
            output += `<tr>
                         <td>${periodicTable[symbol][0]}</td>
                         <td>${elementMass.toFixed(2)}</td>
                       </tr>`;
        }
        
        output += `</table>`;

        // Calculate total compound needed
        const totalCompoundNeeded = (requiredCompoundMg * stockTankCapacity * injectorRatio) / 1000; // Convert to g

        output += `<p>Total ${formula} needed: ${totalCompoundNeeded.toFixed(2)} g</p>`;

        resultDiv.innerHTML = output;

        // Update recipe table with new calculated values
        updateRecipeTable(actualMasses);

        // Move to next element
        currentElementIndex++;
        setupCurrentElement();
    } catch (error) {
        handleError(error, resultDiv);
    }
}

function getElementQuantity(parsedFormula, element) {
    const elementEntry = parsedFormula.find(([el, _]) => el === element);
    return elementEntry ? elementEntry[1] : 0;
}

function handleError(error, resultDiv) {
    if (error instanceof FormulaError) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    } else {
        resultDiv.innerHTML = `<p>An unexpected error occurred: ${error.message}</p>`;
    }
}

function populateRecipeTable() {
    const tableBody = document.querySelector('#recipeTable tbody');
    const tableHead = document.querySelector('#recipeTable thead tr');

    // Clear existing table content
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';

    // Update table header
    tableHead.innerHTML = `
        <th>Nutrient</th>
        <th>Stage_1</th>
        <th>diff_Stage_1</th>
        <th>Stage_2</th>
        <th>diff_Stage_2</th>
        <th>Stage_3</th>
        <th>diff_Stage_3</th>
    `;

    recipeData.Nutrient.forEach((nutrient, index) => {
        const row = document.createElement('tr');
        const stage1 = recipeData.Stage_1[index];
        const stage2 = recipeData.Stage_2[index];
        const stage3 = recipeData.Stage_3[index];
        row.innerHTML = `
            <td>${nutrient}</td>
            <td>${stage1}</td>
            <td>${stage1.toFixed(2)}</td>
            <td>${stage2}</td>
            <td>${stage2.toFixed(2)}</td>
            <td>${stage3}</td>
            <td>${stage3.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function updateRecipeTable(actualMasses) {
    const tableBody = document.querySelector('#recipeTable tbody');
    
    recipeData.Nutrient.forEach((nutrient, index) => {
        const row = tableBody.children[index];
        const stage1 = recipeData.Stage_1[index];
        const stage2 = recipeData.Stage_2[index];
        const stage3 = recipeData.Stage_3[index];
        const calculatedValue = calculatedValues[nutrient] || 0;
        
        const diff1 = stage1 - calculatedValue;
        const diff2 = stage2 - calculatedValue;
        const diff3 = stage3 - calculatedValue;
        
        row.innerHTML = `
            <td>${nutrient}</td>
            <td>${stage1}</td>
            <td>${diff1.toFixed(2)}</td>
            <td>${stage2}</td>
            <td>${diff2.toFixed(2)}</td>
            <td>${stage3}</td>
            <td>${diff3.toFixed(2)}</td>
        `;
    });
}