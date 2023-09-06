# Quickbutik React Challenge

## Intro

Det är din första dag på Quickbutik och du har just blivit ägare av detta repository. Detta projekt har en befitlig kodbas och det är ditt jobb att slutföra (och eventuellt förbättra) det.

## Start

1. Klicka på "Use this template" knappen för att skapa ett nytt repo med samma innehåll.
2. Gör dina ändringar i det nya repot
3. När du är klar, skicka en länk till ditt repo (om det är publikt) eller zipa och skicka till oss.

## Installation

1. Installera dependencies med valfri package manager (npm, yarn, pnpm)
2. Starta projektet med `dev` scriptet (ex: npm run dev)
3. Öppna projektet i din webbläsare på [http://localhost:5173/](http://localhost:5173/)

## Mål

- Skapa en knapp-komponent som senare kan återanvändas. (`src/components/Button/Button.tsx`)
  - Knappen ska kunna ta en `prop` (kallad: `variant`) för att ändra färgen på knappen med följande alternativ:
    - `primary` (**default**) (css variable: `--primary-color`)
    - `accent` (css variable: `--accent-color`)
    - `success` (css variable: `--success-color`)
    - `danger` (css variable: `--danger-color`)
  - Designen är inte viktig i detta testet. Det viktigaste är hur den är byggd.
- Skapa en tabell/lista över ordrar (`src/components/OrdersList/OrdersList.tsx`)
  - Ordrarna hämtas från ett API (simulerat) på `/api/orders`
  - Kolumner som ska finnas i tabellen:
    - Ordernummer
    - Datum
    - Fullständigt namn
    - Antal produkter
    - Summa
    - Knapp (**din egna knapp-komponent**) för att gå till ordern (_När man trycker på knappen ska en alert med ordernummer visas_)
- Svara på följande frågor:
  - Vad hade du gjort (extra?, annorlunda?) om du hade fått mycket mer tid?

## När du är klar

Gör din kod publik genom att pusha upp den till ett publikt repo på valfri plattform (Github, Gitlab, Bitbucket, etc) och skicka länken till oss.

## Spelregler

- Använd precis vilka tekniker, paket och praxis som du anser är bäst för att lösa uppgifterna.
- Använd valfritt ui-bibliotek (eller inget)
- Du får lov att använda Javascript om du föredrar det.

## Good to know

Api'et på `/api/orders` är simulerat direkt i browser. Ingen server behövs.
Använd `getOrders` från `/src/api/api.ts` för att hämta dina ordrar.
