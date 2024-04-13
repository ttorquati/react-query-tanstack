
import { NavLink } from "../nav-link";

export function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-zinc-700">
            <div>
                <h1 className="text-gray-200 text-xl">TanStack | React Query</h1>
            </div>
            <nav>
                <ul className="flex flex-row gap-6">
                    <li>
                        <NavLink href="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink href="/projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink href="/products">Products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
