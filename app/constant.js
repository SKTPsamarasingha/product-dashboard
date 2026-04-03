import {
    LayoutDashboard,
    ShoppingBag,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
    Truck
} from "lucide-react";

export const businessNav = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Products",
        icon: ShoppingBag, // Represents items for sale
        href: "/products",
    },
    {
        label: "Sales",
        icon: BarChart3, // Best for analytics/revenue tracking
        href: "/sales",
    },
    {
        label: "Orders",
        icon: Truck, // Represents fulfillment/shipping
        href: "/orders",
    },
    {
        label: "Customers",
        icon: Users, // Represents CRM/client base
        href: "/customers",
    },

];


export const userNav = [

    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
    {
        label: "Help",
        icon: HelpCircle,
        href: "/help",
    },
];