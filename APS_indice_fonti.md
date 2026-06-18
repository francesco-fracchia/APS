# APS — Indice delle fonti (confine del programma)

> Questo file definisce **esattamente** ciò che è nel programma, ricavato SOLO dai tre PDF:
> - **Appunti** = `Analisi_e_Progettazione_del_Software___Appunti_Completi.pdf` (Theofilia Jessica) — testo strutturato a capitoli
> - **Blue** = `Blue3141 - Teoria Orale.pdf` — note orali + tabelle GRASP/Refactoring + schemi GoF + banca domande
> - **Sofia** = `Sofia - Teoria Orale.pdf` — note orali più estese (con esempi Larman POS/Monopoly)
>
> NON usate: slide del corso, "Vale - Domande Orale.pdf", conoscenza generale. Tutto l'HTML nasce da qui.

---

## 1. Introduzione (Appunti cap.1; Blue "Introduzione"; Sofia inizio)
- Software: definizione, generico vs personalizzato; modi di produrre sw. (Appunti p.4 / Blue / Sofia)
- Caratteristiche buon sw: Mantenibilità, Affidabilità/Fidatezza, Efficienza, Accettabilità. (tutti e 3)
- **Tipi di applicazione** (8): stand-alone, interattive basate su transazioni, embedded, batch, intrattenimento, modellazione/simulazione, raccolta dati, sistemi di sistemi. → **SOLO Sofia**
- Ingegneria del software: definizione, disciplina ingegneristica, copre tutti gli aspetti. (tutti)
- Cause di fallimento progetto sw (complessità crescente, mancato uso metodi). (Sofia)
- Attività fondamentali di processo: Requisiti, Analisi, Progettazione, Implementazione, Validazione, Rilascio/installazione, Manutenzione/evoluzione, Gestione progetto. (tutti)
- Analisi = "fare la cosa giusta"; Progettazione = "fare la cosa bene"; AOO/POO. (tutti)
- Le 4 fasi di Analisi&Progettazione: Casi d'uso, Modello di dominio, Diagrammi di interazione, Diagrammi delle classi. (Appunti p.5)
- UML: linguaggio visuale (NON metodologia), standard de facto; struttura statica/dinamica; 3 livelli (abbozzo/progetto/linguaggio); 2 punti di vista (concettuale/software); classe concettuale vs classe software. (tutti)

## 2. Processi software (Appunti 1.3-1.6; Blue "Processi software"; Sofia)
- Processo software: chi/cosa/quando/come; artefatti, ruoli, pre/post-condizioni. (tutti)
- Processi basati sul piano (cascata) vs agili. (tutti)
- Modello a Cascata: fasi sequenziali, fallimenti, quando usarlo, statistica 25%/35% cambi requisiti. (tutti)
- Sviluppo Iterativo, Incrementale ed Evolutivo: timeboxed 2-6 settimane, feedback+adattamento, vantaggi/svantaggi, guidato dal rischio/cliente, requisiti bloccati durante iterazione. (tutti)
- Integrazione e configurazione / riuso (COTS): vantaggi/svantaggi. (Appunti / Sofia)
- **UP (Unified Process)**: iterativo, pilotato dai casi d'uso e dal rischio, incentrato sull'architettura; 4 fasi (Ideazione, Elaborazione, Costruzione, Transizione); fase ≠ disciplina; iterazione = mini-progetto; Release, Incremento; tutto opzionale tranne codice; scenario di sviluppo. (tutti)
- Cattive pratiche di UP / "non hai capito UP se...". (Blue, Sofia)
- Metodo Agile + Agile Modeling: valori e pratiche; modellare per comprendere non documentare. (tutti)
- UP agile. (tutti)
- Scrum: sprint 2-4 sett, backlog, velocity, ruoli (ScrumMaster, Team≤7, Product Owner), incremento potenzialmente rilasciabile, Daily Scrum. (tutti, tabella)

## 3. UP nel dettaglio + Ideazione + Requisiti (Blue, Sofia, Appunti cap.2)
- Tabella UP fasi×discipline×elaborati (i/r = iniziato/raffinato). (Blue, Sofia)
- Ideazione: scopo (visione, fattibilità, ~10% requisiti), iterazione 0 niente sw eseguibile, elaborati iniziati, errori comuni. (tutti)
- Requisito: definizione; 34% fallimenti dovuti ai requisiti; funzionali vs non funzionali; completi/coerenti. (tutti)
- Obiettivi vs requisiti non funzionali verificabili; metriche. (Sofia, Blue)
- **FURPS+**: Functionality, Usability, Reliability, Performance, Supportability(+). → **SOLO Sofia**
- Linee guida scrittura requisiti (DEVE/DOVREBBE, niente gergo, razionale). (tutti)
- Regole di business. (Sofia)
- Elaborati requisiti UP: Modello dei casi d'uso, Specifiche supplementari, Glossario, Visione. (tutti)

