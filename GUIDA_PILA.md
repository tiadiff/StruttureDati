# 📗 Guida allo Studio: La Pila (Stack)

## 1. Il Concetto di Stack
Lo **Stack** è una struttura dati astratta che segue rigorosamente il principio **LIFO** (Last In, First Out).
*   L'ultimo elemento inserito è il primo ad essere rimosso.
*   Pensate a una pila di piatti: metti un piatto sopra l'altro. Per prendere quello in fondo, devi togliere tutti quelli sopra.

---

## 2. Le Operazioni Fondamentali

In uno Stack puro, esistono solo due operazioni di modifica:

### A. PUSH (Spingi)
Inserisce un elemento **in cima** alla pila.
*   Corrisponde a: `pushTesta` in una lista concatenata.
*   Non è permesso inserire "in mezzo" o "in fondo".

### B. POP (Salta fuori)
Rimuove e restituisce l'elemento **in cima**.
*   Corrisponde a: `popTesta` in una lista concatenata.
*   Non è permesso rimuovere un elemento dal fondo senza svuotare la pila.

### C. PEEK (Sbircia)
Guarda l'elemento in cima senza rimuoverlo. Utile per controllare cosa c'è "sopra" prima di agire.

---

## 3. Implementazione nel Codice (`strutture_derivate.js`)

Nel nostro progetto, abbiamo implementato la Pila usando una **Lista Unidirezionale** come base. Questo è un esempio perfetto di **Incapsulamento** o composizione.

```javascript
class Pila {
    constructor() {
        this.list = new Lista(); // La 'memoria' dello stack
    }

    push(info) {
        // Usiamo SOLO pushTesta per garantire LIFO
        this.list.pushTesta(info);
    }

    pop() {
        // Usiamo SOLO popTesta
        return this.list.popTesta();
    }
}
```

Perché usiamo la lista? Perché l'inserimento e la rimozione in testa sono operazioni **O(1)** (immediate), indipendentemente da quanto è grande la pila. Se usassimo un array e facessimo `unshift` (inserire all'inizio), dovremmo spostare tutti gli indici ogni volta (O(N)).

---

## 4. Applicazioni Reali
Dove si usano gli Stack?
*   **Undo/Redo (Annulla/Ripeti)** negli editor di testo: ogni azione viene messa in uno stack. CTRL+Z fa il "pop" dell'ultima azione.
*   **Chiamate a Funzione (Call Stack)**: Quando un programma chiama una funzione, salva lo stato attuale nello stack. Quando la funzione finisce, fa "pop" per tornare dove era rimasto.
*   **Analisi Sintattica**: Controllare parentesi bilanciate `(( ))` nel codice.
