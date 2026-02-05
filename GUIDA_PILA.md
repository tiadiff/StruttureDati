# 📗 Guida Completa: La Pila (Stack)

Guida unificata: Teoria LIFO, Implementazione pratica e Analisi della Memoria.

---

## 1. Il Concetto LIFO
**Stack** = Last In, First Out (Ultimo dentro, Primo fuori).
Immagina una pila di piatti: puoi aggiungere o togliere solo dalla cima.

### Operazioni Fondamentali
1.  **PUSH**: Inserisce in testa. O(1).
2.  **POP**: Rimuove dalla testa. O(1).
3.  **PEEK**: Legge la testa senza rimuovere. O(1).

---

## 2. Implementazione: Array vs Lista

### La Nostra Scelta: Lista (`Pila` wrappa `Lista`)
```javascript
class Pila {
    push(val) { this.list.pushTesta(val); }
    pop() { return this.list.popTesta(); }
}
```
*   **Pro**: Tempo di esecuzione costante O(1) sempre garantito. Non serve ridimensionare la memoria.
*   **Contro**: Maggiore uso di RAM per i puntatori rispetto a un array compatto.

### Alternativa: Array (`stack = []`)
*   `push` -> `arr.push()`
*   `pop` -> `arr.pop()`
*   **Pro**: Cache locality (veloce in lettura).
*   **Contro**: Se l'array si riempie, il sistema deve copiarlo in uno più grande (costoso).

---

## 3. Iterazione e Debug
Teoricamente uno stack **NON** si iterà (si guarda solo la cima).
Tuttavia, per debug o visualizzazione:
*   **Metodo Distruttivo**: Fai `pop()` in un ciclo while finché non è vuoto. (Perdi i dati!)
*   **Metodo "Sbirciatina"**: Accedi alla struttura sottostante (la lista) e scorri i nodi con `tmp = head`. Questo non altera lo stack.

---

## 4. Teoria Profonda: Stack vs Heap (Masterclass)
In informatica esistono due tipi di "Stack":
1.  **Stack Dati**: La struttura dati che stiamo studiando.
2.  **Call Stack (Pila di Chiamata)**: Gestita dalla CPU.
    *   Ogni volta che chiami una funzione, le sue variabili locali vengono "pushate" nel Call Stack.
    *   Quando fai `return`, vengono "poppate".
    *   La **Ricorsione** usa il Call Stack. Troppe chiamate ricorsive causano "Stack Overflow".

---

## 5. ⚠️ Errori Comuni e Troubleshooting

### A. Stack Underflow
Tentare di fare `pop()` su una pila vuota.
*   **Soluzione**: Controllare sempre `if (!stack.isEmpty())` o gestire il ritorno `null`.

### B. Usare lo Stack come una Lista
Tentazione: "Voglio l'elemento che sta sotto al primo".
*   **Errore**: Se hai bisogno di accesso casuale, **NON** usare uno Stack. Usa un Array o una Lista. Lo Stack serve proprio a imporre l'accesso limitato.

### C. Pattern Ricorsivi
Quando usi uno stack per sostituire la ricorsione (es. DFS in un grafo), assicurati di inserire i nodi nell'ordine corretto, altrimenti li visiterai al contrario rispetto alla ricorsione standard.

---

## 6. Applicazioni Pratiche dello Stack

### A. Undo/Redo negli Editor
Ogni azione dell'utente (es. digitare, cancellare) viene pushata nello stack.
*   **Ctrl+Z (Undo)**: `pop()` dall'UndoStack, `push()` nel RedoStack.
*   **Ctrl+Y (Redo)**: `pop()` dal RedoStack, `push()` nell'UndoStack.

### B. Valutazione di Espressioni (Calcolatrici)
Le calcolatrici HP usano la "Notazione Polacca Inversa" (RPN).
*   Espressione: `3 4 + 5 *` significa `(3 + 4) * 5`
*   Algoritmo:
    1.  Vedo 3 → Push(3). Stack: [3]
    2.  Vedo 4 → Push(4). Stack: [3, 4]
    3.  Vedo + → Pop due volte (4, 3), calcolo 3+4=7, Push(7). Stack: [7]
    4.  Vedo 5 → Push(5). Stack: [7, 5]
    5.  Vedo * → Pop due volte (5, 7), calcolo 7*5=35, Push(35). Stack: [35]
    6.  Fine → Risultato = Pop() = 35.

