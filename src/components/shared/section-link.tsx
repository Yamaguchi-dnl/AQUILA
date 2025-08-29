import React from "react";

type Variant = "diagonal" | "quebrada";

interface SectionLinkProps {
  /** cor do topo (seção de cima / Hero) */
  topColor?: string;
  /** cor da seção de baixo */
  bottomColor?: string;
  /** altura do conector (px) */
  height?: number;
  /** formato do corte */
  variant?: Variant;
  className?: string;
}

const SectionLink: React.FC<SectionLinkProps> = ({
  topColor = "hsl(var(--card))",
  bottomColor = "hsl(var(--primary))",
  height = 160,
  variant = "quebrada",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`} aria-hidden="true">
        <div className="max-w-xl ml-auto">
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height }}
      >
        {/* fundo do topo (garante continuidade do Hero) */}
        <rect x="0" y="0" width="100" height="20" fill={topColor} />

        {/* faixa inferior com corte no topo (liga com a seção escura) */}
        {variant === "diagonal" ? (
          // diagonal simples
          <polygon points="0,20 100,8 100,20 0,20" fill={bottomColor} />
        ) : (
          // “quebrada/zig-zag” (mais fiel ao print)
          <polygon points="10,20 20,9 100,9 100,20 0,20" fill={bottomColor} />
        )}
      </svg>
      </div>
    </div>
  );
};

export default SectionLink;
