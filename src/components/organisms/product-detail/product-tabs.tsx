import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  description: string;
  specs?: Record<string, string>;
}

export function ProductDetails({ description, specs }: ProductDetailsProps) {
  const defaultSpecs = {
    Processor: "Intel® Core™ i9-12900H Processor 2.5 GHz",
    Graphics: "NVIDIA® GeForce RTX™ 3060 Laptop GPU, 6GB GDDR6",
    Display: "16.0-inch, 4K (3840 × 2400) OLED 16:10 aspect ratio",
    Memory: "32GB LPDDR5 on board",
    Storage: "1TB M.2 NVMe™ PCIe® 4.0 Performance SSD",
    "I/O Ports":
      "1x USB 3.2 Gen 2 Type-A, 2x Thunderbolt™ 4, 1x HDMI 2.1 FRL, 1x 3.5mm Combo Audio Jack",
    Battery: "96WHrs, 3S2P, 6-cell Li-ion",
  };

  const displaySpecs = specs || defaultSpecs;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">
      {/* Left: Specifications */}
      <div className="border-b lg:border-b-0 lg:border-r border-border">
        <div className="px-5 py-4 border-b border-border bg-muted/5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Technical Specifications
          </h3>
        </div>
        <div className="divide-y divide-border">
          {Object.entries(displaySpecs).map(([key, value], i) => (
            <div
              key={key}
              className={cn(
                "grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-0",
                i % 2 !== 0 && "bg-muted/5",
              )}
            >
              <span className="text-xs font-semibold text-foreground px-5 py-3 border-r border-border">
                {key}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed px-5 py-3">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Description */}
      <div>
        <div className="px-5 py-4 border-b border-border bg-muted/5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Product Description
          </h3>
        </div>
        <div className="p-5">
          <div
            className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-sm prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:text-sm prose-p:leading-relaxed prose-li:text-sm prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
}
