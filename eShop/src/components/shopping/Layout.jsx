import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from './Header.jsx'

function ShopLayout() {
  return (
    <div>
      <ShopHeader />
      <div>Shopping layout</div>
      <Outlet />
    </div>
  )
}

export default ShopLayout