import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LandingPage from "./pages/landing"
import Dashboard from "./pages/dashboard"
import Link from "./pages/link"
import Auth from "./pages/auth"
import RedirectLink from "./pages/redirect-link"
import AppLayout from "./Layouts/app_layouts"
import UrlProvider from "./context"
import RequireAuth from "./components/require-auth"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      { path: "/auth", element: <Auth /> },
      { path: "/:id", element: <RedirectLink /> },
    ],
  },
])

const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
