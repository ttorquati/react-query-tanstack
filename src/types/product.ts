export type Product = {
    id: number,
    name: string
}

export type ProductPagination = {
    first: number,
    last: number,
    prev: number | null,
    next: number | null,
    pages: number,
    items: number,
    data: Product[]
}