/**
 * strutture_derivate.js
 * Contiene classi wrapper per imporre comportamenti LIFO (Stack) e FIFO (Queue)
 * utilizzando le implementazioni di base delle liste.
 */

// Assumiamo che 'Lista' (unidirezionale) sia caricata globalmente da lista.js

/**
 * Classe Pila (Stack) - LIFO (Last In, First Out)
 * Utilizza una lista unidirezionale per gestire i dati.
 * Le operazioni avvengono solo in TESTA per efficienza O(1).
 */
class Pila {
    constructor() {
        this.list = new Lista(); // Composizione: la Pila "ha una" Lista
    }

    /**
     * Inserisce elemento in cima alla pila.
     * Corrisponde a pushTesta della lista.
     */
    push(info) {
        console.log(`[STACK] Push: inserisco ${info} in cima.`);
        this.list.pushTesta(info);
    }

    /**
     * Rimuove elemento dalla cima della pila.
     * Corrisponde a popTesta della lista.
     */
    pop() {
        console.log(`[STACK] Pop: rimuovo dalla cima.`);
        return this.list.popTesta();
    }

    peek() {
        if (this.list.isEmpty()) return null;
        return this.list.head.info;
    }

    clear() {
        this.list.clearList();
    }

    // Per visualizzazione
    print() {
        return this.list.print();
    }

    get head() { return this.list.head; }
}

/**
 * Classe Coda (Queue) - FIFO (First In, First Out)
 * Utilizza una lista unidirezionale (o bidirezionale, qui uni per semplicità).
 * Inserimento in CODA, estrazione in TESTA.
 */
class Coda {
    constructor() {
        this.list = new Lista();
    }

    /**
     * Accoda un elemento.
     * Corrisponde a pushCoda della lista.
     */
    enqueue(info) {
        console.log(`[QUEUE] Enqueue: accodo ${info}.`);
        this.list.pushCoda(info);
    }

    /**
     * Rimuove il primo elemento della coda.
     * Corrisponde a popTesta della lista.
     */
    dequeue() {
        console.log(`[QUEUE] Dequeue: servo il primo elemento.`);
        return this.list.popTesta();
    }

    front() {
        if (this.list.isEmpty()) return null;
        return this.list.head.info;
    }

    clear() {
        this.list.clearList();
    }

    print() {
        return this.list.print();
    }

    get head() { return this.list.head; }
}
