import Image from "next/image";
import {Info, SquarePen, Trash2, X} from "lucide-react";
import {useState} from "react";
import ProductSkeleton from "@/components/ui/CardSkeleton";

export const ProductCards = ({products, handleEdit, handleDelete, loading}) => {
    const [activeProductId, setActiveProductId] = useState(null);


    return (
        <div className={'flex flex-wrap mt-1'}>

            {loading ? (
                products.map((_, index) => <ProductSkeleton key={index}/>)
            ) : (
                products?.map((product) => (
                    <div key={product.id}
                         className="relative mt-10 ml-4 w-[14rem] h-[12rem] rounded-[5px] overflow-hidden group">
                        <Image
                            src={product.image}
                            alt={product.productName}
                            width={240}
                            height={384}
                            className="object-cover w-full h-full"
                            unoptimized
                        />

                        {activeProductId === product.id && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-20">
                                <div className="text-white text-center">
                                    <p className="text-[14px] ">{product.description || "No info available."}</p>
                                    <button
                                        onClick={() => setActiveProductId(null)}
                                        className="curser-pointer text-red mt-4 text-[12px] underline"
                                    >
                                        <X></X>
                                    </button>
                                </div>
                            </div>)}

                        <div
                            className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                            <div>
                                <h1 className="w-[8rem] overflow-hidden text-white text-[14px] truncate">
                                    {product.productName}
                                </h1>                                <p
                                className="text-white text-[12px]">{`$ ${product.price}`}</p>
                            </div>

                            <div className="flex gap-2 mr-1">
                                <button
                                    onClick={() => setActiveProductId(activeProductId === product.id ? null : product.id)}
                                    className="cursor-pointer text-white hover:scale-110 transition-transform"
                                >
                                    <Info size={16}/>
                                </button>
                                <button
                                    onClick={() => handleEdit(product)}

                                    className="cursor-pointer hover:scale-110 transition-transform text-white">
                                    <SquarePen size={16}/></button>
                                <button
                                    onClick={() => handleDelete(product.id)}

                                    className="cursor-pointer hover:scale-110 transition-transform text-red-500">
                                    <Trash2 size={16}/></button>
                            </div>
                        </div>
                    </div>
                ))
            )}

        </div>
    )
}
export default ProductCards;
