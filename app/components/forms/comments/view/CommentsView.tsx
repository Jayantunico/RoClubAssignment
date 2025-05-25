// components/CommentsView.tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useComments } from "../hooks/useComments";

export function CommentsView() {
  const { value, handleChange } = useComments();

  return (
    <div className="grid w-full gap-1.5">
      <p className="text-sm font-medium text-gray-500 pb-3">
        Additional information about your needs will help will help us identify
        best radiographers to your team.
      </p>
      <Label htmlFor="comments" className="text-xs font-medium text-gray-500">
        Optional comments
      </Label>

      <Textarea
        id="text-input"
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="min-h-[100px]"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate pretium lorem eget pharetra."
      />
    </div>
  );
}
