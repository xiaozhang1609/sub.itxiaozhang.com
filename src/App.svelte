<script lang="ts">
  import SubscriptionList from './components/SubscriptionList.svelte';
  import { subscriptionStore } from './stores/subscriptionStore';
  import { isUrgent } from './utils/helpers';
  
  $: totalSubscriptions = $subscriptionStore.subscriptions.length;
  $: urgentSubscriptions = $subscriptionStore.subscriptions
    .filter(s => isUrgent(s.renewalDate)).length;
</script>

<div class="container">
  <header>
    <div class="header-content">
      <h1>小章的订阅管理</h1>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">{totalSubscriptions}</span>
          <span class="stat-label">总订阅</span>
        </div>
        <div class="stat-item urgent">
          <span class="stat-value">{urgentSubscriptions}</span>
          <span class="stat-label">待续费</span>
        </div>
      </div>
    </div>
  </header>
  <main>
    <SubscriptionList />
  </main>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  header {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-dark);
  }

  .stats {
    display: flex;
    gap: 2rem;
  }

  .stat-item {
    text-align: center;
    padding: 0.75rem 1.5rem;
    background: var(--bg);
    border-radius: var(--radius);
    min-width: 120px;
  }

  .stat-item.urgent .stat-value {
    color: var(--urgent-border);
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--text-light);
  }

  @media (max-width: 640px) {
    .header-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>