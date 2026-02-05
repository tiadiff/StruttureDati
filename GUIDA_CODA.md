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
