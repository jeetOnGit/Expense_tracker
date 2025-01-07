const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
let toggler = document.getElementById('toggler');
let body = document.querySelector('body');
let expenses = [];

toggler.addEventListener('click', () => {
  if (toggler.classList.contains('fa-sun')) {
    toggler.classList.remove('fa-sun');
    body.classList.add('dark-mode');
    body.classList.remove('white-mode');
    toggler.classList.add('fa-moon');
    
  } else {
    toggler.classList.remove('fa-moon');
    body.classList.remove('dark-mode');
    body.classList.add('white-mode');
    toggler.classList.add('fa-sun');
  }
});

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('expenseName').value;
  const amt = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;




  const newExpense = {
    id: Date.now(), // Corrected from `date.now()` to `Date.now()`
    name,
    amt,
    date,
    category,
  };

  expenses.push(newExpense);
  renderList(expenses);
  expenseForm.reset();
});

function renderList(expenses) {
  expenseList.innerHTML = '';
  expenses.forEach((expense) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amt}</td>
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>
        <button class="edit-btn" data-id="${expense.id}">Edit</button>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
      </td>
    `;
    expenseList.appendChild(row);
  });

  // Add event listeners for Edit and Delete buttons
  document.querySelectorAll('.edit-btn').forEach((button) =>
    button.addEventListener('click', handleEdit)
  );
  document.querySelectorAll('.delete-btn').forEach((button) =>
    button.addEventListener('click', handleDelete)
  );
}

function handleEdit(e) {
  const expenseId = e.target.dataset.id;
  const expense = expenses.find((exp) => exp.id == expenseId);

  if (expense) {
    // Populate the form with the selected expense details
    document.getElementById('expenseName').value = expense.name;
    document.getElementById('amount').value = expense.amt; // Corrected `amount` to `amt`
    document.getElementById('date').value = expense.date;
    document.getElementById('category').value = expense.category;

    // Remove the old expense
    expenses = expenses.filter((exp) => exp.id != expenseId);
    renderList(expenses);
  }
}

function handleDelete(e) {
  const expenseId = e.target.dataset.id;
  expenses = expenses.filter((exp) => exp.id != expenseId); // Remove the expense
  renderList(expenses); // Re-render the list
}
