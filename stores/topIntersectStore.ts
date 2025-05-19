// stores/uiStore.ts
import { create } from 'zustand'

interface UIState {
  isTopVisible: boolean
  setTopVisible: (v: boolean) => void
}

export const useTopIntersectStore = create<UIState>((set) => ({
  isTopVisible: true,
  setTopVisible: (v) => set({ isTopVisible: v }),
}))