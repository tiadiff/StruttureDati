# Visualizzatore di Strutture Dati in JavaScript

Questo progetto è uno strumento didattico interattivo progettato per visualizzare e comprendere il funzionamento interno delle principali strutture dati lineari: **Lista Unidirezionale**, **Lista Bidirezionale**, **Pila (Stack)** e **Coda (Queue)**.

L'applicazione mostra graficamente i nodi e i collegamenti (puntatori) e fornisce un log dettagliato degli algoritmi eseguiti passo dopo passo.

## 📂 Struttura del Progetto

Il codice è suddiviso in moduli per separare logicamente le diverse implementazioni:

*   **`index.html`**: L'interfaccia utente unificata (SPA) che gestisce la navigazione a schede (Tabs) e la visualizzazione grafica.
*   **`lista.js`**: Implementazione della **Lista Unidirezionale**.
*   **`lista_bidirezionale.js`**: Implementazione della **Lista Bidirezionale**.
*   **`strutture_derivate.js`**: Contiene le classi **Pila** e **Coda**, che agiscono come *wrapper* (involucri) attorno alle liste per imporre vincoli LIFO e FIFO.

---

## 1. Lista Unidirezionale (`Lista`)

La struttura di base. Ogni nodo contiene un dato e un riferimento al nodo successivo.

### Classe `Nodo`
```javascript
class Nodo {
    constructor(info) {
        this.info = info; // Il dato (es. numero o stringa)
        this.link = null; // Il PUNTATORE al prossimo nodo
    }
}
```

### Algoritmi Principali

#### Inserimento in Testa (`pushTesta`)
Inserisce un nuovo nodo all'inizio della lista. Complessità: **O(1)**.
1.  Si crea il nuovo nodo `n`.
2.  Si collega `n.link` all'attuale `head` (il nuovo nodo punta al vecchio primo).
3.  Si aggiorna `head` affinché punti a `n`.

#### Inserimento in Coda (`pushCoda`)
Inserisce un nuovo nodo alla fine. Complessità: **O(N)** (perché dobbiamo scorrere tutta la lista).
1.  Se la lista è vuota, `head = n`.
2.  Altrimenti, si scorre con un puntatore temporaneo `tmp` finché `tmp.link` non è `null` (ultimo nodo).
3.  Si collega l'ultimo nodo al nuovo: `tmp.link = n`.

#### Inserimento dopo un Nodo (`pushDopoNodo`)
Inserisce `n` tra un nodo `A` (target) e il suo successivo `B`.
1.  Si cerca il nodo target con un ciclo.
2.  **Gestione Puntatori**:
    *   `n.link = tmp.link` (Il nuovo nodo punta a B).
    *   `tmp.link = n` (Il nodo A punta al nuovo nodo).
    *   *Ordine critico*: Se facessimo il contrario, perderemmo il riferimento a B!

---

## 2. Lista Bidirezionale (`ListaBi`)

Ogni nodo ha **due** puntatori: uno al successivo (`next`) e uno al precedente (`prev`). Questo permette di scorrere la lista in entrambe le direzioni.

### Classe `NodoBi`
```javascript
class NodoBi {
    constructor(info) {
        this.info = info;
        this.prev = null; // Puntatore al nodo precedente
        this.next = null; // Puntatore al nodo successivo
    }
}
```

### Gestione dei Doppi Puntatori

#### Inserimento in Testa
1.  `n.next = head` (Il nuovo punta al vecchio primo).
2.  `head.prev = n` (Il vecchio primo punta indietro al nuovo). **Critico**: Va fatto solo se la lista non era vuota.
3.  `head = n`.

#### Rimozione (es. `popDopoNodo`)
Per rimuovere un nodo `X` che si trova tra `A` e `B`:
1.  `A.next = B` (A salta X e punta a B).
2.  `B.prev = A` (B punta indietro ad A, saltando X).
3.  Si rimuovono i collegamenti di X (`X.prev = null`, `X.next = null`) per pulizia.

---

## 3. Pila (Stack)

Struttura dati **LIFO** (*Last In, First Out* - Primo a Entrare, Ultimo a Uscire). Immagina una pila di piatti.

### Implementazione (`Pila` in `strutture_derivate.js`)
Abbiamo usato il pattern **Composition**: la classe `Pila` possiede internamente una istanza di `Lista`, ma espone solo i metodi permessi.

*   **PUSH**: Chiama internamente `lista.pushTesta()`. Inserisce sempre in cima.
*   **POP**: Chiama internamente `lista.popTesta()`. Rimuove sempre dalla cima.
*   **Accesso Limitato**: Non è possibile inserire/rimuovere nel mezzo o in coda.

---

## 4. Coda (Queue)

Struttura dati **FIFO** (*First In, First Out* - Primo a Entrare, Primo a Uscire). Come una fila alla cassa.

### Implementazione (`Coda` in `strutture_derivate.js`)
Anche qui usiamo un wrapper attorno a `Lista` o `ListaBi`.

*   **ENQUEUE** (Accoda): Chiama `lista.pushCoda()`. Il nuovo elemento va in fondo alla fila.
*   **DEQUEUE** (Servi): Chiama `lista.popTesta()`. L'elemento servito è quello che aspettava da più tempo (la testa).

---

## Guida all'Uso
1.  Apri il file **`index.html`** nel browser.
2.  Usa le **Tabs** in alto per cambiare struttura.
3.  Usa i campi **Valore** e **Target** per specificare i dati.
4.  Osserva il pannello **Visualizzazione** per vedere i nodi graficamente.
5.  Leggi la **Console Algoritmo** in basso per seguire passo-passo cosa fa il codice JavaScript (es. "Creo puntatore tmp", "Aggiorno link"). Ororo
