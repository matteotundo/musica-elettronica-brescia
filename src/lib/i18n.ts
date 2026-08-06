export type Lingua = 'it' | 'en';

// La sottocartella in cui vive il sito: '/musica-elettronica-brescia/' su
// GitHub Pages, '/' con un dominio proprio. La legge da astro.config.mjs,
// quindi i collegamenti restano giusti in entrambi i casi.
const radice = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Trasforma un percorso interno in un indirizzo completo. */
export const collega = (percorso: string) => `${radice}${percorso}`;

/** Toglie la sottocartella dall'indirizzo della pagina corrente. */
export const percorsoLogico = (pathname: string) => {
  const p = radice && pathname.startsWith(radice) ? pathname.slice(radice.length) : pathname;
  const q = p || '/';
  return q.endsWith('/') ? q : `${q}/`;
};

export const etichette = {
  it: {
    nav: [
      { testo: 'Home', href: '/' },
      { testo: 'Corsi', href: '/corsi/' },
      { testo: 'Eventi', href: '/eventi/' },
      { testo: 'Docenti', href: '/docenti/' },
    ],
    prossimi: 'Prossimi appuntamenti',
    tutti: 'Tutti gli eventi',
    archivio: 'Archivio',
    nessuno: 'Nessun appuntamento in programma al momento.',
    altroLink: 'Calendario completo',
    piano: 'Piano di studi',
    aree: 'Aree disciplinari',
    sede: 'Conservatorio di Musica Luca Marenzio · Brescia',
  },
  en: {
    nav: [
      { testo: 'Home', href: '/en/' },
      { testo: 'Courses', href: '/en/courses/' },
      { testo: 'Events', href: '/en/events/' },
      { testo: 'Faculty', href: '/en/faculty/' },
    ],
    prossimi: 'Upcoming',
    tutti: 'All events',
    archivio: 'Archive',
    nessuno: 'No events scheduled at the moment.',
    altroLink: 'Full calendar',
    piano: 'Syllabus',
    aree: 'Subject areas',
    sede: 'Conservatorio di Musica Luca Marenzio · Brescia, Italy',
  },
} as const;

// L'altra lingua della stessa pagina, per il selettore in alto.
export const gemella: Record<string, string> = {
  '/': '/en/',
  '/corsi/': '/en/courses/',
  '/eventi/': '/en/events/',
  '/docenti/': '/en/faculty/',
  '/en/': '/',
  '/en/courses/': '/corsi/',
  '/en/events/': '/eventi/',
  '/en/faculty/': '/docenti/',
};
