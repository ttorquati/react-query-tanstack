import { Fragment } from "react/jsx-runtime";
import { ProductsQuery } from "../../services/products.service";
import { Button } from "../../components";

export function Products() {
    const queryService = new ProductsQuery()
    const productsQuery = queryService.useProducts()

    return (
        <div className="flex flex-col gap-4 max-w-3xl p-4">
            <h1 className="text-3xl">Products</h1>

            <ul>
                {productsQuery.data?.pages.map((group, index) => (
                    <Fragment key={index}>
                        {group.data.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </Fragment>
                ))}
            </ul>

            {productsQuery.isFetchingNextPage && <span>Loading...</span>}

            {productsQuery.hasNextPage && (
                <Button onClick={() => productsQuery.fetchNextPage()} disabled={productsQuery.isFetchingNextPage || !productsQuery.hasNextPage}>
                    Load more
                </Button>
            )}
        </div>
    );
}