# 📘 Guida Completa: Lista Unidirezionale (Singly Linked List)

Questa guida unisce concetti base, algoritmi avanzati e risoluzione dei problemi comuni.

---

## 1. Cos'è una Lista Unidirezionale?
Una **Lista Unidirezionale** è una struttura dati lineare dinamica. A differenza di un array (vettore), i suoi elementi non sono memorizzati in celle di memoria contigue.
La lista è come una **caccia al tesoro**: ogni elemento (Nodo) contiene un indizio (Puntatore) per trovare il successivo.

### Struttura del Nodo (JavaScript)
Nel nostro progetto (`lista.js`), il nodo è definito così:
```javascript
class Nodo {
    constructor(info) {
        this.info = info; // Il dato (es. numero, stringa)
        this.link = null; // Il puntatore al prossimo nodo
    }
}
```

### Anatomia in Memoria
Ogni nodo occupa uno spazio in memoria *non consecutivo*.
```
[Indirizzo: 0x001]     [Indirizzo: 0x05F]     [Indirizzo: 0x0A2]
+------+------+       +------+------+       +------+------+
| Info | Link |------>| Info | Link |------>| Info | Link |------> NULL
| "A"  | 0x05F|       | "B"  | 0x0A2|       | "C"  | null |
+------+------+       +------+------+       +------+------+
   HEAD
```

---

## 2. Traversamento: Come Ciclare la Lista
Poiché non esistono indici (`arr[i]`), l'unico modo per visitare gli elementi è scorrere i puntatori partendo dalla `head`.

### Il Ciclo `While` Standard
```javascript
let corrente = this.head;
while (corrente !== null) {
    console.log(corrente.info); 
    corrente = corrente.link; // AVANZAMENTO FONDAMENTALE
}
```

---

## 3. Analisi Algoritmica Approfondita

### A. Inserimento in Testa (PushTesta) - O(1)
Vogliamo inserire "X" prima dell'attuale `head`.
1.  **Creazione**: Creo nodo X.
2.  **Collegamento**: `X.link = head` (X punta al vecchio primo).
3.  **Update**: `head = X` (X diventa il nuovo primo).
*   *Memoria*: `HEAD` ora punta all'indirizzo di X.

### B. Inserimento in Coda (PushCoda) - O(N)
Dobbiamo trovare l'ultimo nodo.
1.  Se `head` è `null`, `head = X`.
2.  Altrimenti, scorro con `tmp` finché `tmp.link !== null`.
3.  Trovato l'ultimo, faccio `tmp.link = X`.

### C. Inserimento Centrale (PushDopoNodo) - O(N)
Scenario: Inserire "X" tra "A" (target) e "B" (successivo).
**Algoritmo Critico**:
1.  Cerco A.
2.  `X.link = A.link` (Collego X a B).
3.  `A.link = X` (Collego A a X).
> ⚠️ **Ordine**: Se inverto i passi 2 e 3, perdo per sempre il riferimento a B!

---

## 4. Altre Funzioni Utili

1.  **`search(valore)`**: Scorre la lista e torna true se `corrente.info === valore`.
2.  **`size()`**: Conta i nodi incrementando un contatore nel ciclo while.
3.  **`reverse()`**: Inverte i puntatori (da A->B a B->A). Richiede 3 puntatori (`prev`, `curr`, `next`) che scorrono "a bruco" lungo la lista.

---

## 5. Pattern Avanzati (Masterclass)

### Ricorsione
Attraversare la lista chiamando una funzione dentro se stessa. Elegante ma rischia lo *Stack Overflow* se la lista è troppo lunga.

### Tecnica "Tortoise & Hare"
Usata per trovare cicli o il punto medio. Un puntatore va veloce (2 passi), uno lento (1 passo). Se si incontrano, c'è un loop.

---

## 6. ⚠️ Errori Comuni e Troubleshooting

### A. Perdere la Lista ("Lost Head")
❌ Errore: `head = nuovoNodo` senza aver prima collegato il resto.
✅ Corretto: `nuovoNodo.link = head; head = nuovoNodo;`

### B. Spezzare la Catena ("Broken Chain")
Accade inserendo al centro. Mai fare `A.link = X` prima di aver salvato il riferimento al nodo successivo (`B`).

### C. Accesso a Null ("Null Pointer Exception")
❌ Errore: `while (tmp.info != val)` -> Se `tmp` diventa null, crash.
✅ Corretto: `while (tmp !== null && tmp.info != val)`

### D. Casi Limite (Edge Cases)
Verifica sempre se il tuo codice funziona con:
*   Lista vuota.
*   Lista con 1 solo nodo.
*   Operazione sull'ultimo nodo (cancellazione della coda).

---

## 7. Rimozione dalla Coda (PopCoda) - Algoritmo Dettagliato

Rimuovere l'ultimo elemento è più complesso che rimuovere il primo, perché dobbiamo fermarci al **penultimo** nodo.

### Algoritmo passo-passo
```javascript
popCoda() {
    if (this.isEmpty()) return null;
    
    // Caso speciale: un solo nodo
    if (this.head.link === null) {
        let dato = this.head.info;
        this.head = null;
        return dato;
    }
    
    // Caso generale: scorri fino al PENULTIMO
    let tmp = this.head;
    while (tmp.link.link !== null) { // Controllo due passi avanti!
        tmp = tmp.link;
    }
    
    // tmp è ora il penultimo. tmp.link è l'ultimo.
    let dato = tmp.link.info;
    tmp.link = null; // Sgancio l'ultimo
    return dato;
}
```

### Perché `tmp.link.link`?
Se usassi solo `tmp.link !== null`, mi fermerei sull'ultimo nodo. Ma a quel punto non avrei modo di "sganciarlo" perché non ho accesso al penultimo per modificare il suo `.link`.

---

## 8. Gestione della Memoria (Garbage Collection in JavaScript)

JavaScript non richiede la liberazione manuale della memoria (a differenza di C con `free()`).

### Come funziona
Quando un nodo non è più raggiungibile (nessuna variabile punta ad esso), il **Garbage Collector** del browser lo marca come "spazzatura" e libera la RAM.

**Esempio**:
```javascript
popTesta() {
    let vecchioHead = this.head;
    this.head = this.head.link; // La testa avanza
    vecchioHead.link = null;    // "Pulisco" il vecchio nodo (opzionale ma buona pratica)
    return vecchioHead.info;
}
```
Dopo queste righe, `vecchioHead` non è più puntato da nessuno → verrà eliminato automaticamente.

---

## 9. Tabella Riassuntiva delle Complessità

| Operazione       | Complessità | Note                                      |
| :--------------- | :---------- | :---------------------------------------- |
| `pushTesta`      | O(1)        | Immediato, non scorre                     |
| `pushCoda`       | O(N)        | Deve scorrere fino alla fine              |
| `pushDopoNodo`   | O(N)        | Cerca il target, poi O(1) per inserire    |
| `popTesta`       | O(1)        | Immediato, aggiorna solo head             |
| `popCoda`        | O(N)        | Deve trovare il penultimo                 |
| `search`         | O(N)        | Caso peggiore: elemento non presente      |
| `size`           | O(N)        | Conta tutti i nodi (o O(1) con contatore) |
| `reverse`        | O(N)        | Attraversa la lista una volta             |

