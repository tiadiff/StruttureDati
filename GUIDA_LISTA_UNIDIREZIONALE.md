# 📘 Guida allo Studio: Lista Unidirezionale (Singly Linked List)

## 1. Cos'è una Lista Unidirezionale?
Una **Lista Unidirezionale** è una struttura dati lineare dinamica. A differenza di un array (vettore), i suoi elementi non sono memorizzati in celle di memoria contigue.
Ogni elemento, chiamato **Nodo**, contiene:
1.  **Info**: Il dato da memorizzare (es. un numero, una stringa).
2.  **Link**: Un riferimento (puntatore) all'indirizzo di memoria del nodo successivo.

La lista ha un punto di ingresso chiamato **Head** (Testa) che punta al primo nodo. L'ultimo nodo punta a `null` per indicare la fine della catena.

---

## 2. Struttura del Nodo (JavaScript)
Nel nostro progetto (`lista.js`), il nodo è definito così:

```javascript
class Nodo {
    constructor(info) {
        this.info = info; // Il dato
        this.link = null; // Il puntatore (inizialmente nullo)
    }
}
```

---

## 3. Analisi Algoritmica delle Operazioni

### A. Inserimento in Testa (PushTesta)
Vogliamo aggiungere un nuovo elemento `N` *prima* dell'attuale primo elemento.
*   **Complessità**: O(1) (Tempo costante).
*   **Logica**:
    1.  Creiamo `N`.
    2.  Diciamo a `N` di puntare a chi è attualmente in testa: `N.link = head`.
    3.  Aggiorniamo la testa del sistema: `head = N`.

### B. Inserimento in Coda (PushCoda)
Vogliamo aggiungere un elemento `N` alla fine.
*   **Complessità**: O(N) (Tempo lineare, dobbiamo scorrere tutti gli N elementi).
*   **Logica**:
    1.  Se la lista è vuota, `N` diventa la testa.
    2.  Altrimenti, usiamo un puntatore `tmp` che parte da `head`.
    3.  Facciamo avanzare `tmp` finché `tmp.link` non è `null`.
    4.  Arrivati all'ultimo nodo, lo colleghiamo al nuovo: `tmp.link = N`.

### C. Inserimento dopo un Nodo specifico (PushDopoNodo)
Vogliamo inserire `N` tra due nodi esistenti, `A` (target) e `B` (il successivo di A).
**Situazione Iniziale**: `[A] -> [B]`
**Obiettivo**: `[A] -> [N] -> [B]`

**Algoritmo Critico**:
1.  Scorriamo la lista per trovare `A`.
2.  **Passo 1**: `N.link = A.link` (Colleghiamo N verso B).
3.  **Passo 2**: `A.link = N` (Colleghiamo A verso N).
> ⚠️ **Attenzione**: Se invertissimo i passi, scrivendo prima `A.link = N`, perderemmo il riferimento a `B` e spezzeremmo la lista!

### D. Rimozione dalla Testa (PopTesta)
Eliminiamo il primo elemento.
*   **Complessità**: O(1).
*   **Logica**:
    1.  Salviamo un riferimento al nodo da eliminare (per restituirne il valore).
    2.  Spostiamo la testa in avanti: `head = head.link`.
    3.  Il vecchio nodo viene "sganciato" e rimosso dal Garbage Collector.

---

## 4. Vantaggi e Svantaggi

| Vantaggi | Svantaggi |
| :--- | :--- |
| Dimensione dinamica (non serve fissare un limite all'inizio). | Accesso lento agli elementi (no accesso diretto come `arr[5]`, bisogna scorrere). |
| Inserimento in testa immediato O(1). | Uso di memoria extra per i puntatori. |
| Non richiede memoria contigua. | Scorrimento solo in avanti (non si può tornare indietro). |
