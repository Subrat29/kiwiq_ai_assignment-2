import * as React from "react";
import { StickyNote } from "lucide-react";
import { BaseNode } from "./base-node";
import { Textarea } from "@/components/ui/textarea";

const NotesNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Notes"
      description="Add notes or comments to document your workflow. These notes help explain your process and decisions."
      icon={StickyNote}
      themeColor="yellow"
    >
      <div className="space-y-4">
        <Textarea
          value={data.notes || ""}
          onChange={(e) => data.updateField("notes", e.target.value)}
          placeholder="Enter your notes here..."
          rows={6}
          className="border-gray-200 focus:border-yellow-300 focus:ring-yellow-200"
        />
      </div>
    </BaseNode>
  );
};

export { NotesNode };