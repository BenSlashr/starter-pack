import { useState } from 'react';

export interface TreeQuestion {
  id: string;
  question: string;
  options: Array<{
    label: string;
    description?: string;
  }>;
}

export interface TreeProduct {
  id: string;
  name: string;
  description: string;
  url?: string;
  image?: string;
  tags?: string[];
}

export interface DecisionTreeConfig {
  title: string;
  subtitle?: string;
  questions: TreeQuestion[];
  products: TreeProduct[];
  /** scoring[questionIndex][optionIndex] = Record<productId, score> */
  scoring: Record<string, number>[][];
}

interface Props {
  config: DecisionTreeConfig;
}

export default function DecisionTreeEngine({ config }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = config.questions[currentStep];
  const totalSteps = config.questions.length;

  function handleSelect(optionIndex: number) {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentStep + 1 >= totalSteps) {
      setFinished(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setAnswers([]);
    setFinished(false);
  }

  function getResults(): TreeProduct[] {
    const scores: Record<string, number> = {};
    for (const p of config.products) {
      scores[p.id] = 0;
    }

    answers.forEach((optionIdx, questionIdx) => {
      const scoreMap = config.scoring[questionIdx]?.[optionIdx];
      if (scoreMap) {
        for (const [productId, score] of Object.entries(scoreMap)) {
          scores[productId] = (scores[productId] || 0) + score;
        }
      }
    });

    return config.products
      .map((p) => ({ ...p, score: scores[p.id] || 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }

  if (finished) {
    const results = getResults();
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2">
          Nos recommandations
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Basees sur vos {totalSteps} reponses
        </p>

        <div className="space-y-4 mb-6">
          {results.map((product, i) => (
            <div
              key={product.id}
              className={`p-4 rounded-lg border ${
                i === 0
                  ? 'border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)]'
              }`}
            >
              <div className="flex items-center gap-3">
                {i === 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full border border-[var(--color-primary)]/20">
                    #1
                  </span>
                )}
                <div>
                  <p className="font-semibold text-sm text-[var(--color-text-primary)]">{product.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{product.description}</p>
                </div>
              </div>
              {product.url && (
                <a
                  href={product.url}
                  className="inline-block mt-2 text-xs text-[var(--color-primary)] hover:underline"
                >
                  En savoir plus &rarr;
                </a>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
          {config.title}
        </h3>
        <span className="text-xs text-[var(--color-text-muted)]">
          {currentStep + 1}/{totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-[var(--color-border)] rounded-full mb-6">
        <div
          className="h-1 bg-[var(--color-primary)] rounded-full transition-all duration-300"
          style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
        />
      </div>

      <p className="text-sm text-[var(--color-text-primary)] mb-4 font-medium">
        {question.question}
      </p>

      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className="w-full text-left px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer"
          >
            <span className="font-medium">{opt.label}</span>
            {opt.description && (
              <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">{opt.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
