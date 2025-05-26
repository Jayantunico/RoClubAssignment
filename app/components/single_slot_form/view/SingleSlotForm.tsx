"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import DateTime from "../../forms/date_time/view/DateTime";
import Scanner from "../../forms/scanner/view/Scanner";
import { ExamSkills } from "../../forms/exams/view/ExamSkills";
import { CommentsView } from "../../forms/comments/view/CommentsView";
import { useSingleSlotBookingForm } from "../hooks/useSingleSlotBookingForm";
import { stepsData } from "../modal/FormList";

const formComponents = [
  <DateTime key="date-time" />,
  <Scanner key="scanner" />,
  <ExamSkills key="exam-skills" />,
  <CommentsView key="comments" />,
];

export const SingleSlotBookingForm = () => {
  const {
    activeIndex,
    formCompletionStatus,
    handleNext,
    handleBack,
    singleSlotBooking,
    isSubmitted,
  } = useSingleSlotBookingForm();

  return (
    <div className="max-w-md mx-auto p-4 w-full">
      {isSubmitted ? (
        <Card className="w-full">
          <CardContent className="text-center py-8">
            <p className="text-xxl">
              That's it! Your booking has been submitted.
            </p>
            <p className="text-md text-muted-foreground mt-2">
              We'll get back to you soon.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Progress indicator */}
          <div className="flex items-center gap-2 p-4">
            {stepsData.map(({ header }, index) => (
              <div
                className={`border-b-2 pb-1 ${
                  activeIndex === index ? "border-b-primary" : ""
                }`}
                key={index}
              >
                <p className="text-xs">
                  {header}{" "}
                  {activeIndex !== index && formCompletionStatus[index] && "✅"}
                </p>
              </div>
            ))}
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-start border-b-1 py-3">
                {stepsData[activeIndex].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              {formComponents[activeIndex]}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                {activeIndex > 0 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
              </div>
              <div className="space-x-2">
                <Button
                  onClick={handleNext}
                  disabled={!formCompletionStatus[activeIndex]}
                >
                  {activeIndex === stepsData.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </>
      )}

      {/* Debug view */}
      <div className="mt-6">
        <p className="text-sm font-mono text-gray-500 mb-2">Debug/Mock view</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto font-mono border border-gray-200 dark:border-gray-700">
          <code>
            {JSON.stringify(
              singleSlotBooking.form1.date?.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
              null,
              2
            )}
          </code>
          <br />
          <br />
          <code>{JSON.stringify(singleSlotBooking, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
