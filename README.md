# Uśmiechnie Stomatologia — strona mobilna

Aplikacja mobilna (React + Vite + Tailwind) dla gabinetu Uśmiechnie Stomatologia Katarzyna Baziuk, Brzeg Dolny.
Przeniesiona z Google AI Studio (projekt „luminous-dent-mobile”).

## Uruchomienie
1. `npm install`
2. `npm run dev` → http://localhost:3000
3. Build produkcyjny: `npm run build` (wynik w `dist/`)

## Struktura
- `App.tsx` — strona główna: hero, intro, karuzela wartości, indeks (Cennik / Zespół / Kontakt), opinie, blog, stopka; szczegóły otwierają się w dolnych arkuszach (bottom sheets)
- `constants.ts` — dane: telefon, adres, cennik, zespół, opinie
- `content/blog.tsx` — treści wpisów blogowych
- `components/BottomSheet.tsx` — arkusz dolny; `Header.tsx` — pływające przyciski; `StickyCta.tsx` — przyklejony pasek „Umów wizytę”
- `index.html` — paleta kolorów (Tailwind), fonty Fraunces + Manrope, animacje
- `zrodla/wersja-przed-redesignem/` — strona główna sprzed redesignu (układ z AI Studio)
- `public/img/` — zdjęcia (lokalne kopie)
- `wersja-statyczna/` — prosta wersja HTML/CSS bez Reacta (4 podstrony)
- `zrodla/` — oryginalne pliki źródłowe (szablon ze Stomatolog, eksport z AI Studio)

## Do uzupełnienia
- Zespół: prawdziwe imiona, biogramy i zdjęcia (`constants.ts` → TEAM, `public/img/zespol-*.jpg`)
- Formularz rezerwacji jest tylko wizualny (nie wysyła danych) — do podpięcia np. Formspree lub e-mail
- Czat AI (`components/views/AIChatView.tsx`) jest nieużywany; wymagałby klucza Gemini w `.env.local`
