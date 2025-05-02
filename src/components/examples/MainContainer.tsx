
import React from "react";
import ButtonExamples from "./ButtonExamples";
import CardAnimations from "./animations/cards/CardAnimations";
import LoaderShowcase from "./LoaderShowcase";
import AnimeToastExamples from "./toast/AnimeToastExamples";
import DraggableExamples from "./DraggableExamples";
import AnimationExamples from "./AnimationExamples";
import AnimeFormAnimations from "./forms/AnimeFormAnimations";

interface MainContainerProps {
  category: string;
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-auto mt-16 lg:mt-4">
      {category === "buttons" && <ButtonExamples />}
      {category === "animations" && <AnimationExamples />}
      {category === "forms" && <AnimeFormAnimations />}
      {category === "cards" && <CardAnimations />}
      {category === "loaders" && <LoaderShowcase />}
      {category === "toasts" && <AnimeToastExamples />}
      {category === "draggable" && <DraggableExamples />}
    </main>
  );
};

export default MainContainer;
