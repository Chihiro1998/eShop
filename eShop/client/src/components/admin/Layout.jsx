import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <div>Admin layout</div>
      <Outlet />
    </div>
  )
}

export default AdminLayout