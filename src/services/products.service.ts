import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiService } from "./api";

export class ProductsQuery {
    apiService: ApiService
    constructor() {
        this.apiService = new ApiService()
    }

    useProducts = () => {
        return useInfiniteQuery({
            queryKey: ["products"],
            queryFn: this.apiService.getProducts,
            initialPageParam: 1,
            getNextPageParam: (lastPage, _, lastPageParam) => {
                if (lastPage.pages === lastPageParam) return undefined
                return lastPageParam + 1
            },
            getPreviousPageParam: (_, __, firstPageParam) => {
                if (firstPageParam <= 1) return undefined
                return firstPageParam - 1
            }
        })
    }
}