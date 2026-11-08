import { CalendarDays } from "lucide-react";

function MiniCalendar() {
  const today = new Date();

  const month = today.toLocaleString("default", {
    month: "long",
  });

  const year = today.getFullYear();
  const currentDate = today.getDate();

  const firstDay = new Date(year, today.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="w-full rounded-2xl border border-app-border bg-app-card p-5 shadow-sm">

      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
          <CalendarDays size={20} />
        </div>

        <div>
          <h3 className="text-base font-bold text-app-text">
            {month} {year}
          </h3>
          <p className="text-xs text-app-text-muted">
            Your calendar
          </p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div
            key={index}
            className="py-2 text-center text-xs font-semibold text-app-text-muted"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex aspect-square items-center justify-center rounded-lg text-sm transition-colors
              ${
                day === currentDate
                  ? "bg-brand-primary font-bold text-white shadow-sm"
                  : day
                    ? "font-medium text-app-text hover:bg-brand-surface hover:text-brand-primary"
                    : ""
              }`}
          >
            {day}
          </div>
        ))}
      </div>

    </div>
  );
}

export default MiniCalendar;
