import { SubmitHandler, useForm } from "react-hook-form";
import { TodosQuery } from "../../services/todos.service";
import { Todo } from "../../types/todo";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button, Input } from '../../components'

export function Todos() {
    const [radioId, setRadioId] = useState(0)

    const queryService = new TodosQuery()
    const todosIdsQuery = queryService.useTodosIds() 
    const todosQuery = queryService.useTodosById(todosIdsQuery.data)

    const queryClient = useQueryClient()
    const createTodoMutation = queryService.useCreateTodo(queryClient)
    const updateTodoMutation = queryService.useUpdateTodo(queryClient)
    const deleteTodoMutation = queryService.useDeleteTodo(queryClient)

    const { register, handleSubmit, reset } = useForm<Todo>()

    const onSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data)
        reset()
    }

    const handleUpdate: SubmitHandler<{data: Todo, id: number}> = ({data, id}) => {
        updateTodoMutation.mutate({ ...data, id })
        reset()
        setRadioId(0)
    }

    const handleDelete = (id: number) => {
        deleteTodoMutation.mutate(id)
    }

    if (todosIdsQuery.isPending) {
        return <span>Loading ...</span>
    }

    if (todosIdsQuery.isError) {
        return <span>Service unavailable, try again later</span>
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center p-4 gap-4">
                <Input type="text" id="title" label="Title" {...register("title")} />
                <Input type="text" id="description" label="Description" {...register("description")} />

                <Button type="submit" disabled={createTodoMutation.isPending}>Add Todo</Button>
                <Button onClick={() => handleDelete(data?.id as number)}>Delete</Button>
            </form>

            { todosIdsQuery.isPending ? (
                <span>Loading ...</span>
            ) : (
                <ul>
                    {todosQuery.map(({ data }) => {
                        return (
                            <li key={data?.id} id={data?.id?.toString()}>
                                <div className="flex flex-row items-center min-width-10 p-4 gap-10">
                                    {radioId === data?.id ? (
                                        <form onSubmit={handleSubmit((data) => handleUpdate({ data, id: radioId }))} className="flex flex-row items-center gap-4">
                                            <Input type="text" id="title" label="Title" {...register("title")} />
                                            <Input type="text" id="description" label="Description" {...register("description")} />
                            
                                            <Button type="submit" disabled={updateTodoMutation.isPending}>Update</Button>
                                        </form>
                                    ) : (
                                        <>
                                            <span className="w-40"><strong>{data?.id}</strong> - {data?.title}</span>
                                            <div className="flex flex-row gap-4">
                                                <Button onClick={() => setRadioId(data?.id as number)}>Update</Button>
                                                <Button onClick={() => handleDelete(data?.id as number)}>Delete</Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
            
        </>
        
    )
}