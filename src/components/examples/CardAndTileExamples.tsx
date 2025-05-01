import React from 'react';
import { CardTileDisplay } from './CardTileDisplay'; // Import the new display component

// Import UI components used in examples
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, TrendingUp } from 'lucide-react'; // Example icons

// --- Define Example Components (same as before) ---

const SimpleCard = () => (
  <Card className="w-[300px] shadow-md">
    <CardContent className="p-6">
      <img
        src="/placeholder.svg"
        alt="Placeholder"
        className="mb-4 rounded-md w-full h-auto object-cover"
      />
      <h3 className="text-lg font-semibold mb-2">Card Title</h3>
      <p className="text-sm text-muted-foreground">
        This is a simple card component example.
      </p>
    </CardContent>
  </Card>
);

const InteractiveCard = () => (
  <Card className="w-[350px] shadow-lg">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Interactive Card</span>
        <Badge variant="secondary">New</Badge>
      </CardTitle>
      <CardDescription>Card with header, footer, and actions.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        Use the header and footer for metadata or actions.
      </p>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      <Button variant="outline" size="sm">Learn More</Button>
      <Button size="sm" className='bg-primary text-white'>Get Started</Button>
    </CardFooter>
  </Card>
);

const FeatureTile = () => (
  <Card className="w-full max-w-sm shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
        <Zap className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Feature Tile</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Brief description of the feature.
      </p>
      <Button variant="link" size="sm">Learn More</Button>
    </CardContent>
  </Card>
);

const StatTile = () => (
  <Card className="w-full max-w-xs shadow-sm">
    <CardContent className="p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Active Users</p>
      <div className="flex items-baseline gap-2">
         <p className="text-3xl font-bold">1,234</p>
         <p className="text-sm font-medium text-green-600 flex items-center">
           <TrendingUp className="w-4 h-4 mr-1" /> +5.2%
         </p>
      </div>
    </CardContent>
  </Card>
);

// --- Combined Data Array ---
const CARD_TILE_EXAMPLES = [
  {
    title: 'Simple Card',
    description: 'A basic card with content and an image.',
    previewContent: <SimpleCard />,
    codeContent: `import { Card, CardContent } from '@/components/ui/card';

const SimpleCard = () => (
  <Card className="w-[300px] shadow-md">
    <CardContent className="p-6">
      <img 
        src="/placeholder.svg"
        alt="Placeholder" 
        className="mb-4 rounded-md w-full h-auto object-cover" 
      />
      <h3 className="text-lg font-semibold mb-2">Card Title</h3>
      <p className="text-sm text-muted-foreground">
        This is a simple card component example.
      </p>
    </CardContent>
  </Card>
);`
  },
  {
    title: 'Interactive Card',
    description: 'Card featuring header, footer, badge, and action buttons.',
    previewContent: <InteractiveCard />,
    codeContent: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InteractiveCard = () => (
  <Card className="w-[350px] shadow-lg">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Interactive Card</span>
        <Badge variant="secondary">New</Badge>
      </CardTitle>
      <CardDescription>Card with header, footer, and actions.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        Use the header and footer for metadata or actions.
      </p>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      <Button variant="outline" size="sm">Learn More</Button>
      <Button size="sm">Get Started</Button>
    </CardFooter>
  </Card>
);`
  },
  {
    title: 'Feature Tile',
    description: 'A tile highlighting a specific feature with an icon.',
    previewContent: <FeatureTile />,
    codeContent: `import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react'; // Example Icon

const FeatureTile = () => (
  <Card className="w-full max-w-sm shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
        <Zap className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Feature Tile</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Brief description of the feature.
      </p>
      <Button variant="link" size="sm">Learn More</Button>
    </CardContent>
  </Card>
);`
  },
  {
    title: 'Stat Tile',
    description: 'A tile displaying a key statistic or metric.',
    previewContent: <StatTile />,
    codeContent: `import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react'; // Example Icon

const StatTile = () => (
  <Card className="w-full max-w-xs shadow-sm">
    <CardContent className="p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Active Users</p>
      <div className="flex items-baseline gap-2">
         <p className="text-3xl font-bold">1,234</p>
         <p className="text-sm font-medium text-green-600 flex items-center">
           <TrendingUp className="w-4 h-4 mr-1" /> +5.2%
         </p>
      </div>
    </CardContent>
  </Card>
);`
  },
];

// --- Main Component ---
const CardAndTileExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Cards & Tiles</h2>
        <p className="text-muted-foreground">
          Examples of card and tile components for various use cases.
        </p>
      </div>

      {/* Use a grid to display the examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {CARD_TILE_EXAMPLES.map((example) => (
          <CardTileDisplay
            key={example.title}
            title={example.title}
            description={example.description}
            previewContent={example.previewContent}
            codeContent={example.codeContent}
            minHeightClass="min-h-[400px]"
          />
        ))}
      </div>
    </div>
  );
};

export default CardAndTileExamples; 