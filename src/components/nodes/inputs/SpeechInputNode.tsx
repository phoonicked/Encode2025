import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

export default function SpeechInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Voice Input</CardTitle>
          <CardDescription>Start flow with voice commands.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary">Start Listening</Button>
        </CardContent>
      </Card>
    </>
  );
}
