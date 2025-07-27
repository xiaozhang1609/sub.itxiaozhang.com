import { writable } from 'svelte/store';
import type { Subscription, SubscriptionStore } from '../types/subscription';

const initialSubscriptions: Subscription[] = [
  {
    id: 1,
    name: "话费605",
    cost: 25,
    currency: "CNY",
    renewalDate: "2025-12-01", // 从2025-04-01延长8个月
    billingCycle: "月付",
    status: "活跃",
    category: "手机话费"
  },
  {
    id: 2,
    name: "话费189",
    cost: 12,
    currency: "CNY",
    renewalDate: "2026-08-01", // 从2025-03-01延长17个月
    billingCycle: "月付",
    status: "活跃",
    category: "手机话费"
  },
  {
    id: 3,
    name: "话费863",
    cost: 38,
    currency: "CNY",
    renewalDate: "2025-10-01",
    billingCycle: "月付",
    status: "10月换套餐",
    category: "手机话费"
  },
  {
    id: 4,
    name: "itxiaozhang.com",
    cost: 10.44,
    currency: "USD",
    renewalDate: "2025-11-30",
    billingCycle: "年付",
    status: "活跃",
    category: "域名"
  },
  {
    id: 5,
    name: "giffgaff卡-短信保号",
    cost: 3,
    currency: "CNY",
    renewalDate: "2025-11-01",
    billingCycle: "6月付",
    status: "活跃",
    category: "手机话费"
  },
  {
    id: 7,
    name: "Bandwagon主机",
    cost: 34.5,
    currency: "USD",
    renewalDate: "2026-03-02",
    billingCycle: "年付",
    status: "活跃",
    category: "VPS"
  },
  {
    id: 8,
    name: "魔法2",
    cost: 59.99,
    currency: "CNY",
    renewalDate: "2026-05-07",
    billingCycle: "年付",
    status: "活跃",
    category: "魔法"
  },
  {
    id: 11,
    name: "B站会员",
    cost: 148,
    currency: "CNY",
    renewalDate: "2026-01-09",
    billingCycle: "年付",
    status: "活跃",
    category: "会员"
  },
  {
    id: 12,
    name: "ToDesk专业版",
    cost: 136,
    currency: "CNY",
    renewalDate: "2025-12-12",
    billingCycle: "年付",
    status: "活跃",
    category: "软件"
  }
];

function createSubscriptionStore() {
  const { subscribe, set, update } = writable<SubscriptionStore>({
    subscriptions: initialSubscriptions
  });

  return {
    subscribe,
    addSubscription: (subscription: Subscription) => update(store => ({
      subscriptions: [...store.subscriptions, subscription]
    })),
    removeSubscription: (id: number) => update(store => ({
      subscriptions: store.subscriptions.filter(s => s.id !== id)
    })),
    updateSubscription: (subscription: Subscription) => update(store => ({
      subscriptions: store.subscriptions.map(s => 
        s.id === subscription.id ? subscription : s
      )
    }))
  };
}

export const subscriptionStore = createSubscriptionStore();