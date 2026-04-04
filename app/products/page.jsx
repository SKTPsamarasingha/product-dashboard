"use client";
import {Plus, LayoutGrid, List} from 'lucide-react';
import {useState} from "react";
import {getProducts} from "@/lib/product.service.";
import ProductMenu from "@/components/ui/ProductMenu";
import ProductCards from "@/components/ui/ProductCards";
import ProductTable from "@/components/ui/ProductTable";


export default function Page() {
    const [products, setProducts] = useState(() => getProducts() || []);
    const [panelOpen, setPanelOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid')

    const handleDelete = (id) => {
        console.log(id)
    }

    const handleEdit = (product) => {
        console.log(product)

    }


    return (<section
        className=" overflow-hidden min-h-screen w-full bg-white dark:bg-black laptop:px-4 mobile:px-0 py-10 transition-colors duration-300">
        <div className=" max-w-7xl ml-0">

            <div className={`relative`}>
                <h1 className="laptop:text-[20px] mobile:text-[20px] font-bold tracking-tight text-black dark:text-white ">
                    Product List
                </h1>
                <div className={`fixed top-8 laptop:right-4 mobile: right-1 flex gap-5 mt-3`}>
                    <div className="hidden mobile:block flex border rounded-[5px] overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-gray-500'}`}
                        >
                            <LayoutGrid size={16}/>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 border-l ${viewMode === 'list' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-gray-500'}`}
                        >
                            <List size={16}/>
                        </button>
                    </div>
                    <button
                        onClick={() => setPanelOpen(!panelOpen)}
                        className="hover:bg-green dark:text-black dark:bg-white border-none text-white bg-black text-[12px] flex items-center gap-2 border px-2 py-1 rounded-[5px]">
                        <Plus size={16}/> <span className={` hidden laptop:block`}>Add Product</span>
                    </button>


                </div>
            </div>


            <ProductMenu
                isOpen={panelOpen}
                onClose={() => setPanelOpen(!panelOpen)}
            />

            {/*all product*/}
            <div className="mt-3 w-full h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                {viewMode === "grid" ? (
                    <ProductCards
                        products={products}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    ></ProductCards>) : (
                    <ProductTable
                        products={products}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    ></ProductTable>)}


            </div>


        </div>

    </section>);
}