### C. Verifica Parentesi Bilanciate
Problema classico: verificare che `((a+b) * (c-d))` abbia le parentesi corrette.
*   Ad ogni `(` → Push.
*   Ad ogni `)` → Pop. Se lo stack è vuoto quando provi a fare pop, o se alla fine non è vuoto → Errore.

---

## 7. Implementazione Completa in JavaScript (dal nostro progetto)

Dal file `strutture_derivate.js`:
```javascript
class Pila {
    constructor() {
        this.list = new Lista(); // Usa la lista come "motore"
    }

    push(info) {
        console.log(`[STACK] Push: ${info}`);
        this.list.pushTesta(info);
    }

    pop() {
        console.log(`[STACK] Pop`);
        return this.list.popTesta();
    }

    peek() {
        if (this.list.isEmpty()) return null;
        return this.list.head.info;
    }

    isEmpty() {
        return this.list.isEmpty();
    }

    clear() {
        this.list.clearList();
    }

    // Getter per accedere alla head (per visualizzazione)
    get head() {
        return this.list.head;
    }
}
```

---

## 8. 🎨 Diagrammi ASCII: Visualizzazione dello Stack

### Rappresentazione Verticale (Classica)
```
         +-------+
 TOP --> |   C   |  <-- Ultimo inserito, primo a uscire
         +-------+
         |   B   |
         +-------+
         |   A   |  <-- Primo inserito, ultimo a uscire
         +-------+
         | FONDO |
         +-------+
```

### Operazione PUSH("D")
```
PRIMA:                      DOPO:
+-------+                   +-------+
|   C   | <-- TOP           |   D   | <-- TOP (nuovo)
+-------+                   +-------+
|   B   |                   |   C   |
+-------+                   +-------+
|   A   |                   |   B   |
+-------+                   +-------+
                            |   A   |
                            +-------+
```

### Operazione POP()
```
PRIMA:                      DOPO:
+-------+                   +-------+
|   D   | <-- TOP (esce!)   |   C   | <-- TOP (nuovo)
+-------+                   +-------+
|   C   |                   |   B   |
+-------+                   +-------+
|   B   |                   |   A   |
+-------+                   +-------+
|   A   |                   
+-------+                   Ritorna: "D"
```

---

## 9. 🔧 Pattern Avanzati con lo Stack

### Inversione di una Stringa
```javascript
function inverti(stringa) {
    let stack = new Pila();
    for (let char of stringa) stack.push(char);
    
    let risultato = "";
    while (!stack.isEmpty()) risultato += stack.pop();
    
    return risultato;
}
inverti("HELLO") // → "OLLEH"
```

### Conversione da Ricorsione a Iterazione
Ogni funzione ricorsiva può essere riscritta con uno Stack esplicito.
```javascript
// Ricorsivo (usa Call Stack implicito)
function fattoriale(n) {
    if (n <= 1) return 1;
    return n * fattoriale(n - 1);
}

// Iterativo con Stack esplicito
function fattorialeIterativo(n) {
    let stack = [];
    while (n > 1) { stack.push(n); n--; }
    
    let risultato = 1;
    while (stack.length > 0) risultato *= stack.pop();
    
    return risultato;
}
```

---

## 10. 📋 Particolarità dello Stack

### Caratteristiche Uniche
1.  **Accesso limitato**: Solo la cima è visibile. Questo è un *vincolo*, non un difetto.
2.  **Ordine LIFO garantito**: Nessun modo di "barare" e accedere al fondo.
3.  **Operazioni O(1)**: Push, Pop, Peek sono tutte istantanee.

### Quando usare lo Stack?
*   Undo/Redo in applicazioni.
*   Parsing di espressioni matematiche.
*   Backtracking (labirinti, Sudoku solver).
*   Gestione della chiamata di funzioni (Call Stack).

### Quando NON usare lo Stack?
*   Se hai bisogno di accedere a elementi nel mezzo.
*   Se l'ordine di uscita deve essere FIFO (usa una Coda).
*   Se devi cercare un elemento specifico (usa una Lista o Set).


