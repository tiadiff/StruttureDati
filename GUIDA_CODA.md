# 📗 Guida Completa: La Coda (Queue)

Guida unificata: Teoria FIFO, Varianti (Circolare, Deque) e Troubleshooting.

---

## 1. Il Concetto FIFO
**Queue** = First In, First Out (Primo dentro, Primo fuori).
Come una fila alla cassa: chi arriva prima, esce prima.

### Operazioni
1.  **ENQUEUE**: Aggiunge in fondo (Coda).
2.  **DEQUEUE**: Rimuove dal fronte (Testa).
3.  **FRONT**: Legge il primo.

---

## 2. Implementazione e Performance
Noi usiamo una Lista Unidirezionale.
*   **Decoda (Dequeue)**: `popTesta()`. Costo **O(1)**. Basta spostare `head`.
*   **Accoda (Enqueue)**: `pushCoda()`.
    *   Senza puntatore `tail`: Costo **O(N)** (devo scorrere tutto).
    *   Con puntatore `tail`: Costo **O(1)** (accedo subito alla fine).
    *   *Nota*: La nostra implementazione didattica usa O(N) per mostrare l'algoritmo di scorrimento, ma in produzione si usa sempre `tail`.

---

## 3. Varianti Avanzate (Masterclass)

### Coda Circolare (Ring Buffer)
Implementata su Array fisso. Quando arrivi alla fine dell'array, riparti dall'indice 0.
*   Efficientissima per buffer di dati, driver audio, streaming. Non richiede allocazione di memoria dinamica.

### Deque (Double Ended Queue)
Una struttura ibrida Stack/Queue dove puoi inserire e rimuovere sia da `Head` che da `Tail`.

### Priority Queue (Coda a Priorità)
Non FIFO puro. Esce sempre l'elemento con **priorità più alta**.
*   Implementata efficientemente con un **Binary Heap** (Albero), non con una lista semplice.

---

## 4. Traversamento e Buffer
Spesso le code vengono processate a "Batch" (blocchi).
```javascript
// Preleva finché ce ne sono o fino a max 10
while (!coda.isEmpty() && batch.length < 10) {
    batch.push(coda.dequeue());
}
```

---

## 5. ⚠️ Errori Comuni e Troubleshooting

### A. Confondere Testa e Coda
Se inserisci in testa (`pushTesta`) e rimuovi dalla testa (`popTesta`), hai fatto uno Stack!
In una Coda le operazioni devono avvenire agli estremi opposti.

### B. Coda Infinita (Loop)
In algoritmi come la BFS (Breadth First Search) sui grafi, se rimetti in coda un nodo appena uscito (perché è vicino di qualcun altro) senza segnarlo come "visitato", la coda non si svuoterà mai -> Crash per memoria piena.

### C. Performance Array vs List
In JavaScript, usare un Array `[]` come coda (`push` + `shift`) è funzionale ma lento su grandi numeri.
`shift()` (rimuovi il primo) costringe JS a spostare tutti gli indici dell'array: costo **O(N)**.
La Lista Linkata fa la stessa operazione in **O(1)**.

---

## 6. Applicazioni Pratiche della Coda

### A. Coda di Stampa
Quando invii 5 documenti alla stampante, vengono messi in coda.
Il primo documento inviato viene stampato per primo (FIFO).

### B. Breadth First Search (BFS) - Ricerca in Ampiezza
Algoritmo fondamentale per esplorare grafi e alberi "livello per livello".
```javascript
function BFS(grafo, nodoPartenza) {
    let visitati = new Set();
    let coda = new Coda();
    
    coda.enqueue(nodoPartenza);
    visitati.add(nodoPartenza);
    
    while (!coda.isEmpty()) {
        let nodo = coda.dequeue();
        console.log("Visito:", nodo);
        
        for (let vicino of grafo.getVicini(nodo)) {
            if (!visitati.has(vicino)) {
                visitati.add(vicino);
                coda.enqueue(vicino);
            }
        }
    }
}
```

### C. Task Scheduler (Pianificatore di Processi)
Il sistema operativo mette i processi in una coda. La CPU li esegue uno alla volta nell'ordine di arrivo (Round Robin semplificato).

---

## 7. Implementazione Completa in JavaScript (dal nostro progetto)

