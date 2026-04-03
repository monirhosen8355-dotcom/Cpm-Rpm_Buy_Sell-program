// ===============================
// INIT STORAGE
// ===============================
if (!localStorage.getItem('approvedTransactions')) {
    localStorage.setItem('approvedTransactions', JSON.stringify(['TRX12345', 'DEMO777']));
}

// ===============================
// VERIFY FUNCTION (ONE-TIME USE)
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

        // Already used
        if (usedList.includes(trxInput)) {
            statusBox.className = "status-box error";
            statusBox.innerHTML = "❌ This TRX already used!";
        }

        // Valid
        else if (approvedList.includes(trxInput)) {

            // remove from approved
            approvedList = approvedList.filter(id => id !== trxInput);
            localStorage.setItem('approvedTransactions', JSON.stringify(approvedList));

            // add to used
            usedList.push(trxInput);
            localStorage.setItem('usedTransactions', JSON.stringify(usedList));

            statusBox.className = "status-box success";
            statusBox.innerHTML = "✅ Payment Verified! Access Granted";
        }

        // Invalid
        else {
            statusBox.className = "status-box error";
            statusBox.innerHTML = "❌ Invalid or not approved yet";
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

    if (password === "monir1020@M") {
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
// SMOOTH SCROLL (SAFE)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');

        if (target !== "#") {
            e.preventDefault();
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});