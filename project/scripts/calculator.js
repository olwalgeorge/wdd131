// calculator.js

let currentElementIndex = 0;
const elements = Object.keys(essentialElements);
let currentStage = 1;
let calculatedValues = {
    Stage_1: {},
    Stage_2: {},
    Stage_3: {}
};
let cumulativeFertilizers = {
    Stage_1: {},
    Stage_2: {},
    Stage_3: {}
};

document.addEventListener('DOMContentLoaded', initializeCalculator);

function initializeCalculator() {
    const fertilizerSelect = document.getElementById('fertilizerSelect');
    const formulaInput = document.getElementById('formula');
    const calculateButton = document.getElementById('calculateButton');
    const injectorRatioInput = document.getElementById('injectorRatio');
    const stockTankCapacityInput = document.getElementById('stockTankCapacity');

    addEventListeners(fertilizerSelect, formulaInput, calculateButton, injectorRatioInput, stockTankCapacityInput);
    
    // Add stage display
    const stageDisplay = document.createElement('div');
    stageDisplay.id = 'stageDisplay';
    document.querySelector('.form-container').insertBefore(stageDisplay, fertilizerSelect);
    
    // Add current element display
    const currentElementDiv = document.createElement('div');
    currentElementDiv.id = 'currentElement';
    document.querySelector('.form-container').insertBefore(currentElementDiv, document.getElementById('result'));
    
    disableInputFields(false);
    setupCurrentElement();
    populateRecipeTable();
    updateRecipeTable();
    updateFertilizerSummaryTable();
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
    updateStageDisplay();
    
    if (currentStage <= 3 && currentElementIndex < elements.length) {
        const element = elements[currentElementIndex];
        const sources = essentialElements[element];
        
        updateFertilizerDropdown(sources);
        
        const recipeValue = getRecipeValue(element, currentStage);
        const calculatedValue = calculatedValues[`Stage_${currentStage}`][element] || 0;
        const remainingValue = Math.max(0, recipeValue - calculatedValue);
        document.getElementById('totalMass').value = remainingValue.toFixed(2);
        
        let statusMessage = '';
        const calculateButton = document.getElementById('calculateButton');
        if (remainingValue <= 0) {
            statusMessage = ' (Not required or target amount met)';
            calculateButton.textContent = 'Continue';
            disableInputFields(true);
        } else {
            calculateButton.textContent = 'Calculate';
            disableInputFields(false);
        }
        calculateButton.disabled = false;
        
        document.getElementById('currentElement').textContent = `Current Element: ${element}${statusMessage}`;
        document.getElementById('currentElement').style.fontWeight = 'bold';
    } else if (currentStage <= 3) {
        // Move to next stage
        currentStage++;
        currentElementIndex = 0;
        setupCurrentElement();
    } else {
        document.getElementById('currentElement').textContent = "All stages processed";
        document.getElementById('calculateButton').disabled = true;
        document.getElementById('calculateButton').textContent = 'Finished';
    }
}

function updateStageDisplay() {
    const stageDisplay = document.getElementById('stageDisplay');
    stageDisplay.textContent = `Current Stage: ${currentStage}`;
    stageDisplay.style.fontWeight = 'bold';
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
    const calculatedValue = calculatedValues[`Stage_${currentStage}`][element] || 0;
    const remainingValue = recipeValue - calculatedValue;
    
    if (remainingValue <= 0) {
        currentElementIndex++;
        setupCurrentElement();
    } else {
        if (validateInputs()) {
            calculateCurrentElement();
        }
    }
}

