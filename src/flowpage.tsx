// src/components/FlowPage.tsx
import React from 'react';
import Flow from './components/flow';

// Import shadcn/ui components. Ensure these paths match where your components are located.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function FlowPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">React Flow Editor</h1>
        <div className="space-x-2">
          <Button variant="default">Save</Button>
          <Button variant="outline">Export</Button>
          <Button variant="ghost">Help</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 p-4 border-r space-y-4">
          <Input placeholder="Search nodes..." />
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">Input Node</li>
                <li className="text-sm text-muted-foreground">Process Node</li>
                <li className="text-sm text-muted-foreground">Output Node</li>
              </ul>
            </CardContent>
          </Card>
        </aside>

        {/* Main React Flow Area */}
        <main className="flex-1">
          <Flow />
        </main>
      </div>
    </div>
  );
}
