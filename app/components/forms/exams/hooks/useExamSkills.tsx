import { useState } from "react";
import { examTypes, skillLevels } from "../modal/ExamSkillsData";
import { useSingleSlotBooking } from "@/store/single_slot_booking_store/hooks/useSingleSlotBooking";

export function useExamSkills() {
  const { setSingleSlotBooking, singleSlotBooking } = useSingleSlotBooking();
  const [exams, setExams] = useState<
    | {
        examination?: string;
        skill?: string;
      }[]
    | []
  >(singleSlotBooking.form3.value);
  const [newExam, setNewExam] = useState("");
  const [newSkill, setNewSkill] = useState("Easy");

  const handleAddOrUpdateExam = () => {
    if (!newExam) return;

    // First calculate the new exams array
    const updatedExams = exams.find((e) => e.examination === newExam)
      ? exams.map((e) =>
          e.examination === newExam
            ? { examination: newExam, skill: newSkill }
            : e
        )
      : [...exams, { examination: newExam, skill: newSkill }];

    // Then update both states separately
    setExams(updatedExams);
    setSingleSlotBooking((prev) => ({
      ...prev,
      form3: { value: updatedExams },
    }));
    setNewExam("");
    setNewSkill("Easy");
  };

  const handleDeleteExam = (index: number) => {
    // First calculate the new exams array
    const updatedExams = exams.filter((_, i) => i !== index);

    // Then update both states
    setExams(updatedExams);
    setSingleSlotBooking((prev) => ({
      ...prev,
      form3: { value: updatedExams },
    }));
  };

  return {
    exams,
    newExam,
    newSkill,
    examTypes,
    skillLevels,
    setNewExam,
    setNewSkill,
    handleAddOrUpdateExam,
    handleDeleteExam,
  };
}
