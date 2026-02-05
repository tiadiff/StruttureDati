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

---

## 6. PopCoda in O(1) - Il Vantaggio della Lista Bidirezionale

Nella lista unidirezionale, `popCoda` costa O(N) perché devi trovare il penultimo.
Nella bidirezionale, se mantieni un puntatore `tail`, la rimozione è **istantanea**.

### Algoritmo con Tail
```javascript
popCoda() {
    if (!this.tail) return null;
    
    let dato = this.tail.info;
    this.tail = this.tail.prev; // Torna indietro di uno
    
    if (this.tail) {
        this.tail.next = null;  // Sgancio il vecchio ultimo
    } else {
        this.head = null;       // Era l'unico nodo
    }
    return dato;
}
```

---

## 7. Diagramma Completo: Inserimento nel Mezzo

Vogliamo inserire `N` tra `P` (precedente) e `S` (successivo).
```
PRIMA:
  [P] <-----> [S]
       prev/next

DOPO:
  [P] <-----> [N] <-----> [S]

4 PUNTATORI DA AGGIORNARE:
  1. N.prev = P
  2. N.next = S
  3. P.next = N   (se P esiste)
  4. S.prev = N   (se S esiste)
```

### Codice JavaScript completo
```javascript
insertAfter(target, nuovoValore) {
    let tmp = this.head;
    while (tmp && tmp.info !== target) tmp = tmp.next;
    if (!tmp) return; // Target non trovato
    
    const N = new NodoBi(nuovoValore);
    const S = tmp.next; // Il successivo di target
    
    // Collegamenti di N
    N.prev = tmp;
    N.next = S;
    
    // Aggiornamento dei vicini
    tmp.next = N;
    if (S) S.prev = N;
}
```

---

## 8. Tabella Riassuntiva delle Complessità

| Operazione         | Con Head  | Con Head+Tail |
| :----------------- | :-------- | :------------ |
| `pushTesta`        | O(1)      | O(1)          |
| `pushCoda`         | O(N)      | O(1) ✓        |
| `popTesta`         | O(1)      | O(1)          |
| `popCoda`          | O(N)      | O(1) ✓        |
| `deleteNodo(X)`    | O(1)*     | O(1)*         |
| `search`           | O(N)      | O(N/2) media  |

\* Se abbiamo già il puntatore al nodo X.

---

## 9. 🎨 Diagrammi ASCII: Doppi Pointer in Azione

### Struttura Base
```
        prev    next          prev    next          prev    next
  NULL <---- [A] ----> <---- [B] ----> <---- [C] ----> NULL
              ^                                 ^
             HEAD                             (TAIL)
```

### Inserimento in Testa
```
STATO INIZIALE:
  NULL <-- [A] <--> [B] <--> [C] --> NULL
            ^
           HEAD

OPERAZIONE: pushTesta("X")

PASSO 1: X.next = HEAD (X punta avanti ad A)
PASSO 2: HEAD.prev = X (A punta indietro a X) ← FONDAMENTALE!
PASSO 3: HEAD = X

RISULTATO:
  NULL <-- [X] <--> [A] <--> [B] <--> [C] --> NULL
            ^
           HEAD
```

### Rimozione Centrale (deleteNode)
```
STATO: Rimuovere [B] dalla lista [A] <--> [B] <--> [C]

PASSO 1: Identifica Prima (A) e Dopo (C)
  Prima = B.prev = A
  Dopo  = B.next = C

PASSO 2: Bypass in avanti
  A.next = C

PASSO 3: Bypass all'indietro
  C.prev = A
  
RISULTATO:
  [A] <--> [C]    [B] (isolato)
```

---

## 10. 🔧 Debug dei Doppi Puntatori

### Test di Consistenza
Dopo ogni operazione complessa, esegui questo controllo:
```javascript
function verificaConsistenza(head) {
    let tmp = head;
    while (tmp && tmp.next) {
        // Controlla che i link siano simmetrici
        if (tmp.next.prev !== tmp) {
            console.error("ERRORE: Link asimmetrico trovato!", tmp.info);
            return false;
        }
        tmp = tmp.next;
    }
    console.log("Lista consistente ✓");
    return true;
}
```

### Errore Tipico: "Fantasma nel Mezzo"
Se inserisci un nodo `N` ma dimentichi di aggiornare `.prev` del successivo:
```
[A] --next--> [N] --next--> [B]
[A] <--prev-- [N]           [B] --prev--> [A] ← SBAGLIATO! B non sa che N esiste!
```
Scorrendo avanti: A → N → B ✓
Scorrendo indietro: B → A (N saltato!) ✗

---

## 11. 📋 Particolarità della Lista Bidirezionale

### Vantaggi rispetto alla Unidirezionale
1.  **Rimozione O(1)**: Se hai il puntatore al nodo, non devi cercare il precedente.
2.  **Scorrimento bidirezionale**: Utile per browser history, playlist musicali.
3.  **PopCoda O(1)**: Con puntatore `tail`, rimuovi dalla fine istantaneamente.

### Svantaggi
1.  **Più memoria**: Due puntatori per nodo invece di uno.
2.  **Più errori**: Ogni modifica richiede aggiornamenti simmetrici.
3.  **Codice più complesso**: Più righe di codice, più possibilità di bug.

### Quando usarla?
*   Navigazione avanti/indietro (browser, editor di testo).
*   Cache LRU (rimuovi il meno usato in O(1)).
*   Deque (inserisci/rimuovi da entrambi i lati).


