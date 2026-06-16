# Banco domande orale APS — (da Vale + Sofia + slide del prof)

> **Formato del prof**: all'orale chiede soprattutto **"Introducimi X"** / "Spiegami X" / "Differenza tra X e Y", e per i pattern usa la loro **domanda-Problema** ("Come gestire…?").
>
> **Come allenarsi con questo file (richiamo attivo, NON rilettura):**
> 1. Leggi **solo la domanda** (copri i punti).
> 2. **Rispondi a voce** come davanti al prof (per i pattern: Problema→Soluzione→Disegno→Esempio→Trade-off; per i diagrammi: disegna a mano).
> 3. Scopri i **punti-chiave** e segna cosa hai saltato.
> 4. Se un punto non ti è chiaro → vai alla sezione corrispondente in `00_Guida_Studio_APS` o `GRASP_GoF_Manuale_Completo`.
> 5. Ripeti a ripetizione spaziata (oggi → +1g → +3g → +7g).

---

## 1 — Processi software e UP

**Introducimi i processi software**
- Approccio disciplinato a costruzione/rilascio/manutenzione del sw; definisce **chi (ruoli), cosa (attività), quando (organizzazione temporale), come (metodologie)**.
- Attività comuni: **Requisiti · Progettazione · Implementazione · Validazione · Rilascio · Manutenzione · Gestione progetto**.
- Tipi visti: **cascata · iterativo-incrementale-evolutivo · UP · agile · Scrum**.

**Introducimi il modello a cascata**
- Fasi **sequenziali**: requisiti→progettazione→implementazione/test→integrazione→manutenzione.
- **Fallisce spesso**: non flessibile ai cambiamenti; serve requisiti **stabili**. Adatto solo a requisiti ben noti / grandi progetti multi-sito.

**Introducimi lo sviluppo iterativo, incrementale ed evolutivo**
- Più **iterazioni timeboxed** (2-6 settimane), ognuna fa **tutte** le attività e produce una **release**.
- In ritardo: si **riduce il lavoro**, NON si allunga l'iterazione.
- Vantaggi: flessibilità · **rischi maggiori ridotti presto** (nucleo architettura stabile) · feedback utente precoce · gestione complessità · progresso visibile.
- **Iterativo** = a cicli; **incrementale** = il sistema cresce a pezzi (incremento = differenza tra due release); **evolutivo** = requisiti/progetto si raffinano col feedback.

