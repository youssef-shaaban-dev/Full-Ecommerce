import React from "react";
import { Button } from "@/components/ui/button";

interface CartBtnsProps {
  title: string;
}

const CartBtns: React.FC<CartBtnsProps> = ({ title }) => {
  return (
    <Button variant="outline" className="px-10 h-10 border-black rounded-[3px] hover:bg-black hover:text-white transition-all">
      {title}
    </Button>
  );
};

export default CartBtns;
