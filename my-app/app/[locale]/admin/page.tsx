'use client';

import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getDashboardSummary } from "../services/apiService";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const { RangePicker } = DatePicker;

export default function AdminDashboard() {
  const [summary, setSummary] = useState<any>({
    totalRevenue: 0,
    totalOrders: 0,
    ordersByStatus: {},
    topProducts: [],
    lowStockProducts: [],
  });
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  useEffect(() => {
    fetchDashboardSummary();
    // eslint-disable-next-line
  }, [dateRange]);

  const fetchDashboardSummary = async () => {
    if (dateRange && dateRange.length === 2) {
      try {
        const data = await getDashboardSummary(
          dateRange[0].toISOString(),
          dateRange[1].toISOString()
        );
        setSummary(data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    }
  };

  const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
    setDateRange(dates);
  };

  const ordersByStatusData = {
    labels: Object.keys(summary.ordersByStatus),
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: Object.values(summary.ordersByStatus),
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#7f8c8d"],
        borderColor: ["#2980b9", "#27ae60", "#f39c12", "#c0392b", "#6d7a7b"],
        borderWidth: 1,
      },
    ],
  };

  const topProductsData = {
    labels: summary.topProducts.map((p: any) => p.name),
    datasets: [
      {
        label: "Số lượng bán",
        data: summary.topProducts.map((p: any) => p.sold),
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#7f8c8d"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="mb-6 flex flex-col space-y-4">
        <RangePicker
          value={dateRange}
          onChange={handleDateChange}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Tổng Doanh Thu</h2>
          <p className="text-2xl font-bold text-green-600">
            ${summary.totalRevenue?.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Tổng Đơn Hàng</h2>
          <p className="text-2xl font-bold text-blue-600">{summary.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-black">
          <h2 className="text-lg font-semibold text-gray-700">Sản Phẩm Tồn Kho Thấp</h2>
          <p className="text-2xl font-bold text-red-600">
            {summary.lowStockProducts.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Đơn Hàng Theo Trạng Thái
          </h2>
          <Bar
            data={ordersByStatusData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Thống kê đơn hàng theo trạng thái",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Số lượng" },
                },
                x: { title: { display: true, text: "Trạng thái" } },
              },
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Top 5 Sản Phẩm Bán Chạy
          </h2>
          <Pie
            data={topProductsData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "right" },
                title: {
                  display: true,
                  text: "Top 5 sản phẩm bán chạy",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Sản Phẩm Tồn Kho Thấp</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Tên</th>
              <th className="p-2">Số lượng</th>
              <th className="p-2">Đã bán</th>
            </tr>
          </thead>
          <tbody>
            {summary.lowStockProducts.map((product: any) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}