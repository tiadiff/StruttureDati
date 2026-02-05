/**
 * Classe NodoBi (Bidirezionale)
 */
class NodoBi {
    constructor(info) {
        this.info = info;
        this.prev = null; // Riferimento al precedente
        this.next = null; // Riferimento al successivo
    }
}

/**
 * Classe ListaBi
 */
class ListaBi {
    constructor() {
        this.head = null;
        // In una lista bidirezionale spesso si tiene anche 'tail', 
        // ma per seguire la logica didattica manuale useremo lo scorrimento
        // o aggiorneremo i puntatori dinamicamente.
    }

    isEmpty() {
        return this.head === null;
    }

    /**
     * Inserisci in Testa (LIFO/Stack Push)
     */
    pushTesta(info) {
        console.log(`[ALGORITMO] Init: Creazione NodoBi(${info})`);
        const n = new NodoBi(info);

        if (this.isEmpty()) {
            console.log(`[ALGORITMO] Lista vuota. head = n`);
            this.head = n;
        } else {
            console.log(`[ALGORITMO] 1) n.next = head`);
            n.next = this.head;

            console.log(`[ALGORITMO] 2) head.prev = n (collegamento inverso)`);
            this.head.prev = n;

            console.log(`[ALGORITMO] 3) head = n`);
            this.head = n;
        }
        console.log(`[RISULTATO] Inserito in testa: ${info}`);
    }

    /**
     * Inserisci in Coda (FIFO/Queue Push)
     */
    pushCoda(info) {
        console.log(`[ALGORITMO] Init: Creazione NodoBi(${info})`);
        const n = new NodoBi(info);

        if (this.isEmpty()) {
            this.head = n;
            console.log(`[ALGORITMO] Lista vuota. head = n`);
        } else {
            console.log(`[ALGORITMO] Init tmp = head. Scorro fino alla fine.`);
            let tmp = this.head;
            while (tmp.next !== null) {
                tmp = tmp.next;
            }

            console.log(`[ALGORITMO] Trovato ultimo. 1) tmp.next = n`);
            tmp.next = n;

            console.log(`[ALGORITMO] 2) n.prev = tmp (collegamento inverso)`);
            n.prev = tmp;
        }
        console.log(`[RISULTATO] Inserito in coda: ${info}`);
    }

    pushDopoNodo(info, targetInfo) {
        let tmp = this.head;
        while (tmp !== null) {
            if (tmp.info === targetInfo) {
                console.log(`[ALGORITMO] Trovato ${targetInfo}. Creo n(${info})`);
                const n = new NodoBi(info);

                // Collegamento in avanti
                n.next = tmp.next;
                tmp.next = n;

                // Collegamento all'indietro
                n.prev = tmp;

                // Se c'è un nodo successivo, aggiorno il suo prev
                if (n.next !== null) {
                    console.log(`[ALGORITMO] Aggiorno prev del successivo: n.next.prev = n`);
                    n.next.prev = n;
                }

                console.log(`[RISULTATO] Inserito ${info} dopo ${targetInfo}`);
                return;
            }
            tmp = tmp.next;
        }
    }

    // In lista bidirezionale, pushPrima è più semplice se ho il riferimento al nodo,
    // ma qui cerchiamo per valore, quindi scorriamo uguale o usiamo logica simile.
    pushPrimaNodo(info, targetInfo) {
        if (this.isEmpty()) return;

        if (this.head.info === targetInfo) {
            this.pushTesta(info);
            return;
        }

        let tmp = this.head;
        while (tmp !== null) {
            if (tmp.info === targetInfo) {
                console.log(`[ALGORITMO] Trovato target ${targetInfo}. Creo n(${info})`);
                const n = new NodoBi(info);

                const precedente = tmp.prev;

                // Inserisco tra 'precedente' e 'tmp'

                // 1. Collega n
                n.next = tmp;
                n.prev = precedente;

                // 2. Aggiorno vicini
                tmp.prev = n;
                if (precedente !== null) {
                    precedente.next = n;
                }

                console.log(`[RISULTATO] Inserito ${info} prima di ${targetInfo}`);
                return;
            }
            tmp = tmp.next;
        }
    }

    /**
     * Rimuovi dalla Testa (Pop LIFO & FIFO)
     */
    popTesta() {
        if (this.isEmpty()) return null;

        const out = this.head;
        console.log(`[ALGORITMO] Rimuovo testa: ${out.info}`);

        if (this.head.next === null) {
            // Unico elemento
            this.head = null;
        } else {
            console.log(`[ALGORITMO] head = head.next`);
            this.head = this.head.next;

            console.log(`[ALGORITMO] head.prev = null (scollego il vecchio head)`);
            this.head.prev = null;
        }

        out.next = null;
        console.log(`[RISULTATO] Estratto dalla testa: ${out.info}`);
        return out.info;
    }

    popCoda() {
        if (this.isEmpty()) return null;

        if (this.head.next === null) {
            return this.popTesta();
        }

        let tmp = this.head;
        while (tmp.next !== null) {
            tmp = tmp.next;
        }
        // tmp è l'ultimo
        const out = tmp;

        console.log(`[ALGORITMO] Rimuovo ultimo: ${out.info}`);

        // Il penultimo diventa l'ultimo
        tmp.prev.next = null;
        tmp.prev = null;

        console.log(`[RISULTATO] Estratto dalla coda: ${out.info}`);
        return out.info;
    }

    popDopoNodo(targetInfo) {
        let tmp = this.head;
        while (tmp !== null) {
            if (tmp.info === targetInfo) {
                if (tmp.next === null) return null; // Nulla dopo

                const out = tmp.next;
                console.log(`[ALGORITMO] Rimuovo ${out.info} (dopo ${tmp.info})`);

                // Scavalco out
                tmp.next = out.next;
                if (out.next !== null) {
                    out.next.prev = tmp;
                }

                out.prev = null;
                out.next = null;

                console.log(`[RISULTATO] Estratto ${out.info}`);
                return out.info;
            }
            tmp = tmp.next;
        }
    }

    popPrimaNodo(targetInfo) {
        let tmp = this.head;
        while (tmp !== null) {
            if (tmp.info === targetInfo) {
                if (tmp.prev === null) return null; // Nulla prima (è head)

                const out = tmp.prev; // Il nodo da rimuovere
                console.log(`[ALGORITMO] Rimuovo ${out.info} (prima di ${tmp.info})`);

                if (out.prev === null) {
                    // Era la testa
                    return this.popTesta();
                } else {
                    // Caso generico centrale
                    const prePre = out.prev;
                    prePre.next = tmp;
                    tmp.prev = prePre;

                    out.next = null;
                    out.prev = null;
                }
                console.log(`[RISULTATO] Estratto ${out.info}`);
                return out.info;
            }
            tmp = tmp.next;
        }
    }

    clearList() {
        this.head = null;
        console.log("[RISULTATO] Lista svuotata.");
    }
}
