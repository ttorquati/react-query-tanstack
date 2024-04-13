import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Projects, Todos } from "./pages";
import { Header } from "./components/header";
import { Products } from "./pages/products/products";

export function NavBarWrapper() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBarWrapper />,
    children: [
      {
        path: '/',
        element: <Todos />
      },
      {
        path: '/projects',
        element: <Projects />
      },
      {
        path: '/products',
        element: <Products />
      }
    ]
  },
])

export function App() {
    return (
        <main>
            <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
        </main>
    )
}