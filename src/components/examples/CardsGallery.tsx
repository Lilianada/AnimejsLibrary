
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import clsx from "clsx";

const cardsData = [
  {
    title: "User Profile",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
    description: "Hover to show bio and contact info.",
    extra: "UI/UX Designer",
  },
  {
    title: "Project Overview",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80",
    description: "Projects with stats, progress bars, and team links.",
    extra: "Next Deadline: May 2",
  },
  {
    title: "Analytics Metric",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
    description: "Show key metrics, expandable details.",
    extra: "+8% this week",
  },
  {
    title: "Team Member",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    description: "Role and quick actions, card selection effect.",
    extra: "4 tasks due",
  },
  {
    title: "Feature Card",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
    description: "Use for features with icons or SVG.",
    extra: "Click to select",
  },
  {
    title: "Media Gallery",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80",
    description: "Animated with content reveal.",
    extra: "42 files",
  },
  {
    title: "Stats Tile",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
    description: "Morphing border and chart.",
    extra: "Top 5%",
  },
];

const CardsGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".gallery-card");
    cards?.forEach((card, index) => {
      const c = card as HTMLElement;
      c.style.opacity = "0";
      c.style.transform = "translateY(30px)";
      setTimeout(() => {
        c.style.transition =
          "opacity 0.65s cubic-bezier(.77,0,.18,1), transform 0.65s";
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
      }, 200 + index * 120);
    });
  }, []);

  return (
    <section className="w-full py-6 px-1">
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {cardsData.map((card, idx) => (
          <div
            key={card.title}
            className={clsx(
              "gallery-card bg-[#232234] border border-[#25232c] rounded-2xl shadow-xl group overflow-hidden relative flex flex-col transition-all duration-300 cursor-pointer min-h-[320px]",
              "hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.025]",
              selected === idx
                ? "ring-4 ring-[#FDA858] ring-offset-2"
                : "hover:ring-2 hover:ring-[#949cfb]/60"
            )}
            onClick={() => setSelected(selected === idx ? null : idx)}
          >
            {/* Card Top (image and selection) */}
            <div className="relative h-40 overflow-hidden">
              <img
                className={clsx(
                  "object-cover w-full h-full transition-transform duration-500",
                  "group-hover:scale-110 group-hover:rotate-1"
                )}
                src={card.image}
                alt={card.title}
              />
              <span
                className={clsx(
                  "absolute top-3 right-3 transition-all",
                  selected === idx
                    ? "scale-125 text-[#FDA858] drop-shadow-glow"
                    : "opacity-80 text-gray-300 group-hover:scale-110"
                )}
              >
                {selected === idx ? (
                  <CheckCircle className="w-7 h-7" />
                ) : (
                  <Circle className="w-7 h-7" />
                )}
              </span>
            </div>
            {/* Card Content */}
            <div className="flex-1 flex flex-col px-5 py-5">
              <h3 className="font-bold text-lg text-white mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
              <div
                className={clsx(
                  "transition-all",
                  selected === idx
                    ? "mt-5 max-h-28 opacity-100"
                    : "mt-0 max-h-0 opacity-0"
                )}
              >
                <p className="text-md mt-2 text-[#FDA858] font-bold">
                  {card.extra}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsGallery;
