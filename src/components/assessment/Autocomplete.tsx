'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface AutocompleteProps {
  id: string;
  label: string;
  placeholder: string;
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function Autocomplete({
  id,
  label,
  placeholder,
  suggestions,
  value,
  onChange,
  required,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filterSuggestions = useCallback(
    (query: string) => {
      if (!query.trim()) return [];
      const q = query.toLowerCase();
      return suggestions
        .filter((s) => s.toLowerCase().includes(q))
        .slice(0, 8);
    },
    [suggestions]
  );

  useEffect(() => {
    const results = filterSuggestions(value);
    setFiltered(results);
    setIsOpen(results.length > 0 && document.activeElement === inputRef.current);
    setActiveIndex(-1);
  }, [value, filterSuggestions]);

  const selectItem = (item: string) => {
    onChange(item);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      e.stopPropagation();
      selectItem(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.children;
      if (items[activeIndex]) {
        (items[activeIndex] as HTMLElement).scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  return (
    <div className="ac-group" style={{ position: 'relative' }}>
      <label className="ac-label" htmlFor={id}>
        {label}
      </label>
      <input
        ref={inputRef}
        className="ac-input"
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          const results = filterSuggestions(value);
          if (results.length > 0) setIsOpen(true);
        }}
        onBlur={() => {
          // Delay to allow click on dropdown
          setTimeout(() => setIsOpen(false), 200);
        }}
        onKeyDown={handleKeyDown}
        required={required}
        autoComplete="off"
      />
      {isOpen && filtered.length > 0 && (
        <ul ref={listRef} className="ac-dropdown">
          {filtered.map((item, i) => {
            // Highlight matching part
            const idx = item.toLowerCase().indexOf(value.toLowerCase());
            const before = item.slice(0, idx);
            const match = item.slice(idx, idx + value.length);
            const after = item.slice(idx + value.length);

            return (
              <li
                key={item}
                className={`ac-item ${i === activeIndex ? 'ac-item-active' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectItem(item);
                }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {before}
                <strong>{match}</strong>
                {after}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
