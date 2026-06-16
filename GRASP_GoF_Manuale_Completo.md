# Manuale completo GRASP + GoF — APS (prof. Riganelli)

> **A cosa serve questo file** — È il "manuale" di comprensione: teoria (parole esatte del prof), **schema UML** di ogni pattern, **spiegazione in parole semplici** (con esempio di vita quotidiana), esempio dal **tuo gestionale**, pro/contro, e la **mappa dei collegamenti** tra i pattern.
> Il file gemello `Flashcard_GRASP_GoF.md` serve al **ripasso a richiamo attivo** (copri → dì a voce → controlla).
>
> **Come studiarlo (NON rileggere passivamente):**
> 1. Leggi una scheda una volta per capirla (parti dalla riga "🧒 In parole semplici").
> 2. Poi copri tutto tranne il nome e **spiegala a voce** con lo scheletro: **Problema → Soluzione → Disegno → Esempio → Trade-off**.
> 3. **Disegna lo schema UML su carta** (il prof lo chiede!).
> 4. Controlla e segna i buchi. Ripassa a ripetizione spaziata: oggi → +1g → +3g → +7g → +14g.

---

## Mappa generale

- **GRASP** = *General Responsibility Assignment Software Patterns*. Sono **9 principi** per **assegnare responsabilità** alle classi durante la progettazione OO. Una **responsabilità** è "un contratto/obbligo" ed è di due tipi: **di fare** (calcolare, chiedere ad altri, coordinare) e **di conoscere** (i propri dati, gli oggetti correlati, ciò che può derivare).
  - 5 base: **Creator · Information Expert · Low Coupling · High Cohesion · Controller**
  - 4 avanzati: **Polymorphism · Pure Fabrication · Indirection · Protected Variations**

- **GoF** = *Gang of Four* (Gamma, Helm, Johnson, Vlissides). Sono **23 design pattern**, soluzioni a problemi di progettazione ricorrenti, classificati per **scopo** (creazionale / strutturale / comportamentale).
  - Il prof spiega in dettaglio **7**: **Adapter, Factory, Singleton, Strategy, Composite, Facade, Observer**.

- **Idea-chiave del corso**: i GoF si possono **spiegare con i GRASP** (es. *Adapter = Indirection + Polymorphism che realizza Protected Variations*). Saperlo dire fa una grande impressione all'orale.

