<script lang="ts">
  import type { Subscription } from '../types/subscription';
  import { formatDate, isUrgent, formatCurrency } from '../utils/helpers';

  export let subscription: Subscription;

  $: urgent = isUrgent(subscription.renewalDate);
  $: formattedCost = formatCurrency(subscription.cost, subscription.currency);
  $: daysUntilRenewal = Math.ceil(
    (new Date(subscription.renewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
</script>

<div class="card" class:urgent>
  <div class="card-header">
    <div class="title-group">
      <h2>{subscription.name}</h2>
      <div class="tags">
        <span class="category-tag">{subscription.category}</span>
        <span class="cycle-tag">{subscription.billingCycle}</span>
      </div>
    </div>
    <div class="cost-badge">
      {formattedCost}
    </div>
  </div>
  
  <div class="card-content">
    <div class="info-row">
      <div class="info-item">
        <span class="label">续费日期</span>
        <div class="renewal-info" class:urgent>
          <span class="date">{formatDate(subscription.renewalDate)}</span>
          <span class="days-left">
            {#if daysUntilRenewal > 0}
              还剩 {daysUntilRenewal} 天
            {:else}
              已过期 {Math.abs(daysUntilRenewal)} 天
            {/if}
          </span>
        </div>
      </div>
      <div class="info-item">
        <span class="label">状态</span>
        <span class="status-tag" class:urgent>{subscription.status}</span>
      </div>
    </div>
  </div>
</div>

<style>
  .card {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 1.25rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border: 1px solid var(--border-light);
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .card.urgent {
    border-left: 4px solid var(--urgent-border);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .title-group {
    flex: 1;
  }

  h2 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .category-tag {
    font-size: 0.75rem;
    background: var(--primary-light);
    color: var(--surface);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  .cycle-tag {
    font-size: 0.75rem;
    background: var(--secondary-light);
    color: var(--surface);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  .cost-badge {
    background: var(--primary-dark);
    color: var(--surface);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius);
    font-weight: 600;
    font-size: 1.125rem;
  }

  .info-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 1rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .label {
    font-size: 0.75rem;
    color: var(--text-light);
  }

  .renewal-info {
    background: var(--bg);
    border-radius: var(--radius);
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .renewal-info.urgent {
    background: var(--urgent-bg);
    border: 1px solid var(--urgent-border);
  }

  .date {
    display: block;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .days-left {
    font-size: 0.75rem;
    color: var(--text-light);
  }

  .status-tag {
    display: inline-block;
    padding: 0.5rem;
    background: var(--primary-light);
    color: var(--surface);
    border-radius: var(--radius);
    font-size: 0.875rem;
    text-align: center;
  }

  .status-tag.urgent {
    background: var(--urgent-border);
  }
</style>