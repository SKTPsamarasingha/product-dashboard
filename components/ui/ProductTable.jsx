import {SquarePen, Trash2} from 'lucide-react';
import Image from 'next/image';

const ProductTable = ({products, handleEdit, handleDelete}) => {
    return (
        <div className="w-full overflow-x-auto pb-20 mt-10">
            <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                <tr className="text-gray-500 dark:text-gray-400 text-[12px] uppercase tracking-wider">
                    <th className="px-6 py-3 font-medium">Product</th>
                    <th className="px-6 py-3 font-medium">Description</th>
                    <th className="px-6 py-3 font-medium">Price</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                {products?.map((product) => (
                    <tr
                        key={product.id}
                        className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src={product.image}
                                        alt={product.productName}
                                        fill
                                        className="object-cover rounded-[5px]"
                                        unoptimized
                                    />
                                </div>
                                <span className="text-sm font-semibold text-black dark:text-white">
                    {product.productName}
                  </span>
                            </div>
                        </td>

                        <td className="px-6 py-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {`${product.description}`}
                </span>
                        </td>

                        <td className="px-6 py-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {`$ ${product.price}`}
                </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                    title="Edit Product"
                                >
                                    <SquarePen size={18}/>
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-1 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors text-red-500 hover:text-red-600"
                                    title="Delete Product"
                                >
                                    <Trash2 size={18}/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {products?.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found.
                </div>
            )}
        </div>
    );
};

export default ProductTable;
