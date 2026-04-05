"use client";
import {AlertTriangle} from "lucide-react";

export const ConfirmModal = ({isOpen, onConfirm, onCancel, title = "Are you sure?", message = "This action cannot be undone."}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="fixed top-[40%] laptop:left-[40%] mobile:left-[5rem] z-[130]
                            bg-white dark:bg-black border border-black dark:border-white rounded
                            laptop:w-[20rem] laptop:h-[12rem]
                            mobile:w-[14rem] mobile:h-[8rem]
                            flex flex-col justify-between p-4">

                {/* Top */}
                <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5"/>
                    <div>
                        <h2 className="text-[14px] font-semibold text-black dark:text-white leading-tight">{title}</h2>
                        <p className="text-[12px] text-gray-500 mt-1 laptop:block mobile:hidden">{message}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer px-3 py-1 text-[12px] rounded-[5px] bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="cursor-pointer px-3 py-1 text-[12px] rounded-[5px] bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;