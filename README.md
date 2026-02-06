# 📘 Visualizzatore di Strutture Dati

Questo progetto è uno strumento didattico avanzato per l'apprendimento delle strutture dati lineari.<br><br>A differenza di un semplice tutorial, questa applicazione implementa da zero le classi fondamentali (`LinkedList`, `DoublyLinkedList`, `Stack`, `Queue`) e ne visualizza il comportamento in tempo reale, offrendo un log dettagliato delle operazioni sui puntatori.

---

## 🛠 Istruzioni per l'Esecuzione Locale

Poiché il progetto utilizza solo HTML, CSS e JavaScript standard (senza framework o compilatori), è eseguibile immediatamente:

1.  Clona il repository (o scarica lo ZIP con tutti i files del progetti).

2.  Apri il file **`index.html`** con un qualsiasi browser.

3.  Non è necessario alcun server locale (MAMP, Node.js, Apache ecc.).

---

# 1. 🔗 Lista Unidirezionale (Singly Linked List)

La struttura dati fondamentale. È una sequenza di nodi in cui ogni nodo conosce solo il suo successore.

### Struttura del Nodo
Ogni `Nodo` è un oggetto composto da:
*   `info`: Il dato vero e proprio.
*   `link`: Un **puntatore** (riferimento di memoria) al prossimo nodo. Se è l'ultimo nodo, `link` è `null`.

### 🧠 Algoritmi e Gestione Puntatori

#### A. Inserimento in Testa (`pushTesta`)
*Complessità: O(1)*
Inseriamo un nodo `N` prima dell'attuale `head`.
1.  Creo `N`.
2.  **Collegamento**: `N.link = head`. (Il nuovo nodo punta a quello che *era* il primo).
3.  **Aggiornamento**: `head = N`. (Il sistema riconosce `N` come nuovo inizio).

#### B. Inserimento in Coda (`pushCoda`)
*Complessità: O(N)*
Dobbiamo trovare l'ultimo nodo per fargli puntare il nuovo.
1.  Se `head` è `null`, diventa `head = N`.
2.  Altrimenti, creo un puntatore temporaneo `tmp = head`.
3.  **Traversamento**: Eseguo `tmp = tmp.link` finché `tmp.link` non è `null`.
4.  **Collegamento**: `tmp.link = N`. (L'ex ultimo nodo ora punta a `N`).

#### C. Inserimento "Dopo" un Nodo (`pushDopoNodo`)
Vogliamo inserire `N` tra `A` (target) e `B` (il successivo di A).
**Logica Puntatori:**
1.  Scorro la lista con `tmp` fino a trovare `A`.
2.  **Puntatore 1**: `N.link = tmp.link` (Collego `N` a `B`).
    *   *Nota*: Se facessi prima il passo 3, perderei per sempre il riferimento a `B`!
3.  **Puntatore 2**: `tmp.link = N` (Collego `A` a `N`).

---

# 2. ↔️ Lista Bidirezionale (Doubly Linked List)

Più flessibile ma complessa: ogni nodo ha **due** puntatori. <br>Questo permette di "tornare indietro" ma richiede doppia manutenzione ad ogni modifica.

### Struttura del NodoBi
*   `info`: Dato.
*   `prev`: Puntatore al nodo precedente (`null` se è la testa).
*   `next`: Puntatore al nodo successivo (`null` se è la coda).

### 🧠 Algoritmi e Gestione Puntatori

#### A. Inserimento in Testa
1.  Creo `N`.
2.  `N.next = head`.
3.  **Retro-link**: Se la lista non era vuota (`head != null`), imposto `head.prev = N`. Questo è il passo fondamentale che manca nella lista unidirezionale.
4.  `head = N`.
5.  `N.prev` nasce già `null`, corretto per la nuova testa.

#### B. Inserimento "Prima" di un Nodo (`pushPrimaNodo`)
Vogliamo inserire `N` prima di un nodo `T` (Target). Supponiamo che prima di `T` ci sia `P` (Precedente).
Configurazione Iniziale: `P <-> T`
Obiettivo: `P <-> N <-> T`

**Logica Puntatori:**
1.  Trovo `T` scorrendo.
2.  Identifico `P` come `T.prev`.
3.  **Collegamenti di N**:
    *   `N.next = T`
    *   `N.prev = P`
4.  **Aggiornamento Vicini**:
    *   `T.prev = N` (Il target ora punta indietro a N).
    *   Se `P` esiste (non eravamo in testa), `P.next = N` (Il precedente punta avanti a N).
    *   Se `P` non esiste, significa che `T` era la testa, quindi aggiorno `head = N`.

#### C. Rimozione di un Nodo Centrale
Per rimuovere un nodo `X` situato tra `A` e `B` (`A <-> X <-> B`):
1.  **Bypass in Avanti**: `A.next = B`. (A punta direttamente a B).
2.  **Bypass all'Indietro**: `B.prev = A`. (B punta direttamente ad A).
3.  *Pulizia*: `X.next = null`, `X.prev = null` (Per aiutare il Garbage Collector).

---

# 3. 📚 Pila (Stack) - LIFO

Struttura **Last In, First Out** (Ultimo dentro, Primo fuori). <br>È concettualmente una "pila di piatti".

### Implementazione Logica
Sebbene usiamo internamente una lista, l'interfaccia della classe `Pila` (in `strutture_derivate.js`) blocca qualsiasi operazione che non sia sulla cima (Testa).

*   **Algoritmo Push**: È esattamente una `pushTesta`. Non scorriamo mai la lista. O(1).
*   **Algoritmo Pop**: È esattamente una `popTesta`. Rimuove l'ultimo elemento inserito. O(1).
*   *Vincolo*: Non è fisicamente possibile accedere o rimuovere elementi dal fondo o dal centro senza rimuovere prima tutti quelli sopra.

---

# 4. 🚶 Coda (Queue) - FIFO

Struttura **First In, First Out** (Primo dentro, Primo fuori). <br>È come una fila alla posta.

### Implementazione Logica
Usiamo una lista imponendo vincoli opposti allo Stack.

*   **Algoritmo Enqueue (Accoda)**:
    *   È una `pushCoda`.
    *   Si scorre la lista fino all'ultimo nodo e si aggancia il nuovo.
    *   *Complessità*: O(N) nella nostra implementazione didattica (in produzione si manterrebbe un puntatore `user_tail` per farlo in O(1)).
*   **Algoritmo Dequeue (Servi)**:
    *   È una `popTesta`.
    *   Si preleva l'elemento che è nella lista da più tempo (la testa).
    *   Il puntatore `head` avanza al secondo elemento (`head = head.link`).

---

*Progetto sviluppato a scopo didattico per l'analisi approfondita delle strutture dati in memoria.*
