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

---

## 10. 🎨 Diagrammi ASCII: Visualizzazione delle Operazioni

### Inserimento in Testa (pushTesta)
```
STATO INIZIALE:
  HEAD --> [A|•]--> [B|•]--> [C|∅]
  
OPERAZIONE: pushTesta("X")

PASSO 1: Creo nodo X
  [X|?]   HEAD --> [A|•]--> [B|•]--> [C|∅]

PASSO 2: X.link = HEAD (X punta ad A)
  [X|•]----------> [A|•]--> [B|•]--> [C|∅]
         HEAD -----^

PASSO 3: HEAD = X
  HEAD --> [X|•]--> [A|•]--> [B|•]--> [C|∅]
```

### Inserimento Centrale (pushDopoNodo)
```
STATO INIZIALE: Inserire "N" dopo "A"
  HEAD --> [A|•]--> [B|•]--> [C|∅]

ERRORE COMUNE (ordine sbagliato):
  A.link = N  PRIMA di salvare B
  HEAD --> [A|•]--> [N|?]    [B|•]--> [C|∅]  <-- B È PERSO!

ORDINE CORRETTO:
  Passo 1: N.link = A.link (cioè N punta a B)
  Passo 2: A.link = N
  
  HEAD --> [A|•]--> [N|•]--> [B|•]--> [C|∅]
```

### Rimozione dalla Coda (popCoda)
```
STATO INIZIALE:
  HEAD --> [A|•]--> [B|•]--> [C|∅]
                     ^
                    tmp (penultimo)

OPERAZIONE:
  tmp.link = null
  
RISULTATO:
  HEAD --> [A|•]--> [B|∅]    [C] (isolato, verrà raccolto dal GC)
```

---

## 11. 🔧 Gestione Avanzata dei Puntatori

### Il Puntatore Temporaneo (tmp)
In molte operazioni usiamo una variabile `tmp` per scorrere la lista senza perdere `head`.

**Regola d'oro**: MAI modificare `head` durante lo scorrimento!
```javascript
// ❌ SBAGLIATO
while (head !== null) {
    head = head.link; // Stai spostando head! Perderai la lista!
}

// ✅ CORRETTO
let tmp = head;
while (tmp !== null) {
    tmp = tmp.link; // Modifichi solo tmp
}
```

### Controllo Preventivo (Guard Clause)
Prima di accedere a `.link` o `.info`, verifica sempre che il nodo esista:
```javascript
// ❌ Potenziale crash
if (tmp.link.info === target) { ... }

// ✅ Sicuro
if (tmp.link && tmp.link.info === target) { ... }
```

---

## 12. 📋 Particolarità della Lista Unidirezionale

### Vantaggi
1.  **Semplicità**: Struttura minimale, facile da capire e implementare.
2.  **Memoria efficiente**: Solo un puntatore per nodo.
3.  **Inserimento in testa O(1)**: Operazione instantanea.

### Svantaggi
1.  **Nessun accesso diretto**: Per raggiungere il nodo N, devi partire da head e scorrere N-1 nodi.
2.  **Rimozione dalla coda costosa**: Devi trovare il penultimo → O(N).
3.  **Nessun ritorno**: Non puoi tornare al nodo precedente una volta passato.

### Quando usarla?
*   Code di esecuzione semplici (i task vengono processati dalla testa).
*   Implementazione di Stack (solo push/pop in testa).
*   Quando la memoria è critica (meno overhead rispetto alla bidirezionale).


