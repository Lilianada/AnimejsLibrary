import React from "react";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden h-[calc(100vh-70px)] flex items-center">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-gradient-to-br from-[#201636]/50 via-[#fd8d3d1a] to-[#9046ff33] rounded-full opacity-30 blur-[60px]"></div>
      </div>
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        {/* Logo above H1 */}
        <img
          src="/logo.png"
          alt="Logo"
          width={16}
          height={16}
          className="mx-auto mb-6 w-12 h-12 object-contain"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-4 drop-shadow-lg max-w-[450px] md:max-w-[650px]">
          Beautiful React <br className="hidden sm:block" />{" "}
          <span className="block">Components</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground text-center mb-8">
          Build modern interfaces faster with stunning, animated components.
        </p>
        {/* Replaced Waitlist form with Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            asChild // Use asChild to render an anchor tag
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-5 w-5" />
              Star on Github
            </a>
          </Button>
          <Button
            asChild // Use asChild to render an anchor tag
            className="bg-primary text-bg hover:bg-primary/90"
          >
            <a href="/examples">See Examples</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
