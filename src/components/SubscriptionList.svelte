<script lang="ts">
  import { subscriptionStore } from '../stores/subscriptionStore';
  import SubscriptionCard from './SubscriptionCard.svelte';

  $: sortedSubscriptions = [...$subscriptionStore.subscriptions].sort((a, b) => {
    return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime();
  });
</script>

<div class="card-container">
  {#each sortedSubscriptions as subscription (subscription.id)}
    <SubscriptionCard {subscription} />
  {/each}
</div>

<style>
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2rem;
    padding: 1rem;
    max-width: 1600px;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    .card-container {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .card-container {
      grid-template-columns: 1fr;
      gap: 1.25rem;
      padding: 0.75rem;
    }
  }
</style>