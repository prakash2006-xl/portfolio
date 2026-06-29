import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../../App'
import { AdminLayout } from '../../modules/admin/AdminLayout'
import { Login } from '../../modules/admin/Login'
import { SectionEditor } from '../../modules/admin/SectionEditor'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/admin/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminLayout>
      <SectionEditor />
    </AdminLayout>
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