## 4. Casi d'uso (tutti)
- Definizione: storie scritte, dialoghi attore-sistema, requisiti funzionali, NON OO, NON diagrammi.
- Attori: primario, finale, di supporto, fuori scena; SuD.
- Scenario (istanza), tipi di passi (Sofia: interazione/cambio stato/validazione), caso d'uso = collezione scenari.
- Modello dei casi d'uso = testi + (opz) diagramma + SSD + contratti.
- Formati: breve, informale, dettagliato; livelli: obiettivo utente, sotto-funzione, sommario.
- Template caso d'uso dettagliato (Nome, Portata, Livello, Attore primario, Parti interessate, Pre-condizioni, Garanzia di successo, Scenario principale di successo, Estensioni, Requisiti speciali, Elenco varianti tecnologiche/dati, Frequenza, Varie). (Blue, Sofia)
- Stile essenziale vs concreto; scatola nera; soggetto-verbo-oggetto.
- Come trovarli (4 passi: confine, attori primari, obiettivi, definire UC); analisi degli eventi; CRUD→"Gestisci X".
- 3 test: Test del capo, Test EBP, Test della dimensione; violazioni ragionevoli.
- Diagramma dei casi d'uso: associazioni, relazioni **Include / Extend / Generalizzazione** (tra UC e tra attori).
- Punti di forza dei casi d'uso; UP guidato dai casi d'uso.

## 5. Analisi OO + Modello di Dominio (Appunti cap.3; Sofia; Blue)
- Elaborazione: scopo, 2+ iterazioni, best practice; organizzazione requisiti per Rischio/Copertura/Criticità; votazione.
- Modello di dominio: modello più importante OOA, classi concettuali (non sw), "dizionario visuale", NON oggetti software, vs modello dei dati.
- Classe concettuale: simbolo, intensione, estensione.
- Strategie per trovare classi concettuali (3): riusare modelli, elenco categorie comuni (tabella Sofia), nomi/locuzioni nominali.
- Classi descrizione (ProductDescription). (Blue, Sofia)
- Associazioni: relazione semantica, collegamenti (istanze), tabella associazioni comuni (POS/Monopoly/Airport). (Blue, Sofia)
- Attributi: proprietà elementare, sintassi UML, tipi primitivi, attributi derivati (/), no chiavi esterne, tipi di dato.
- Aggregazione vs Composizione (rombo vuoto/pieno; intero-parte; esempi Computer-Stampante, Mouse-Pulsante, Board-Square).
- Molteplicità, ruoli, navigabilità; associazioni riflessive simmetriche/asimmetriche.
- Diagramma degli oggetti (livello estensionale). (Blue extra, Sofia)
- Basso salto rappresentazionale (LRG).

## 6. SSD e Contratti (Appunti 3.2; Sofia; Blue)
- SSD: eventi input/output, sistema a scatola nera, attori esterni, eventi di sistema, operazioni di sistema; 3 tipi di eventi a cui reagisce un sistema; linee guida (verbo, livello astratto, parametri semplici, risposte come dati).
- Operazione di sistema vs evento di sistema; interfaccia di sistema pubblica.
- Contratti: pre-condizioni e post-condizioni; struttura (Operazione, Riferimenti, Pre, Post); post-condizioni = la sezione più importante, 3 categorie (creazione/cancellazione istanza, modifica attributo, formazione/rottura collegamento), al passato/passivo; analogia palcoscenico/foto.
- Punto di vista della conoscenza; OCL; operazione vs metodo; quando i contratti servono.

## 7. Architettura Logica (Appunti 4.1-4.2; Sofia; Blue)
- Da analisi a progettazione; architettura software (definizione); architettura a N+1 / 6 viste (Blue extra).
- Architettura logica: organizzazione classi sw in package/strati; "logica" perché no deployment.
- Architettura a strati: strato = gruppo coeso; strati alti usano servizi dei bassi; stretta vs rilassata.
- Strati tipici: UI/Presentazione, Logica applicativa/Dominio, Servizi tecnici (Sofia tabella estesa: UI, Application, Domain, Business Infrastructure, Technical Services, Foundation).
- Strato dominio/application; oggetto di dominio.
- Vantaggi degli strati; responsabilità coese.
- Principio di separazione Modello-Vista (e rilassamento via Observer).
- Tier/Layer/Partition; diagramma dei package UML (namespace, dipendenze, java::util::Date).

