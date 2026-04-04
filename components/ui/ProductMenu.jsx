"use client";
import {X} from "lucide-react";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {addProduct, getProducts, updateProduct} from "@/lib/product.service.";
import Image from 'next/image'
import {useRouter} from "next/navigation"

const productSchema = z.object({
    productName: z
        .string()
        .min(2, "Product name must be at least 2 characters")
        .max(100, "Product name must be under 100 characters"),
    price: z
        .number({invalid_type_error: "Price is required"})
        .positive("Price must be a positive number"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be under 500 characters"),
    image: z
        .any()
        .refine((files) => files && files.length > 0, "Image is required")
        .refine((files) => !files || (files[0]?.size <= 5 * 1024 * 1024), "Image must be under 5MB")
        .refine(
            (files) => !files || ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
            "Only JPG, PNG or WEBP allowed"
        ),
});

export const ProductMenu = ({isOpen, onClose, initialData}) => {
    const [preview, setPreview] = useState(null);
    const isEdit = !!initialData;
    const {register, handleSubmit, watch, reset, setValue, formState: {errors},} = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productName: "",
            price: undefined,
            description: "",
            image: null,
        },
    });
    const router = useRouter();


    const imageFile = watch("image")

    useEffect(() => {
        if (!imageFile || imageFile.length < 0) {
            setPreview(null)
            return
        }
        const url = URL.createObjectURL(imageFile[0]);
        setPreview(url)

        return () => URL.revokeObjectURL(url)

    }, [imageFile]);

    const onFormSubmit = async (data) => {
        const allProduct = getProducts()

        const file = data.image[0];
        const base64Image = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });

        // 2. Create the final object to save
        const productToSave = {
            ...data,
            image: base64Image // Store this string in your DB/LocalStorage
        };

        const newProduct = isEdit ? updateProduct(productToSave) : addProduct(productToSave)


        toast.success(isEdit ? "Product updated" : "Product added");
        if (!isEdit) reset();
        onClose?.();
        router.refresh();

    };


    return (
        <>
            {/* Backdrop */}
            <div className={`z-110 fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`} onClick={onClose}/>

            {/* Slide-over Panel */}
            <aside
                className={`fixed right-0 top-0 z-115 h-screen bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "w-[20rem] md:w-[25rem]" : "w-0 border-none"
                }`}>

                <div className="p-4 w-[20rem] md:w-[25rem]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-lg font-semibold">Add products</h1>
                            <p className="text-sm text-gray-500">Fill in the details below</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <X size={16}/>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="mt-5 space-y-4">

                        {/* Name Field */}
                        <div className="flex flex-col">
                            <label className="text-[14px] font-semibold">Name</label>
                            <input
                                {...register("productName")}
                                className="text-[14px] px-2 py-1 border-2 rounded-[5px] w-full"
                            />
                            {errors.productName &&
                                <span className="text-[12px] text-red-500">{errors.productName.message}</span>}
                        </div>

                        {/* Price Field */}
                        <div className="flex flex-col">
                            <label className="text-[14px] font-semibold">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", {valueAsNumber: true})}
                                className="text-[14px] px-2 py-1 border-2 rounded-[5px] w-full"
                            />
                            {errors.price && <span className="text-[12px] text-red-500">{errors.price.message}</span>}
                        </div>

                        {/* Description Field */}
                        <div className="flex flex-col">
                            <label className="text-[14px] font-semibold">Description</label>
                            <textarea
                                {...register("description")}
                                className="text-[14px] px-2 py-1 border-2 rounded-[5px] w-full h-24"
                            />
                            {errors.description &&
                                <span className="text-[12px] text-red-500">{errors.description.message}</span>}
                        </div>

                        {/* Image Upload */}
                        <label
                            className="flex flex-col items-center justify-center w-full h-48 border-2  rounded-[5px] cursor-pointer bg-white hover:bg-gray-50 overflow-hidden">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                                    <p className="text-[12px]"><span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-[10px]">PNG, JPG (Max 5MB)</p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setValue("image", e.target.files, {shouldValidate: true});
                                    }
                                }}
                            />
                        </label>

                        {/* Action Buttons */}
                        <div className={' flex gap-3 pt-4 absolute laptop:left-40 mobile:left-22'}>
                            <button type="button" onClick={onClose}
                                    className="px-4 py-2 rounded-[5px] text-[14px] bg-gray-200 dark:text-black ">
                                Cancel
                            </button>
                            <button type="submit"
                                    className="px-4 py-2 rounded-[5px] text-[14px] bg-black text-white dark:border border-white">
                                {isEdit ? "Update Product" : "Add Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </aside>
        </>
    );
};

export default ProductMenu;
