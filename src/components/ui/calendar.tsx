"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => selected || new Date());

  React.useEffect(() => {
    if (selected) {
      setCurrentMonth(selected);
    }
  }, [selected]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      day === selected.getDate() &&
      month === selected.getMonth() &&
      year === selected.getFullYear()
    );
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(year, month, day);
    onSelect?.(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(today);
    onSelect?.(today);
  };

  const calendarCells = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarCells.push(
      <div
        key={`prev-${i}`}
        className="h-8 w-8 flex items-center justify-center text-xs text-muted-foreground/30 pointer-events-none"
      >
        {prevMonthDays - i}
      </div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const active = isSelected(day);
    const today = isToday(day);

    calendarCells.push(
      <button
        key={`day-${day}`}
        type="button"
        onClick={() => handleSelectDay(day)}
        className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer",
          today && !active && "border border-primary text-primary font-bold",
          active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-semibold shadow-xs"
        )}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={cn("p-3 space-y-3 select-none w-64", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {MONTH_NAMES[month]} {year}
        </span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handlePrevMonth}
            className="h-7 w-7"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleNextMonth}
            className="h-7 w-7"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {DAY_NAMES.map((d) => (
          <span key={d} className="text-[10px] font-semibold text-muted-foreground uppercase">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarCells}
      </div>

      <div className="pt-2 border-t flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleTodayClick}
          className="text-xs h-7 px-2 text-primary font-medium hover:bg-primary/10"
        >
          Hari Ini
        </Button>
      </div>
    </div>
  );
}
