
import { CodeToggle } from "../CodeToggle";
import TypewriterEffect, { typewriterCode } from "./text/TypewriterEffect";
import TextRevealOnScroll from "./text/TextRevealOnScroll";
import LetterFlyIn, { letterFlyInCode } from "./text/LetterFlyIn";
import GradientText, { gradientTextCode } from "./text/GradientText";
import { textFadeInCode } from "./text/TextRevealOnScroll"; // Update the import

const TextAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Typewriter Effect</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <TypewriterEffect 
                  phrases={[
                    "Build amazing websites.",
                    "Create engaging user experiences.",
                    "Design with anime.js animations.",
                    "Captivate your audience."
                  ]} 
                />
              </div>
            </div>
          }
          codeContent={typewriterCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Text Fade In</h4>
              <div className="border rounded-lg p-6 min-h-[200px]">
                <TextRevealOnScroll>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Scroll to Reveal</h3>
                    <p>This content fades in as you scroll down the page.</p>
                  </div>
                </TextRevealOnScroll>
              </div>
            </div>
          }
          codeContent={textFadeInCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Letter Fly In</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <LetterFlyIn text="ANIMATIONS" />
              </div>
            </div>
          }
          codeContent={letterFlyInCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Gradient Animated Text</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <GradientText text="Moving Gradients" />
              </div>
            </div>
          }
          codeContent={gradientTextCode}
        />
      </div>
    </div>
  );
};

export default TextAnimations;
