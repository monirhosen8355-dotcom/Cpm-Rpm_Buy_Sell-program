// Initialize TradingView Widget
let currentSymbol = "BINANCE:BTCUSDT";

function initChart(symbol) {
    new TradingView.widget({
        "width": "100%",
        "height": "100%",
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_widget"
    });
}

// Change Coin Pair
function changePair(pair) {
    const symbol = `BINANCE:${pair}`;
    initChart(symbol);
    document.getElementById('current-pair-name').innerText = pair.replace('USDT', '/USDT');
    
    // Update active button state
    document.querySelectorAll('.pair-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText === pair.replace('USDT', '')) btn.classList.add('active');
    });
}

// Realistic Dummy Market Data
const coins = [
    { name: 'Bitcoin', symbol: 'BTC', price: 64231.50, change: '+2.45%', status: 'up' },
    { name: 'Ethereum', symbol: 'ETH', price: 3452.10, change: '-1.15%', status: 'down' },
    { name: 'Solana', symbol: 'SOL', price: 145.80, change: '+5.20%', status: 'up' },
    { name: 'Binance Coin', symbol: 'BNB', price: 590.25, change: '+0.85%', status: 'up' },
    { name: 'Ripple', symbol: 'XRP', price: 0.62, change: '-2.10%', status: 'down' },
    { name: 'Cardano', symbol: 'ADA', price: 0.45, change: '+1.05%', status: 'up' }
];

function populateMarket() {
    const tableBody = document.getElementById('market-body');
    tableBody.innerHTML = '';

    coins.forEach(coin => {
        const row = `
            <tr>
                <td><strong>${coin.symbol}</strong> <span style="color: #848e9c; font-size: 12px;">${coin.name}</span></td>
                <td>$${coin.price.toLocaleString()}</td>
                <td class="${coin.status}">${coin.change}</td>
                <td><img src="https://s3.tradingview.com/snapshots/c/chart_thumb.png" width="50" style="filter: hue-rotate(${coin.status === 'up' ? '0deg' : '120deg'})"></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Live Price Simulation
function simulatePrices() {
    setInterval(() => {
        const priceElement = document.getElementById('live-price-val');
        const currentPrice = parseFloat(priceElement.innerText.replace('$', '').replace(',', ''));
        const variation = (Math.random() - 0.5) * 20;
        const newPrice = currentPrice + variation;
        
        priceElement.innerText = `$${newPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        priceElement.className = variation > 0 ? 'price-up' : 'price-down';
    }, 2000);
}

// Activity Logs Simulation
const activities = [
    "Bought 0.05 BTC at $64,100",
    "Sold 1.2 ETH at $3,460",
    "Withdrawal of $500 processed",
    "Limit Order set for SOL at $140",
    "Profit Take hit: +$120.00"
];

function updateLogs() {
    const logList = document.getElementById('log-list');
    logList.innerHTML = '';
    activities.forEach(act => {
        const time = new Array(activities.length).fill(0).map((_, i) => `${i+2}m ago`);
        const item = `
            <div class="log-item">
                <span>${act}</span>
                <span class="text-muted">${time[Math.floor(Math.random()*time.length)]}</span>
            </div>
        `;
        logList.innerHTML += item;
    });
}

// Notification System
function showFakeNotification() {
    const names = ["James", "Sophia", "Wei", "Marco", "Elena", "Yusuf"];
    const amounts = [50, 120, 300, 15, 80, 250];
    const notif = document.getElementById('notification');
    const notifText = document.getElementById('notif-text');

    setInterval(() => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAmt = amounts[Math.floor(Math.random() * amounts.length)];
        
        notifText.innerText = `${randomName} just earned $${randomAmt}.00`;
        notif.classList.add('show');

        setTimeout(() => {
            notif.classList.remove('show');
        }, 4000);

    }, 15000);
}

// Initialize everything on load
window.onload = () => {
    initChart(currentSymbol);
    populateMarket();
    simulatePrices();
    updateLogs();
    showFakeNotification();
};
if (localStorage.getItem("isVerified") === "true") {
    window.location.href = "dashboard/index.html";
}
function logout() {
    localStorage.removeItem("isVerified");
    window.location.href = "../index.html";
}