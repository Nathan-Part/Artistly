import type { KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

function SearchBar({
  value,
  onChange,
  onSearch,
  onReset,
}: SearchBarProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value) {
      onSearch();
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-[2rem] border border-[var(--purple-border)] bg-[#0b0d16] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:flex-row sm:items-center">
      <div className="flex min-h-[64px] flex-1 items-center gap-3 rounded-[1.4rem] bg-[#121521] px-4 text-slate-400 ring-1 ring-[var(--purple-bg)] transition focus-within:ring-2 focus-within:ring-[var(--pink)]">
        <span className="shrink-0 text-xl leading-none text-[var(--purple)]">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for an artist..."
          className="w-full bg-transparent text-lg text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <button
        onClick={onSearch}
        className="min-h-[64px] rounded-[1.4rem] bg-[var(--purple)] px-8 text-base font-semibold text-white shadow-[0_12px_30px_-16px_rgba(106,63,217,0.8)] transition duration-300 hover:bg-[var(--red)] focus:outline-none focus:ring-4 focus:ring-[var(--purple-border)]"
        disabled={!value}
      >
        Search
      </button>

      <button
        onClick={onReset}
        className="min-h-[64px] rounded-[1.4rem] bg-[var(--blue)] px-6 text-sm font-medium text-white transition duration-300 hover:bg-[var(--pink)] focus:outline-none focus:ring-4 focus:ring-[var(--purple-border)]"
      >
        Remove filter
      </button>
    </div>
  );
}

export default SearchBar;
