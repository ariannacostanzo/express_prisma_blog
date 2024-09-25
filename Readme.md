# API Backend per la Gestione di un Blog con Node.js, Express e Prisma

Questa applicazione è un'API RESTful per la gestione di un blog. Consente di creare, leggere, aggiornare e cancellare post del blog, gestire categorie e assegnare tag ai post. Il progetto è sviluppato con **Node.js**, **Express** e **Prisma ORM**, e interagisce con un database relazionale come PostgreSQL.

## Funzionalità

- **Gestione dei Post**: Crea, leggi, aggiorna e cancella post del blog.
- **Categorie**: Gestione delle categorie dei post e assegnazione di categorie ai post.
- **Tag**: Aggiunta di tag ai post per una migliore categorizzazione.
- **Paginazione e Filtri**: Supporto per paginazione, filtraggio dei post per categorie, titoli o contenuto.

## Tecnologie Utilizzate

- **Node.js**: Ambiente runtime per l'esecuzione del codice JavaScript lato server.
- **Express**: Framework web per la creazione di API rapide e scalabili.
- **Prisma ORM**: ORM (Object-Relational Mapping) per l'interazione con il database.
- **PostgreSQL**: Database relazionale (può essere sostituito con MySQL o SQLite).
- **Express Validator**: Per la validazione dei campi nelle richieste.

## Prerequisiti

- Node.js (versione 14.x o superiore)
- PostgreSQL (o un altro database relazionale supportato da Prisma)
- **npm** o **yarn** per la gestione delle dipendenze