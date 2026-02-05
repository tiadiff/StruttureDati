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

## 3. Traversamento: Come Ciclare la Lista

Poiché non abbiamo indici numerici come negli array (`arr[i]`), l'unico modo per visitare gli elementi è **scorrere i puntatori** sequenzialmente.

### Il Ciclo `While` Standard
Si parte dalla testa e ci si sposta finché non si cade nel `null` (fine lista).

```javascript
let corrente = this.head; // Partiamo dall'inizio

while (corrente !== null) {
    // Eseguiamo un'azione sul nodo corrente
    console.log(corrente.info); 
    
    // Avanziamo al prossimo nodo
    corrente = corrente.link; 
}
```

### Errori Comuni nei Cicli
*   **Dimenticare l'avanzamento**: Se ometti `corrente = corrente.link`, crei un ciclo infinito che blocca il browser.
*   **Accedere a proprietà di null**: Se fai `corrente.info` quando `corrente` è diventato `null` (cioè sei fuori dalla lista), otterrai un errore.

---

## 4. Analisi Algoritmica delle Operazioni

### A. Inserimento in Testa (PushTesta)
*   **Complessità**: O(1).
*   **Logica**: `N.link = head; head = N;`

### B. Inserimento in Coda (PushCoda)
*   **Complessità**: O(N).
*   **Logica**: Scorrere con un ciclo fino all'ultimo nodo (`tmp.link === null`) e collegarlo (`tmp.link = N`).

### C. Inserimento dopo un Nodo (PushDopoNodo)
Vogliamo inserire `N` tra `A` e `B`.
1.  Scorriamo per trovare `A`.
2.  `N.link = A.link` (Colleghiamo N verso B).
3.  `A.link = N` (Colleghiamo A verso N).

---

## 5. Altre Funzioni Utili

Ecco altre operazioni tipiche che si implementano nelle liste:

### `search(valore)`: Ricerca Elemento
Restituisce `true` se l'elemento esiste, `false` altrimenti.
*   **Algoritmo**: Si usa il ciclo standard di traversamento. Se `corrente.info === valore`, abbiamo trovato. Se il ciclo finisce, non c'è.
*   **Complessità**: O(N).

### `size()`: Conteggio Nodi
Restituisce il numero totale di nodi.
*   **Algoritmo**: Inizializza un contatore `count = 0`. Nel ciclo `while`, incrementa `count++` ad ogni passo.
*   **Complessità**: O(N).

### `reverse()`: Inversione Lista
Capovolge l'ordine dei pointer (da A->B->C a C->B->A). Molto chiesto ai colloqui tecnici.
*   **Algoritmo**: Servono 3 puntatori: `prev`, `curr`, `next`.
    1.  `prev = null`, `curr = head`.
    2.  Nel ciclo:
        *   Salva il prossimo: `next = curr.link`
        *   Inverti il puntatore: `curr.link = prev`
        *   Avanza gli altri: `prev = curr`, `curr = next`
    3.  Alla fine, `head = prev`.
*   **Complessità**: O(N).
