
import React from "react";
import { CodeToggle } from "../CodeToggle";
import AnimeToastDemoComponent, { useToastCode } from "./AnimeToastDemo";
import ToastWithActions, { ToastWithActionsCode } from "./ToastWithActions";
import StackedToasts, { StackToastsCode } from "./StackedToasts";

const AnimeToastExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Toast Animations with anime.js</h2>
        <p className="text-muted-foreground">
          Custom toast notification components using anime.js for smooth entrance, exit, and interactive animations. 
          These examples can be used as alternatives to standard toast libraries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Animated Toast Hook</h3>
              <p className="text-sm text-muted-foreground">
                Click the buttons below to show different types of toast notifications.
              </p>
              <div className="py-4">
                <AnimeToastDemoComponent />
              </div>
            </div>
          }
          codeContent={useToastCode}
          className="w-full"
          minHeightClass="min-h-[500px]"
        />

        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Toast With Action Buttons</h3>
              <p className="text-sm text-muted-foreground">
                Toast notification with interactive action buttons.
              </p>
              <div className="py-8 flex justify-center">
                <ToastWithActions message="Would you like to enable notifications?" />
              </div>
            </div>
          }
          codeContent={ToastWithActionsCode}
          className="w-full"
          minHeightClass="min-h-[500px]"
        />

        <CodeToggle
          previewContent={
            <div className="space-y-4 col-span-1 lg:col-span-2">
              <h3 className="text-lg font-semibold">Stacked Toast Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Multiple toast notifications with a stacking effect.
              </p>
              <div className="py-6">
                <StackedToasts />
              </div>
            </div>
          }
          codeContent={StackToastsCode}
          className="w-full"
          minHeightClass="min-h-[500px]"
        />
      </div>
    </div>
  );
};

export default AnimeToastExamples;