Dal file `strutture_derivate.js`:
```javascript
class Coda {
    constructor() {
        this.list = new Lista(); // Usa la lista come "motore"
    }

    enqueue(info) {
        console.log(`[QUEUE] Enqueue: ${info}`);
        this.list.pushCoda(info); // Inserisce in fondo
    }

    dequeue() {
        console.log(`[QUEUE] Dequeue`);
        return this.list.popTesta(); // Rimuove dalla testa
    }

    front() {
        if (this.list.isEmpty()) return null;
        return this.list.head.info;
    }

    isEmpty() {
        return this.list.isEmpty();
    }

    clear() {
        this.list.clearList();
    }

    // Getter per accedere alla head (per visualizzazione)
    get head() {
        return this.list.head;
    }
}
```

---

## 8. Tabella Riassuntiva delle Complessità

| Operazione | Lista Senza Tail | Lista Con Tail | Array JS (`shift`) |
| :--------- | :--------------- | :------------- | :----------------- |
| `enqueue`  | O(N)             | O(1) ✓         | O(1)               |
| `dequeue`  | O(1)             | O(1)           | O(N) ✗             |
| `front`    | O(1)             | O(1)           | O(1)               |

---

## 9. 🎨 Diagrammi ASCII: Visualizzazione della Coda

### Rappresentazione Orizzontale (Classica)
```
DEQUEUE                                                  ENQUEUE
(esce)                                                   (entra)
   ↓                                                        ↓
+-----+    +-----+    +-----+    +-----+    +-----+
| A   |--->| B   |--->| C   |--->| D   |--->| E   |---> NULL
+-----+    +-----+    +-----+    +-----+    +-----+
   ^                                            ^
 FRONT                                        REAR
 (Testa)                                     (Coda)
```

### Operazione ENQUEUE("F")
```
PRIMA:
FRONT --> [A] --> [B] --> [C] --> [D] --> [E] --> NULL
                                            ^
                                          REAR

DOPO:
FRONT --> [A] --> [B] --> [C] --> [D] --> [E] --> [F] --> NULL
                                                    ^
                                                  REAR (nuovo)
```

### Operazione DEQUEUE()
```
PRIMA:
FRONT --> [A] --> [B] --> [C] --> ...
            ^
          (esce)

DOPO:
          [A] (isolato, va al GC)

FRONT --> [B] --> [C] --> ...
            ^
          (nuovo front)

Ritorna: "A"
```

---

## 10. 🔧 Pattern Avanzati con la Coda

### Livellamento di un Albero (Level Order Traversal)
```javascript
function stampaPerlLivelli(radice) {
    let coda = new Coda();
    coda.enqueue(radice);
    
    while (!coda.isEmpty()) {
        let nodo = coda.dequeue();
        console.log(nodo.valore);
        
        if (nodo.sinistro) coda.enqueue(nodo.sinistro);
        if (nodo.destro) coda.enqueue(nodo.destro);
    }
}
```

### Simulazione di una Cassa del Supermercato
```javascript
function simulaCassa(clienti, tempoServizio) {
    let coda = new Coda();
    for (let cliente of clienti) coda.enqueue(cliente);
    
    let tempo = 0;
    while (!coda.isEmpty()) {
        let cliente = coda.dequeue();
        console.log(`Tempo ${tempo}: Servo ${cliente}`);
        tempo += tempoServizio;
    }
    console.log(`Tutti serviti in ${tempo} minuti`);
}
```

---

## 11. 📋 Particolarità della Coda

### Caratteristiche Uniche
1.  **Ordine FIFO garantito**: Chi entra prima, esce prima. Equità!
2.  **Due estremità attive**: Una per entrare (rear), una per uscire (front).
3.  **Naturale per processi sequenziali**: Richieste web, stampe, task.

### Quando usare la Coda?
*   Gestione richieste in un server (load balancing).
*   Esplorazione BFS di grafi e alberi.
*   Simulazioni (code ai caselli, ospedali).
*   Buffer di messaggi tra componenti software.

### Quando NON usare la Coda?
*   Se l'ultimo arrivato ha priorità (usa Stack).
*   Se alcuni elementi hanno priorità diverse (usa Priority Queue).
*   Se devi cercare un elemento specifico (usa Lista o Set).

### Trucco per Debug
Se la tua coda non si svuota mai, probabilmente stai ri-accodando elementi già processati. Aggiungi sempre un `Set` di "visitati" quando usi code per algoritmi di ricerca.


