import {Button} from "@base-ui/react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">
                    Product Dashboard
                </h1>
                <p className="mb-6 text-slate-600">
                    Simple product management app built with Next.js and shadcn/ui
                </p>
                <Link href="/products">
                    <Button>Go to Dashboard</Button>
                </Link>
            </div>
        </main>
    );
}
