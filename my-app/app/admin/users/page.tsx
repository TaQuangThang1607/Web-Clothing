import UserTable from "@/app/components/UserTable";
import Link from "next/link";

export default function getAllUser(){
    
    return (
        <>
            <div className="container mx-auto p-6 text-black">
                <h2 className="text-black text-xl font-semibold mb-4">Danh sách người dùng</h2>
                <Link href="/admin/users/create" className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Thêm người dùng mới
                </Link>

                <UserTable />
            </div>
        </>
    )
}