## 8. Progettare a oggetti + Diagrammi di interazione (Appunti 4.3; Sofia; Blue)
- 3 modi di progettare (codifica / disegno poi codifica / solo disegno); Agile Modeling; tempo per UML; reverse-engineering.
- Modelli statici vs dinamici (in parallelo).
- Schede CRC (Class, Responsibility, Collaboration).
- Diagrammi di interazione: 4 tipi (Sequenza, Comunicazione, Interazione generale, Temporizzazione); interazione, messaggio trovato, partecipanti.
- Sequenza vs Comunicazione: punti di forza/debolezza (tabella Sofia).
- Notazione SD: linea di vita, barra di attivazione, messaggi sincroni (punta piena)/asincroni (punta vuota), create/destroy, auto-delega, ritorno, messaggio a self, formazione collegamento (a molti/a uno).
- Sintassi messaggio: `return = message(par:tipo):tipoRitorno`.
- Frammenti combinati / frame: opt, alt, loop, break, ref, par, seq, strict, neg, critical; idiomi di loop.
- Notazione CD: collegamento, numerazione sequenza annidata, messaggi condizionali (lettere a/b), iterazione (*).
- Note UML, oggetto Singleton "1", oggetti attivi.

## 9. Diagrammi delle Classi (DCD) (Appunti 4.4; Sofia; Blue)
- Classe: rettangolo 3 sezioni; oggetto (identità/stato/comportamento), incapsulamento.
- Visibilità: + pubblica, - privata, # protetta, ~ package; default privata.
- Attributi: sintassi, molteplicità, multivalore, valore iniziale.
- Operazioni: sintassi `visibility name(par):return {property}`; metodo = implementazione; create=costruttore; get/set spesso esclusi; operazione polimorfica/astratta.
- Associazioni: nome/ruoli/navigabilità/molteplicità; n-aria; classe associazione (reificata); attributi di associazione; proprietà {ordered}{unordered}{unique}{nonunique}.
- Generalizzazione (is-a), ereditarietà, vincoli {disjoint}{overlapping}{complete}{incomplete} (default overlapping,incomplete).
- Specializzazione (attributo/associazione {subsets}/operazioni); classe astratta {abstract}, {leaf}.
- Dipendenza (linea tratteggiata): tipi; <<call>>, <<create>>.
- Interfacce: definizione, realizzazione, notazione lollipop (fornita)/socket (richiesta), connettore di assemblaggio; come individuarle; interfaccia vs ereditarietà.
- Profili: stereotipi, tagged values/tag, vincoli; parole chiave (<<actor>>, <<interface>>, {abstract}, {ordered}).
- Template di classe; ereditarietà multipla→delegazione.
- Da DCD/diagrammi interazione a codice.

## 10. Macchine a Stati (Appunti cap.5; Blue; Sofia)
- Modellano comportamento dinamico di classificatori; oggetti indipendenti/dipendenti dallo stato; 2 usi (oggetto reattivo / protocollo).
- Stati (azioni ingresso/uscita, attività interne, transizioni interne); azioni (istantanee) vs attività (interrompibili).
- Transizioni, guardie, eventi.
- Eventi: di chiamata, di segnale, di variazione, temporale (dopo/quando).
- Pseudostati: giunzione, selezione (diamante), ingresso, uscita, memoria semplice (H), memoria multilivello (H*), finale stato composito (croce).
- Stati compositi: semplici (1 regione) / ortogonali (più regioni); uscita sincrona/asincrona; comunicazione via flag o stati di sync.
- Stati della sotto-macchina; fork/join.
- In UP nessun modello dedicato.

## 11. Diagrammi di Attività (Appunti 5.2; Blue; Sofia)
- "Diagrammi di flusso OO"; reti di nodi e archi; associati a casi d'uso/classi/operazioni/processi.
- 3 categorie nodi (azione, controllo, oggetto); 2 categorie archi (flussi controllo/oggetti).
- Token game: token, AND logico in ingresso, fork implicita in uscita.
- Nodi controllo: iniziale, finale attività, finale flusso, decisione, fusione, biforcazione, ricongiunzione.
- Nodi oggetto: pile/code, FIFO/LIFO/selezione; Pin; partizioni (swimlane).
- DFD (Data Flow Diagram, stessa notazione). (Blue)

