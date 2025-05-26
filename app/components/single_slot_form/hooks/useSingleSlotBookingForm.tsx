import { useState, useMemo } from "react";
import { useSingleSlotBooking } from "@/store/single_slot_booking_store/hooks/useSingleSlotBooking";
import { stepsData } from "../modal/FormList";

export const useSingleSlotBookingForm = () => {
  const { singleSlotBooking } = useSingleSlotBooking();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formCompletionStatus = useMemo(() => {
    return [
      // Form 1 (DateTime)
      Boolean(
        singleSlotBooking.form1?.date &&
          singleSlotBooking.form1?.time?.from &&
          singleSlotBooking.form1?.time?.to
      ),
      // Form 2 (Scanner)
      Boolean(singleSlotBooking.form2?.value),
      // Form 3 (ExamSkills)
      Array.isArray(singleSlotBooking.form3?.value) &&
        singleSlotBooking.form3.value.length > 0,
      // Form 4 (Comments)
      singleSlotBooking.form4?.value !== undefined &&
        singleSlotBooking.form4?.value !== "" &&
        singleSlotBooking.form4?.value.trim() !== "",
    ];
  }, [singleSlotBooking]);

  const handleNext = () => {
    if (activeIndex < stepsData.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setIsSubmitted(true); // Add this line when submitting
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return {
    activeIndex,
    formCompletionStatus,
    handleNext,
    handleBack,
    singleSlotBooking,
    isSubmitted,
  };
};
