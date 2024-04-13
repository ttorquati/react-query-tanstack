export type Project = {
    id: number,
    name: string
}

export type ProjectPagination = {
    first: number,
    last: number,
    prev: number | null,
    next: number | null,
    pages: number,
    items: number,
    data: Project[]
}