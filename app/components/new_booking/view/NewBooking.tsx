"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useBooking } from "../hooks/useBooking";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Monitor } from "lucide-react";

const NewBooking = () => {
  const { selectedValue, bookingOptions, handleValueChange, onNextClick } =
    useBooking();

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold">
          What type of booking do you require?
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <RadioGroup
          value={selectedValue}
          onValueChange={handleValueChange}
          className="space-y-4"
        >
          {bookingOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-start justify-between p-4 rounded-lg border transition-all
      ${
        selectedValue === option.route
          ? "border-primary bg-primary/5"
          : "border-border hover:bg-accent/50"
      }`}
            >
              <Label
                htmlFor={option.id}
                className="flex flex-wrap space-y-1.5 items-start cursor-pointer flex-1"
              >
                <div className="flex-1">
                  <Monitor />
                </div>
                <div className="flex-8">
                  <p className="font-medium text-sm">{option.title}</p>
                  <p className="text-sm text-muted-foreground font-normal">
                    {option.description}
                  </p>
                </div>
              </Label>
              <RadioGroupItem
                value={option.route}
                id={option.id}
                className="ml-4"
              />
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between mt-8">
          <Button variant="outline" className="px-6">
            Cancel
          </Button>
          <Button className="px-6" onClick={onNextClick}>
            Next →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewBooking;
