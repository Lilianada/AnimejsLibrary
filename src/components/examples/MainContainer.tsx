
import React from "react";
import ButtonExamples from "./ButtonExamples";
import CardAnimations from "./animations/cards/CardAnimations";
import LoaderShowcase from "./LoaderShowcase";
import ToastsExamples from "./ToastsExamples";
import DraggableExamples from "./DraggableExamples";
import AnimationExamples from "./AnimationExamples";
import FormsExamples from "./FormsExamples";

interface MainContainerProps {
  category: string;
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-auto mt-16 lg:mt-0">
      {category === "buttons" && <ButtonExamples />}
      {category === "animations" && <AnimationExamples />}
      {category === "forms" && <FormsExamples />}
      {category === "cards" && <CardAnimations />}
      {category === "loaders" && <LoaderShowcase />}
      {category === "toasts" && <ToastsExamples />}
      {category === "draggable" && <DraggableExamples />}
    </main>
  );
};

export default MainContainer;
