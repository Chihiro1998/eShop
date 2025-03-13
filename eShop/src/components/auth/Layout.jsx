import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div>
      <h1>Welcome to E-Commerce Shop </h1>
      <div>
        <Outlet />  {/* add login and register pages */}
      </div>
    </div>
  )
}

export default AuthLayout