# 📗 Guida allo Studio: Lista Bidirezionale (Doubly Linked List)

## 1. Cos'è una Lista Bidirezionale?
In questa struttura, ogni nodo mantiene **due riferimenti**:
1.  **Next**: Punta al nodo successivo.
2.  **Prev**: Punta al nodo precedente.

---

## 2. Struttura del Nodo
```javascript
class NodoBi {
    constructor(info) {
        this.info = info;
        this.prev = null;
        this.next = null;
    }
}
```

---

## 3. Traversamento Avanzato

La potenza della lista bidirezionale sta nel poterla percorrere in entrambi i sensi.

### Scorrimento in Avanti (Forward)
Identico alla lista unidirezionale, usando `next`.

```javascript
let tmp = this.head;
while(tmp !== null) {
    console.log(tmp.info);
    tmp = tmp.next;
}
```

### Scorrimento all'Indietro (Backward)
Possiamo partire dall'ultimo nodo (se abbiamo un puntatore `tail`) o scorrere fino in fondo e poi tornare indietro usando `prev`.

```javascript
// 1. Vai in fondo
let tmp = this.head;
while(tmp.next !== null) tmp = tmp.next;

// 2. Torna indietro
while(tmp !== null) {
    console.log(tmp.info); // Stampa dall'ultimo al primo
    tmp = tmp.prev;        // Passo indietro
}
```

---

## 4. Operazioni e Puntatori

### A. Inserimento in Testa
`N.next = head; head.prev = N; head = N;`

### B. Inserimento "Prima" di T
`P = T.prev;`
`N.next = T; N.prev = P;`
`T.prev = N; P.next = N;`

---

## 5. Altre Funzioni Utili

### `findLast()`: Trova l'ultimo
Restituisce l'ultimo nodo. Utile se non manteniamo una variabile `tail` costante.
*   **Algoritmo**: `while (tmp.next !== null) tmp = tmp.next; return tmp;`

### `delete(valore)`: Rimozione Specifica
Grazie al doppio puntatore, se abbiamo il riferimento al nodo `X` da cancellare, la rimozione è **O(1)** (immediata), perché non dobbiamo cercare il precedente partendo dalla testa (come nella lista singola), ma lo conosciamo già (`X.prev`).

### `printBackward()`: Stampa Inversa
Visualizza la lista al contrario senza modificarla (a differenza del `reverse` della lista singola che è distruttivo).

### `toDoublyArray()`: Esportazione
Converte la struttura puntata in un semplice Array JavaScript `[]` per facilitare il debug o l'uso con altre librerie.

---

## 6. ⚠️ Errori Comuni e Troubleshooting

La lista bidirezionale raddoppia i puntatori, e quindi raddoppia i rischi di errore.

### A. Link Asimmetrici ("One-Way Street")
È l'errore più subdolo. Imposti correttamente `A.next = B`, ma dimentichi `B.prev = A`.
*   **Sintomo**: Se scorri la lista in avanti sembra perfetta. Se provi a tornare indietro (`prev`), il collegamento non esiste o punta al nodo sbagliato.
*   **Soluzione**: Ogni volta che tocchi `.next` di un nodo, chiediti subito: "Ho aggiornato anche il `.prev` del nodo di destinazione?"

### B. Dimenticare la Testa
Quando inserisci in testa, devi aggiornare il `prev` della vecchia testa.
*   ❌ **Errore**: `nuovo.next = head; head = nuovo;` (La vecchia testa pensa ancora di essere la prima, il suo `prev` è rimasto `null`).
*   ✅ **Corretto**: `if (head) head.prev = nuovo;`

### C. Il Labirinto dei Riferimenti
Nelle operazioni complesse (inserimento nel mezzo), devi aggiornare 4 puntatori.
Se inserisci `N` tra `P` e `S`:
1.  `N.prev`
2.  `N.next`
3.  `P.next`
4.  `S.prev`
Dimenticarne uno crea una lista corrotta. Disegna sempre su carta i collegamenti prima di scrivere il codice!

