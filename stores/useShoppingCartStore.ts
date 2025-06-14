// stores/useShoppingCartStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { PlanData } from '@/components/EventById/EventPlanSelector/EventPlanCard'


// 1. 先定義一個擴充型別
export interface CartPlanItem extends PlanData {

  // 購物車擴充活動id和photo url
  event_info_id: string;
  event_name: string;
  event_photo_url: string;
}
// 2. 故物車資料陣列型別改掉
export type CartPlan = CartPlanItem[];

interface ShoppingCartState {
  plans: CartPlan
  addPlan: (plan: CartPlanItem) => void
  updatePlan: (id: string, partial: Partial<CartPlanItem>) => void
  removePlan: (id: string) => void
  reset: () => void
}

export const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      plans: [],

      addPlan: (plan) => set({ plans: [...get().plans, plan] }),

      updatePlan: (id, partial) =>
        set({
          plans: get().plans.map((p) => (p.id === id ? { ...p, ...partial } : p)),
        }),

      removePlan: (id) =>
        set({
          plans: get().plans.filter((p) => p.id !== id),
        }),

      reset: () => set({ plans: [] }),
    }),
    {
      /** localStorage 的 key */
      name: 'shopping-cart',

      /** 使用 JSON 儲存；若要改用 sessionStorage 也行 */
      storage: createJSONStorage(() => localStorage),

      /** 只持久化 plans，其餘函式不需要存 */
      partialize: (state) => ({ plans: state.plans }),
     
      /** 初始化時需要自行重新將local stroage資料同步 */
      skipHydration: true,
    },
  ),
)