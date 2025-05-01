import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface AnimationControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onRestart,
  speed,
  onSpeedChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <Button onClick={onPlay} size="sm" className="glass-btn">
            <Play className="h-4 w-4 mr-1" />
            Play
          </Button>
        ) : (
          <Button onClick={onPause} size="sm" className="glass-btn">
            <Pause className="h-4 w-4 mr-1" />
            Pause
          </Button>
        )}

        <Button onClick={onRestart} size="sm" variant="outline">
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Speed: {speed}x
        </label>
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0.25x</span>
          <span>1x</span>
          <span>2x</span>
          <span>3x</span>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
