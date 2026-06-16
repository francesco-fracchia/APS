# Flashcard GRASP + GoF — APS (prof. Riganelli)

> **Come si usa questo mazzo (metodo anti-blocco all'orale)**
> Ogni pattern si risponde con lo **stesso scheletro a 5 caselle**. Quando il prof dice un nome, NON cercare frasi a memoria: parti dalla casella 1 e scendi.
>
> 1. **PROBLEMA** → la domanda a cui il pattern risponde (le parole del prof)
> 2. **SOLUZIONE** → il principio/consiglio in una frase
> 3. **DISEGNO** → lo schizzo UML minimo (2-3 classi)
> 4. **ESEMPIO** → uno concreto (qui: il TUO gestionale)
> 5. **TRADE-OFF / CORRELATI** → pro, contro, pattern legati
>
> Frase-jolly da dire sempre: *"Questo pattern serve a [problema]. La soluzione è [principio]. Per esempio, nel mio gestionale [esempio]. Il trade-off è [pro/contro]."*
>
> **Ripetizione spaziata**: ripassa oggi, +1g, +3g, +7g, +14g. Copri la risposta, dilla a voce, poi controlla.

---

# PARTE 1 — GRASP (9 pattern)

**GRASP = General Responsibility Assignment Software Patterns.** Sono principi per **assegnare responsabilità** alle classi. Una *responsabilità* è "un contratto o obbligo" ed è di due tipi: **di fare** (un calcolo, chiedere ad altri, coordinare) e **di conoscere** (i propri dati, gli oggetti correlati, ciò che può derivare).

Elenco da sapere a memoria (5 base + 4 altri):
**Creator · Information Expert · Low Coupling · High Cohesion · Controller** + **Polymorphism · Pure Fabrication · Indirection · Protected Variations**

---

## GRASP 1 — Information Expert (Esperto)

1. **PROBLEMA** — Qual è il principio generale per assegnare responsabilità agli oggetti?
2. **SOLUZIONE** — Assegna la responsabilità alla classe che **ha le informazioni** necessarie per soddisfarla.
3. **DISEGNO**
   ```
   Sale ──lineItems*──> SalesLineItem ──> ProductDescription
   getTotal()           getSubtotal()      getPrice()
   ```
   (ogni classe calcola ciò di cui possiede i dati; collaborano)
4. **ESEMPIO (gestionale)** — Chi calcola il `margine` di un `Ordine`? L'`Ordine` stesso: possiede `grossTotal`, `platformFee`, `shippingExpense`, `estimatedTax`. Il calcolo del margine vive accanto a quei dati (`Order` in `src/lib/types.ts`), non in un oggetto esterno.
5. **TRADE-OFF / CORRELATI** — Pro: mantiene l'incapsulamento, favorisce **Low Coupling** e **High Cohesion**. Contro: la soluzione "pura" a volte è sbagliata (es. *chi salva l'Ordine sul DB?* → NON l'Ordine, sennò mescola logica di business e di persistenza → serve **Pure Fabrication**).

---

## GRASP 2 — Creator (Creatore)

1. **PROBLEMA** — Chi deve essere responsabile di **creare** una nuova istanza di una classe A?
2. **SOLUZIONE** — Assegna a B la creazione di A se (più condizioni vere, meglio è): B **aggrega/contiene** A · B **registra** A · B **usa strettamente** A · B **possiede i dati di inizializzazione** di A.
3. **DISEGNO**
   ```
   Ordine ◆──1..*──> VoceOrdine
   makeVoce(...) ──create──> :VoceOrdine
   ```
4. **ESEMPIO (gestionale)** — L'`Ordine` **compone** le sue `VoceOrdine` (`items: OrderItem[]`): per Creator è l'`Ordine` a creare le voci, perché le contiene e ha i dati per inizializzarle. Stesso per `Riparazione` → `ComponenteRiparazione`.
5. **TRADE-OFF / CORRELATI** — Pro: basso accoppiamento (il creatore è già connesso al creato). Controindicazione: se la creazione è **complessa** → usa **Factory / Abstract Factory** [GoF]. Correlati: Low Coupling, Whole-Part.

---

## GRASP 3 — Low Coupling (Accoppiamento Basso)

1. **PROBLEMA** — Come ridurre l'impatto dei cambiamenti, le dipendenze, e favorire il riuso?
2. **SOLUZIONE** — Assegna le responsabilità in modo che l'accoppiamento (non necessario) **rimanga basso**. È un *principio di valutazione*: lo usi per scegliere tra alternative.
3. **DISEGNO**
   ```
   UI ──> Action(Controller) ──> Orchestrator ──> eBay/Shopify
   (la UI NON conosce eBay/Shopify)
   ```
4. **ESEMPIO (gestionale)** — Il dialog React (`bulk-auto-sync-dialog.tsx`) **non** parla mai direttamente con le API eBay/Shopify: chiama una server action, che delega al `sync-orchestrator`. La UI è disaccoppiata dai servizi esterni → se cambia l'API eBay, la UI non si tocca.
5. **TRADE-OFF / CORRELATI** — Un po' di accoppiamento serve sempre (altrimenti niente collaborazione). Accoppiarsi a elementi **stabili** non è un problema; il male è l'accoppiamento alto con elementi **instabili**. Correlati: **Protected Variations**, Information Expert.

---

## GRASP 4 — High Cohesion (Coesione Alta)

1. **PROBLEMA** — Come tenere gli oggetti focalizzati, comprensibili, gestibili (e come effetto collaterale sostenere Low Coupling)?
2. **SOLUZIONE** — Assegna le responsabilità in modo che la **coesione rimanga alta**: ogni classe ha responsabilità **strettamente correlate** e fa poco lavoro. (Anche questo è un principio di valutazione.)
3. **DISEGNO**
   ```
   ProductClassifier  → SOLO classifica prodotti
   PricingEngine      → SOLO calcola prezzi
   SyncOrchestrator   → SOLO sincronizza qty
   ```
4. **ESEMPIO (gestionale)** — Hai separato moduli coesi: `product-classifier.ts` fa **solo** classificazione (BAT/LCD/CAMR…), `use-pricing-engine.ts` fa **solo** prezzi, `sync-orchestrator.ts` fa **solo** sync quantità. Una classe "Dio" che facesse tutto avrebbe coesione bassa.
5. **TRADE-OFF / CORRELATI** — Regola pratica: classe coesa = pochi metodi, molto correlati. Analogia: il manager che non delega → coesione bassa. Correlati: **Single-Responsibility Principle**, Low Coupling.

---

## GRASP 5 — Controller (Controllore)

1. **PROBLEMA** — Qual è il **primo oggetto oltre lo strato UI** che riceve e coordina ("controlla") un'operazione di sistema?
2. **SOLUZIONE** — Assegnala a un oggetto che rappresenta: (a) il **sistema/sottosistema/radice** → *Façade Controller*; oppure (b) uno **scenario di caso d'uso** → *Use-Case Controller*.
3. **DISEGNO**
   ```
   :UI ──enterItem(id,qty)──> :Controller ──> :Dominio
   ```
4. **ESEMPIO (gestionale)** — Le **server action** in `actions.ts` (es. `autoSyncListing(sku)`) sono il controller: ricevono l'operazione di sistema dalla UI e la coordinano, delegando al dominio/orchestrator. La UI non esegue logica di dominio.
5. **TRADE-OFF / CORRELATI** — Difetto comune: **controller gonfio** (bloated) = troppe responsabilità, coesione bassa → soluzione: delegare di più / aggiungere controller. È un pattern di **delega** (UI→dominio). Correlati: **Facade**, **Layers**, uno use-case controller è una **Pure Fabrication**.

---

## GRASP 6 — Polymorphism (Polimorfismo)

1. **PROBLEMA** — Come gestire **alternative basate sul tipo**? Come creare componenti software "inseribili" (pluggable)?
2. **SOLUZIONE** — Quando il comportamento varia per tipo, assegna la responsabilità ai **tipi** usando **operazioni polimorfe** (invece di un `if/switch` sul tipo).
3. **DISEGNO**
   ```
        «interface» SupplierSync
           +syncStock()
            ▲          ▲
   FonedaySync   MobileSentrixSync
   ```
4. **ESEMPIO (gestionale)** — `foneday-sync.ts` e `mobilesentrix-sync.ts` espongono la **stessa operazione** ("sincronizza stock") con implementazioni diverse: il chiamante li tratta in modo uniforme. *(Nota onesta per l'orale: il `product-classifier` usa invece una tabella data-driven `TYPE_SYNONYMS`, NON polimorfismo — buon esempio di "dove ho scelto di NON usare Polymorphism perché le varianti sono dati, non comportamenti".)*
5. **TRADE-OFF / CORRELATI** — Pro: estensioni facili, nuove implementazioni senza toccare i client. Contro: polimorfismo "speculativo" su varianti che non arriveranno mai = complessità inutile. Base di Strategy, Adapter, Composite, Observer.

---

## GRASP 7 — Pure Fabrication (Pura Invenzione)

1. **PROBLEMA** — A quale oggetto dare la responsabilità quando Expert porterebbe a violare High Cohesion / Low Coupling (es. mettere logica DB dentro una classe di dominio)?
2. **SOLUZIONE** — Inventa una classe **artificiale**, che NON è un concetto del dominio, per raccogliere un insieme **coeso** di responsabilità (favorendo coesione alta, accoppiamento basso, riuso).
3. **DISEGNO**
   ```
   «Pure Fabrication»
   SaleRepository ──> PersistentStorage
   save(Sale)         insert(Object)
   ```
4. **ESEMPIO (gestionale)** — `sync-orchestrator.ts`: "orchestratore" non esiste nel mondo reale del negozio, è una classe **inventata** per raccogliere coese le responsabilità di sync (calcola qty + pusha su eBay/Shopify/DB). Idem `db/actions.ts` (stile Repository).
5. **TRADE-OFF / CORRELATI** — Pro: sostiene High Cohesion e riuso. Contro: abusarne → troppi oggetti "comportamentali" senza dati (decomposizione eccessiva). Errore d'esame: inventare la classe ma non mostrare **come** soddisfa la responsabilità (non è magica, va progettata l'interazione).

---

## GRASP 8 — Indirection (Indirezione)

1. **PROBLEMA** — Dove assegnare una responsabilità per **evitare l'accoppiamento diretto** tra due (o più) elementi?
2. **SOLUZIONE** — Assegnala a un oggetto **intermediario** che fa da media: i due elementi non si conoscono direttamente.
3. **DISEGNO**
   ```
   Dominio ──> [Adapter/Intermediario] ──> Servizio esterno
   ```
4. **ESEMPIO (gestionale)** — Gli adapter fornitore (`foneday-sync`, `mobilesentrix-sync`) e il `sync-orchestrator` stanno **in mezzo** tra il dominio e le API esterne (eBay/Shopify/Foneday): il dominio non chiama mai direttamente l'API esterna.
5. **TRADE-OFF / CORRELATI** — Pro: accoppiamento più basso. È il meccanismo alla base di **Adapter**, **Facade**, **Observer**. Spesso è il "come" con cui ottieni **Protected Variations**.

---

## GRASP 9 — Protected Variations (Variazioni Protette)

1. **PROBLEMA** — Come progettare in modo che le **variazioni/instabilità** di un elemento non si riversino sugli altri?
2. **SOLUZIONE** — Individua i **punti di variazione/instabilità** previsti e mettici attorno un'**interfaccia stabile**.
3. **DISEGNO**
   ```
   App ──> «interface» ISupplier (stabile)
               ▲           ▲
        Foneday      MobileSentrix  (variano)
   ```
4. **ESEMPIO (gestionale)** — Le API di Foneday/MobileSentrix cambiano e ne aggiungerai altre: incapsularle dietro un'interfaccia comune (gli adapter) protegge il resto del gestionale. Se domani aggiungi un fornitore nuovo, scrivi un adapter e basta.
5. **TRADE-OFF / CORRELATI** — Pro: estensioni facili, nuove implementazioni senza impatto sui client, favorisce Low Coupling. Contro: inutile/costoso proteggere da variazioni che **non avverranno mai**. È il principio "ombrello": Adapter, Strategy, Facade, Observer, Indirection, Polymorphism tutti realizzano PV.

---

# PARTE 2 — GoF (Gang of Four)

**Domanda da tabella (sapere a memoria):** i 23 GoF si classificano per **scopo** in 3 famiglie:
- **Creazionali** (creazione oggetti): Factory Method, Abstract Factory, Builder, Prototype, **Singleton**
- **Strutturali** (composizione classi/oggetti): **Adapter**, Bridge, **Composite**, Decorator, **Facade**, Flyweight, Proxy
- **Comportamentali** (interazione/responsabilità): Chain of Responsibility, Command, Iterator, Mediator, Memento, **Observer**, State, **Strategy**, Visitor, Interpreter, Template Method

*(In grassetto i 7 che il prof spiega in dettaglio — sono quelli più probabili all'orale.)*
**Idea chiave del corso:** ogni GoF si può "spiegare" coi GRASP. Es.: *Adapter = Indirection + Polymorphism che realizza Protected Variations*.

---

## GoF 1 — Adapter [Strutturale]

1. **PROBLEMA** — Come gestire **interfacce incompatibili**, o dare un'interfaccia **stabile** a componenti simili con interfacce diverse?
2. **SOLUZIONE** — Converti l'interfaccia di un componente in un'altra, tramite un **oggetto adattatore intermedio**.
3. **DISEGNO**
   ```
   Client ──> «interface» Target ◁── Adapter ──> Adaptee
                request()              request()    specificRequest()
   // Adapter.request(){ adaptee.specificRequest() }
   ```
4. **ESEMPIO (gestionale)** — `foneday-sync.ts` / `mobilesentrix-sync.ts`: le due API restituiscono JSON con strutture diverse; ogni adapter le converte nel **formato interno comune** (es. snapshot stock) che il gestionale capisce. Aggiungere un fornitore = nuovo adapter.
5. **TRADE-OFF / CORRELATI** — In GRASP: **Indirection + Polymorphism → Protected Variations**. Correlati: chi crea gli adapter? → **Factory**; spesso la Factory è **Singleton**.

---

## GoF 2 — Factory (Simple Factory / Concrete Factory) [Creazionale]

1. **PROBLEMA** — Chi crea oggetti quando c'è **logica di creazione complessa** o si vuole separare la responsabilità di creazione (per coesione)?
2. **SOLUZIONE** — Crea un oggetto **Pure Fabrication** chiamato *Factory* che gestisce la creazione (spesso restituendo un'**interfaccia**, così può tornare qualsiasi implementazione).
3. **DISEGNO**
   ```
   ServicesFactory
   getAdapter() : ISupplierAdapter   // data-driven: legge quale classe creare
   ```
4. **ESEMPIO (gestionale)** — Una funzione `getSupplierAdapter(name)` che, dato `'foneday'|'mobilesentrix'`, restituisce l'adapter giusto dietro un'interfaccia comune: centralizza la creazione e nasconde la scelta della classe. *(Esempio-obiettivo: oggi la scelta è sparsa, accentrarla in una factory sarebbe il refactoring "da manuale".)*
5. **TRADE-OFF / CORRELATI** — Pro: nasconde creazione complessa, separa gli interessi, abilita caching. Se la scelta è **data-driven** (da config) → realizza **Protected Variations**. Vi si accede spesso via **Singleton**.

---

## GoF 3 — Singleton [Creazionale]

1. **PROBLEMA** — È richiesta **esattamente una** istanza di una classe, con un **punto d'accesso globale**.
2. **SOLUZIONE** — Metodo **statico** `getInstance()` che restituisce l'unica istanza; **costruttore privato** (così nessun altro può fare `new`).
3. **DISEGNO**
   ```
   Singleton
   - instance : Singleton   (statico, sottolineato)
   - Singleton()            (costruttore privato)
   + getInstance() : Singleton  (statico)
   ```
   *(Domanda trabocchetto del prof: perché costruttore privato? → per impedire `new` esterni. Cosa c'è di errato nella versione "lazy" senza `synchronized`? → race condition in multithreading.)*
4. **ESEMPIO (gestionale)** — L'istanza `db` (client Drizzle in `src/lib/db`) è un **singleton di modulo**: importata ovunque, una sola connessione condivisa. In Node il modulo importato è già un singleton naturale.
5. **TRADE-OFF / CORRELATI** — Pro: accesso globale + inizializzazione pigra (meglio di variabili globali). Contro: la visibilità globale abusata **aumenta l'accoppiamento**; problematico in sistemi distribuiti (una istanza per VM). Usato per **Factory** e **Facade**.

---

## GoF 4 — Strategy [Comportamentale]

1. **PROBLEMA** — Come gestire un insieme di **algoritmi/politiche variabili ma correlati** (che risolvono lo stesso problema) e poterli cambiare?
2. **SOLUZIONE** — Definisci **ogni algoritmo in una classe separata** con un'**interfaccia comune**; il contesto ne tiene un riferimento e gli delega.
3. **DISEGNO**
   ```
   Sale ──pricingStrategy 1──> «interface» ISalePricingStrategy
                                    getTotal(Sale):Money
                                       ▲              ▲
                        PercentDiscount   AbsoluteDiscountOverThreshold
   // Sale.getTotal(){ return pricingStrategy.getTotal(this) }
   ```
4. **ESEMPIO (gestionale)** — Il **motore prezzi** (`use-pricing-engine.ts`) è il candidato naturale: le politiche "sconto 5% automatico", "margine minimo", "fee eBay 10%" sono esattamente gli *algoritmi correlati* di Strategy. Ogni politica = una strategy intercambiabile. *(È letteralmente l'esempio delle slide: sconto % vs sconto sopra-soglia.)*
5. **TRADE-OFF / CORRELATI** — Si basa su **Polymorphism**, fornisce **Protected Variations** sugli algoritmi. Le strategie sono spesso create da una **Factory**. Il contesto ha visibilità **per attributo** verso la sua strategy.

---

## GoF 5 — Composite [Strutturale]

1. **PROBLEMA** — Come trattare un **gruppo composto** di oggetti **e** un oggetto singolo (atomico) **nello stesso modo** (polimorficamente)?
2. **SOLUZIONE** — Definisci classi per oggetti **compositi** e **atomici** che implementano la **stessa interfaccia**. Il composito contiene una lista di figli e delega.
3. **DISEGNO**
   ```
   «interface» Component +execute()
        ▲                    ▲
      Leaf            Composite ◆──children*──> Component
                      +add() +execute(){ figli.execute() }
   ```
4. **ESEMPIO (gestionale)** — *Non ancora presente.* Esempio naturale dal dominio: un **"kit riparazione"** (es. LCD + biadesivo + viti) che a listino si comporta come **un singolo prodotto** ma è composto da più ricambi: `prezzo()` del kit = somma dei `prezzo()` dei componenti, trattando kit e ricambio singolo allo stesso modo. *(Anche le politiche prezzo multiple/conflittuali → `CompositePricingStrategy` che sceglie il totale migliore: Composite + Strategy.)*
5. **TRADE-OFF / CORRELATI** — Si basa su **Polymorphism**, dà **Protected Variations** al client (non sa se l'oggetto è atomico o composto). Usato con **Strategy** e **Command**.

---

## GoF 6 — Facade [Strutturale]

1. **PROBLEMA** — Serve un'interfaccia **unica e unificata** verso un sottosistema complesso (per evitare accoppiamento a molti oggetti interni o per isolare cambi d'implementazione).
2. **SOLUZIONE** — Definisci **un punto di contatto singolo** (l'oggetto facade) che copre il sottosistema e coordina i suoi componenti.
3. **DISEGNO**
   ```
   Client ──> Facade ──> (molte classi del sottosistema)
   ```
4. **ESEMPIO (gestionale)** — `actions.ts`: una server action è una **facciata** sul sottosistema "sync" — la UI chiama UN metodo, e dietro la facade coordina DB + orchestrator + adapter fornitori. Anche `sync-orchestrator` è una facade su eBay+Shopify+DB.
5. **TRADE-OFF / CORRELATI** — Dà **Protected Variations** dall'implementazione del sottosistema (aggiunge **Indirection**, sostiene Low Coupling). Vi si accede spesso via **Singleton**. Un **façade controller** è un tipo di Facade.

---

## GoF 7 — Observer (Publish-Subscribe) [Comportamentale]

1. **PROBLEMA** — Più oggetti **subscriber** sono interessati ai cambiamenti/eventi di un **publisher**; ognuno reagisce a modo suo e il publisher deve restare **debolmente accoppiato** ai subscriber.
2. **SOLUZIONE** — Definisci un'interfaccia **subscriber/listener**; i subscriber la implementano e si **registrano dinamicamente** sul publisher, che li **avvisa** quando si verifica un evento.
3. **DISEGNO**
   ```
   Publisher ◆──subscribers*──> «interface» Subscriber +update()
   +subscribe(s) +notifySubscribers(){ for s: s.update(this) }
            ▲
     ConcreteSubscriber +update()
   ```
4. **ESEMPIO (gestionale)** — Lo store dei **toast** (`use-toast.ts`): mantiene una lista di `listeners`, e `dispatch()` notifica tutti i componenti iscritti quando cambia lo stato → **textbook Observer**. (Concettualmente anche i trigger `syncListingsAffectedBySupplierSku` / `...ByInventoryItem` sono publish-subscribe: un evento "stock cambiato/vendita" → ricalcolo dei listing interessati.)
5. **TRADE-OFF / CORRELATI** — Si basa su **Polymorphism**, fornisce **Protected Variations** (il publisher conosce i subscriber solo via interfaccia). Accoppiamento debole + iscrizione/cancellazione dinamica.

---

# PARTE 3 — Risposte alle domande trabocchetto del prof

- **"Perché il costruttore del Singleton è privato?"** → per impedire che altri facciano `new` e creino istanze multiple; l'unico accesso è `getInstance()`.
- **"Cosa c'è di errato nel Singleton lazy senza `synchronized`?"** → in multithreading due thread possono entrare insieme nell'`if(instance==null)` e creare due istanze → serve `synchronized` (o init eager).
- **"Un Use-Case Controller che pattern GRASP è?"** → una **Pure Fabrication** (non è un concetto di dominio).
- **"Adapter coi GRASP?"** → Indirection + Polymorphism → Protected Variations.
- **"Differenza Strategy vs Adapter?"** → Strategy = algoritmi **intercambiabili** che risolvono lo stesso problema (scelgo io quale); Adapter = **converte** un'interfaccia esistente incompatibile (non scelgo l'algoritmo, traduco).
- **"Differenza Facade vs Adapter?"** → Facade = semplifica/unifica un **intero sottosistema** (interfaccia nuova e comoda); Adapter = adatta **un** componente a un'interfaccia attesa.
- **"Information Expert vs Low Coupling in conflitto?"** → es. salvare l'Ordine sul DB: Expert direbbe "l'Ordine", ma rovinerebbe coesione/accoppiamento → si preferisce **Pure Fabrication** (Repository).
- **"Modello di dominio: ci metto i metodi?"** → NO. Solo concetti, attributi, associazioni. I metodi nascono nella progettazione (diagrammi di interazione).
