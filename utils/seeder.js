const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();


const posts = [
  {
    title: "L'evoluzione di Super Mario",
    content: "Esplora il viaggio di Mario da eroe pixelato a icona moderna.",
    published: true,
    slug: "evoluzione-di-super-mario",
    image:
      "https://www.lascimmiapensa.com/wp-content/uploads/2020/10/Mario.jpg",
    categoryId: 17,
    section:
      "Super Mario ha attraversato decenni di evoluzione, passando dai suoi semplici inizi a un'icona globale del mondo dei videogiochi. Lanciato per la prima volta nel 1985, il franchise ha definito il genere platform e ha continuato a innovare con ogni nuova iterazione, dai giochi a scorrimento laterale ai titoli open-world.\n\nLa versatilità di Mario come personaggio ha permesso al franchise di adattarsi ai cambiamenti dell'industria videoludica, mantenendo un forte legame con la sua base di fan. Il successo di Mario è dovuto alla capacità di Nintendo di bilanciare tradizione e innovazione in ogni nuovo capitolo della serie.",
  },
  {
    title: "L'impatto di Fortnite sulla cultura videoludica",
    content:
      "Come Fortnite ha cambiato il panorama del gaming multiplayer e introdotto nuove tendenze.",
    published: true,
    slug: "impatto-di-fortnite-sulla-cultura-videoludica",
    image:
      "https://cdn2.unrealengine.com/download-key-art2-1920x1080-21e209f6bab4.jpg",
    categoryId: 13,
    section:
      "Fortnite ha rivoluzionato il mondo del gaming multiplayer introducendo un modello di gioco gratuito basato su stagioni e contenuti aggiuntivi. Questo ha non solo ridefinito il genere battle royale, ma ha anche creato un'industria parallela legata agli eventi in-game, concerti e collaborazioni con marchi globali.\n\nIl successo di Fortnite è stato amplificato dalla sua capacità di attrarre un pubblico trasversale, che va dai giocatori casuali ai professionisti degli eSports. Il modello di monetizzazione e la sua enorme community online hanno creato un fenomeno culturale senza precedenti.",
  },
  {
    title: "Breath of the Wild: Un punto di svolta",
    content:
      "Uno sguardo approfondito su come Breath of the Wild ha reinventato il gameplay open-world.",
    published: true,
    slug: "breath-of-the-wild-un-punto-di-svolta",
    image:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
    categoryId: 6,
    section:
      "The Legend of Zelda: Breath of the Wild ha ridefinito il genere open-world offrendo ai giocatori un'esperienza di esplorazione completamente libera e immersiva. Il gioco abbandona le convenzioni lineari tipiche dei giochi precedenti della serie, invitando i giocatori a scoprire il mondo di Hyrule a proprio ritmo, con pochissime restrizioni.\n\nL'introduzione di meccaniche come la fisica avanzata, la resistenza, e la libertà di approccio nelle battaglie ha reso Breath of the Wild un vero punto di svolta nell'industria, ispirando numerosi titoli successivi.",
  },
  {
    title: "La crescita degli eSports",
    content:
      "Comprendere la crescita e l'impatto degli eSports nell'industria videoludica.",
    published: true,
    slug: "crescita-degli-esports",
    image: "https://www.websicilianews.it/public/esports-25032024181205-x.jpeg",
    categoryId: 12,
    section:
      "Negli ultimi anni, gli eSports hanno vissuto una crescita esponenziale, passando da nicchia a fenomeno globale. Con tornei che offrono premi milionari e un pubblico che conta milioni di spettatori, gli eSports si sono affermati come una delle forme di intrattenimento più seguite al mondo.\n\nL'industria degli eSports ha attirato l'attenzione di sponsor, media tradizionali e investitori, creando un ecosistema in cui giocatori professionisti, team e organizzazioni gareggiano ai massimi livelli. Questa crescita è stata alimentata dalla diffusione di piattaforme di streaming come Twitch e YouTube Gaming.",
  },
  {
    title: "Dark Souls: Un capolavoro della sfida",
    content:
      "Analizzando il design e l'impatto della community della serie Dark Souls.",
    published: true,
    slug: "dark-souls-un-capolavoro-della-sfida",
    image:
      "https://sm.ign.com/ign_it/screenshot/default/dark-souls-remastered_vnbk.jpg",
    categoryId: 9,
    section:
      "Dark Souls è rinomato per il suo livello di difficoltà e il suo design che premia la perseveranza. Il gioco ha creato una community di giocatori dedicati che hanno abbracciato la sua sfida, dando vita a una cultura basata sulla collaborazione e sulla condivisione delle strategie.\n\nL'influenza di Dark Souls si estende ben oltre il franchise stesso, con molti giochi successivi che hanno adottato il suo sistema di combattimento punitivo e la sua narrativa oscura. Il termine 'Souls-like' è diventato sinonimo di un genere a sé stante, ispirato dal capolavoro di FromSoftware.",
  },
  {
    title: "L'arte dei giochi indie",
    content:
      "Celebrare la creatività e l'innovazione nello sviluppo di giochi indie.",
    published: true,
    slug: "arte-dei-giochi-indie",
    image:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000073033/3d44d012e65c79c8dee78264647dd4bfab498e4edd55c2585b8c7042383e8044",
    categoryId: 4,
    section:
      "I giochi indie rappresentano una delle forze più innovative dell'industria videoludica. Sviluppatori indipendenti hanno la libertà di sperimentare con nuove meccaniche di gioco, estetiche uniche e narrazioni personali che sfidano le convenzioni dei titoli mainstream.\n\nSebbene non abbiano i budget multimilionari dei grandi studi, i giochi indie spesso compensano con idee fresche e originali che hanno portato a successi come Hollow Knight, Celeste e Hades. La scena indie continua a essere un vivace terreno fertile per la creatività nel gaming.",
  },
  {
    title: "Come The Last of Us ha ridefinito il storytelling",
    content:
      "Un'analisi delle tecniche narrative utilizzate in The Last of Us.",
    published: true,
    slug: "come-the-last-of-us-ha-ridefinito-il-storytelling",
    image: "https://nerocafe.net/wp-content/uploads/2012/11/lastoofus.jpg",
    categoryId: 7,
    section: "The Last of Us non è solo un gioco, ma una vera e propria esperienza narrativa che ha cambiato il modo in cui i videogiochi raccontano storie. Attraverso una combinazione di narrazione emotiva, personaggi profondi e momenti di gameplay integrati perfettamente nella trama, il gioco riesce a toccare corde emotive rare nel mondo videoludico. La forza del legame tra Joel ed Ellie è il cuore pulsante della storia, dimostrando come le relazioni umane possano essere esplorate in modo significativo anche in un contesto post-apocalittico.Inoltre, la capacità di The Last of Us di far interagire narrazione e gameplay in modo fluido ha posto nuovi standard per il genere. Il gioco utilizza sapientemente il silenzio, la musica e l'ambiente per comunicare sentimenti e stati d'animo, arricchendo ulteriormente l'immersione del giocatore. Non si tratta solo di sopravvivere, ma di esplorare le sfumature del dolore, della speranza e della redenzione.",
  },
  {
    title: "L'eredità di Final Fantasy VII",
    content:
      "Esaminare l'influenza di Final Fantasy VII sugli RPG e sul gaming in generale.",
    published: true,
    slug: "eredita-di-final-fantasy-vii",
    image:
      "https://gaming-cdn.com/images/products/5913/616x353/final-fantasy-vii-remake-intergrade-pc-gioco-steam-cover.jpg?v=1715269543",
    categoryId: 8,
    section: "Final Fantasy VII ha avuto un impatto indelebile non solo sul genere degli RPG, ma sull'industria del gaming in generale. Con la sua trama intricata, i personaggi indimenticabili e la sua rivoluzionaria grafica 3D, il gioco ha elevato gli standard per gli RPG e ha dimostrato che i videogiochi potevano raccontare storie epiche e complesse, degne di un romanzo o di un film. Cloud, Sephiroth e l'universo di Final Fantasy VII sono diventati simboli di una generazione di giocatori. Oltre alla storia, il sistema di combattimento a turni e l'utilizzo della materia hanno ridefinito la strategia negli RPG, offrendo una profondità che è stata imitata, ma mai completamente eguagliata. A distanza di anni, il gioco continua a essere celebrato e il recente remake ha introdotto nuove generazioni a questo capolavoro.",
  },
  {
    title: "Overwatch: Il potere del gameplay di squadra",
    content:
      "Esplorare cosa rende Overwatch un punto di riferimento nel genere degli sparatutto.",
    published: true,
    slug: "overwatch-il-potere-del-gameplay-di-squadra",
    image:
      "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt160529f9e3f729fa/6504ca8bf6e275314995fd1c/F2P.jpg?format=webply&quality=90",
    categoryId: 13,
    section: "Overwatch ha rivoluzionato il mondo degli sparatutto in prima persona, ponendo un'enfasi senza precedenti sul lavoro di squadra. Ogni eroe del gioco è unico, con abilità specifiche che non solo influenzano il gameplay individuale, ma anche la dinamica complessiva del team. Questo design incoraggia i giocatori a cooperare, a sfruttare le forze dei propri compagni e a bilanciare le debolezze. Non è solo questione di chi ha la miglior mira, ma di come ogni singolo membro della squadra possa contribuire alla vittoria. Il successo di Overwatch è anche dovuto alla sua accessibilità. Grazie a eroi dai ruoli ben definiti, anche i giocatori meno esperti possono trovare un personaggio adatto al proprio stile di gioco. Inoltre, il continuo aggiornamento da parte di Blizzard, con nuovi eroi, mappe e modalità di gioco, mantiene la community viva e coinvolta, rendendo il titolo un punto di riferimento nel mondo degli eSport.",
  },
  {
    title: "Il ruolo della musica nei videogiochi",
    content:
      "Come le colonne sonore migliorano l'esperienza di gioco e suscitano emozioni.",
    published: true,
    slug: "ruolo-della-musica-nei-videogiochi",
    image:
      "https://sm.ign.com/t/ign_it/photo/default/the-artful-escape-1633382321467_85uv.1280.jpg",
    categoryId: 17,
    section: "La musica nei videogiochi non è solo un accompagnamento, ma un vero e proprio elemento narrativo che può amplificare l'immersione e le emozioni del giocatore. Le colonne sonore sono in grado di rafforzare momenti chiave della trama, di creare suspense, o di trasportare il giocatore in mondi lontani. Titoli come The Legend of Zelda, Final Fantasy e The Last of Us sono esempi perfetti di come la musica possa diventare un'icona, tanto quanto i personaggi o le ambientazioni.Inoltre, molte colonne sonore dei videogiochi hanno guadagnato fama anche al di fuori del contesto videoludico, grazie a concerti e registrazioni. Questo dimostra che la musica non solo accompagna l'esperienza di gioco, ma ha una vita propria, capace di evocare ricordi e sensazioni anche dopo che il giocatore ha spento la console.",
  },
  {
    title: "Minecraft: Creatività e costruzione svelate",
    content:
      "Discussione su come Minecraft incoraggia la creatività e la costruzione della comunità.",
    published: true,
    slug: "minecraft-creativita-e-costruzione-svelate",
    image:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a",
    categoryId: 16,
    section: "Minecraft è molto più di un semplice gioco: è uno strumento di creatività che ha cambiato radicalmente il modo in cui i giocatori interagiscono con i mondi virtuali. Dando ai giocatori la libertà di costruire, esplorare e sopravvivere in un ambiente generato proceduralmente, Minecraft ha abbattuto le barriere tra creatività e gameplay. Ognuno può costruire il proprio mondo, creando strutture e paesaggi che rispecchiano la propria immaginazione. Inoltre, Minecraft ha creato una comunità globale di creatori, dove la condivisione di mondi e mod ha ampliato ulteriormente le possibilità offerte dal gioco base. Che si tratti di costruire una semplice casa o di riprodurre città intere, Minecraft continua a stimolare la fantasia di milioni di giocatori in tutto il mondo.",
  },
  {
    title: "Cyberpunk 2077: Lezioni apprese",
    content:
      "Uno sguardo alle sfide affrontate durante lo sviluppo di Cyberpunk 2077.",
    published: true,
    slug: "cyberpunk-2077-lezioni-anne",
    image:
      "https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/12aaa3b137a18e180bb92682e8f81674dcb7451f-1920x1080.jpg",
    categoryId: 9,
    section: "Lo sviluppo di Cyberpunk 2077 è stato un viaggio complesso e controverso, pieno di sfide tecniche e narrative. Nonostante i problemi al lancio, il gioco ha insegnato preziose lezioni all'industria, dimostrando quanto sia cruciale la comunicazione trasparente tra sviluppatori e fan. Il titolo ha anche evidenziato la necessità di bilanciare le aspettative dei giocatori con ciò che è effettivamente fattibile in termini di sviluppo e ottimizzazione. Dall'altra parte, Cyberpunk 2077 ha mostrato la potenza della narrazione open-world, dove le scelte del giocatore influenzano davvero il mondo di gioco. Night City, con i suoi personaggi complessi e le sue storie intrecciate, rappresenta un trionfo in termini di world-building, che ha ridefinito le possibilità dei giochi di ruolo in ambienti futuristici.",
  },
  {
    title: "Animal Crossing: Una fuga dalla pandemia",
    content:
      "Esplorare l'aumento di popolarità di Animal Crossing durante la pandemia.",
    published: true,
    slug: "animal-crossing-una-fuga-dalla-pandemia",
    image:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a",
    categoryId: 11,
    section: "Animal Crossing: New Horizons è diventato un fenomeno culturale durante la pandemia, offrendo a milioni di persone un rifugio virtuale in un momento di isolamento globale. Attraverso la sua tranquilla vita sull'isola, il gioco ha fornito un'esperienza di evasione che ha permesso ai giocatori di creare, decorare e socializzare in un mondo sereno e rassicurante. Questo lo ha reso un punto di riferimento per molti durante il lockdown. Oltre all'aspetto rilassante, Animal Crossing ha offerto un senso di comunità e connessione, con i giocatori che visitavano le isole degli altri, scambiando risorse e interagendo in modi che erano altrimenti impossibili nel mondo reale. Il suo successo durante la pandemia ha sottolineato quanto i videogiochi possano avere un ruolo cruciale nel benessere emotivo delle persone.",
  },
  {
    title: "I migliori mod per Skyrim",
    content: "Una guida ai migliori mod che migliorano l'esperienza di Skyrim.",
    published: true,
    slug: "migliori-mod-per-skyrim",
    image:
      "https://sm.ign.com/t/ign_it/screenshot/4/4k-image-f/4k-image-from-the-ps4-pro-version-of-the-elder-scrolls-v-sky_dgbs.1280.jpg",
    categoryId: 15,
    section: "Skyrim è uno dei giochi più moddati nella storia dei videogiochi, con una comunità di modder che ha creato migliaia di modifiche per migliorare l'esperienza di gioco. Dai miglioramenti grafici, che trasformano le terre di Tamriel in ambienti mozzafiato, alle mod che aggiungono nuove missioni, armi e personaggi, Skyrim è diventato un terreno fertile per la creatività. Grazie ai mod, il gioco continua a evolversi e a rimanere rilevante, anche anni dopo il suo rilascio. Alcuni dei mod più popolari includono miglioramenti all'IA dei nemici, nuovi sistemi di magia e persino la possibilità di costruire la propria casa. Queste modifiche non solo aggiungono ore di divertimento, ma espandono le possibilità narrative e di gameplay, trasformando ogni nuova partita in un'esperienza diversa.",
  },
  {
    title: "Il futuro del gaming in realtà virtuale",
    content: "Previsioni e tendenze per la prossima generazione di giochi VR.",
    published: true,
    slug: "futuro-del-gaming-in-realta-virtuale",
    image:
      "https://cdn.mos.cms.futurecdn.net/Bdd9TqytLkJoqePAYNzxgc-1200-80.jpg",
    categoryId: 18,
    section: "La realtà virtuale sta rapidamente diventando una delle frontiere più entusiasmanti del gaming. Con tecnologie come il PlayStation VR, l'Oculus Rift, e il HTC Vive, sempre più giocatori stanno sperimentando mondi immersivi e interattivi che sembravano impossibili solo pochi anni fa. Il futuro del gaming VR promette esperienze ancora più coinvolgenti, con giochi che sfruttano al massimo la tecnologia per offrire movimenti e interazioni realistiche. L'evoluzione della VR porterà anche a nuove forme di narrazione e gameplay, dove i giocatori non solo osserveranno un mondo, ma ci vivranno dentro. Con il miglioramento delle tecnologie di tracciamento e l'aumento della potenza dei dispositivi, la realtà virtuale sta per diventare una parte centrale dell'esperienza videoludica del futuro.",
  },
];

