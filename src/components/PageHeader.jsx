import React from "react";
import { Search } from "lucide-react";

function PageHeader({ title, subtitle, searchQuery, setSearchQuery }) {
  return (
    <header className="flex flex-col gap-4 border-b border-app-border bg-app-bg px-4 py-5 sm:gap-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between lg:px-8">

      <div className="flex-1">
        <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-app-text">
          <span className="h-7 w-1 rounded-full bg-brand-primary"></span>
          {title}
        </h2>

        <p className="mt-2 text-sm text-app-text-muted">
          {subtitle}
        </p>
      </div>

      <div className="relative w-full md:max-w-xs">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-app-text-muted"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-app-border bg-app-card py-3 pl-11 pr-4 text-sm text-app-text outline-none transition-all placeholder:text-app-text-muted focus:border-brand-lavender focus:ring-4 focus:ring-brand-primary/10"
        />
      </div>

    </header>
  );
}

export default React.memo(PageHeader);