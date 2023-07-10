"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ButtonProps, buttonVariants } from "./ui/Button";
import { useRouter } from "next/navigation";
import { Icons } from "./Icons";

interface DataAddButtonProps extends ButtonProps {
  url: string;
  buttonName: string;
}

const DataAddButton = ({
  className,
  variant,
  url,
  buttonName,
  ...props
}: DataAddButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(buttonVariants({ variant }), className)}
    >
      <Icons.add className="mr-2 h-4 w-4" />
      {buttonName}
    </button>
  );
};

export default DataAddButton;
