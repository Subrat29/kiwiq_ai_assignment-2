import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function NaturalLanguageQuery({ query, setQuery }) {
  const [localQuery, setLocalQuery] = useState(query);

  const handleSubmit = () => {
    setQuery(localQuery);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Smart Query Editor</h2>
      <Textarea
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Enter your query here. E.g., 'Show me Employee Satisfaction Survey Analysis'"
        rows={5}
      />
      <Button onClick={handleSubmit}>
        <Play className="mr-1 h-3 w-3" />
        <span className="hidden sm:inline">Run</span>
      </Button>
    </div>
  );
}