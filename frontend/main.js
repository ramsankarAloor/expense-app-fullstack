let form = document.getElementById("my-form");

form.addEventListener("submit", postNewExpense);

window.onload = loadData;

let edit = 0;

async function loadData() {
  const result = await axios.get("http://localhost:3000/expenses");
  result.data.forEach((element) => {
    displayRecord(element);
  });
}

function displayRecord(object) {
  let toBePrinted = object.amount + " - " + object.description + " - " + object.category;

  let textInside = document.createTextNode(toBePrinted);
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  editBtn.textContent = "Edit";
  deleteBtn.className = "btnDelete";
  editBtn.className = "btnDelete";
  let li = document.createElement("li");
  li.appendChild(textInside);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  let ul = document.getElementById("items");

  ul.appendChild(li);

  deleteBtn.addEventListener("click", deleteExpense);
  
  async function deleteExpense(event){
    await axios.delete(`http://localhost:3000/expenses/${object.id}`);
    window.location.reload();
  }
}

async function postNewExpense(event) {
  event.preventDefault();
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("dropdown").value;

  const obj = {
    "amount": amount,
    "description": description,
    "category": category,
  };

  const result = await axios.post("http://localhost:3000/new-expense", obj);
  displayRecord(result.data);

  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dropdown").value = "Food";
}
