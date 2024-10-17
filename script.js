function isWithin30Days(dateString) {
    const today = new Date();
    const renewalDate = new Date(dateString);
    const differenceInTime = renewalDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 30 && differenceInDays > 0;
}

function sortByRenewalDate(a, b) {
    return new Date(a.renewalDate) - new Date(b.renewalDate);
}

function displaySubscriptions() {
    const container = document.getElementById('subscriptions-container');
    if (!container) {
        console.error('Subscriptions container not found');
        return;
    }
    const sortedData = subscriptionData.sort(sortByRenewalDate);
    container.innerHTML = '';
    container.appendChild(createCards(sortedData));
}

function createCards(data) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    data.forEach(sub => {
        const card = document.createElement('div');
        const isUrgent = isWithin30Days(sub.renewalDate);
        card.className = `card ${isUrgent ? 'urgent' : ''}`;
        card.innerHTML = `
            <h2>${sub.name}</h2>
            <span class="renewal-date">续订日期: ${sub.renewalDate}</span>
            <p>费用: ${sub.cost} ${sub.currency}</p>
            <p>周期: ${sub.billingCycle}</p>
            <div class="card-info">
                <span class="status">${sub.status}</span>
                <span class="category">${sub.category}</span>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    return cardContainer;
}

document.addEventListener('DOMContentLoaded', () => {
    displaySubscriptions();
});