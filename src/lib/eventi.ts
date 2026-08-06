import type { Lingua } from './i18n';

export type Evento = {
  data: string | Date;
  fine?: string | Date;
  ora?: string;
  luogo?: string;
  luogo_en?: string;
  titolo_it: string;
  titolo_en?: string;
  nota_it?: string;
  nota_en?: string;
};

const moduli = import.meta.glob<{ frontmatter: Evento }>('../contenuti/eventi/*.md', {
  eager: true,
});

// Nel frontmatter la data si può scrivere con o senza virgolette: YAML può
// consegnarla come Date o come stringa, quindi normalizziamo a "AAAA-MM-GG"
// e fissiamo l'ora a mezzogiorno per non farci spostare di un giorno dal fuso.
const aData = (v: string | Date): Date => {
  const iso = v instanceof Date ? v.toISOString() : String(v);
  return new Date(`${iso.slice(0, 10)}T12:00:00`);
};

function tutti(): Evento[] {
  return Object.values(moduli)
    .map((m) => m.frontmatter)
    .filter((e) => e && e.data)
    .sort((a, b) => aData(a.data).getTime() - aData(b.data).getTime());
}

const oggi = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Eventi da oggi in avanti, dal più vicino. */
export function prossimi(limite?: number): Evento[] {
  const lista = tutti().filter((e) => aData(e.fine ?? e.data) >= oggi());
  return limite ? lista.slice(0, limite) : lista;
}

/** Eventi già passati, dal più recente. */
export function passati(): Evento[] {
  return tutti()
    .filter((e) => aData(e.fine ?? e.data) < oggi())
    .reverse();
}

export function titolo(e: Evento, lingua: Lingua): string {
  return (lingua === 'en' && e.titolo_en) || e.titolo_it;
}

export function nota(e: Evento, lingua: Lingua): string | undefined {
  const parti = [
    (lingua === 'en' && e.luogo_en) || e.luogo,
    (lingua === 'en' && e.nota_en) || e.nota_it,
  ].filter(Boolean);
  return parti.length ? parti.join(' · ') : undefined;
}

/** Due righe: la data (o l'intervallo) e l'ora. */
export function quando(e: Evento, lingua: Lingua): string[] {
  const loc = lingua === 'en' ? 'en-GB' : 'it-IT';
  const mese = (d: Date) => new Intl.DateTimeFormat(loc, { month: 'short' }).format(d).replace('.', '');
  const inizio = aData(e.data);

  if (e.fine) {
    const fine = aData(e.fine);
    const stessoMese = inizio.getMonth() === fine.getMonth();
    return stessoMese
      ? [`${inizio.getDate()}–${fine.getDate()} ${mese(inizio)}`]
      : [`${inizio.getDate()} ${mese(inizio)} –`, `${fine.getDate()} ${mese(fine)}`];
  }

  const righe = [`${inizio.getDate()} ${mese(inizio)}`];
  if (e.ora) righe.push(e.ora);
  return righe;
}
