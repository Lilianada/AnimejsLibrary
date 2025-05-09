import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import clsx from "clsx";
// import CardsExamples from "./CardsExamples"; // Removed import
import CardAnimations from "./animations/cards/CardAnimations";

const cardsData = [
  {
    title: "User Profile",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
    description: "Hover to show bio and contact info.",
    extra: "UI/UX Designer",
  },
  {
    title: "Project Overview",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80",
    description: "Projects with stats, progress bars, and team links.",
    extra: "Next Deadline: May 2",
  },
  {
    title: "Analytics Metric",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
    description: "Show key metrics, expandable details.",
    extra: "+8% this week",
  },
  {
    title: "Team Member",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    description: "Role and quick actions, card selection effect.",
    extra: "4 tasks due",
  },
  {
    title: "Feature Card",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
    description: "Use for features with icons or SVG.",
    extra: "Click to select",
  },
  {
    title: "Media Gallery",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80",
    description: "Animated with content reveal.",
    extra: "42 files",
  },
  {
    title: "Stats Tile",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
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
      setTimeout(
        () => {
          c.style.transition =
            "opacity 0.65s cubic-bezier(.77,0,.18,1), transform 0.65s";
          c.style.opacity = "1";
          c.style.transform = "translateY(0)";
        },
        200 + index * 120,
      );
    });
  }, []);

  return (
    <section className="w-full py-6 px-1">
      <div
        ref={containerRef}
        className="grid gap-8 max-w-6xl mx-auto h-full min-h-[calc(100vh-64px)]"
      >
        <div className="animation-card lg:col-span-2">
          <CardAnimations />
        </div>
      </div>
    </section>
  );
};

export default CardsGallery;
