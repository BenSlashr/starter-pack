import { useState, useEffect, useRef } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  title: string;
  questions: QuizQuestion[];
}

export default function QuizEngine({ title, questions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const total = questions.length;

  function handleSelect(optionIndex: number) {
    if (answered) return;
    setSelectedOption(optionIndex);
    setAnswered(true);
    if (optionIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  }

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const scoreProgress = finished && visible ? (score / total) * circumference : 0;
  const scoreOffset = circumference - scoreProgress;

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div ref={ref} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-6 text-center">
          {title} - Resultats
        </h3>

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <svg width="128" height="128" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="8" />
              <circle
                cx="64" cy="64" r={radius}
                fill="none"
                stroke={pct >= 66 ? 'var(--color-positive)' : pct >= 33 ? 'var(--color-primary)' : 'var(--color-negative)'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={scoreOffset}
                transform="rotate(-90 64 64)"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{score}/{total}</span>
            </div>
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] text-center">
            {pct >= 66 ? 'Bravo, vous maitrisez le sujet !' : pct >= 33 ? 'Pas mal, relisez les points manques.' : 'Relisez l\'article !'}
          </p>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)]">{title}</h3>
        <span className="text-xs text-[var(--color-text-muted)]">{currentIndex + 1}/{total}</span>
      </div>

      <p className="text-sm text-[var(--color-text-primary)] mb-4 font-medium">{current.question}</p>

      <div className="space-y-2 mb-4">
        {current.options.map((opt, i) => {
          let cls = 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50';
          if (answered) {
            if (i === current.correctIndex) cls = 'border-green-500/50 bg-green-500/5';
            else if (i === selectedOption) cls = 'border-red-500/50 bg-red-500/5';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all cursor-pointer ${cls} ${
                !answered ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mb-4 p-3 rounded-lg bg-[var(--color-surface)]/50 border border-[var(--color-border-subtle)]">
          <p className="text-xs text-[var(--color-text-secondary)]">{current.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-[var(--color-void)] text-sm font-semibold hover:brightness-110 transition-all cursor-pointer"
        >
          {isLast ? 'Voir les resultats' : 'Question suivante'}
        </button>
      )}
    </div>
  );
}
