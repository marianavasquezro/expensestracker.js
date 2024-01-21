const expenseList = document.getElementById('expenseList');

function addExpense() {
    const expenseInput = document.getElementById('expenseDescription');
    const amountInput = document.getElementById('expenseAmount');

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

function showExpenseTracker() {
    document.getElementById('expenseTracker').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('expenseTracker').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    generatePieChart();
}

function generatePieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    const data = {
        labels: ['Food', 'Fun', 'Home', 'Others'],
        datasets: [{
            data: [60, 10, 10, 20], // Replace with your actual expense percentages
            backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'], // Customize colors
        }],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                    return percentage + '% ' + data.labels[tooltipItem.index];
                }
            }
        }
    };
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
    });
}


// Add the following event listener to prevent form submission
document.getElementById('expenseForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    addExpense(); // Call the addExpense function when the form is submitted
});
