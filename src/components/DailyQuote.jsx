import { useEffect, useState, useCallback } from "react";
import { Quote, RefreshCcw } from "lucide-react";

const quotes = [
  "Small progress is still progress.",
  "Discipline beats motivation every day.",
  "The future depends on what you do today.",
  "Success is the sum of small efforts repeated daily.",
  "Dream big, start small, act now.",
  "Consistency creates results.",
  "You don't have to be great to start, but you have to start to be great.",
  "Focus on the process, not the outcome.",
  "Your only competition is who you were yesterday.",
  "Every task completed is a step closer to your goal.",
  "Stay patient and trust your journey.",
  "Work hard in silence, let success make the noise.",
];

function DailyQuote() {
  const [quote, setQuote] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  function handleRefresh() {
    setIsSpinning(true);
    getRandomQuote();

    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  }

  const getRandomQuote = useCallback(() => {
    let newQuote;

    do {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      newQuote = quotes[randomIndex];
    } while (newQuote === quote);

    setQuote(newQuote);
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-app-border bg-app-card p-5 shadow-sm">

      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-surface/80 blur-2xl"></div>

      <div className="relative mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
            <Quote size={20} />
          </div>

          <div>
            <h3 className="text-base font-bold text-app-text">
              Daily Quote
            </h3>
            <p className="text-xs text-app-text-muted">
              A little inspiration for today
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          aria-label="Get another quote"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border bg-white text-brand-primary transition-all duration-200 hover:border-brand-lavender hover:bg-brand-surface active:scale-95"
        >
          <RefreshCcw
            size={17}
            className={isSpinning ? "animate-spin" : ""}
          />
        </button>

      </div>

      <div className="relative rounded-xl bg-brand-surface/60 p-4">

        <span className="absolute -top-3 left-3 text-4xl font-serif leading-none text-brand-lavender">
          “
        </span>

        <p className="px-2 py-3 text-sm font-semibold leading-7 text-brand-deep">
          {quote ? `"${quote}"` : "Finding a little inspiration for you..."}
        </p>

        <div className="mt-2 flex items-center justify-end">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-secondary">
            Keep moving forward
          </span>
        </div>

      </div>

    </div>
  );
}

export default DailyQuote;