## 12. GRASP (Appunti cap.6; Blue tabella; Sofia dettagliata)
- RDD (Responsibility-Driven Design): responsabilità di fare / di conoscere; flusso RDD (3 passi); responsabilità ≠ metodo; pattern = coppia problema/soluzione con nome.
- **I 9 pattern GRASP** (NON di più):
  1. **Creator** — chi crea A; condizioni B contiene/aggrega/registra/usa/ha dati di A. Es: Sale crea SalesLineItem; Board crea Square.
  2. **Information Expert** — assegna a chi ha le informazioni. Es: Sale calcola il totale; Board conosce le Square.
  3. **Low Coupling** — minimizzare accoppiamento; forme di accoppiamento; es. Register setPayment a Sale.
  4. **Controller** — primo oggetto oltre la UI; facade controller / use-case controller; controller gonfi. Es: Register.
  5. **High Cohesion** — responsabilità correlate; 4 livelli (molto bassa/bassa/moderata/alta).
  6. **Pure Fabrication** — classe artificiale coesa (non di dominio).
  7. **Polymorphism** — comportamenti per tipo con operazioni polimorfe.
  8. **Indirection** — oggetto intermediario.
  9. **Protected Variations** — interfaccia stabile attorno ai punti di variazione.
- Realizzazione di caso d'uso; linea guida progettazione (4 passi); caso d'uso d'avviamento (startUp). (Sofia)

## 13. Design Pattern GoF (Appunti cap.7; Blue schemi; Sofia dettagliata)
- GoF = 23 pattern classici (Gamma, Helm, Johnson, Vlissides), 3 categorie: Creazionali, Strutturali, Comportamentali; raggio d'azione classi/oggetti.
- Tabella di classificazione completa dei 23 nomi → presente in Sofia (solo come riferimento di categoria).
- **PATTERN EFFETTIVAMENTE TRATTATI = 7 (NON 23)**: Adapter, Factory, Singleton, Strategy, Composite, Facade, Observer.
  - **Adapter** (strutturale): interfacce incompatibili; Adapter classe (ereditarietà) / Adapter oggetto (composizione); es. SAPAccountingAdapter; correlazioni GRASP (PV/Indirection/Polymorphism).
  - **Factory** (creazionale): Pure Fabrication che crea; ServicesFactory; spesso Singleton; metodi ritornano interfacce; data-driven (PV).
  - **Singleton** (creazionale): 1 istanza, getInstance() statico, costruttore privato, attributo statico instance; lazy/non-lazy (codice in Blue); synchronized; problema distribuito; notazione "1".
  - **Strategy** (comportamentale): algoritmi intercambiabili; Context + Strategy interface + ConcreteStrategies + Client; es. ISalePricingStrategy/PercentDiscount...; usa Polymorphism, fornisce PV.
  - **Composite** (strutturale): trattare composto e atomico uniformemente; Component interface + Leaf + Composite(lista di Component); es. CompositeBestForCustomerPricingStrategy.
  - **Facade** (strutturale): punto d'accesso unico a sottosistema; es. POSRuleEngineFacade; spesso Singleton; fornisce PV + Indirection.
  - **Observer** (comportamentale): publisher/subscriber, interfaccia listener (PropertyListener.onPropertyEvent), registrazione dinamica; es. Sale/SaleFrame1; rispetta Modello-Vista, usa Polymorphism, fornisce PV.

## 14. Visibilità + TDD + Refactoring (Appunti cap.8; Blue; Sofia)
- Visibilità: capacità di un oggetto di vedere/riferire un altro; **4 modi**: per attributo (permanente), per parametro (temporanea), locale (temporanea), globale (permanente, Singleton in Java); trasformazioni tra forme.
- Implementazione: da DCD/diagrammi a codice; partire dalla classe meno accoppiata; dichiarare variabili come interfacce.
- TDD: tecnica agile (XP), ciclo (test che fallisce → codice minimo → refactor); vantaggi; tipi di test (unità, integrazione, sistema, accettazione); schema test unitario (Preparazione/Esecuzione/Verifica/Rilascio = fixture); xUnit/JUnit; ciclo base/doppio.
- Refactoring: ristrutturare senza cambiare comportamento esterno; piccoli passi + test; quando (Regola del Tre, nuova funzionalità, bug, code review); NON corregge bug; processo di trasformazione.
- **Code Smell — 10 trattati** (Blue), 5 categorie: Bloaters (Long Method, Large Class, Long Parameter List), OO Abusers (Switch Statement, Refused Bequest), Change Preventers (Shotgun Surgery), Dispensables (Duplicated Code, Data Class, Comments), Couplers (Feature Envy). Per ciascuno: sintomo/problema/refactoring.
- **Refactoring (tecniche)** con esempi prima/dopo (Blue): Extract Variable, Extract Method, Extract Class, Extract Subclass, Extract Superclass, Inline Class, Move Method, Move Field, Rename Method, Preserve Whole Object, Replace Temp with Query, Replace Method with Method Object, Replace Parameter with Method Call, Replace Conditional with Polymorphism, Replace Inheritance with Delegation, Decompose Conditional, Introduce Parameter Object, Introduce Assertion.

