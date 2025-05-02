
import { useState } from "react";
import { CodeToggle } from "../CodeToggle";
import { useTheme } from "next-themes";

// Import the refactored components
import StaggeredHeroText, { staggeredHeroTextCode } from "./hero-text/StaggeredHeroText";
import GlitchTextEffect, { glitchTextEffectCode } from "./hero-text/GlitchTextEffect";
import TextSketchEffect, { textSketchEffectCode } from "./hero-text/TextSketchEffect";
import MaskedHeroText, { maskedHeroTextCode } from "./hero-text/MaskedHeroText";

const HeroTextAnimations = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Staggered Hero Text</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <StaggeredHeroText />
              </div>
            </div>
          }
          codeContent={staggeredHeroTextCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Glitch Text Effect</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <GlitchTextEffect />
              </div>
            </div>
          }
          codeContent={glitchTextEffectCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Text Sketch Effect</h4>
              <div 
                className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center"
                style={{
                  background: isDark ? "#121212" : "#f5f5f5",
                }}
              >
                <TextSketchEffect />
              </div>
            </div>
          }
          codeContent={textSketchEffectCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Masked Hero Text</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center overflow-hidden">
                <MaskedHeroText />
              </div>
            </div>
          }
          codeContent={maskedHeroTextCode}
        />
      </div>
    </div>
  );
};

export default HeroTextAnimations;