> **🧒 In parole semplici (cos'è tutto questo):** progettare un programma è come **organizzare una squadra**: bisogna decidere **chi fa cosa**. I **GRASP** sono 9 regole sagge per dare i compiti alle persone giuste. I **GoF** sono 23 "trucchi già pronti" che i bravi progettisti hanno inventato per problemi che capitano sempre, così non li devi reinventare ogni volta.

**Notazione UML usata negli schemi qui sotto:**
```
A ───▶ B        A conosce/usa B (associazione/dipendenza)
A ◆──▶ B        A è composto da B (composizione: B è "parte di" A)
A ----▷ I       A implementa l'interfaccia I (linea tratteggiata + triangolo vuoto)
A ────▷ B       A eredita da B (linea piena + triangolo vuoto)
{ ... }         nota / pseudo-codice del metodo
```

---

## ⭐ Come imparare a DISEGNARE gli schemi UML (senza impararli a memoria)

Gli schemi UML **non si imparano come fotografie** (box per box): sotto stress evaporano. Si ricostruiscono capendo i **ruoli** e i **mattoncini ricorrenti**.

### I 4 "mattoncini Lego"
Quasi tutti i diagrammi GoF sono fatti con questi 4 pezzi: se li sai, ricostruisci l'80% dei disegni.

- **🧱 A — la gerarchia polimorfa**: una `«interface»` con 2 implementazioni sotto (triangolo vuoto `----▷`).
  → c'è in Strategy, Adapter, Composite, Observer, State…
- **🧱 B — il client/contesto che punta all'interfaccia** (una freccia `───▶`).
  → es. `Sale ───▶ ISalePricingStrategy`.
- **🧱 C — "contiene una lista"** (losanga `◆` + `*`).
  → es. `Composite ◆──*──▶ Component`, `Publisher ◆──*──▶ Subscriber`.
- **🧱 D — la delega nel metodo** (la nota `{ ... }`).
  → es. `request(){ adaptee.specificRequest() }`.

**Così non memorizzi 7 disegni diversi, ma 4 pezzi + la piccola differenza di ognuno:**
- **Strategy** = A + B   ·   **Composite** = A + C   ·   **Observer** = B + C   ·   **Adapter** = A + D (Adapter "ha" l'Adaptee)

### Memorizza i RUOLI, non i rettangoli
Ogni diagramma ha pochi ruoli con un nome fisso. Se sai **nominarli** e dire **"chi punta a chi e perché"**, il disegno esce da solo.
- Adapter → *Client · Target (interfaccia) · Adapter · Adaptee*. Frase: «il Client usa Target; l'Adapter implementa Target e **ha** un Adaptee; nel `request()` traduce chiamando `adaptee.specificRequest()`».
- **Dì la frase a voce mentre disegni**: il disegno è solo la "trascrizione" della frase.

### Il diagramma si DERIVA dalla "Soluzione"
La riga **Soluzione** di ogni scheda descrive già la struttura a parole. Allenati così: **leggi solo la Soluzione → disegni → confronti**. Non partire mai dal ricordo del disegno, ma dal principio.

### Protocollo di esercizio (il "come")
1. Studia i 4 mattoncini (una volta sola).
2. Per ogni pattern: **nomina i ruoli a voce** e di' chi-punta-a-chi.
3. **Disegna a foglio bianco**, senza copiare ("blank page test").
4. Confronta con questo manuale e **cerchia l'errore**.
5. Ripeti a distanza: oggi → +1g → +3g → +7g.
6. **Test finale**: disegna i **7 GoF in 10 minuti** su un foglio bianco. Se ci riesci, li sai.

### Casi speciali (pochi, da memorizzare a parte)
- **Singleton**: l'unico "solitario" — una classe che punta a **se stessa** (`instance` statica, costruttore privato).
- **Facade**: niente interfaccia — **1 Facade → N classi** del sottosistema ("uno verso molti").
- **Factory**: una classe che **crea** (freccia tratteggiata `create`) prodotti dietro un'interfaccia.

> ⚠️ **I GRASP non hanno un diagramma fisso** come i GoF: spesso lo schema è solo un **esempio di interazione**. Lì non memorizzi un disegno, memorizzi il **principio** e sai inventare un esempio al volo.

---

# PARTE A — I 9 pattern GRASP

## A1. Information Expert (Esperto delle Informazioni)

- **Problema**: qual è un principio di base per **assegnare responsabilità** agli oggetti?
- **Soluzione**: assegna la responsabilità alla classe che **possiede le informazioni** necessarie per soddisfarla.
- **🧒 In parole semplici**: *chi sa una cosa, la fa lui.* Se vuoi sapere quante caramelle ci sono nel barattolo, lo chiedi a **chi tiene il barattolo**, non a un amico a caso. La classe che ha i dati è quella che fa il calcolo.

**Schema UML**
```
Sale ──lineItems 1..*──▶ SalesLineItem ──description──▶ ProductDescription
getTotal()                getSubtotal()                  getPrice()
```
*(Ognuno calcola ciò di cui possiede i dati e collabora: Sale somma i subtotal, SalesLineItem moltiplica qty×prezzo, ProductDescription conosce il prezzo.)*

**Esempio gestionale**: chi calcola il **margine** di un `Ordine`? L'`Ordine` stesso, perché possiede `grossTotal`, `platformFee`, `shippingExpense`, `estimatedTax`. Il calcolo vive accanto ai dati (`Order` in `src/lib/types.ts`).

- **Vantaggi**: mantiene l'incapsulamento → favorisce **Low Coupling** e **High Cohesion**.
- **Controindicazione**: a volte la soluzione "pura" è sbagliata — es. *chi salva l'Ordine sul DB?* NON l'Ordine (mescolerebbe business e persistenza) → serve **Pure Fabrication** (un Repository).
- **Correlati**: Low Coupling, High Cohesion.
- **Domanda orale tipica**: *"chi deve conoscere il totale di una vendita e perché?"* → la classe che ha le righe di vendita (Sale), per Expert.

---

## A2. Creator (Creatore)

- **Problema**: chi deve essere responsabile di **creare** una nuova istanza di una classe A?
- **Soluzione**: assegna a **B** la creazione di A se (più condizioni vere, meglio è): B **aggrega** A · B **contiene** A · B **registra** A · B **usa strettamente** A · B **ha i dati di inizializzazione** di A.
- **🧒 In parole semplici**: *chi possiede la scatola ci mette dentro i giocattoli.* La scatola dei Lego "crea/contiene" i pezzi: è lei la responsabile, non un'altra scatola a caso. Chi **contiene** una cosa è il candidato giusto a **crearla**.

**Schema UML**
```
Sale ◆──1..*──▶ SalesLineItem
makeLineItem(desc, qty) ----create----▶ :SalesLineItem
```
*(Sale contiene le righe → Sale è il creatore naturale.)*

**Esempio gestionale**: l'`Ordine` **compone** le sue `VoceOrdine` (`items: OrderItem[]`) → per Creator è l'`Ordine` a crearle. Idem `Riparazione` → `ComponenteRiparazione`.

- **Vantaggi**: basso accoppiamento (il creatore è già connesso al creato).
- **Controindicazione**: se la creazione è **complessa** → usa **Factory / Abstract Factory** [GoF].
- **Correlati**: Low Coupling, Whole-Part, Factory.
- **Domanda orale**: *"perché Sale crea SalesLineItem e non Register?"* → perché Sale **contiene** le righe (composizione).

---

## A3. Low Coupling (Accoppiamento Basso)

- **Problema**: come supportare **bassa dipendenza**, **basso impatto dei cambiamenti** e **maggior riuso**?
- **Soluzione**: assegna le responsabilità in modo che l'accoppiamento (non necessario) **rimanga basso**. È un **principio di valutazione** (lo usi per scegliere tra alternative).
- **🧒 In parole semplici**: *non legare troppi fili tra le persone.* Se ogni amico dipende da tutti gli altri, basta che uno cambi idea e crolla tutto. Meno fili (dipendenze) = meno casini quando qualcosa cambia.

**Schema UML** (confronto)
```
PEGGIO:  Register ──create──▶ CashPayment        (Register accoppiato a CashPayment)
            └────── setPayment ──▶ Sale

MEGLIO:  Register ──makeCashPayment──▶ Sale ──create──▶ CashPayment
         (Register NON conosce CashPayment → accoppiamento più basso)
```

**Esempio gestionale**: il dialog React (`bulk-auto-sync-dialog.tsx`) **non** chiama mai le API eBay/Shopify direttamente: passa da una server action → `sync-orchestrator`. Se cambia l'API eBay, la UI non si tocca.

- **Forme di accoppiamento** (da citare): X ha un attributo di tipo Y · X chiama un metodo di Y · X crea Y · X ha Y come parametro/ritorno/variabile · X sottoclasse di Y · X implementa l'interfaccia Y.
- **Controindicazione**: accoppiarsi a elementi **stabili** non è un problema; il male è l'accoppiamento alto con elementi **instabili**.
- **Correlati**: Protected Variations, Information Expert.

---

## A4. High Cohesion (Coesione Alta)

- **Problema**: come tenere gli oggetti **focalizzati, comprensibili e gestibili** (e, come effetto collaterale, sostenere Low Coupling)?
- **Soluzione**: assegna le responsabilità in modo che la **coesione rimanga alta**: responsabilità strettamente correlate, poco lavoro per classe. Anche questo è un **principio di valutazione**.
- **🧒 In parole semplici**: *ognuno fa il suo mestiere.* Il fornaio fa il pane, non aggiusta le auto. Una classe deve fare **una cosa sola** e farla bene; se fa mille cose diverse, diventa un pasticcio.

**Schema UML**
```
ProductClassifier   → SOLO classifica prodotti (BAT/LCD/CAMR...)
PricingEngine       → SOLO calcola prezzi
SyncOrchestrator    → SOLO sincronizza quantità
(invece di una sola classe "Dio" che fa tutto = coesione bassa)
```

**Esempio gestionale**: moduli separati e coesi — `product-classifier.ts` (solo classificazione), `use-pricing-engine.ts` (solo prezzi), `sync-orchestrator.ts` (solo sync).

- **Livelli di coesione** (da citare): molto bassa → bassa → moderata → alta.
- **Regola pratica**: classe coesa = pochi metodi, molto correlati, poco lavoro. Analogia: il manager che non delega ha coesione bassa.
- **Correlati**: Single-Responsibility Principle, Low Coupling.

---

## A5. Controller (Controllore)

- **Problema**: qual è il **primo oggetto oltre lo strato UI** che riceve e coordina ("controlla") un'**operazione di sistema**?
- **Soluzione**: assegnala a un oggetto che rappresenta:
  - (a) il **sistema/sottosistema/oggetto radice** → **Façade Controller**; oppure
  - (b) uno **scenario di un caso d'uso** → **Use-Case Controller** (es. `ProcessSaleHandler`).
- **🧒 In parole semplici**: *il cameriere prende l'ordine e lo porta in cucina.* Tu (lo schermo/UI) parli col **cameriere** (il controller), non entri in cucina (il dominio). Il cameriere riceve la richiesta e la **coordina**, ma non cucina lui.

**Schema UML**
```
:UI ──enterItem(id,qty)──▶ :Register (Controller) ──▶ :Sale ──▶ ...
       (strato UI)              (strato dominio)
```

**Esempio gestionale**: le **server action** in `actions.ts` (es. `autoSyncListing(sku)`) sono il controller: ricevono l'operazione di sistema dalla UI e la coordinano delegando a orchestrator/dominio.

- **Difetto classico**: **controller gonfio** (bloated) = troppe responsabilità, coesione bassa → soluzione: delegare di più / aggiungere controller.
- **Correlati**: è un pattern di **delega** UI→dominio; **Facade**, **Layers**; uno use-case controller è una **Pure Fabrication**.

---

## A6. Polymorphism (Polimorfismo)

- **Problema**: come gestire **alternative basate sul tipo**? Come creare componenti software **"inseribili" (pluggable)**?
- **Soluzione**: quando il comportamento varia per tipo, assegna la responsabilità ai **tipi** usando **operazioni polimorfe** (invece di un `if/switch` sul tipo).
- **🧒 In parole semplici**: *animali diversi fanno il verso a modo loro.* Dici «fai il verso!» e il cane abbaia, il gatto miagola, la mucca muggisce. Stesso comando, comportamenti diversi — **senza dover chiedere "che animale sei?"** ogni volta (niente `if`).

**Schema UML**
```
        «interface» SupplierSync
            + syncStock()
              ▲              ▲
        FonedaySync   MobileSentrixSync
        (stessa operazione, implementazioni diverse)
```

**Esempio gestionale**: `foneday-sync.ts` e `mobilesentrix-sync.ts` espongono la stessa operazione ("sincronizza stock") con implementazioni diverse; il chiamante li tratta in modo uniforme.
*(Nota onesta per l'orale: il `product-classifier` usa invece una tabella data-driven `TYPE_SYNONYMS`, NON polimorfismo — ottimo esempio di "dove ho scelto di NON usare Polymorphism perché le varianti sono dati, non comportamenti".)*

- **Vantaggi**: estensioni facili; nuove implementazioni senza toccare i client.
- **Svantaggi**: polimorfismo "speculativo" su varianti che non arriveranno mai = complessità inutile.
- **Correlati**: base di **Strategy, Adapter, Composite, Observer**.

---

## A7. Pure Fabrication (Pura Invenzione / Fabbricazione)

- **Problema**: a quale oggetto dare la responsabilità quando Expert porterebbe a **violare High Cohesion / Low Coupling** (es. mettere logica DB in una classe di dominio)?
- **Soluzione**: inventa una classe **artificiale**, che **NON rappresenta un concetto del dominio**, per raccogliere un insieme **coeso** di responsabilità (favorendo coesione alta, accoppiamento basso, riuso).
- **🧒 In parole semplici**: *ti inventi un aiutante che nella realtà non esiste.* In un ristorante "il magazziniere robot" non è un concetto vero del ristorante, ma lo **inventi** apposta per fare bene un lavoro noioso (es. salvare/ritrovare le cose), così i camerieri e i cuochi restano puliti dal quel compito.

**Schema UML**
```
«Pure Fabrication»
SaleRepository ──▶ PersistentStorage
  save(Sale)        insert(Object)
(classe inventata: "Repository" non esiste nel dominio del negozio)
```

**Esempio gestionale**: `sync-orchestrator.ts` — "orchestratore" non esiste nel mondo reale del negozio, è una classe **inventata** per raccogliere coese le responsabilità di sync (calcola qty + pusha su eBay/Shopify/DB). Idem `db/actions.ts` (stile Repository).

- **Vantaggi**: sostiene High Cohesion e riuso.
- **Svantaggi**: abusarne → troppi oggetti "comportamentali" senza dati (decomposizione eccessiva).
- **Errore d'esame**: inventare la classe ma non mostrare **come** soddisfa la responsabilità (non è magica: va progettata l'interazione).

---

## A8. Indirection (Indirezione)

- **Problema**: dove assegnare una responsabilità per **evitare l'accoppiamento diretto** tra due o più elementi?
- **Soluzione**: assegnala a un oggetto **intermediario** che fa da media → i due elementi non si conoscono direttamente.
- **🧒 In parole semplici**: *il postino sta in mezzo.* Non vai a casa di tutti a consegnare le lettere: le dai al **postino** (l'intermediario), che fa da tramite. Così tu e il destinatario non dovete conoscervi direttamente.

**Schema UML**
```
Dominio ──▶ [Adapter / Intermediario] ──▶ Servizio esterno
(il dominio non chiama mai direttamente il servizio esterno)
```

**Esempio gestionale**: gli adapter fornitore (`foneday-sync`, `mobilesentrix-sync`) e il `sync-orchestrator` stanno **in mezzo** tra il dominio e le API esterne (eBay/Shopify/Foneday).

- **Vantaggi**: accoppiamento più basso.
- **Correlati**: meccanismo alla base di **Adapter, Facade, Observer**; spesso è il "come" con cui ottieni **Protected Variations**.

---

## A9. Protected Variations (Variazioni Protette)

- **Problema**: come progettare oggetti/sottosistemi in modo che le **variazioni o l'instabilità** di un elemento **non si riversino** sugli altri?
- **Soluzione**: individua i **punti di variazione/instabilità** previsti e mettici attorno un'**interfaccia stabile**.
- **🧒 In parole semplici**: *la presa elettrica standard.* Qualsiasi spina ci entra; se domani cambi l'elettrodomestico, **la presa resta uguale** e non devi rifare l'impianto. Metti un'interfaccia stabile proprio dove ti aspetti che le cose cambieranno.

**Schema UML**
```
App ──▶ «interface» ISupplier   (punto stabile)
              ▲          ▲
         Foneday    MobileSentrix   (variano dietro l'interfaccia)
```

**Esempio gestionale**: le API di Foneday/MobileSentrix cambiano e ne aggiungerai altre → incapsularle dietro un'interfaccia comune (gli adapter) protegge il resto del gestionale. Nuovo fornitore = nuovo adapter, nient'altro cambia.

- **Vantaggi**: estensioni facili, nuove implementazioni senza impatto sui client, favorisce Low Coupling.
- **Svantaggi**: inutile/costoso proteggere da variazioni che **non avverranno mai**.
- **È il principio "ombrello"**: Adapter, Strategy, Facade, Observer, Indirection, Polymorphism realizzano tutti PV.

---

# PARTE B — I 7 pattern GoF (spiegati dal prof)

## Tabella di classificazione dei 23 GoF (da sapere a memoria)

| Scopo → | **Creazionali** | **Strutturali** | **Comportamentali** |
|---|---|---|---|
| (creazione oggetti) | Factory Method, Abstract Factory, Builder, Prototype, **Singleton** | **Adapter**, Bridge, **Composite**, Decorator, **Facade**, Flyweight, Proxy | Chain of Responsibility, Command, Iterator, Mediator, Memento, **Observer**, State, **Strategy**, Visitor, Interpreter, Template Method |

*(In grassetto i 7 spiegati in dettaglio. Raggio d'azione: Adapter, Factory Method, Interpreter, Template Method agiscono sulle **classi**; gli altri sugli **oggetti**.)*

> **🧒 In parole semplici (le 3 famiglie):** **Creazionali** = trucchi per **costruire** le cose (la fabbrica). **Strutturali** = trucchi per **incastrare** pezzi insieme (i mattoncini). **Comportamentali** = trucchi per far **parlare/agire** i pezzi tra loro (il gioco di squadra).

---

## B1. Adapter [Strutturale]

- **Problema**: come gestire **interfacce incompatibili**, o dare un'**interfaccia stabile** a componenti simili con interfacce diverse?
- **Soluzione**: converti l'interfaccia originale di un componente in un'altra, tramite un **oggetto adattatore intermedio**.
- **🧒 In parole semplici**: *l'adattatore da viaggio.* La tua spina italiana non entra nella presa inglese → ci metti in mezzo un **adattatore** che "traduce". Il muro inglese non cambia, la tua spina non cambia: l'adattatore fa da ponte.

**Schema UML (Adapter di oggetto)**
```
┌────────┐        ┌──────────────────┐
│ Client │───────▶│ «interface»Target│
└────────┘        │   + request()    │
                  └────────▲─────────┘
                           ┊ implements
                  ┌────────┴─────────┐  adaptee  ┌────────────────────┐
                  │     Adapter      │──────────▶│      Adaptee       │
                  │   + request()    │ 1         │ + specificRequest()│
                  └──────────────────┘           └────────────────────┘
   request() { adaptee.specificRequest() }   ← l'Adapter traduce la chiamata
```

**Esempio gestionale**: `foneday-sync.ts` / `mobilesentrix-sync.ts` adattano le API dei fornitori (JSON di forma diversa) al **formato interno comune** del gestionale. Nuovo fornitore = nuovo adapter.

- **In termini GRASP**: **Indirection + Polymorphism → Protected Variations** (rispetto a interfacce esterne variabili).
- **Correlati**: chi crea gli adapter? → **Factory**; spesso la Factory è **Singleton**.

---

## B2. Factory (Simple/Concrete Factory) [Creazionale]

- **Problema**: chi crea oggetti quando c'è **logica di creazione complessa** o si vuole **separare** la responsabilità di creazione (per coesione)?
- **Soluzione**: crea un oggetto **Pure Fabrication** chiamato *Factory* che gestisce la creazione (spesso restituendo un'**interfaccia**, così può tornare qualsiasi implementazione).
- **🧒 In parole semplici**: *la fabbrica di giocattoli.* Tu dici «voglio un'automobilina» e la **fabbrica** te la costruisce e te la dà pronta. Non devi sapere tu come si montano le ruote: il "come si crea" è nascosto dentro la fabbrica.

**Schema UML**
```
ServicesFactory
  + getAdapter(name) : ISupplierAdapter
{
  // data-driven: legge da config quale classe creare e la istanzia
  return new XAdapter();   // dietro l'interfaccia ISupplierAdapter
}
```

**Esempio gestionale**: una funzione `getSupplierAdapter(name)` che, dato `'foneday'|'mobilesentrix'`, restituisce l'adapter giusto dietro un'interfaccia comune.
*(Esempio-obiettivo: oggi nel gestionale la scelta è sparsa; centralizzarla in una factory sarebbe il refactoring "da manuale" — ottimo da dire all'orale.)*

- **Vantaggi**: nasconde creazione complessa, separa gli interessi, abilita caching. Se la scelta è **data-driven** → realizza **Protected Variations**.
- **Correlati**: vi si accede spesso via **Singleton**.

---

## B3. Singleton [Creazionale]

- **Problema**: è consentita/richiesta **esattamente una** istanza di una classe, con un **punto di accesso globale**.
- **Soluzione**: metodo **statico** `getInstance()` che restituisce l'unica istanza; **costruttore privato** (così nessuno può fare `new` dall'esterno).
- **🧒 In parole semplici**: *il telecomando della TV.* In casa ce n'è **uno solo** e tutti usano quello; non ne fabbrichi mille. Se qualcuno ne vuole uno, gli dai sempre lo stesso (`getInstance`), e non lasci che se ne costruiscano altri (costruttore privato).

**Schema UML**
```
┌─────────────────────────────────────────────────┐
│                   Singleton                       │
│ - instance : Singleton   (statico, sottolineato)  │
│ - Singleton()            (costruttore privato)    │
│ + getInstance():Singleton (statico)               │
└─────────────────────────────────────────────────┘
  getInstance() { if(instance==null) instance=new Singleton(); return instance; }
```

**Esempio gestionale**: l'istanza `db` (client Drizzle in `src/lib/db`) è un **singleton di modulo**: importata ovunque, una sola connessione condivisa (in Node il modulo importato è già un singleton naturale).

- **Domande trabocchetto del prof**:
  - *Perché il costruttore è privato?* → per impedire `new` esterni e quindi istanze multiple.
  - *Cosa c'è di errato nella versione lazy senza `synchronized`?* → in **multithreading** due thread entrano insieme nell'`if(instance==null)` e creano due istanze → serve `synchronized` (o init eager).
- **Svantaggi**: visibilità globale abusata → **aumenta l'accoppiamento**; problematico in sistemi distribuiti (un'istanza per VM).
- **Correlati**: usato per **Factory** e **Facade**.

---

## B4. Strategy [Comportamentale]

- **Problema**: come gestire un insieme di **algoritmi/politiche variabili ma correlati** (risolvono lo stesso problema) e poterli **cambiare**?
- **Soluzione**: definisci **ogni algoritmo in una classe separata** con un'**interfaccia comune**; il contesto ne tiene un riferimento e gli **delega**.
- **🧒 In parole semplici**: *come vai a scuola?* A piedi, in bici o in autobus: l'obiettivo è lo stesso (arrivare a scuola), ma i **modi sono intercambiabili** e li puoi cambiare ogni giorno. Ogni "modo" è una strategia che puoi inserire o togliere.

**Schema UML**
```
┌───────────┐ strategy 1  ┌──────────────────────────┐
│   Sale    │────────────▶│ «interface»               │
│ getTotal()│             │ ISalePricingStrategy       │
└───────────┘             │  getTotal(Sale) : Money    │
   getTotal(){            └──────▲──────────────▲──────┘
     return strategy             │              │
       .getTotal(this) }  PercentDiscount   AbsoluteDiscountOverThreshold
```

**Esempio gestionale**: il **motore prezzi** (`use-pricing-engine.ts`) è il candidato naturale: le politiche "sconto 5% automatico", "margine minimo", "fee eBay 10%" sono esattamente gli *algoritmi correlati* di Strategy. (È letteralmente l'esempio delle slide: sconto % vs sconto sopra-soglia.)

- **In termini GRASP**: si basa su **Polymorphism**, fornisce **Protected Variations** sugli algoritmi.
- **Correlati**: le strategie sono spesso create da una **Factory**; il contesto ha **visibilità per attributo** verso la sua strategy.

---

## B5. Composite [Strutturale]

- **Problema**: come trattare un **gruppo composto** di oggetti **e** un oggetto **singolo (atomico)** **nello stesso modo** (polimorficamente)?
- **Soluzione**: definisci classi per oggetti **compositi** e **atomici** che implementano la **stessa interfaccia**; il composito contiene una lista di figli e delega.
- **🧒 In parole semplici**: *la scatola dentro la scatola.* Una scatola può contenere giocattoli **e** altre scatole. Ma tu la tratti sempre allo stesso modo: «aprila e conta cosa c'è». Non ti importa se dentro c'è un solo giocattolo o tante scatole annidate.

**Schema UML**
```
        ┌──────────────────────┐
Client─▶│ «interface» Component │
        │      + execute()      │
        └──────▲────────▲───────┘
               │        │
          ┌────┴───┐  ┌─┴────────────────────────┐
          │  Leaf  │  │       Composite           │◆──children *──▶ Component
          │execute()│  │ + add(c)  + execute()    │
          └────────┘  └──────────────────────────┘
                       execute(){ for figlio: figlio.execute() }
```

**Esempio gestionale**: *non ancora presente*. Esempio naturale dal dominio: un **"kit riparazione"** (LCD + biadesivo + viti) che a listino si comporta come **un singolo prodotto** ma è composto da più ricambi: `prezzo()` del kit = somma dei `prezzo()` dei componenti.
*(Altro caso: politiche prezzo multiple/conflittuali → `CompositePricingStrategy` che sceglie il totale migliore: Composite + Strategy.)*

- **In termini GRASP**: si basa su **Polymorphism**, dà **Protected Variations** al client (non sa se l'oggetto è atomico o composto).
- **Correlati**: usato con **Strategy** e **Command**.

---

## B6. Facade [Strutturale]

- **Problema**: serve un'interfaccia **unica e unificata** verso un **sottosistema** complesso (per evitare accoppiamento a molti oggetti interni o per isolare cambi d'implementazione).
- **Soluzione**: definisci **un punto di contatto singolo** (l'oggetto facade) che copre il sottosistema e ne coordina i componenti.
- **🧒 In parole semplici**: *il pulsante "accendi tutto" del cinema in casa.* Premi **un solo bottone** e dietro le quinte si accendono TV, casse, luci e lettore. Tu parli con un unico bottone (la facciata), senza dover accendere ogni cosa una per una.

**Schema UML**
```
┌────────┐     ┌──────────────────┐      ┌─ sottosistema ────────────┐
│ Client │────▶│      Facade       │─────▶│ classeA  classeB  classeC │
└────────┘     │ + operazione()    │      │ classeD  classeE   ...    │
               └──────────────────┘      └───────────────────────────┘
   (il client conosce SOLO la Facade, non le N classi interne)
```

**Esempio gestionale**: `actions.ts` — una server action è una **facciata** sul sottosistema "sync": la UI chiama UN metodo, e dietro la facade coordina DB + orchestrator + adapter fornitori. Anche `sync-orchestrator` è una facade su eBay+Shopify+DB.

- **In termini GRASP**: dà **Protected Variations** dall'implementazione del sottosistema (aggiunge **Indirection**, sostiene Low Coupling).
- **Correlati**: vi si accede spesso via **Singleton**; un **façade controller** è un tipo di Facade.

---

## B7. Observer (Publish-Subscribe) [Comportamentale]

- **Problema**: più oggetti **subscriber** sono interessati ai **cambiamenti/eventi** di un **publisher**; ognuno reagisce a modo suo e il publisher deve restare **debolmente accoppiato** ai subscriber.
- **Soluzione**: definisci un'interfaccia **subscriber/listener**; i subscriber la implementano e si **registrano dinamicamente** sul publisher, che li **avvisa** quando si verifica un evento.
- **🧒 In parole semplici**: *il canale YouTube e gli iscritti.* Ti **iscrivi** al canale; quando esce un video nuovo (l'evento) ti arriva la **notifica**. Lo YouTuber non conosce uno per uno i suoi iscritti: manda l'avviso a tutti quelli iscritti in quel momento (e chi vuole può disiscriversi).

**Schema UML**
```
┌──────────────────────────┐ subscribers * ┌──────────────────────┐
│        Publisher          │──────────────▶│ «interface»Subscriber │
│ + subscribe(s)            │               │   + update(context)   │
│ + notifySubscribers()     │               └──────────▲────────────┘
└──────────────────────────┘                           │
   notifySubscribers(){ for s: s.update(this) }   ConcreteSubscriber
                                                   + update(context)
```

**Esempio gestionale**: lo store dei **toast** (`use-toast.ts`) mantiene una lista di `listeners` e `dispatch()` notifica tutti i componenti iscritti quando cambia lo stato → **textbook Observer**. (Concettualmente anche i trigger `syncListingsAffectedBySupplierSku` / `...ByInventoryItem` sono publish-subscribe: evento "stock cambiato/vendita" → ricalcolo dei listing interessati.)

- **In termini GRASP**: si basa su **Polymorphism**, fornisce **Protected Variations** (il publisher conosce i subscriber solo via interfaccia).
- **Nota**: è il "rilassamento legittimo" del principio **Separazione Modello-Vista** (il dominio notifica la UI senza conoscerne la classe concreta).

---

# PARTE C — Mappa dei collegamenti (la parte che fa la differenza all'orale)

> **🧒 In parole semplici:** i pattern non vivono da soli, si **danno una mano a vicenda**. Es: una *fabbrica* (Factory) costruisce gli *adattatori* (Adapter), e la fabbrica è spesso un *pezzo unico* (Singleton). Saper raccontare queste amicizie tra pattern fa fare bella figura all'orale.

### I GoF spiegati con i GRASP
| Design Pattern GoF | Si spiega con i GRASP… |
|---|---|
| **Adapter** | Indirection + Polymorphism → **Protected Variations** |
| **Factory** | **Pure Fabrication** (+ data-driven → Protected Variations) |
| **Singleton** | punto di accesso globale (attenzione: ↑ accoppiamento se abusato) |
| **Strategy** | **Polymorphism** → **Protected Variations** |
| **Composite** | **Polymorphism** → **Protected Variations** |
| **Facade** | **Indirection** → **Protected Variations** (sostiene Low Coupling) |
| **Observer** | **Polymorphism** → **Protected Variations** |

### Collegamenti GoF ↔ GoF (chi usa chi)
```
                    ┌──────────────┐
                    │  Singleton   │  (accesso globale a…)
                    └──────┬───────┘
                ┌──────────┴──────────┐
                ▼                     ▼
           ┌─────────┐          ┌──────────┐
           │ Factory │          │  Facade  │
           └────┬────┘          └──────────┘
       crea     │  crea
         ┌──────┴───────┐
         ▼              ▼
    ┌─────────┐    ┌──────────┐
    │ Adapter │    │ Strategy │── usata con ──▶ Composite
    └─────────┘    └──────────┘
```
- una **Factory** è di solito un **Singleton**; crea **Adapter** e **Strategy**;
- a un **Facade** si accede via **Singleton**;
- **Composite** si usa con **Strategy** (e Command).

### Collegamento Controller (GRASP) → GoF
- un **façade controller** è un tipo di **Facade**;
- uno **use-case controller** è una **Pure Fabrication**.

### La "storia" da raccontare all'orale (esempio NextGen)
> *"Per gestire le interfacce variabili dei servizi esterni uso alcuni **Adapter** generati da una **Factory Singleton** → ottengo **Protected Variations**. Per le politiche di prezzo variabili uso **Strategy** (creata da una Factory), e se le politiche si combinano uso **Composite**. Per aggiornare la UI quando cambia un totale uso **Observer**. L'accesso a Factory e Facade passa da **Singleton**."*

---

# PARTE D — Confronti e domande trabocchetto

- **Strategy vs Adapter**: Strategy = algoritmi **intercambiabili** che risolvono lo **stesso** problema (scelgo io quale usare); Adapter = **converte** un'interfaccia esistente **incompatibile** (non scelgo l'algoritmo, traduco la chiamata).
  - 🧒 *Strategy = scegliere come andare a scuola; Adapter = l'adattatore della spina.*
- **Facade vs Adapter**: Facade = semplifica/unifica un **intero sottosistema** offrendo un'interfaccia nuova e comoda; Adapter = adatta **un** componente a un'interfaccia **già attesa** dal client.
  - 🧒 *Facade = il bottone "accendi tutto"; Adapter = il singolo adattatore tra due spine.*
- **Composite vs Decorator**: Composite = struttura ad **albero** (parte-tutto), tratta foglia e composto uguale; Decorator = aggiunge **responsabilità** a un oggetto avvolgendolo (stessa interfaccia, un solo "figlio").
  - 🧒 *Composite = scatole dentro scatole; Decorator = incartare un regalo aggiungendo strati.*
- **Information Expert vs Low Coupling (in conflitto)**: salvare l'Ordine sul DB — Expert direbbe "l'Ordine", ma rovinerebbe coesione/accoppiamento → si preferisce **Pure Fabrication** (Repository).
- **Pure Fabrication vs Indirection**: spesso coincidono nell'implementazione, ma il **movente** è diverso — Pure Fabrication nasce per **coesione/riuso** (inventare una classe coesa), Indirection per **disaccoppiare** due elementi (mettere un intermediario).
- **"Controller" GRASP ≠ "Controller" di MVC**: nel corso il Controller GRASP è l'oggetto del **dominio** che riceve l'operazione di sistema dalla UI (non il controller della UI).

---

# PARTE E — Cheat sheet (ripasso ultra-veloce)

**GRASP in una riga ciascuno (+ analogia 🧒):**
- **Information Expert** → la responsabilità a chi ha i dati. *(chi ha il barattolo conta le caramelle)*
- **Creator** → crea l'oggetto chi lo contiene/aggrega/usa/inizializza. *(la scatola crea i suoi pezzi)*
- **Low Coupling** → riduci le dipendenze. *(non legare troppi fili)*
- **High Cohesion** → ogni classe focalizzata, poco lavoro. *(ognuno il suo mestiere)*
- **Controller** → primo oggetto del dominio dopo la UI che coordina l'operazione di sistema. *(il cameriere)*
- **Polymorphism** → varianti per tipo → operazioni polimorfe (no switch). *(ogni animale il suo verso)*
- **Pure Fabrication** → classe inventata (non di dominio) per coesione/riuso. *(il magazziniere robot)*
- **Indirection** → un intermediario per disaccoppiare. *(il postino)*
- **Protected Variations** → interfaccia stabile attorno ai punti di variazione. *(la presa elettrica standard)*

**GoF in una riga ciascuno (+ analogia 🧒):**
- **Adapter** → traduce un'interfaccia incompatibile. *(adattatore da viaggio)*
- **Factory** → oggetto che incapsula la creazione complessa. *(la fabbrica di giocattoli)*
- **Singleton** → una sola istanza + accesso globale. *(il telecomando di casa)*
- **Strategy** → algoritmi intercambiabili dietro un'interfaccia. *(come vai a scuola)*
- **Composite** → tratta foglia e albero allo stesso modo. *(scatole dentro scatole)*
- **Facade** → un solo ingresso a un sottosistema complesso. *(bottone "accendi tutto")*
- **Observer** → publisher notifica i subscriber registrati. *(canale YouTube e iscritti)*

**Frase-jolly per ogni pattern all'orale:**
*"Serve a [problema]. La soluzione è [principio]. Si disegna così [schizzo]. Nel mio gestionale [esempio]. Il trade-off è [pro/contro]. In termini GRASP è [collegamento]."*