## 15. Collegamenti tra elaborati (Appunti fig. relazioni; Sofia tabelle "influenza"; Blue)
- Casi d'uso → SSD → Contratti → diagrammi di interazione → DCD → codice.
- Modello di dominio → ispira nomi classi sw (LRG), → contratti (post-condizioni), → glossario, → modello di progetto.
- SSD: messaggi = operazioni di sistema = messaggi iniziali (al controller) dei diagrammi di interazione.
- Diagrammi di interazione (dinamico) ↔ DCD (statico) in parallelo: messaggi→operazioni, classi→classi sw.
- Architettura: SSD operazioni catturate da UI → delegate a strato dominio (Controller).
- GRASP ↔ GoF (GoF = specializzazioni di principi GRASP); Adapter=Indirection+PureFabrication+Polymorphism; Strategy/Composite/Observer/Facade basati su Polymorphism e forniscono Protected Variations.
- Composizione → aiuta Creator; Observer → rilassa Modello-Vista; contratti → guidano realizzazione casi d'uso.

## 16. Banca domande d'orale (Blue "DOMANDE DI TEORIA")
Lista completa di domande tipiche già presente in Blue (Introducimi…, Cosa sono…, Spiegami il documento…, Spiegami…, Quali tipi…, Spiegami e disegna il pattern GoF, Spiegami un GRASP, code smell, Che relazione/differenza c'è fra…, V/F). → usata per le sezioni Interrogazione e Quiz.

---

## COSA **NON** C'È nel programma (da NON aggiungere)
- **NON** i 23 GoF: solo 7 trattati (Adapter, Factory, Singleton, Strategy, Composite, Facade, Observer). I nomi degli altri compaiono solo nella tabella di classificazione (Sofia) come categoria, **senza** trattazione/schema → niente flashcard/quiz/UML su di essi.
- **NON** principi SOLID come argomento a sé (SRP/ISP/DIP citati solo come "pattern correlati" en passant nelle tabelle GRASP, non trattati).
- **NON** diagrammi UML extra non trattati: niente diagramma dei componenti, niente diagramma di deployment come argomento autonomo (il deployment è citato solo come "architettura di rilascio"/tier), niente diagramma di temporizzazione/interazione generale oltre la semplice menzione.
- **NON** dettagli di Extreme Programming oltre la citazione; **NON** altri metodi agili oltre Scrum.
- **NON** OCL in dettaglio (solo citato come linguaggio formale per i vincoli).
- **NON** Abstract Factory / Factory Method come pattern trattati a sé (Abstract Factory citato solo come "alternativa" in Creator).

## DA VERIFICARE A MANO (rete di protezione)
- **Figure/diagrammi originali**: l'estrazione testuale dei PDF NON include le immagini. Gli SVG dei pattern GoF e gli esempi UML nell'HTML sono **ricostruiti fedelmente dalle descrizioni testuali di participants/collaborazioni presenti in Blue e Sofia** (es. Context/Strategy/ConcreteStrategy; Component/Leaf/Composite; Subject/PropertyListener; Target/Adapter/Adaptee). Confrontare con le figure dei PDF/slide se serve la disposizione grafica esatta.
- **Adapter classe vs oggetto**: i materiali distinguono le due varianti (ereditarietà vs composizione) ma la figura precisa non è nel testo estratto → l'SVG segue la descrizione standard coerente con il testo; verificare il disegno esatto sugli appunti.
- **Diagramma degli elaborati di UP** (Blue p.12) e varie figure di esempio (Creator/Expert/Controller del POS): descritte a parole, rese come schemi sintetici; verificare i dettagli grafici sugli appunti.
