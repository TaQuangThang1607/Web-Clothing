'use client'
import { useState } from "react";

export default function SideBar() {


  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
        <div className="text-gray-400 uppercase text-xs">Core</div>
        <a href="/admin" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded">
          <i className="fas fa-tachometer-alt" />
          <span>Dashboard</span>
        </a>

    



        <div className="text-gray-400 uppercase text-xs mt-4">Manager</div>
        <a href="/admin/products" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded">
          <i className="fas fa-chart-area" />
          <span>Products</span>
        </a>
        <a href="/admin/users" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded">
          <i className="fas fa-table" />
          <span>User</span>
        </a>
        <a href="/admin/orders" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded">
          <i className="fas fa-table" />
          <span>Order</span>
        </a>
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        <div>Logged in as: THÁNG</div>
        <div>Start Bootstrap</div>
      </div>
    </aside>
  );
}
