"use client";
import {Plus, LayoutGrid, List} from 'lucide-react';
import {useEffect, useState} from "react";
import {deleteProduct, getProducts} from "@/lib/product.service.";
import ProductForm from "@/components/ui/ProductForm";
import ProductCards from "@/components/ui/ProductCards";
import ProductTable from "@/components/ui/ProductTable";
import {toast} from "sonner";
import ProductToolbar from "@/components/ui/ProductToolbar";
import ConfirmModal from "@/components/ui/ConfirmationModal";


export default function Page() {
    const [products, setProducts] = useState(() => getProducts() || []);
    const refreshProducts = () => setProducts(getProducts() || []);
    const [panelOpen, setPanelOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid')
    const [initialData, setInitialData] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [filtered, setFiltered] = useState(products);
    const [loading, setLoading] = useState(true)
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, [products]);

    useEffect(() => {
        setFiltered(products);
    }, [products]);

    const handleSearch = (query) => {
        const q = query.toLowerCase();
        setFiltered(products.filter(p => p.productName.toLowerCase().includes(q)));
    };

    const handleSort = (sort) => {
        setFiltered(prev => [...prev].sort((a, b) => {
            if (sort === "price_asc") return a.price - b.price;
            if (sort === "price_desc") return b.price - a.price;
            if (sort === "name_asc") return a.productName.localeCompare(b.productName);
            if (sort === "name_desc") return b.productName.localeCompare(a.productName);
            return 0;
        }));
    };

    const handleFilter = ({minPrice, maxPrice}) => {
        setFiltered(products.filter(p => {
            if (minPrice !== undefined && p.price < minPrice) return false;
            return !(maxPrice !== undefined && p.price > maxPrice);

        }));
    };


    const handleDelete = (id) => {
        setDeleteTargetId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteProduct(deleteTargetId);
        toast.success("Product deleted");
        refreshProducts();
        setConfirmOpen(false);
        setDeleteTargetId(null);
    };
    const handleEdit = (product) => {
        setIsEdit(true)
        setInitialData(product)
        setPanelOpen(!panelOpen)
    }

    const handleAdd = () => {
        setIsEdit(false)
        setPanelOpen(!panelOpen)
    }


    return (<section
        className=" overflow-hidden min-h-screen w-full bg-white dark:bg-black laptop:px-4 mobile:px-0 py-10 transition-colors duration-300">
        <div
            className="fixed top-0 left-0 right-0 laptop:h-[8rem] mobile:h-[6rem] bg-white dark:bg-black z-[50] pointer-events-none transition-colors duration-300"/>

        <div className=" max-w-7xl ml-0  ">

            <div className={`fixed laptop:top-8 mobile:top-4 z-[80] `}>
                <h1 className="laptop:text-[20px] mobile:text-[20px] font-bold tracking-tight text-black dark:text-white ">
                    Product List
                </h1>
                <div className={`fixed laptop:top-5 mobile:top-2  laptop:right-4  right-1 flex gap-5 mt-3`}>
                    <div className=" mobile:hidden laptop:block flex border rounded-[5px] overflow-hidden">
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
                        onClick={handleAdd}
                        className="mr-2 hover:bg-green dark:text-black dark:bg-white border-none text-white bg-black text-[12px] flex items-center gap-2 border px-2 py-1 rounded-[5px]">
                        <Plus size={16}/> <span className={` hidden laptop:block`}>Add Product</span>
                    </button>

                </div>
                <ProductToolbar onSearch={handleSearch} onSort={handleSort} onFilter={handleFilter}/>

            </div>


            <ProductForm
                isOpen={panelOpen}
                onClose={() => setPanelOpen(!panelOpen)}
                initialData={initialData}
                isEdit={isEdit}
                onSuccess={refreshProducts}
            />


            {/*all product*/}
            <div className="mt-15 w-full h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                {viewMode === "grid" ? (
                    <ProductCards
                        products={filtered}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        loading={loading}
                    ></ProductCards>) : (<
                    ProductTable
                    products={filtered}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    loading={loading}

                ></ProductTable>)}
            </div>
        </div>

        <ConfirmModal
            isOpen={confirmOpen}
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmOpen(false)}
            title="Delete product?"
            message="This will permanently remove the product."
        />

    </section>);
}