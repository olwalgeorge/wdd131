const recipeData = {
    "Nutrient": ["pH", "EC", "Na Cl", "N-NH", "K", "Ca", "Mg", "N-NO3", "S", "P", "Fe", "Mn", "Zn", "B", "Cu", "Mo"],
    "Stage_1": [5.3, 2.2, 0, 6.5, 273, 200.5, 42.25, 235, 48, 39, 2250, 550, 327, 388, 48, 48],
    "Stage_2": [5.3, 2.2, 0, 6.5, 312, 200.5, 42.25, 249, 48, 39, 2250, 550, 327, 388, 48, 48],
    "Stage_3": [5.3, 2.2, 0, 6.5, 273, 220.5, 42.25, 249, 48, 39, 2250, 550, 327, 388, 48, 48]
};

function populateRecipeTable() {
    const tableBody = document.querySelector('#recipeTable tbody');
    const tableHead = document.querySelector('#recipeTable thead tr');

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

document.addEventListener('DOMContentLoaded', function() {
    populateRecipeTable();
});