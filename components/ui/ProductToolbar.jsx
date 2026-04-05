"use client";
import {Search, SlidersHorizontal, X} from "lucide-react";
import {useState, useRef, useEffect} from "react";

const SORT_OPTIONS = [
    {label: "Newest", value: "newest"},
    {label: "Oldest", value: "oldest"},
    {label: "Price: Low to High", value: "price_asc"},
    {label: "Price: High to Low", value: "price_desc"},
    {label: "Name: A–Z", value: "name_asc"},
    {label: "Name: Z–A", value: "name_desc"},
];

export const ProductToolbar = ({onSearch, onSort, onFilter}) => {
    const [query, setQuery] = useState("");
    const [activeSort, setActiveSort] = useState("newest");
    const [filterOpen, setFilterOpen] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const filterRef = useRef(null);

    // Close filter dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSearch = (value) => {
        setQuery(value);
        onSearch?.(value);
    };

    const handleSort = (value) => {
        setActiveSort(value);
        onSort?.(value);
    };

    const handleFilterApply = () => {
        onFilter?.({
            minPrice: minPrice !== "" ? Number(minPrice) : undefined,
            maxPrice: maxPrice !== "" ? Number(maxPrice) : undefined,
        });
        setFilterOpen(false);
    };

    const handleFilterReset = () => {
        setMinPrice("");
        setMaxPrice("");
        onFilter?.({minPrice: undefined, maxPrice: undefined});
        setFilterOpen(false);
    };

    const hasActiveFilter = minPrice !== "" || maxPrice !== "";

    return (
        <div
            className="flex laptop:flex-row mobile:flex-col items-start justify-between  bg-white dark:bg-black  fixed laptop:top-20 mobile:top-14  w-full h-[2rem] transition-colors duration-300">

            {/* Search */}
            <div
                className="z-[100]  flex items-center gap-2 flex-1 h-[2rem] max-w-sm border-2 border-gray-200 dark:border-gray-700 rounded-[5px] px-2 py-1 focus-within:border-black dark:focus-within:border-white   transition-colors duration-300 ">
                <Search size={14} className="text-gray-400 shrink-0"/>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search products..."
                    className="text-[13px] bg-transparent outline-none w-full text-black dark:text-white placeholder:text-gray-400"
                />
                {query && (
                    <button onClick={() => handleSearch("")}
                            className="text-gray-400 hover:text-black dark:hover:text-white    ">
                        <X size={13}/>
                    </button>
                )}
            </div>

            <div
                className={'z-[100] mr-25  w-fit h-[2rem] flex items-center justify-between gap-2'}>
                {/* Sort */}
                <select
                    value={activeSort}
                    onChange={(e) => handleSort(e.target.value)}
                    className="text-[13px] border-2 border-gray-200 dark:border-gray-700 rounded-[5px] px-2 py-1 h-[2rem]bg-white dark:bg-black text-black dark:text-white outline-none cursor-pointer hover:border-black dark:hover:border-white    "
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                {/* Filter */}
                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className={`flex items-center gap-2 text-[13px] border-2 rounded-[5px] px-2 py-1   duration-300  cursor-pointer ${
                            hasActiveFilter
                                ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                                : "border-gray-200 dark:border-gray-700 text-black dark:text-white hover:border-black dark:hover:border-white"
                        }`}
                    >
                        <SlidersHorizontal size={14}/>
                        <span className="hidden sm:inline">Filter</span>
                        {hasActiveFilter && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black"/>
                        )}
                    </button>

                    {/* Filter Dropdown */}
                    {filterOpen && (
                        <div
                            className="absolute -right-5 top-[calc(100%+8px)] w-52 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-[5px] p-3 shadow-lg z-50">
                            <p className="text-[12px] font-semibold mb-2 text-black dark:text-white">Price Range</p>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] text-gray-500">Min Price</label>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="0"
                                        className="text-[13px] px-2 py-1 border-2 border-gray-200 dark:border-gray-700 rounded-[5px] bg-transparent text-black dark:text-white outline-none focus:border-black dark:focus:border-white  "
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] text-gray-500">Max Price</label>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Any"
                                        className="text-[13px] px-2 py-1 border-2 border-gray-200 dark:border-gray-700 rounded-[5px] bg-transparent text-black dark:text-white outline-none focus:border-black dark:focus:border-white   "
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={handleFilterReset}
                                    className="flex-1 text-[12px] py-1 rounded-[5px] bg-gray-100 dark:bg-gray-800 text-black dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700    "
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={handleFilterApply}
                                    className="flex-1 text-[12px] py-1 rounded-[5px] bg-black dark:bg-white text-white dark:text-black cursor-pointer hover:opacity-80 "
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div
                className="fixed laptop:top-20 mobile:top-14 left-0 right-0 laptop:h-[2rem] mobile:h-[4rem] bg-white dark:bg-black z-[80] pointer-events-none transition-colors duration-300"/>


        </div>
    );
};

export default ProductToolbar;