# 📗 Guida allo Studio: La Coda (Queue)

## 1. Il Concetto di Queue
La **Coda** è una struttura dati che segue il principio **FIFO** (First In, First Out).
*   Il primo elemento inserito è il primo ad uscire.
*   Pensate a una fila alla cassa del supermercato, o a una coda di stampa. Chi arriva prima viene servito per primo.

---

## 2. Le Operazioni Fondamentali

Anche qui, l'accesso è limitato per garantire ordine e correttezza:

### A. ENQUEUE (Accoda)
Aggiunge un elemento **in fondo** alla coda.
*   Corrisponde a: `pushCoda` in una lista.
*   Chi arriva si mette in fila dietro a tutti gli altri.

### B. DEQUEUE (Servi o Decoda)
Rimuove e restituisce l'elemento **in testa** (il fronte della coda).
*   Corrisponde a: `popTesta` in una lista.
*   Viene servita la persona che aspetta da più tempo.

### C. FRONT (Fronte)
Guarda chi è il prossimo a essere servito (il primo della lista) senza rimuoverlo.

---

## 3. Implementazione nel Codice (`strutture_derivate.js`)

Abbiamo usato la `Lista` come motore interno.

```javascript
class Coda {
    constructor() {
        this.list = new Lista();
    }

    enqueue(info) {
        // Si aggiunge ALLA FINE
        this.list.pushCoda(info);
    }

    dequeue() {
        // Si toglie DALL'INIZIO
        return this.list.popTesta();
    }
}
```

### Nota sulla Complessità
Nella nostra implementazione didattica, `enqueue` (pushCoda) deve scorrere tutta la lista per trovare la fine, quindi costa **O(N)**.
In un'implementazione professionale ottimizzata (es. `DoublyLinkedList` con puntatore `tail`, o `Queue` specifica), manterremmo un riferimento diretto all'ultimo elemento (`tail`), rendendo `enqueue` immediata **O(1)**.
La `dequeue` è invece sempre **O(1)** perché agisce sulla testa.

---

## 4. Applicazioni Reali
Dove si usano le Code?
*   **Code di Stampa**: I documenti vengono stampati nell'ordine di invio.
*   **Gestione Processi CPU**: I programmi aspettano il loro turno per usare il processore.
*   **Server Web**: Le richieste degli utenti vengono messe in coda se il server è occupato.
*   **Playlist Musicali**: "Aggiungi alla coda di riproduzione".
