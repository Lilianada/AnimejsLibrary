import { useState } from "react";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
  };

  return (
    <section className="py-20 bg-[#181818]">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <Mail className="w-12 h-12 mx-auto mb-6 text-primary" />
        <h2 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-sm text-foreground/70 mb-8">
          Get the latest updates about new animations and features
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-full border bg-[#222] focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
