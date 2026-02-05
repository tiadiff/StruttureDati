# 📗 Guida allo Studio: Lista Bidirezionale (Doubly Linked List)

## 1. Cos'è una Lista Bidirezionale?
Una **Lista Bidirezionale** è un'evoluzione della lista semplice. Qui, ogni nodo mantiene **due riferimenti**:
1.  **Next**: Punta al nodo successivo.
2.  **Prev**: Punta al nodo precedente.

Questo permette di attraversare la lista in entrambe le direzioni (avanti e indietro) e rende molto più facili operazioni come "rimuovi questo nodo" (se ne abbiamo già il riferimento) o "torna indietro".

---

## 2. Struttura del Nodo (JavaScript)
Ecco la definizione in `lista_bidirezionale.js`:

```javascript
class NodoBi {
    constructor(info) {
        this.info = info;
        this.prev = null; // Puntatore indietro
        this.next = null; // Puntatore avanti
    }
}
```

---

## 3. Analisi Algoritmica delle Operazioni

### A. Inserimento in Testa (PushTesta)
*   **Complessità**: O(1).
*   **Logica**:
    1.  Creo nodo `N`.
    2.  `N.next = head`.
    3.  Se la lista non è vuota (`head != null`), `head.prev = N`. <br> *Questo passo è fondamentale: il vecchio primo deve sapere che ora ha qualcuno davanti!*
    4.  `head = N`.

### B. Inserimento in Coda (PushCoda)
*   **Complessità**: O(N) (senza puntatore `tail`) o O(1) (con puntatore `tail`).
*   **Logica**:
    1.  Scorro fino all'ultimo nodo `L`.
    2.  Collego in avanti: `L.next = N`.
    3.  Collego all'indietro: `N.prev = L`. <br> *Ora N sa chi c'è prima di lui.*

### C. Inserimento "Prima" di un Nodo (PushPrimaNodo)
Vogliamo inserire `N` prima di un nodo `T`. Immaginiamo che prima di `T` ci sia `P`.
**Situazione**: `[P] <-> [T]`
**Obiettivo**: `[P] <-> [N] <-> [T]`

**Logica**:
1.  Identifichiamo `P` come `T.prev`.
2.  Collego N:
    *   `N.next = T`
    *   `N.prev = P`
3.  Aggiorno i vicini:
    *   `T.prev = N`
    *   Se `P` esiste, `P.next = N`.
    *   Se `P` non esiste (`T` era la testa), aggiorno `head = N`.

### D. Rimozione Centrale (Pop)
Rimuovere un nodo `X` che sta tra `A` e `B`.
`[A] <-> [X] <-> [B]`

**Logica**:
1.  Bypass in avanti: `A.next = B`.
2.  Bypass all'indietro: `B.prev = A`.
3.  `X` è ora isolato e viene eliminato.

---

## 4. Confronto: Unidirezionale vs Bidirezionale

| Caratteristica | Unidirezionale | Bidirezionale |
| :--- | :--- | :--- |
| Memoria per nodo | Minore (1 puntatore) | Maggiore (2 puntatori) |
| Scorrimento | Solo Avanti | Avanti e Indietro |
| Rimozione nodo noto | Difficile (serve il precedente) | Facile (conosciamo già prev) |
| Complessità Codice | Semplice | Più incline a errori (doppi link da gestire) |
