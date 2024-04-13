import axios, { AxiosInstance } from 'axios'
import { Todo } from '../types/todo'
import { ProjectPagination } from '../types/project'
import { ProductPagination } from '../types/product'

export class ApiService {
    axiosInstance: AxiosInstance

    constructor(){
        this.axiosInstance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })
    }

    getTodosIds = async () => {
        return (await this.axiosInstance.get<Todo[]>('todos')).data.map((todo) => todo.id)
    }

    getTodoById = async (id: number) => {
        return (await this.axiosInstance.get<Todo>(`todos/${id}`)).data
    }

    createTodo = async (todo: Todo) => {
        return (await this.axiosInstance.post<Todo>('todos', todo))
    }

    updateTodo = async (todo: Todo) => {
        return (await this.axiosInstance.put<Todo>(`todos/${todo.id}`, todo))
    }

    deleteTodo = async (id: number) => {
        return (await this.axiosInstance.delete<Todo>(`todos/${id}`))
    }

    getProjects = async (page: number = 1, limit: number = 3) => {
        return (await this.axiosInstance.get<ProjectPagination>(`projects?_page=${page}&_per_page=${limit}`)).data
    }

    getProducts = async ({ pageParam }: { pageParam: number }) => {
        return (await this.axiosInstance.get<ProductPagination>(`products?_page=${pageParam}&_per_page=5`)).data
    }
}
