export type Lingua = 'it' | 'en';

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