function validateInputs() {
    const formula = document.getElementById('formula').value;
    const totalMass = document.getElementById('totalMass').value;
    const injectorRatio = document.getElementById('injectorRatio').value;
    const stockTankCapacity = document.getElementById('stockTankCapacity').value;
    let isValid = true;
    let errorMessage = [];
    
    if (!formula) {
        errorMessage.push('Please select a fertilizer.');
        isValid = false;
    }
    if (!totalMass) {
        errorMessage.push('Please enter the target mass.');
        isValid = false;
    }
    if (!injectorRatio) {
        errorMessage.push('Please enter the injector ratio.');
        isValid = false;
    }
    if (!stockTankCapacity) {
        errorMessage.push('Please enter the stock tank capacity.');
        isValid = false;
    }
    if (!isValid) {
        alert(errorMessage.join('\n'));
    }
    

    return isValid;
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

        const elementQuantity = getElementQuantity(parsedFormula, currentElement);
        if (elementQuantity === 0) {
            throw new Error(`Selected fertilizer ${formula} does not contain ${currentElement}`);
        }

        // Calculate the required mg/L of the compound needed
        const requiredCompoundMg = totalMass / (periodicTable[currentElement][1] * elementQuantity / totalMolarMass);

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
            calculatedValues[`Stage_${currentStage}`][symbol] = (calculatedValues[`Stage_${currentStage}`][symbol] || 0) + elementMass;
            output += `<tr>
                         <td>${periodicTable[symbol][0]}</td>
                         <td>${elementMass.toFixed(2)}</td>
                       </tr>`;
        }
        
        output += `</table>`;

        // Calculate total compound needed
        const totalCompoundNeeded = (requiredCompoundMg * stockTankCapacity * injectorRatio) / 1000; // Convert to g

        // Store the fertilizer amount
        if (!cumulativeFertilizers[`Stage_${currentStage}`][formula]) {
            cumulativeFertilizers[`Stage_${currentStage}`][formula] = 0;
        }
        cumulativeFertilizers[`Stage_${currentStage}`][formula] += totalCompoundNeeded;

        output += `<p>Total ${formula} needed: ${totalCompoundNeeded.toFixed(2)} g</p>`;

        resultDiv.innerHTML = output;

        // Update recipe table with new calculated values
        updateRecipeTable();

        // Update fertilizer summary table
        updateFertilizerSummaryTable();

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

function updateRecipeTable() {
    const tableBody = document.querySelector('#recipeTable tbody');
    
    recipeData.Nutrient.forEach((nutrient, index) => {
        const row = tableBody.children[index];
        const stage1 = recipeData.Stage_1[index];
        const stage2 = recipeData.Stage_2[index];
        const stage3 = recipeData.Stage_3[index];
        const calculatedValue1 = calculatedValues.Stage_1[nutrient] || 0;
        const calculatedValue2 = calculatedValues.Stage_2[nutrient] || 0;
        const calculatedValue3 = calculatedValues.Stage_3[nutrient] || 0;
        
        const diff1 = stage1 - calculatedValue1;
        const diff2 = stage2 - calculatedValue2;
        const diff3 = stage3 - calculatedValue3;
        
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

function updateFertilizerSummaryTable() {
    let summaryTable = document.getElementById('fertilizerSummaryTable');
    if (!summaryTable) {
        summaryTable = document.createElement('table');
        summaryTable.id = 'fertilizerSummaryTable';
        document.querySelector('.table-container').appendChild(summaryTable);
    }

    let summaryHTML = `
        <thead>
            <tr>
                <th>Stage</th>
                <th>Fertilizer</th>
                <th>Amount (g)</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let stage = 1; stage <= 3; stage++) {
        const stageData = cumulativeFertilizers[`Stage_${stage}`];
        for (const formula in stageData) {
            const fertilizer = fertilizers.find(f => f.formula === formula);
            if (fertilizer) {
                summaryHTML += `
                    <tr>
                        <td>Stage ${stage}</td>
                        <td>${fertilizer.name} (${formula})</td>
                        <td>${stageData[formula].toFixed(2)}</td>
                    </tr>
                `;
            }
        }
    }

    summaryHTML += '</tbody>';
    summaryTable.innerHTML = summaryHTML;
}

function disableInputFields(disable) {
    document.getElementById('fertilizerSelect').disabled = disable;
    document.getElementById('formula').disabled = disable;
    document.getElementById('totalMass').disabled = disable;
    document.getElementById('injectorRatio').disabled = disable;
    document.getElementById('stockTankCapacity').disabled = disable;
}