**Introducimi UP**
- Processo **iterativo, incrementale, evolutivo** per sviluppo OO; flessibile/aperto.
- **Pilotato dai casi d'uso (e dai rischi)**, **incentrato sull'architettura**.
- Pratiche: verifica continua della qualità (test presto/spesso) · coinvolgere l'utente · UML come modellazione visuale.
- **4 fasi**: **Ideazione → Elaborazione → Costruzione → Transizione**.
- ⚠️ Trappola: **NON** dire "ideazione=requisiti, elaborazione=progettazione, costruzione=implementazione" (ogni iterazione fa tutto, cambia l'enfasi).

**Introducimi le fasi di UP / l'Ideazione / l'Elaborazione**
- **Ideazione**: 1 sola iterazione ("iterazione zero"), visione + studio economico + fattibilità; ~10% requisiti; stime approssimative; niente eseguibile. Elaborati: **Visione, Modello dei Casi d'Uso, Specifiche Supplementari, Glossario** (avviati).
- **Elaborazione**: realizza e **testa il nucleo dell'architettura**; stabilizza ~80% requisiti; più iterazioni guidate dal rischio. Elaborati: **Modello di Dominio, Modello di Progetto, Documento Architettura, Modello dei Dati**.
- **Costruzione**: implementazione del resto (più facile, meno rischio). **Transizione**: beta-test, rilascio.

**Introducimi il metodo agile / Scrum**
- **Agile**: forma di sviluppo iterativo per risposta rapida al cambiamento (iterazioni brevi timeboxed, consegne incrementali, valori "agili", UML solo dove serve, TDD, pair programming). UP può essere applicato **in modo agile**.
- **Scrum**: metodo agile di gestione del lavoro. **Sprint** 2-4 settimane · **product/sprint backlog** · daily **scrum** · **velocity**. Ruoli: **ScrumMaster** (garantisce il processo) e **Product Owner** (gestisce il backlog/requisiti).

---

## 2 — Analisi, requisiti, progettazione OO

**Introducimi l'analisi OO**
- Enfatizza l'**investigazione del problema** ("fare la cosa giusta"): identificare i **concetti reali** del dominio (es. Volo, Pilota).

**Introducimi la progettazione OO**
- Enfatizza la **soluzione** ("fare la cosa bene"): definire **oggetti software** che collaborano (con attributi e metodi).
- **Input**: testo casi d'uso, modello di dominio, SSD, contratti, glossario, specifiche supplementari. **Output**: diagrammi UML di interazione/classi/package, prototipi UI, modelli di dati.

**Requisiti funzionali vs non funzionali** *(FURPS+)*
- **Funzionali** = cosa fa il sistema (registrati nei casi d'uso). **Non funzionali** = qualità (usabilità, affidabilità, prestazioni, sicurezza…), nelle **Specifiche Supplementari**.

---

## 3 — Casi d'uso

**Introducimi i casi d'uso**
- **Storie scritte** (testo, NON diagrammi; NON elaborati OO) di un attore che usa il sistema per un obiettivo. Registrano i **requisiti funzionali**.

**Differenza tra attore, scenario e caso d'uso**
- **Attore** = entità con comportamento (primario/finale/di supporto/fuori scena). **Scenario** = una sequenza specifica (istanza). **Caso d'uso** = collezione di scenari correlati (successo+fallimento).

**Quali formati / come si scrive un caso d'uso**
- Formati: **breve · informale · dettagliato**. Stile **essenziale** (ignora la UI), **a scatola nera** (cosa, non come), conciso (soggetto+verbo).
- Sezioni del dettagliato: Nome (verbo), Portata, Livello, Attore primario, Parti interessate, **Pre-condizioni**, **Garanzia di successo**, **Scenario principale**, **Estensioni**, requisiti speciali…

**I 3 test di validità di un caso d'uso**
- **Test del capo** (valore misurabile) · **Test EBP** (processo elementare in una sessione) · **Test della dimensione** (non un singolo passo).

**Relazioni tra casi d'uso**
- **«include»** (passi comuni sempre eseguiti) · **«extend»** (variante opzionale a un extension point, se condizione vera) · **generalizzazione** (figlio eredita dal genitore; anche tra attori).

---

## 4 — Modello di dominio

**Introducimi il modello di dominio**
- Rappresentazione visiva (class diagram **senza metodi**) dei **concetti del mondo reale**: classi concettuali, **attributi**, **associazioni** con molteplicità. Vocabolario condiviso.
- **NON contiene**: metodi, tipi primitivi, classi software/tecniche.

**Relazione tra modello di dominio e strato del dominio**
- Il modello di dominio (analisi) **ispira nomi e definizioni** delle classi software dello **strato del dominio** (progettazione) → riduce il "salto rappresentazionale".

---

## 5 — SSD e Contratti

**Introducimi i diagrammi di sequenza di sistema (SSD)**
- Per uno scenario di un caso d'uso, mostrano gli **eventi di sistema** dall'attore al **sistema a scatola nera** (un solo oggetto `:System`). Descrivono il *cosa*.

**Differenza tra evento e operazione di sistema**
- **Evento di sistema** = input esterno dall'attore. **Operazione di sistema** = l'operazione (pubblica) che il sistema esegue per gestire quell'evento. L'insieme delle operazioni = **interfaccia del sistema**.

**Introducimi i contratti delle operazioni**
- Descrivono un'operazione con **pre-condizioni** e **post-condizioni** (cambiamenti di stato nel modello di dominio dopo l'operazione).
- Post-condizioni = **al passato**, 3 categorie: **creazione/cancellazione oggetto · modifica attributo · formazione/rottura collegamento**. (Metafora: foto del palcoscenico prima/dopo.)

**Come sono collegati i diagrammi di sequenza con gli strati** *(domanda già ricevuta!)*
- Le **operazioni di sistema dell'SSD** sono i **messaggi che lo strato UI manda allo strato del Dominio**. La scatola nera `:System` si "apre" sugli strati. Il primo oggetto del dominio che riceve = il **Controller**.

---

## 6 — Architettura logica e strati

**Introducimi l'architettura logica / a strati**
- Organizzazione su larga scala in **strati**: **Presentazione (UI) → Dominio (logica applicativa) → Servizi tecnici**. Gli strati alti usano i bassi (non viceversa).
- **Separazione Modello-Vista**: la UI non fa logica, **delega** al dominio (eccezione: **Observer**).

---

## 7 — Diagrammi di interazione

**Quali sono e differenza sequenza vs comunicazione**
- Due tipi: **sequenza** (tempo alto→basso, a steccato) e **comunicazione** (a grafo, con numeri di sequenza). Mostrano la **visione dinamica**.

**Cos'è il messaggio trovato / la barra di attivazione / i frame**
- **Messaggio trovato** = primo messaggio, cerchio pieno, mittente non noto. **Barra di attivazione** = operazione in esecuzione. **Frame**: `opt, alt, loop, ref, par, neg, critical`.

---

## 8 — Diagramma delle classi

**Quando usare un attributo e quando un'associazione**
- Associazione se la classe destinazione è importante; attributo (testuale) se è un tipo primitivo/dettaglio.

**Differenza tra composizione e associazione/aggregazione**
- **Aggregazione** = "intero-parte" debole. **Composizione** = forte: la parte appartiene a **un solo** intero e l'intero la **crea/distrugge** → suggerisce il **Creator** (GRASP).

**Interfaccia vs ereditarietà · navigabilità · molteplicità**
- **Interfaccia** = contratto (più implementazioni); **ereditarietà** = riuso implementazione. **Navigabilità** = da chi raggiungo chi. **Molteplicità** = quanti oggetti partecipano.

---

## 9 — Macchine a stati (+ attività)

**Introducimi le macchine a stati**
- Modellano il **comportamento dinamico** (ciclo di vita) di un oggetto **stato-dipendente** che risponde a **eventi**. Usi: oggetto reattivo complesso · sequenze valide di operazioni.
- Elementi: **stato, transizione, evento** (chiamata/segnale/variazione/temporale), stato iniziale/finale, guardie. **Azione** (istantanea) vs **attività** (durata).

**Diagrammi di attività**
- "Flusso OO": nodi **azione/controllo/oggetto**, **token**, **fork/join** (parallelismo), **decision/merge**, **partizioni (swimlane)**.

---

## 10 — GRASP

**Introducimi i pattern GRASP** *(+ saperli elencare)*
- *General Responsibility Assignment Software Patterns*: 9 principi per **assegnare responsabilità**.
- Base: **Information Expert · Creator · Low Coupling · High Cohesion · Controller**. Avanzati: **Polymorphism · Pure Fabrication · Indirection · Protected Variations**.

**Domanda-Problema di ciascuno** (rispondi con Soluzione + esempio gestionale):
- *Principio per assegnare responsabilità?* → **Information Expert** (a chi ha i dati).
- *Chi crea un oggetto A?* → **Creator** (chi lo contiene/aggrega/usa/inizializza).
- *Come ridurre dipendenze/impatto dei cambiamenti?* → **Low Coupling**.
- *Come tenere gli oggetti focalizzati?* → **High Cohesion**.
- *Primo oggetto oltre la UI che gestisce un'operazione di sistema?* → **Controller**.
- *Come gestire alternative basate sul tipo?* → **Polymorphism**.
- *Responsabilità che non sta bene su una classe di dominio?* → **Pure Fabrication**.
- *Come evitare accoppiamento diretto?* → **Indirection**.
- *Come proteggere dalle variazioni?* → **Protected Variations**.

*(Dettaglio completo + schemi in `GRASP_GoF_Manuale_Completo`.)*

---

## 11 — Design pattern GoF

**Introducimi i design pattern GoF**
- 23 soluzioni a problemi ricorrenti, classificati per scopo: **creazionali / strutturali / comportamentali**. Differenza dai GRASP: i GoF mostrano anche lo **schema** (struttura) e discutono compromessi.

**Domanda-Problema dei 7 spiegati dal prof** (rispondi con Soluzione + schema + esempio):
- *Come gestire interfacce incompatibili?* → **Adapter** (oggetto adattatore che traduce).
- *Chi crea oggetti con logica di creazione complessa / per separare la creazione?* → **Factory** (Pure Fabrication).
- *Una sola istanza con accesso globale?* → **Singleton** (getInstance statico + costruttore privato).
- *Come gestire algoritmi/politiche variabili ma correlati e poterli cambiare?* → **Strategy**.
- *Come trattare un gruppo composto e un oggetto singolo allo stesso modo?* → **Composite**.
- *Interfaccia unica verso un sottosistema complesso?* → **Facade**.
- *Notificare più oggetti interessati ai cambiamenti, con basso accoppiamento?* → **Observer**.

**Differenze frequenti**: Strategy vs Adapter · Facade vs Adapter · Composite vs Decorator · (vedi PARTE D del Manuale).

---

## 12 — Refactoring e TDD

**Introducimi il TDD**
- Il **test si scrive prima** del codice. Ritmo **red → green → refactor**. Vantaggi: i test si scrivono davvero, **fiducia nei cambiamenti**, documentazione, verifica automatica. Tipi: unità/integrazione/end-to-end/accettazione.

**Come si applica il refactoring**
- Ristrutturare il codice **senza cambiare il comportamento esterno**, a **piccoli passi**, **rieseguendo i test** dopo ognuno. Obiettivi: rimuovere duplicazione, chiarezza, accorciare metodi. I test (TDD) rendono il refactoring **sicuro**. Necessario nello sviluppo iterativo (la struttura degrada senza).

---

## 13 — Le tue 2 "trappole" (domande su cui sei già caduto)
- **"Quali cose di UP abbiamo applicato/creato nel corso?"** → elenca gli **elaborati** per disciplina (Modello di dominio; Casi d'uso/SSD/Contratti; Visione/Spec.Suppl./Glossario; Modello di progetto con GRASP/GoF). Vedi Sezione 6/Domanda A della Guida.
- **"Come sono collegati i diagrammi di sequenza con gli strati?"** → operazioni di sistema dell'SSD = messaggi UI→Dominio; il Controller li riceve. Vedi Sezione 6/Domanda B della Guida.

---

*Fonti: "Vale - Domande Orale", "Sofia - Teoria Orale", slide del prof Riganelli. Risposte estese: `00_Guida_Studio_APS` e `GRASP_GoF_Manuale_Completo`.*
