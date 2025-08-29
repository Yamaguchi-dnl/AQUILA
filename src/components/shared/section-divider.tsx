import React from "react";

const SectionDivider: React.FC = () => {
  return (
    <div className="relative w-full h-[120px] -mb-[1px]">
      <div className="bg-card h-full" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-[120px] bg-primary" style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0% 100%)" }}/>
      </div>
    </div>
  );
};

export { SectionDivider };
