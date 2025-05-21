import { Product } from "../types/product"


interface Props {
  products: Product[]
}

export default function ProductTable({ products }: Props) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Tên</th>
          <th className="border p-2">Giá</th>
          <th className="border p-2">Size</th>
          <th className="border p-2">Màu</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td className="border p-2">{p.id}</td>
            <td className="border p-2">{p.name}</td>
            <td className="border p-2">{p.price}</td>
            <td className="border p-2">{p.size}</td>
            <td className="border p-2">{p.color}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
