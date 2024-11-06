export interface Subscription {
  id: number;
  name: string;
  cost: number;
  currency: 'CNY' | 'USD';
  renewalDate: string;
  billingCycle: string;
  status: '活跃' | '已过期' | '待续费';
  category: string;
}

export interface SubscriptionStore {
  subscriptions: Subscription[];
}