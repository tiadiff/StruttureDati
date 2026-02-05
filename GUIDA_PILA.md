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
