import {create} from "zustand";
import type {PlanData} from "@/components/EventById/EventPlanSelector/EventPlanCard"

export type CartPlan = PlanData[]

interface ShoppingCartState {
  plans: PlanData[];
  addPlan: (plan: PlanData) => void; // 增加一筆訂單
  updatePlan: (id: string, partial: Partial<PlanData>) => void; // 更新某筆訂單
  removePlan: (id: string) => void; // 移除某筆訂單
  reset: () => void; // 重置
}

export const useShoppingCartStore = create<ShoppingCartState>((set) => ({
  plans: [],
  addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
  updatePlan: (id, partial) =>
    set((state) => ({
      plans: state.plans.map((p) =>
        p.id === id ? { ...p, ...partial } : p
      ),
    })),
  removePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),
  reset: () => set({ plans: [] }),
}));