
import { useState } from "react";
import { CodeToggle } from "../../CodeToggle";
import ClipPathReveal, { clipPathRevealCode } from "./ClipPathReveal";
import FadeInReveal, { fadeInRevealCode } from "./FadeInReveal";
import SlideInReveal, { slideInRevealCode } from "./SlideInReveal";
import SplitCurtainReveal, { splitCurtainRevealCode } from "./SplitCurtainReveal";

const ImageRevealAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Clip Path Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <ClipPathReveal
                  imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                  altText="Abstract art"
                />
              </div>
            </div>
          }
          codeContent={clipPathRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Fade In Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <FadeInReveal
                  imageSrc="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  altText="Gradient bubbles"
                />
              </div>
            </div>
          }
          codeContent={fadeInRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Slide In Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <SlideInReveal
                  imageSrc="https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  altText="Abstract lines"
                />
              </div>
            </div>
          }
          codeContent={slideInRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Split Curtain Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <SplitCurtainReveal
                  imageSrc="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  altText="Abstract colors"
                />
              </div>
            </div>
          }
          codeContent={splitCurtainRevealCode}
        />
      </div>

      <div className="p-6 bg-muted/30 rounded-lg space-y-2">
        <h4 className="text-lg font-medium">Image Reveal Animation Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use IntersectionObserver to trigger animations when images enter the viewport.</li>
          <li>Always provide meaningful alt text for accessibility.</li>
          <li>Consider performance – animate transform and opacity properties when possible.</li>
          <li>For clip-path animations, stick to simple shapes for better browser support.</li>
          <li>Add fallbacks for browsers that don't support modern CSS features.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageRevealAnimations;
