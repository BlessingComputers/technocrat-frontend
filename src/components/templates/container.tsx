interface ContainerProps {
  children: React.ReactNode;
  innerStyle?: string;
  outerStyle?: string;
}

export function Container({
  children,
  innerStyle,
  outerStyle,
}: ContainerProps) {
  return (
    <section className={`${outerStyle} py-10`}>
      <div className={`mx-auto px-4 lg:px-8 container ${innerStyle}`}>
        {children}
      </div>
    </section>
  );
}
