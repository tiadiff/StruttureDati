# 📘 Guida Completa: Lista Bidirezionale (Doubly Linked List)

Questa guida copre la struttura, i doppi puntatori, gli algoritmi di inserimento/rimozione e la gestione avanzata.

---

## 1. Cos'è una Lista Bidirezionale?
Ogni nodo mantiene **due riferimenti**:
1.  **Next**: Punta al nodo successivo.
2.  **Prev**: Punta al nodo precedente.

Permette di scorrere avanti e indietro e di rimuovere nodi in O(1) se ne abbiamo il riferimento.

### Struttura del Nodo
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

## 2. Traversamento (Avanti e Indietro)

### Forward (Avanti)
Identico alla lista singola:
```javascript
let tmp = this.head;
while(tmp !== null) tmp = tmp.next;
```

### Backward (Indietro)
Partendo dalla coda (se abbiamo `tail`) o scorrendo fino in fondo:
```javascript
// Prima vado in fondo...
while(tmp.next !== null) tmp = tmp.next;
// ...poi torno indietro
while(tmp !== null) {
    console.log(tmp.info);
    tmp = tmp.prev;
}
```

---

## 3. Algoritmi e Puntatori

### A. Inserimento in Testa
1.  `N.next = head`.
2.  Se `head` esiste, `head.prev = N` (Cruciale!).
3.  `head = N`.

### B. Inserimento "Prima" di un nodo T
Scenario: `P <-> T`. Vogliamo `P <-> N <-> T`.
1.  Salviamo P (`P = T.prev`).
2.  Colleghiamo N: `N.next = T`, `N.prev = P`.
3.  Aggiorniamo T: `T.prev = N`.
4.  Aggiorniamo P: se P esiste `P.next = N`, altrimenti `head = N`.

### C. Rimozione Nodo X (deleteNode) - O(1)
Se ho il puntatore a X, non devo cercare nulla.
1.  `Prima = X.prev`.
2.  `Dopo = X.next`.
3.  `if (Prima) Prima.next = Dopo`.
4.  `if (Dopo) Dopo.prev = Prima`.
5.  Pulisco X (`X.next = null`, `X.prev = null`).

---

## 4. Concetti Avanzati (Masterclass)

### Inserimento Centrale: 4 Link da gestire
In una lista singola tocchi 2 collegamenti. Qui ne devi aggiornare 4:
`N.prev`, `N.next`, `Prec.next`, `Succ.prev`.
Il diagramma mentale deve essere chiaro per non creare "nodi zombie".

### Nodi Sentinella
In implementazioni professionali si usano due nodi fittizi fissi (`HeadSentinel`, `TailSentinel`) che non contengono dati. Questo elimina la necessità di controllare `if (head == null)` ogni volta, perché c'è sempre almeno la sentinella.

### Ricerca Ottimizzata "Smart Search"
Se cerchi l'elemento K su N totali:
*   K < N/2 -> Parti dalla testa.
*   K > N/2 -> Parti dalla coda (Tail).

---

## 5. ⚠️ Errori Comuni e Troubleshooting

### A. Link Asimmetrici ("One-Way Street")
Il bug più frequente. Fai `A.next = B` ma dimentichi `B.prev = A`.
*   **Risultato**: Scorrendo avanti funziona, scorrendo indietro si rompe o salta nodi.

### B. Dimenticare la vecchia Testa
Quando fai `pushTesta`, la vecchia testa diventa il secondo nodo. Devi ricordarti di impostare il suo `.prev` al nuovo nodo.

### C. Disconnessione "Zombie"
Se rimuovi un nodo ma non aggiorni entrambi i lati (es. aggiorni solo il next del precedente ma non il prev del successivo), la lista diventa inconsistente se percorsa al contrario.
*Test*: Scorrere sempre la lista in entrambe le direzioni dopo una modifica complessa.
