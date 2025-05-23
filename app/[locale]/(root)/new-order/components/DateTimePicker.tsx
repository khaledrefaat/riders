"use client";

import { cn, dateTimeFormat } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CustomButton from "@/components/common/CustomButton";
import { useTranslations } from "next-intl";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import { useEffect, useState } from "react";

interface DateTimePickerProps {
  date: Date | undefined;
  time: string | undefined;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string | undefined) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DateTimePicker({
  date,
  time,
  setDate,
  setTime,
  isOpen,
  setIsOpen,
}: DateTimePickerProps) {
  const t = useTranslations("orders");
  const [isDesktop, setIsDesktop] = useState(false);

  // Fixed time slots (10:00 AM to 3:30 PM, every 30 minutes)
  const timeSlots = Array.from({ length: 12 }).map((_, i) => {
    const hour = 10 + i;
    const period = hour < 12 ? "AM" : "PM";
    return `${hour % 12 || 12}:00 ${period}`;
  });

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(undefined);
      setTime(undefined);
      return;
    }

    const newDate = new Date(selectedDate);
    if (time) {
      const [hourMinute, period] = time.split(" ");
      const [hour, minute] = hourMinute.split(":").map(Number);
      let hourNumber = hour;
      if (period === "PM" && hour !== 12) hourNumber += 12;
      if (period === "AM" && hour === 12) hourNumber = 0;
      newDate.setHours(hourNumber, minute, 0, 0);
    }
    setDate(newDate);
  };

  // Handle time selection
  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    if (date) {
      const newDate = new Date(date);
      const [hourMinute, period] = selectedTime.split(" ");
      const [hour, minute] = hourMinute.split(":").map(Number);
      let hourNumber = hour;
      if (period === "PM" && hour !== 12) hourNumber += 12;
      if (period === "AM" && hour === 12) hourNumber = 0;
      newDate.setHours(hourNumber, minute, 0, 0);
      setDate(newDate);
    }
  };

  // Shared content for Popover and Drawer
  const DateTimeContent = () => (
    <div className="py-4 md:p-4 flex flex-col sm:flex-row sm:space-x-4">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div className="md:max-w-[15rem] mt-4 sm:mt-0">
        <h3 className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center hidden md:block">
          {date ? dateTimeFormat(date) : "Select a date"}
        </h3>
        <ul className="grid w-full grid-cols-3 md:grid-cols-2 gap-2">
          {timeSlots.map((slot) => (
            <li key={slot}>
              <input
                type="radio"
                id={slot.replace(":", "-").toLowerCase()}
                value={slot}
                className="hidden peer"
                name="timetable"
                checked={time === slot}
                onChange={() => handleTimeSelect(slot)}
              />
              <label
                htmlFor={slot.replace(":", "-").toLowerCase()}
                className={cn(
                  "inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center",
                  "bg-white border rounded-lg cursor-pointer",
                  "text-primary border-primary hover:text-white hover:bg-primary/90",
                  "dark:text-primary dark:bg-gray-900 dark:border-primary",
                  "dark:hover:text-white dark:hover:bg-primary/90 dark:hover:border-primary",
                  "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white",
                  "dark:peer-checked:bg-primary dark:peer-checked:border-primary dark:peer-checked:text-white"
                )}
              >
                {slot}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  return (
    <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
      {/* Popover for desktop (md and above) */}
      {isDesktop ? (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger className="flex-row-between mt-3 w-full cursor-pointer">
            <div>
              <p className="flex items-center gap-x-2">
                <CalendarIcon />
                {t("delivery_time")}
              </p>
              <p className="mt-2 ml-2 text-primary">
                {date ? dateTimeFormat(date) : dateTimeFormat(new Date())}
              </p>
            </div>
            <ChevronDownIcon className="-rotate-90 text-custom-black" />
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
            <DateTimeContent />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger className="flex-row-between mt-3 w-full cursor-pointer">
            <div>
              <p className="flex items-center gap-x-2">
                <CalendarIcon />
                {t("delivery_time")}
              </p>
              <p className="mt-2 ml-2 text-primary">
                {date ? dateTimeFormat(date) : dateTimeFormat(new Date())}
              </p>
            </div>
            <ChevronDownIcon className="-rotate-90 text-custom-black" />
          </DrawerTrigger>
          <DrawerContent className="bg-white border-gray-200 overflow-y-auto items-center">
            <DrawerTitle></DrawerTitle>
            <DateTimeContent />
            <DrawerClose asChild>
              <CustomButton className="w-full my-4" size="lg">
                {time ? "Close" : "Select"}
              </CustomButton>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
