import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2 className="animate-spin text-primary-red" size={48} />
    </div>
  );
};

export default Loading;
