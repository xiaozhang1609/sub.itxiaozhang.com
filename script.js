let currentLayout = localStorage.getItem('layout') || 'table';
let filteredData = [...subscriptionData];

function sortDataByRenewalDate() {
    filteredData.sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
}

function displaySubscriptions() {
    sortDataByRenewalDate();
    const container = document.getElementById('subscriptions-container');
    container.innerHTML = '';

    if (currentLayout === 'table') {
        container.appendChild(createTable());
    } else {
        container.appendChild(createCards());
    }
}

function createTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.innerHTML = `
        <tr>
            <th>名称</th>
            <th>费用</th>
            <th>续订日期</th>
            <th>周期</th>
            <th>状态</th>
            <th>备注</th>
        </tr>
    `;

    filteredData.forEach(sub => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="名称">${sub.name}</td>
            <td data-label="费用">${sub.cost} ${sub.currency}</td>
            <td data-label="续订日期"><span class="renewal-date">${sub.renewalDate}</span></td>
            <td data-label="周期">${sub.billingCycle}</td>
            <td data-label="状态">${sub.status}</td>
            <td data-label="备注">${sub.notes}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

function createCards() {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    filteredData.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${sub.name}</h2>
            <p><span class="renewal-date">续订日期: ${sub.renewalDate}</span></p>
            <p>费用: ${sub.cost} ${sub.currency}</p>
            <p>周期: ${sub.billingCycle}</p>
            <p>状态: ${sub.status}</p>
            <p>备注: ${sub.notes}</p>
        `;
        cardContainer.appendChild(card);
    });

    return cardContainer;
}

function toggleLayout() {
    currentLayout = currentLayout === 'table' ? 'card' : 'table';
    localStorage.setItem('layout', currentLayout);
    displaySubscriptions();
    updateToggleButton();
}

function updateToggleButton() {
    const button = document.getElementById('toggleLayout');
    button.textContent = currentLayout === 'table' ? '切换到卡片视图' : '切换到表格视图';
}

document.addEventListener('DOMContentLoaded', () => {
    displaySubscriptions();
    updateToggleButton();
    document.getElementById('toggleLayout').addEventListener('click', toggleLayout);
});