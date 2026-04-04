const balanceEl = document.getElementById("balance");
const incomeAmt = document.getElementById("income-amount");
const expenseAmt = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionForm.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    // form values

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id: Date.now(),
        description,
        amount
    })

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionForm.reset();
}

function updateTransactionList() {
    transactionList.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);
        transactionList.appendChild(transactionEl);
    })
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${formatCurrency(transaction.amount)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>
    `
    return li;
}

function updateSummary() {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const income = transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expanse = transactions.
        filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    // update ui
    balanceEl.textContent = formatCurrency(balance);
    incomeAmt.textContent = formatCurrency(income);
    expenseAmt.textContent = formatCurrency(expanse);
}

function formatCurrency(Number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR"
    }).format(Number);
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id != id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}

updateTransactionList();
updateSummary();