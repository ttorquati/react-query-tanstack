import { NavLink as NavLinkReactRouter } from "react-router-dom"

type NavLinkProps = {
    href: string
    children: React.ReactNode
}

export function NavLink({ href, children}: NavLinkProps) {
    return <NavLinkReactRouter to={href} className="font-bold text-gray-200 hover:text-emerald-400 hover:underline">{children}</NavLinkReactRouter>
}