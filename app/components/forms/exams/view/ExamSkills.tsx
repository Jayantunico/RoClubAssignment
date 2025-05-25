import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CrossIcon, Delete, Trash2 } from "lucide-react";
import { useExamSkills } from "../hooks/useExamSkills";

export function ExamSkills() {
  const {
    exams,
    newExam,
    newSkill,
    examTypes,
    skillLevels,
    setNewExam,
    setNewSkill,
    handleAddOrUpdateExam,
    handleDeleteExam,
  } = useExamSkills();

  const buttonText = exams.some((e) => e.examination === newExam)
    ? "Update"
    : "Add";

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="flex items-end gap-1 w-full">
        <div className="flex-1 space-y-2">
          <p className="text-xs ">Type of examination</p>
          <Select value={newExam} onValueChange={setNewExam}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select examination" />
            </SelectTrigger>
            <SelectContent>
              {examTypes.map((exam) => (
                <SelectItem key={exam} value={exam}>
                  {exam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xs">Required skill level</p>
          <Select value={newSkill} onValueChange={setNewSkill}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {skillLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleAddOrUpdateExam} disabled={!newExam}>
          {buttonText}
        </Button>
      </div>

      {exams.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Added exams & required skills</h3>
          <div className="space-y-2">
            {exams.map((exam, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{exam.examination}</span>
                  <span className="text-muted-foreground">- {exam.skill}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDeleteExam(index)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
