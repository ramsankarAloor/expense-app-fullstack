let form = document.getElementById("my-form");

let editId = 0;

form.addEventListener("submit", onCickSubmit);

function onCickSubmit(event){
  event.preventDefault();
  if(editId === 0){
    postNewExpense();
  }else{
    editExpense();
  }

  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dropdown").value = "Food";
}

window.onload = loadData;

async function loadData() {
  const result = await axios.get("http://localhost:3000/user/expenses");
  result.data.forEach((element) => {
    displayRecord(element);
  });
}

function displayRecord(object) {
  let toBePrinted =
    object.amount + " - " + object.description + " - " + object.category;

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
  editBtn.addEventListener("click", populateFields);

  async function deleteExpense(event) {
    await axios.delete(`http://localhost:3000/user/expenses/${object.id}`);
    window.location.reload();
  }

  function populateFields(event) {
    editId = object.id;
    document.getElementById("amount").value = object.amount;
    document.getElementById("description").value = object.description;
    document.getElementById("dropdown").value = object.category;
  }
}

async function postNewExpense() {
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("dropdown").value;

  const obj = {
    amount: amount,
    description: description,
    category: category,
  };

  const result = await axios.post(
    "http://localhost:3000/user/new-expense",
    obj
  );
  displayRecord(result.data);

}

async function editExpense(){
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("dropdown").value;

  const obj = {
    amount: amount,
    description: description,
    category: category,
  };

  const result = await axios.put(
    `http://localhost:3000/user/expenses/${editId}`,
    obj
  );
  editId = 0;
  window.location.reload();

}