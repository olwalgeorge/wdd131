/**
 * Author: George Olwal
 * Date: 2022-09-27
 * Description: JavaScript code for adding, removing and marking items in a to-do list
 */
const textInput = document.querySelector("input");
const addItem = document.querySelector("button");

// Add event listener to button
addItem.addEventListener("click", () => {
    if (textInput.value.trim() !== "") {
        addListItem();
    }
});

// Add event listener to input field
textInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && textInput.value.trim() !== "") {
        addListItem();
    }
 });

// Add a new item to the list
function addListItem() {
    const item = document.createElement("li");
    item.textContent = textInput.value;
    const btn = document.createElement("button");
    btn.innerHTML = "&#x2715;"; // Unicode character for a cross
    document.querySelector("ul").appendChild(item);
    item.appendChild(btn);    
    textInput.value = "";
}

// Remove or mark items in the list
document.querySelector("ul").addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    } else if (event.target.tagName === "BUTTON") {
        const li = event.target.parentElement;
        document.querySelector("ul").removeChild(li);
    }
});

