import { cn } from "@/lib/utils";

interface ProductGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
};

export function ProductGrid({
  children,
  columns = 4,
  className,
}: ProductGridProps) {
  return (
    <div
      className={cn("grid gap-4 sm:gap-6", columnClasses[columns], className)}
    >
      {children}
    </div>
  );
}
