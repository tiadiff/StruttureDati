# 📘 Guida Completa: La Coda (Queue)

## 1. Varianti della Coda

### Coda Semplice (Javascript List Implementation)
*   **Enqueue**: O(N) (nel nostro caso senza puntatore tail) o O(1) (con tail).
*   **Dequeue**: O(1).

### Coda Circolare (Ring Buffer)
Implementata su Array a dimensione fissa.
Si usano due indici: `HeadIndex` e `TailIndex`.
Quando `TailIndex` arriva alla fine dell'array `[N]`, invece di fermarsi (o riallocare), torna a `0` (se la cella 0 è libera perché è stata fatta una dequeue).
*   Utile in: Driver di dispositivi, Buffer audio (streaming dati continuo).

### Deque (Double Ended Queue)
Una "super-coda" dove puoi fare Push/Pop sia davanti che dietro.
Unisce i poteri di Stack e Queue. Implementabile facilmente con una Lista Bidirezionale.

---

## 2. Il Problema della "Blocking Queue"
Nel multithreading (programmazione parallela), le code servono a far comunicare thread diversi (Produttore -> Consumatore).
*   Se la coda è piena, il Produttore si blocca (Wait).
*   Se la coda è vuota, il Consumatore si blocca (Wait).
Questo concetto è alla base di sistemi come **Kafka** o **RabbitMQ**.

---

## 3. Gestione Algoritmica del Traverse (Buffering)
A volte vogliamo processare la coda a blocchi ("Batch Processing").
Algoritmo:
```javascript
while (!coda.isEmpty()) {
    let batch = [];
    // Prendi fino a 10 elementi alla volta
    for(let i=0; i<10 && !coda.isEmpty(); i++) {
        batch.push(coda.dequeue());
    }
    processaBatch(batch);
}
```
Questo riduce l'overhead delle chiamate di sistema se dobbiamo scrivere i dati su disco/database.

---

## 4. Priority Queue (Coda con Priorità)
Non è una semplice lista FIFO. È spesso implementata con una struttura chiamata **Heap Binario** (Albero).
*   L'elemento con priorità massima "galleggia" in cima all'albero.
*   `Dequeue` prende la radice (O(log N)).
*   `Enqueue` inserisce e riordina l'albero (O(log N)).
Molto più efficiente di una lista ordinata (O(N)) per questo scopo.

---

## 5. Troubleshooting: Memory Leaks in Code
Nelle code basate su liste linkate, un errore comune nei linguaggi senza Garbage Collector è dimenticare di liberare il nodo dopo il `dequeue`.
In JavaScript, il rischio è mantenere riferimenti non voluti agli oggetti dentro i nodi estratti.
*   **Best Practice**: Quando estrai un dato, se il nodo conteneva oggetti pesanti, assicurati che non ci siano altre variabili globali che puntano ad esso.
