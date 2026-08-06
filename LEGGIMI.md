# Sito del dipartimento di Musica elettronica

Sito statico costruito con Astro. Otto pagine (quattro in italiano, quattro in
inglese) generate a partire dai file di testo in `src/contenuti/`.

---

## 1. Metterlo su GitHub

1. Su github.com: **New repository**. Nome consigliato:
   `sito-musica-elettronica`. Visibilità **Public** (GitHub Pages è gratuito
   solo per i repository pubblici, salvo piani a pagamento).
2. Carica questi file: nella pagina del repository vuoto, **uploading an
   existing file**, poi trascina tutta la cartella. In alternativa, da
   terminale:

   ```bash
   git init
   git add .
   git commit -m "Prima versione del sito"
   git branch -M main
   git remote add origin https://github.com/UTENTE/sito-musica-elettronica.git
   git push -u origin main
   ```

3. Nel repository: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**. Non serve altro: il file
   `.github/workflows/deploy.yml` è già incluso.

Da questo momento **ogni modifica salvata ricostruisce e ripubblica il sito**,
in circa un minuto. Lo stato di avanzamento si vede nella scheda **Actions**.

## 2. L'indirizzo del sito

Senza dominio proprio, GitHub pubblica il sito in una sottocartella:
`https://UTENTE.github.io/sito-musica-elettronica/`. In quel caso, e **solo in
quel caso**, aggiungi la riga `base` in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://UTENTE.github.io',
  base: '/sito-musica-elettronica/',
});
```

Con un dominio proprio (`musicaelettronica.it` o simile) il `base` non serve e
va lasciato fuori. Per collegarlo:

1. Crea il file `public/CNAME` contenente solo il dominio, senza `https://`:
   `musicaelettronica.it`
2. Dal pannello di chi ti ha venduto il dominio, imposta i record DNS:
   - record `A` per `@` verso `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - record `CNAME` per `www` verso `UTENTE.github.io`
3. In **Settings → Pages → Custom domain** scrivi il dominio e spunta
   **Enforce HTTPS** (compare dopo qualche minuto, quando il certificato è
   pronto).

## 3. Modificare i contenuti

Tutto ciò che si aggiorna vive in `src/contenuti/`. Il codice non si tocca.

### Aggiungere un evento

Vai in `src/contenuti/eventi/`, poi **Add file → Create new file**. Nome del
file: data e titolo breve, per esempio `2026-11-03-concerto-inverno.md`.
Contenuto:

```markdown
---
data: 2026-11-03
ora: "20:30"
luogo: "Auditorium Marenzio"
titolo_it: "Titolo in italiano"
titolo_en: "Title in English"
---
```

Campi facoltativi: `fine` (per eventi su più giorni, es. `fine: 2026-11-05`),
`nota_it` e `nota_en` (una precisazione breve, es. "ingresso libero"),
`luogo_en` (se il luogo va tradotto). Se manca `titolo_en`, la versione
inglese mostra il titolo italiano invece di una riga vuota.

Non serve cancellare gli eventi passati: il sito li sposta da solo
sotto **Archivio**, in ordine dal più recente.

### Modificare le altre pagine

In `src/contenuti/pagine/` c'è un file per pagina e per lingua:
`home.it.md`, `home.en.md`, `corsi.it.md`, e così via. Fra i due tratti `---`
stanno i dati strutturati (titolo della finestra, elenco dei corsi, aree
disciplinari); sotto, il testo libero.

### Come si modifica in pratica

- **Dal browser**: apri il file nel repository, clicca l'icona della matita,
  scrivi, poi **Commit changes** in fondo. Funziona anche dal telefono.
- **Editor completo nel browser**: dalla pagina del repository premi il tasto
  `.` (punto). Si apre un VS Code completo, senza installare nulla.
- **Sul computer**: `npm install` una volta sola, poi `npm run dev` per vedere
  le modifiche in tempo reale su `http://localhost:4321`.

## 4. Il PDF del piano di studi

Il link nella pagina Corsi punta a `/documenti/piano-di-studi.pdf`. Carica il
file dentro `public/documenti/` con esattamente quel nome, oppure cambia il
campo `piano_url` in `corsi.it.md` e `corsi.en.md`.

## 5. Struttura dei file

```
src/
  contenuti/       ← quello che aggiorni tu
    eventi/        ← un file per evento
    pagine/        ← un file per pagina e per lingua
  pages/           ← le otto pagine del sito
  components/      ← elenco eventi
  layouts/         ← testata, navigazione, piede
  lib/             ← etichette IT/EN e ordinamento eventi
  styles/          ← colori, tipografia, impaginazione
public/            ← PDF, immagini, CNAME
```