const categorieVideogiochi = [
  { name: "Indie" }, //id 4
  { name: "Azione" }, //id 5
  { name: "Avventura" }, //id 6
  { name: "Azione/Avventura" }, //id 7
  { name: "Gioco di Ruolo" }, //id 8
  { name: "Azione/Gioco di Ruolo" }, //id 9
  { name: "Sparatutto" }, //id 10
  { name: "Simulazione" }, //id 11
  { name: "eSports" }, //id 12
  { name: "Multiplayer" }, //id 13
  { name: "Strategia" },//id 14
  { name: "OpenWorld" }, //id 15
  { name: "Sandbox" },//id 16
  { name: "Platform" },//id 17
  { name: "Realtà virtuale" },//id 18
];


function createAllPosts() {
  prisma.post
    .createMany({
      data: posts,
    })
    .then((count) => console.log(count))
    .catch((err) => console.error(err));
}
function createAllCategories() {
  prisma.category
    .createMany({
      data: categorieVideogiochi,
    })
    .then((count) => console.log(count))
    .catch((err) => console.error(err));
}



async function deleteAllPosts() {
  try {
    const result = await prisma.post.deleteMany({});
    console.log(`${result.count} posts deleted`);
  } catch (error) {
    console.error("Error deleting posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function
// deleteAllPosts();
createAllPosts();
//categorie
// createAllCategories()


// node .\utils\seeder.js