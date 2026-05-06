import { useQuery } from "@tanstack/react-query";
import { http } from "../api/http";
import { getUser } from "./auth";

type MenuOption = {
  name: string;
  content: string;
};


export function useMenu() {
  const user = getUser();

  return useQuery({
    queryKey: ["menu", user?.role],
    queryFn: () => http<MenuOption[]>(`/api/menu/${user?.role}`),
    enabled: !!user,
  });
}