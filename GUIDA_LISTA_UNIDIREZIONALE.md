# 📘 Guida Completa: Lista Unidirezionale (Singly Linked List)

## 1. Introduzione e Concetti Core
La **Lista Unidirezionale** è la forma più semplice di struttura collegata.
A differenza degli array, che sono come condomini (appartamenti contigui numerati 0, 1, 2...), la lista è come una **caccia al tesoro**: ogni tappa contiene un indizio (il puntatore) per trovare la tappa successiva.

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

## 2. Analisi Algoritmica Approfondita

### A. Inserimento in Testa (O(1))
*Scenario*: Vogliamo inserire "X" prima di "A".
1.  **Allocazione**: Viene creato il nodo X in una nuova cella di memoria libera (es. `0x099`).
2.  **Collegamento**: `X.link` viene impostato su `HEAD` (che punta ad A).
3.  **Aggiornamento**: `HEAD` viene spostato su `X`.
```
   HEAD -> [A]...
      
   [X] -> [A]...  (X punta ad A)
   
   HEAD -> [X] -> [A]... (Head punta a X)
```

### B. Inserimento Centrale (O(N))
*Scenario*: Inserire "X" tra "A" e "B".
Richiede un puntatore temporaneo (`tmp`) per trovare "A".

**Diagramma dei Puntatori**:
```
Stato Iniziale:
   [A] ----------> [B]
    ^
   tmp

Passo 1: Creazione e collegamento "in avanti"
   [A]             [B]
    |               ^
    |      [X]------+
    |     (X.link = B)

Passo 2: Ricollegamento "dal precedente"
   [A]------------>[X]------------>[B]
   (A.link = X)    (X ha già link a B)
```
> ⚠️ **Punto Critico**: Se eseguiamo il Passo 2 prima del Passo 1, `A` punterà a `X`, ma `X` non saprà dove trovare `B`. Il riferimento a `B` sarà perso per sempre (Memory Leak).

### C. Rimozione dalla Coda (PopCoda)
*Scenario*: Rimuovere l'ultimo elemento.
Dobbiamo fermarci al **penultimo** nodo per poter mettere il suo link a `null`.
*   **Condizione ciclo**: `while (tmp.link.link !== null)`
*   Se ci fermassimo all'ultimo (`tmp.link === null`), non avremmo accesso al penultimo per modificare il suo puntatore!
*   **Edge Case**: Se la lista ha 1 solo nodo, questo algoritmo fallisce (perché `link.link` non esiste). Serve un controllo preventivo `if (head.link === null)`.

---

## 3. Gestione della Memoria e Garbage Collection
In JavaScript, non liberiamo manualmente la memoria (come `free()` in C).
Quando eseguiamo `popTesta()`:
```javascript
head = head.link; // La testa avanza al secondo nodo
```
Il vecchio primo nodo non è più puntato da nessuno ("unreachable"). Il **Garbage Collector** del browser si accorge che quel nodo è isolato e libera automaticamente la memoria.

---

## 4. Pattern di Traversamento Avanzati

### Ricorsione
Le liste possono essere percorse ricorsivamente.
```javascript
function stampaRicorsiva(nodo) {
    if (nodo === null) return; // Caso base
    console.log(nodo.info);    // Azione
    stampaRicorsiva(nodo.link);// Chiamata ricorsiva
}
```
*   **Pro**: Codice elegante.
*   **Contro**: Se la lista è enorme (es. 10.000 nodi), si rischia lo **Stack Overflow** (pieno della memoria di chiamata).

### Tecnica dei due puntatori (Tortoise & Hare)
Usata per rilevare cicli (loop infiniti) o trovare il punto medio.
*   `Slow`: Avanza di 1 nodo alla volta.
*   `Fast`: Avanza di 2 nodi alla volta.
*   Se `Fast` raggiunge la fine, non c'è ciclo. Se `Fast` incontra `Slow`, c'è un ciclo!

---

## 5. Troubleshooting: Casi Limite (Edge Cases)
Quando scrivi algoritmi sulle liste, controlla sempre mentalmente questi scenari:
1.  **Lista Vuota**: Il codice esplode se `head` è null?
2.  **Lista con 1 Nodo**: Se rimuovi l'unico nodo, `head` diventa correttamente `null`?
3.  **Operazione sulla Testa**: Se inserisci/rimuovi in testa, aggiorni `head`?
4.  **Operazione sulla Coda**: Gesti correttamente il `null` finale?
