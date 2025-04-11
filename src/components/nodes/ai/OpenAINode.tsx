import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

const handleStyle = { left: 10 };

export default function OpenAINode(data: any) {
    return (
        <>
            <Handle type="target" position={Position.Top} />
            <Card>
                <CardHeader>
                    <CardTitle>OpenAI Agent</CardTitle>
                    <CardDescription>Connect to one of OpenAI's LLM agents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
                            <SelectItem value="gpt-4">GPT 4.0</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
        </>
    );
}