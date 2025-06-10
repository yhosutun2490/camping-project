import { create } from "zustand";
import type { UserCheckData} from "@/types/api/auth"

type Member = UserCheckData;
export type MemberStore = {
  member: Member;
  setMember: (plan: Member) => void; // 登入會員資料
  reset: () => void; // 重置會員資料
};
const initialMember: Member = {
  id: "",
  username: "",
  email: "",
  role: "",
};

export const useMemberLogin = create<MemberStore>((set) => ({
  member: initialMember,
  setMember: (member) => set({ member: member }),
  reset: () => set({ member: initialMember }),
}));
