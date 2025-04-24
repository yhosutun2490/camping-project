import useSWRMutation from "swr/mutation";
import axios from "axios";
import type { UserLogin } from "@/types/api/auth";

export function useMemberLogin() {
    const { isMutating, trigger, error, data } = useSWRMutation('/api/auth/login', async (
        _key: string,
        { arg }: { arg: UserLogin }
      ) => {
        const res = await axios.post("/api/auth/login", arg, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data
      });
    return {
        isMutating,
        trigger,
        data,
        error
    }
  }
  