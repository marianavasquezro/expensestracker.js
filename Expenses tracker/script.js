const expenseList = document.getElementById('expense-list');

function addExpense() {
    const expenseInput = document.getElementById('expense');
    const amountInput = document.getElementById('amount');

    const expenseText = expenseInput.value.trim();
    const amountText = amountInput.value.trim();

    if (expenseText === '' || amountText === '') {
        alert('Please enter both expense and amount.');
        return;
    }

    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `
        <span>${expenseText}</span>
        <span>$${amountText}</span>
        <button onclick="removeExpense(this)">Remove</button>
    `;

    expenseList.appendChild(expenseItem);

    expenseInput.value = '';
    amountInput.value = '';
}

function removeExpense(button) {
    const listItem = button.parentNode;
    expenseList.removeChild(listItem);
}
