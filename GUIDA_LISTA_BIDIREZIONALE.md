# 📘 Guida Completa: Lista Bidirezionale (Doubly Linked List)

## 1. Architettura Avanzata
La Lista Bidirezionale offre simmetria: posso andare da A a B e da B ad A.
Il costo è:
1.  **Memoria**: Ogni nodo pesa di più (un puntatore extra `prev`).
2.  **Manutenzione**: Ogni inserimento/rimozione richiede di aggiornare fino a 4 link invece di 2.

### Diagramma "Insert Middle" (Inserimento di X tra A e B)
In una lista singola aggiorniamo 2 link. Qui ne aggiorniamo 4.
```
      prev     next           prev     next
   <------[A]------>       <------[B]------>
```
Vogliamo inserire `[X]`.

**Sequenza Corretta**:
1.  `X.prev = A`
2.  `X.next = B`
3.  `B.prev = X` (Attenzione: verificare se B esiste!)
4.  `A.next = X`

---

## 2. Il Concetto di "Sentinel Node" (Nodi Sentinella)
Nelle implementazioni professionali (come in C++ `std::list` o Java `LinkedList`), per semplificare il codice ed eliminare i casi limite (lista vuota, inserimento in testa/coda), si usano nodi "fantasma" ai bordi.

*   `SentinellaTesta`: Un nodo dummy all'inizio.
*   `SentinellaCoda`: Un nodo dummy alla fine.

**Vantaggio**:
La lista "vera" sta in mezzo. Non bisogna mai controllare `if (head == null)` o aggiornare `head`, perché le sentinelle non cambiano mai.
*Nel nostro progetto didattico non usiamo sentinelle per mostrare la logica "nuda e cruda" dei puntatori.*

---

## 3. Algoritmi di Ricerca Ottimizzata
Poiché la lista è bidirezionale, possiamo ottimizzare la ricerca (`search`) se conosciamo la lunghezza e manteniamo un puntatore `tail`.

**Algoritmo "Smart Search"**:
Se cerchiamo l'elemento in posizione `K` su `N` totali:
*   Se `K < N / 2`: Parti da `head` e vai avanti (`next`).
*   Se `K > N / 2`: Parti da `tail` e vai indietro (`prev`).

Questo dimezza il tempo medio di ricerca, pur rimanendo O(N).

---

## 4. Cancellazione O(1)
Questo è il vero "superpotere" della lista bidirezionale.
In una lista singola, per cancellare un nodo `X` devi avere il puntatore al nodo *prima* di lui (O(N) per trovarlo).
Nella lista bidirezionale, se hai un puntatore a `X`, puoi cancellarlo istantaneamente:
```javascript
function deleteNode(X) {
    let prima = X.prev;
    let dopo  = X.next;
    
    if (prima) prima.next = dopo;
    if (dopo)  dopo.prev = prima;
    
    // X è isolato
}
```
Questo è fondamentale nelle cache LRU (Least Recently Used) o nei browser history.

---

## 5. Troubleshooting Avanzato
Oltre agli errori base, verifica sempre:

### Disconnessione "Zombie"
Se rimuovi un nodo impostando `A.next = B`, ma ti dimentichi di fare `B.prev = A`, allora scendendo la lista va tutto bene, ma risalendola (`B.prev`) finirai nel nodo "cancellato" o nel nulla.
*   **Test**: Dopo ogni operazione, prova a scorrere la lista dall'inizio alla fine E dalla fine all'inizio. Devono corrispondere.

### Circular Reference Leak
Se per errore colleghi `A.next = A`, crei un ciclo infinito. Se un algoritmo di stampa non ha protezioni, il browser si bloccherà (freeze).
