import { createBrowserRouter } from "react-router-dom"
import Layout from "@/layout"
import PackageLayout from "@/pages/package"
import MasterLayout from "@/layout/masterLayout"
import { Login,Dashboard,VehicleRequest, ViewPackage, AddPackage } from "./pages"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/",
                element: <MasterLayout />,
                children: [
                    {
                        path: "/",
                        element: <Dashboard />
                    },
                    {
                        path: "/request",
                        element: <VehicleRequest/>
                    },
                    {
                        path: "/package",
                        element: <PackageLayout />,
                        children: [
                            {
                                path: "/package/",
                                element: <ViewPackage />
                            },
                            {
                                path: "/package/add",
                                element: <AddPackage />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])

export default router;