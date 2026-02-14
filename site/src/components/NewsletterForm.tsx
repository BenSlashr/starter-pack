import { useState, useRef } from 'react';

// TODO: Replace with your Mailchimp credentials
const MAILCHIMP_URL = 'https://your-list.us20.list-manage.com/subscribe/post-json';
const MAILCHIMP_U = 'your-u-value';
const MAILCHIMP_ID = 'your-list-id';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface Props {
  layout?: 'inline' | 'stacked';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterForm({ layout = 'inline' }: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const callbackRef = useRef<string>('');

  function subscribe(emailValue: string) {
    setState('loading');
    setErrorMsg('');

    const cbName = `mc_cb_${Date.now()}`;
    callbackRef.current = cbName;

    (window as any)[cbName] = (data: { result: string; msg: string }) => {
      delete (window as any)[cbName];
      const scriptEl = document.getElementById(cbName);
      scriptEl?.remove();

      if (data.result === 'success') {
        setState('success');
      } else {
        setState('error');
        const cleanMsg = data.msg
          ?.replace(/<[^>]*>/g, '')
          ?.replace('0 -', '')
          ?.trim();
        if (cleanMsg?.toLowerCase().includes('already subscribed')) {
          setErrorMsg('Cette adresse est deja inscrite.');
        } else {
          setErrorMsg(cleanMsg || 'Une erreur est survenue. Reessayez.');
        }
      }
    };

    const timeout = setTimeout(() => {
      if ((window as any)[cbName]) {
        delete (window as any)[cbName];
        document.getElementById(cbName)?.remove();
        setState('error');
        setErrorMsg('Delai depasse. Verifiez votre connexion.');
      }
    }, 10000);

    const script = document.createElement('script');
    script.id = cbName;
    script.src = `${MAILCHIMP_URL}?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}&EMAIL=${encodeURIComponent(emailValue)}&c=${cbName}`;
    script.onerror = () => {
      clearTimeout(timeout);
      delete (window as any)[cbName];
      setState('error');
      setErrorMsg('Impossible de contacter le serveur. Reessayez.');
    };
    document.body.appendChild(script);

    const origCb = (window as any)[cbName];
    if (origCb) {
      (window as any)[cbName] = (data: any) => {
        clearTimeout(timeout);
        origCb(data);
      };
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setState('error');
      setErrorMsg('Adresse email invalide.');
      return;
    }
    subscribe(trimmed);
  }

  if (state === 'success') {
    return (
      <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-green-500/10 border border-green-500/20 animate-fade-in">
        <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="text-left">
          <p className="text-sm font-semibold text-green-400">Inscription confirmee !</p>
          <p className="text-xs text-green-400/70">Verifiez votre boite mail (et les spams).</p>
        </div>
      </div>
    );
  }

  const isInline = layout === 'inline';

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isInline ? 'flex flex-col sm:flex-row gap-3' : 'flex flex-col gap-3'} w-full`}
      noValidate
    >
      <div className={`${isInline ? 'flex-grow' : ''} relative`}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') {
              setState('idle');
              setErrorMsg('');
            }
          }}
          placeholder="votre@email.com"
          required
          aria-label="Adresse email"
          className={`w-full px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 transition-all duration-200 text-sm ${
            state === 'error'
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
              : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/30'
          }`}
          disabled={state === 'loading'}
        />
      </div>

      <button
        type="submit"
        disabled={state === 'loading'}
        className={`px-8 py-3.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-void)] font-semibold text-sm hover:brightness-110 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed ${
          !isInline ? 'w-full' : ''
        }`}
      >
        {state === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Inscription...
          </>
        ) : (
          <>
            S'inscrire
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      {state === 'error' && errorMsg && (
        <p className={`text-xs text-red-400 ${isInline ? 'sm:col-span-2' : ''}`}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
