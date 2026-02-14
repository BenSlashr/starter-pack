import { useState } from 'react';

export interface ComparisonItem {
  id: string;
  name: string;
  image?: string;
  url?: string;
  overallScore: number;
  ratings: Array<{ label: string; score: number }>;
  pros: string[];
  cons: string[];
}

interface Props {
  title: string;
  items: ComparisonItem[];
}

export default function ComparisonWidget({ title, items }: Props) {
  const [selected, setSelected] = useState<string[]>(items.slice(0, 3).map((i) => i.id));

  const filtered = items.filter((i) => selected.includes(i.id));

  function toggleItem(id: string) {
    if (selected.includes(id)) {
      if (selected.length > 2) {
        setSelected(selected.filter((s) => s !== id));
      }
    } else {
      setSelected([...selected, id]);
    }
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6">
      <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4">{title}</h3>

      {/* Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              selected.includes(item.id)
                ? 'border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left py-3 px-2 text-[var(--color-text-muted)] font-medium">Critere</th>
              {filtered.map((item) => (
                <th key={item.id} className="text-center py-3 px-2 text-[var(--color-text-primary)] font-semibold">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Overall score */}
            <tr className="border-b border-[var(--color-border-subtle)]">
              <td className="py-3 px-2 text-[var(--color-text-secondary)]">Score global</td>
              {filtered.map((item) => (
                <td key={item.id} className="text-center py-3 px-2">
                  <span className="text-lg font-bold text-[var(--color-primary)]">{item.overallScore}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">/10</span>
                </td>
              ))}
            </tr>

            {/* Detailed ratings */}
            {filtered[0]?.ratings.map((_, rIdx) => (
              <tr key={rIdx} className="border-b border-[var(--color-border-subtle)]">
                <td className="py-3 px-2 text-[var(--color-text-secondary)]">
                  {filtered[0].ratings[rIdx].label}
                </td>
                {filtered.map((item) => (
                  <td key={item.id} className="text-center py-3 px-2">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-primary)] rounded-full"
                          style={{ width: `${(item.ratings[rIdx]?.score || 0) * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">{item.ratings[rIdx]?.score}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}

            {/* Pros */}
            <tr className="border-b border-[var(--color-border-subtle)]">
              <td className="py-3 px-2 text-[var(--color-positive)] font-medium">Avantages</td>
              {filtered.map((item) => (
                <td key={item.id} className="py-3 px-2 text-xs text-[var(--color-text-secondary)]">
                  <ul className="space-y-1">
                    {item.pros.slice(0, 3).map((pro, i) => (
                      <li key={i}>+ {pro}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cons */}
            <tr>
              <td className="py-3 px-2 text-[var(--color-negative)] font-medium">Inconvenients</td>
              {filtered.map((item) => (
                <td key={item.id} className="py-3 px-2 text-xs text-[var(--color-text-secondary)]">
                  <ul className="space-y-1">
                    {item.cons.slice(0, 3).map((con, i) => (
                      <li key={i}>- {con}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
