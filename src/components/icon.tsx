import { Utensils, Soup, Pizza } from "lucide-react";
import React from "react";

const iconMap: Record<string, React.ElementType> = {
    "main-course": Utensils,
    "soup": Soup,
    "pizza": Pizza,
};

export const Icon = ({ name, className }: { name: string | undefined; className?: string }) => {
    const Component = iconMap[name] ?? Utensils;
    return <Component className={className} />;
};
