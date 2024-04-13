import { QueryFunction } from "@tanstack/react-query"

export type QueriesProps = {
    queryKey: Array<string>
    queryFn: QueryFunction<unknown, string[], never> | undefined
}