// recipe.js

const recipeData = {
    "Nutrient": ["N", "NH4-N", "P", "K", "Ca", "Mg", "S", "Cl", "Fe", "Mn", "Zn", "Cu", "B", "Mo", "H+"],
    "Stage_1": [90, 0, 47, 144, 144, 60, 116, 89, 2, 0.55, 0.33, 0.05, 0.34, 0.05, 0],
    "Stage_2": [120, 0, 47, 350, 160, 60, 116, 89, 2, 0.55, 0.33, 0.05, 0.34, 0.05, 0],
    "Stage_3": [190, 0, 47, 350, 200, 60, 116, 89, 2, 0.55, 0.33, 0.05, 0.34, 0.05, 0]
};

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
            <td></td>
            <td>${stage2}</td>
            <td></td>
            <td>${stage3}</td>
            <td></td>
        `;
        tableBody.appendChild(row);
    });
}

