"use client";

export default function Page() {
    return (
        <section className="min-h-screen w-full bg-white dark:bg-black px-4 py-10 transition-colors duration-300">
            <div className="mx-auto max-w-7xl ml-5">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-black dark:text-white ">
                        Product Management
                    </h1>
                    <p className="mt-2 text-sm text-black/60 dark:text-white/60 md:text-base ">
                        Add, view, edit, and manage products from one place.
                    </p>
                </div>
            </div>
        </section>
    );
}