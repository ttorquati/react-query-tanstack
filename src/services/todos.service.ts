import { useQuery, useQueries, useMutation, QueryClient } from "@tanstack/react-query"
import { ApiService } from "./api"
import { Todo } from "../types/todo"

export class TodosQuery {
    apiService: ApiService

    constructor() {
        this.apiService = new ApiService()
    }

    useTodosIds = () => {
        return useQuery({
            queryKey: ["todos"],
            queryFn: this.apiService.getTodosIds
        })
    }

    useTodosById = (ids: Array<number | undefined> | undefined) => {
        return useQueries({
            queries: (ids ?? []).map((id) => ({
                queryKey: ["todos", { id }],
                queryFn: () => this.apiService.getTodoById(id!),
            }))
        })
    }

    useCreateTodo = (queryClient: QueryClient) => {
        return useMutation({
            mutationFn: (data: Todo) => this.apiService.createTodo(data),
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ["todos"] })
            }
        })
    }

    useUpdateTodo = (queryClient: QueryClient) => {
        return useMutation({
            mutationFn: (data: Todo) => this.apiService.updateTodo(data),
            onSuccess: async (variables) => {
                await queryClient.invalidateQueries({ queryKey: ["todos"] })
                await queryClient.invalidateQueries({ queryKey: ["todos", { id: variables.data.id }] })
            },
        })
    }

    useDeleteTodo = (queryClient: QueryClient) => {
        return useMutation({
            mutationFn: (id: number) => this.apiService.deleteTodo(id),
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ["todos"] })
            }
        })
    }
}