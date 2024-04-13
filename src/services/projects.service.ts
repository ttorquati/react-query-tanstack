import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiService } from "./api";

export class ProjectsQuery {
    apiService: ApiService
    constructor() {
        this.apiService = new ApiService()
    }

    useProjects = (page: number, limit: number) => {
        return useQuery({
            queryKey: ["projects", { page, limit }],
            queryFn: () => this.apiService.getProjects(page, limit),
            placeholderData: keepPreviousData
        })
    }
}