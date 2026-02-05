# 📘 Guida Completa: La Pila (Stack)

## 1. Teoria Profonda: Stack vs Heap
In informatica il termine "Stack" si usa in due contesti fondamentali:

1.  **Stack Struttura Dati** (quella che abbiamo fatto noi): Un contenitore LIFO gestito dal programmatore.
2.  **Call Stack (Pila di Chiamata)**: Una struttura gestita dalla CPU/Compilatore per tracciare le funzioni attive.
    *   Quando chiami `funcA()`, viene fatto il **Push** dei suoi parametri e variabili locali nello stack.
    *   Quando `funcA()` chiama `funcB()`, `funcB` viene pushata sopra.
    *   Quando `funcB()` finisce (`return`), viene fatto il **Pop** e si torna a `funcA`.

---

## 2. Implementazione: Array vs Linked List

### Stack Basato su Array
```javascript
let stack = [];
stack.push(1); // O(1) ammortizzato
stack.pop();   // O(1)
```
*   **Pro**: I dati sono contigui in memoria (Cache Friendly, molto veloci da leggere).
*   **Contro**: Se l'array si riempie, bisogna riallocarlo raddoppiando la dimensione (costoso, anche se raro).

### Stack Basato su Lista (Il Nostro)
```javascript
list.pushTesta(1); // O(1) garantito
list.popTesta();   // O(1) garantito
```
*   **Pro**: Non si riempie mai (limitato solo dalla RAM totale). `Push` ha sempre tempo costante preciso (ottimo per sistemi Real-Time).
*   **Contro**: Usa più memoria per i puntatori. Meno cache-friendly (nodi sparsi in RAM).

---

## 3. Applicazioni Reali Avanzate

### Backtracking (Es. Labirinto)
Per risolvere un labirinto, usi uno Stack:
1.  Vai avanti e fai **Push** di ogni incrocio.
2.  Se arrivi a un vicolo cieco, fai **Pop** per tornare all'ultimo incrocio e provi un'altra strada.

### Parsing di Espressioni (Notazione Polacca Inversa)
Le calcolatrici valutano `3 4 +` usando uno stack:
1.  Vedo 3 -> Push.
2.  Vedo 4 -> Push.
3.  Vedo + -> Pop due volte (4, 3), sommo (7), Push risultato (7).

---

## 4. Pattern di Sicurezza
Il metodo `pop()` è pericoloso.
Un pattern sicuro ("TryPop") in linguaggi come C# o Swift è:
```
bool TryPop(out result) {
   if (isEmpty) return false;
   result = ...
   return true;
}
```
In JavaScript, restituiamo `null` o `undefined`, ma chi usa la classe deve sempre controllare prima.

---

## 5. Esercizio Mentale: Stack con Minimo O(1)
Sfida: Creare uno Stack che, oltre a push/pop, restituisca il valore minimo contenuto (`getMin`) in tempo O(1).
*Soluzione*: Non basta scorrere (sarebbe O(N)). Si mantiene un **secondo Stack parallelo** che tiene traccia solo dei minimi visti finora.
