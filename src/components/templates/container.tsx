interface ContainerProps {
  children: React.ReactNode;
  innerStyle?: string;
  outerStyle?: string;
}

export function Container({
  children,
  innerStyle,
  outerStyle = "py-10",
}: ContainerProps) {
  return (
    <section className={outerStyle}>
      <div className={`mx-auto px-4 lg:px-8 container ${innerStyle || ""}`}>
        {children}
      </div>
    </section>
  );
}
