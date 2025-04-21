
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You've been added to the waitlist!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <section className="relative bg-[#181818] overflow-hidden h-screen flex items-center">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-gradient-to-br from-[#201636]/50 via-[#fd8d3d1a] to-[#9046ff33] rounded-full opacity-30 blur-[60px]"
        ></div>
      </div>
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        {/* Logo above H1 */}
        <img
          src="/lovable-uploads/4b01183e-bc11-41ee-bfc1-0ac9ce1e7576.png"
          alt="Logo"
          width={16} height={16}
          className="mx-auto mb-6 w-16 h-16"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-4 drop-shadow-lg max-w-[450px] md:max-w-[650px]">
          Beautiful React <br className="hidden sm:block"/> <span className="block">Components</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground text-center mb-8">
          Build modern interfaces faster with stunning, animated components.
        </p>
        {/* Waitlist form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button
            type="submit"
            className="bg-[#FDA858] text-[#191921] hover:bg-[#F9B143] transition-colors"
          >
            Join Waitlist
          </Button>
        </form>
        <p className="text-sm text-muted-foreground">500+ people are already waiting</p>
      </div>
    </section>
  );
};

export default Hero;
