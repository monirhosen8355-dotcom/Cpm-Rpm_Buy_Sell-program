// ===============================
// INIT STORAGE
// ===============================
if (!localStorage.getItem('approvedTransactions')) {
    localStorage.setItem('approvedTransactions', JSON.stringify(['TRX12345', 'DEMO777']));
}

if (!localStorage.getItem('usedTransactions')) {
    localStorage.setItem('usedTransactions', JSON.stringify([]));
}

// ===============================
// VERIFY FUNCTION
// ===============================
function verifyTransaction() {

    const trxInput = document.getElementById('trxId').value.trim();
    const statusBox = document.getElementById('statusBox');
    const verifyBtn = document.getElementById('verifyBtn');

    if (!trxInput) {
        alert("Please enter a Transaction ID");
        return;
    }

    verifyBtn.disabled = true;
    verifyBtn.innerText = "Checking...";
    statusBox.className = "status-box loading";
    statusBox.innerHTML = "🔍 Checking...";
    statusBox.style.display = "block";

    setTimeout(() => {

        let approvedList = JSON.parse(localStorage.getItem('approvedTransactions')) || [];
        let usedList = JSON.parse(localStorage.getItem('usedTransactions')) || [];

        if (usedList.includes(trxInput)) {
            statusBox.className = "status-box error";
            statusBox.innerHTML = "❌ This TRX already used!";
        }

        else if (approvedList.includes(trxInput)) {

            approvedList = approvedList.filter(id => id !== trxInput);
            localStorage.setItem('approvedTransactions', JSON.stringify(approvedList));

            usedList.push(trxInput);
            localStorage.setItem('usedTransactions', JSON.stringify(usedList));

            localStorage.setItem("isVerified", "true");

            statusBox.className = "status-box success";
            statusBox.innerHTML = "🎉 Payment Verified!";
        }

        else {
            statusBox.className = "status-box error";
            statusBox.innerHTML = "❌ Transaction not found. 5-10 মিনিট wait করুন";
        }

        verifyBtn.disabled = false;
        verifyBtn.innerText = "Verify Payment";

    }, 1200);
}

// ===============================
// ADMIN PANEL
// ===============================
function adminPanel() {
    const password = prompt("Enter Admin Password:");

    if (password === "1") {
        const newId = prompt("Enter new Transaction ID:");

        if (newId) {
            let approvedList = JSON.parse(localStorage.getItem('approvedTransactions')) || [];
            approvedList.push(newId);
            localStorage.setItem('approvedTransactions', JSON.stringify(approvedList));
            alert("✅ TRX Added Successfully!");
        }
    } else {
        alert("❌ Wrong Password!");
    }
}

// ===============================
// COPY FUNCTION
// ===============================
function copyNumber(id) {
    const text = document.getElementById(id).innerText;

    navigator.clipboard.writeText(text).then(() => {
        alert("✅ Number Copied: " + text);
    });
}