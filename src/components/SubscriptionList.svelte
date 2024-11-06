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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    .card-container {
      grid-template-columns: 1fr;
    }
  }
</style>