import { useQuery } from "@tanstack/react-query";
import { catalogService } from "../api/catalog.service";

export const catalogKeys = {
  all: ["catalog"] as const,
  categories: () => [...catalogKeys.all, "categories"] as const,
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: catalogKeys.categories(),
    queryFn: () => catalogService.getCategories(),
  });
}
