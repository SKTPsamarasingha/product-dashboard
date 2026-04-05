const ProductSkeleton = () => {
    return (
        <div className="relative mt-10 ml-4 w-[14rem] h-[12rem] rounded-[5px] overflow-hidden bg-gray-200 animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-full bg-gray-300" />

            {/* Bottom Content Area Skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-400 to-transparent">
                {/* Title and Price */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-2 mr-1 mt-3 justify-end">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
