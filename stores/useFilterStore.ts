import {create} from "zustand";

type Filter = { 
    location?: string; 
    people?: number; 
    minPrice?: number; 
    maxPrice?: number; 
    start_Time?: string;
    end_Time?: string;
    tags: string[]
};
type FilterActions = {
  setFilter: (f: Partial<Omit<Filter, "tags">>) => void;  // Omit Filter物件但不能包含tag
  setTags: (tags: string[]) => void;  
  reset: ()=>void                  
};

const initialFilter: Filter = {
  location: undefined,
  people: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  start_Time: "",
  end_Time: "",
  tags: [],
};

export const useFilterStore = create<Filter & FilterActions>((set) => ({
  ...initialFilter,
  setFilter: (f) => set((s) => ({ ...s, ...f })),
  setTags: (tags) => set({ tags }),
  reset: () => set({ ...initialFilter }),
}));