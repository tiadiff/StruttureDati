# 📗 Guida allo Studio: La Pila (Stack)

## 1. Il Concetto LIFO
**Stack** = Last In, First Out.
Solo l'elemento in cima è accessibile.

---

## 2. Le Operazioni Fondamentali
*   **PUSH**: Inserisce in cima (Testa). O(1).
*   **POP**: Rimuove dalla cima (Testa). O(1).
*   **PEEK**: Legge la cima senza rimuovere. O(1).

---

## 3. Ciclare uno Stack: Si può fare?

### Concettualmente: NO
Nella teoria pura degli Stack, **NON** dovresti poter guardare cosa c'è sotto la cima senza rimuovere (fare `pop`) gli elementi sopra. Iterare uno stack dall'alto in basso è un'operazione che "viola" l'astrazione, oppure richiede di svuotare lo stack.

### Praticamente: SI (In fase di Debug)
Poiché la nostra implementazione `Pila` è un wrapper attorno a una `Lista`, possiamo "barare" e usare il metodo `print()` della lista interna per vedere tutto il contenuto.

**Pattern di iterazione corretto (distruttivo):**
```javascript
while (!stack.isEmpty()) {
    let dato = stack.pop();
    processa(dato);
}
// Ora lo stack è vuoto!
```

---

## 4. Altre Funzioni Tipiche

### `isEmpty()`
Restituisce `true` se lo stack non ha elementi. Fondamentale per evitare errori di *Stack Underflow* (tentare di fare `pop` su una pila vuota).

### `size()`
Restituisce il numero di elementi. Spesso mantenuto in una variabile contatore aggiornata a ogni push/pop per evitare di contare i nodi ogni volta (O(1) vs O(N)).

### `clear()`
Svuota rapidamente la pila (`head = null`).

### `clone()`
Crea una copia esatta dello stack ausiliario, permettendo di operare sui dati senza distruggere lo stack originale.
