
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-[#181818] overflow-hidden">
      {/* Subtle hero gradient inspired by lovable.dev */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-gradient-to-br from-[#201636] via-[#fd8d3d1a] to-[#9046ff33] rounded-full opacity-40 blur-[40px]"
        ></div>
      </div>
      <div className="container mx-auto px-4 py-24 flex flex-col items-center relative z-10">
        {/* Logo above H1 */}
        <img
          src="/lovable-uploads/4b01183e-bc11-41ee-bfc1-0ac9ce1e7576.png"
          alt="Logo"
          className="mx-auto mb-6 w-20 h-20 rounded-full shadow-lg bg-[#111]/70"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Beautiful React Components
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground text-center mb-8">
          Build modern interfaces faster with stunning, animated components.
        </p>
        <a
          href="/examples"
          className="inline-block bg-[#FDA858] text-[#191921] px-8 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-[#F9B143] transition"
        >
          See Examples
        </a>
      </div>
    </section>
  );
};

export default Hero;
