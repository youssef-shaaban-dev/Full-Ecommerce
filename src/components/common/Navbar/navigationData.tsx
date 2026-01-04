import { PageLinks } from "@/constant/enum";
import { Home, Info, Mail, ShoppingBasket } from "lucide-react";

export const getNavLinks = (t: (key: string) => string) => [
    {
        id: 1,
        name: t("navLinks.home"),
        href: PageLinks.HOME,
        icon: <Home size={18} />,

    },
    {
        id: 2,
        name: t("navLinks.about"),
        href: PageLinks.ABOUT,
        icon: <Info size={18} />,

    },
    {
        id: 3,
        name: t("navLinks.contact"),
        href: PageLinks.CONTACT,
        icon: <Mail size={18} />,

    },
    {
        id: 4,
        name: t("navLinks.products"),
        href: PageLinks.PRODUCTS,
        icon: <ShoppingBasket />,

    },

];
