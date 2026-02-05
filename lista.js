/**
 * Classe Nodo
 * Rappresenta un singolo elemento della lista.
 */
class Nodo {
    constructor(info) {
        this.info = info; // Il dato contenuto nel nodo
        this.link = null; // Riferimento al prossimo nodo (inizialmente null)
    }
}

/**
 * Classe Lista
 * Gestisce la lista concatenata unidirezionale.
 */
class Lista {
    constructor() {
        this.head = null; // Riferimento al primo nodo della lista (testa)
    }

    /**
     * Verifica se la lista è vuota.
     * @returns {boolean} true se la lista è vuota, altrimenti false.
     */
    isEmpty() {
        return this.head === null;
    }

    /**
     * Inserisce un elemento in coda (alla fine della lista).
     * @param {*} info - Il dato da inserire.
     */
    pushCoda(info) {
        console.log(`[ALGORITMO] Init: Creazione nodo con info=${info}`);
        const n = new Nodo(info);

        if (this.isEmpty()) {
            console.log(`[ALGORITMO] Lista vuota: head = n`);
            this.head = n;
        } else {
            console.log(`[ALGORITMO] Lista non vuota. Init tmp = head`);
            let tmp = this.head;

            while (tmp.link !== null) {
                console.log(`[ALGORITMO] tmp.link != null. Avanzo: tmp = tmp.link`);
                tmp = tmp.link;
            }
            console.log(`[ALGORITMO] Trovato ultimo nodo. Collego: tmp.link = n`);
            tmp.link = n;
        }
        console.log(`[RISULTATO] Inserito in coda: ${info}`);
    }

    /**
     * Inserisce un elemento in testa (all'inizio della lista).
     * @param {*} info - Il dato da inserire.
     */
    pushTesta(info) {
        console.log(`[ALGORITMO] Init: Creazione nodo con info=${info}`);
        const n = new Nodo(info);

        console.log(`[ALGORITMO] 1) n.link = head (collego il vecchio primo nodo al nuovo)`);
        n.link = this.head;

        console.log(`[ALGORITMO] 2) head = n (il nuovo nodo diventa la testa)`);
        this.head = n;

        console.log(`[RISULTATO] Inserito in testa: ${info}`);
    }

    /**
     * Inserisce un elemento dopo un determinato nodo (cercato per valore).
     * @param {*} info - Il dato da inserire.
     * @param {*} targetInfo - Il valore del nodo dopo cui inserire.
     */
    pushDopoNodo(info, targetInfo) {
        console.log(`[ALGORITMO] Init tmp = head per cercare ${targetInfo}`);
        let tmp = this.head;

        while (tmp !== null) {
            if (tmp.info === targetInfo) {
                console.log(`[ALGORITMO] Trovato target (${targetInfo}). Creo nodo ${info}`);
                const n = new Nodo(info);

                console.log(`[ALGORITMO] 1) n.link = tmp.link (il nuovo punta al successivo del target)`);
                n.link = tmp.link;

                console.log(`[ALGORITMO] 2) tmp.link = n (il target punta al nuovo)`);
                tmp.link = n;

                console.log(`[RISULTATO] Inserito ${info} dopo ${targetInfo}`);
                return;
            }
            console.log(`[ALGORITMO] tmp.info != ${targetInfo}. Avanzo: tmp = tmp.link`);
            tmp = tmp.link;
        }
        console.log(`[RISULTATO] Nodo con valore ${targetInfo} non trovato.`);
    }

    /**
     * Inserisce un elemento prima di un determinato nodo.
     * @param {*} info 
     * @param {*} targetInfo 
     */
    pushPrimaNodo(info, targetInfo) {
        if (this.isEmpty()) {
            console.log("[ALGORITMO] Lista vuota.");
            return;
        }

        if (this.head.info === targetInfo) {
            console.log(`[ALGORITMO] Il target è la testa. Chiamo pushTesta.`);
            this.pushTesta(info);
            return;
        }

        console.log(`[ALGORITMO] Init tmp = head. Cerco nodo il cui SUCCESSIVO (tmp.link) è ${targetInfo}`);
        let tmp = this.head;

        while (tmp.link !== null) {
            if (tmp.link.info === targetInfo) {
                console.log(`[ALGORITMO] Trovato pre-target (info=${tmp.info}). Creo nodo ${info}`);
                const n = new Nodo(info);

                console.log(`[ALGORITMO] 1) n.link = tmp.link (il nuovo punta al target)`);
                n.link = tmp.link;

                console.log(`[ALGORITMO] 2) tmp.link = n (il pre-target punta al nuovo)`);
                tmp.link = n;

                console.log(`[RISULTATO] Inserito ${info} prima di ${targetInfo}`);
                return;
            }
            console.log(`[ALGORITMO] tmp.link.info != ${targetInfo}. Avanzo: tmp = tmp.link`);
            tmp = tmp.link;
        }
        console.log(`[RISULTATO] Nodo con valore ${targetInfo} non trovato.`);
    }

    /**
     * Estrae un elemento dalla coda.
     * @returns {*} Il dato estratto.
     */
    popCoda() {
        if (this.isEmpty()) {
            console.log("[ALGORITMO] Lista vuota.");
            return null;
        }

        // Caso lista con un solo nodo
        if (this.head.link === null) {
            console.log(`[ALGORITMO] Un solo nodo. head = null`);
            const out = this.head;
            this.head = null;
            console.log(`[RISULTATO] Estratto dalla coda: ${out.info}`);
            return out.info;
        }

        // Cerchiamo il penultimo nodo
        console.log(`[ALGORITMO] Init tmp = head. Cerco il PENULTIMO nodo (tmp.link.link == null)`);
        let tmp = this.head;
        // Scorre finché il successore del successore non è null
        // Cioè tmp si fermerà al PENULTIMO nodo
        while (tmp.link.link !== null) {
            console.log(`[ALGORITMO] Non ancora penultimo. Avanzo.`);
            tmp = tmp.link;
        }

        console.log(`[ALGORITMO] Trovato penultimo (${tmp.info}). Il successivo (${tmp.link.info}) sarà rimosso.`);
        const out = tmp.link;

        // "Sgancio" l'ultimo nodo
        console.log(`[ALGORITMO] tmp.link = null (sgancio ultimo nodo)`);
        tmp.link = null;

        console.log(`[RISULTATO] Estratto dalla coda: ${out.info}`);
        return out.info;
    }

    /**
     * Estrae un elemento dalla testa.
     * @returns {*} Il dato estratto.
     */
    popTesta() {
        if (this.isEmpty()) return null;

        console.log(`[ALGORITMO] Init out = head`);
        const out = this.head;       // Nodo da estrarre

        console.log(`[ALGORITMO] head = head.link (la testa avanza di uno)`);
        this.head = this.head.link;  // Head avanza

        console.log(`[ALGORITMO] out.link = null (clean up)`);
        out.link = null;             // Pulizia riferimento (opzionale in JS ma corretto logicamente)

        console.log(`[RISULTATO] Estratto dalla testa: ${out.info}`);
        return out.info;
    }

    /**
     * Estrae il nodo successivo al target.
     */
    popDopoNodo(targetInfo) {
        console.log(`[ALGORITMO] Cerco nodo ${targetInfo}`);
        let tmp = this.head;
        while (tmp !== null) {
            if (tmp.info === targetInfo) {
                if (tmp.link !== null) {
                    console.log(`[ALGORITMO] Trovato ${targetInfo}. Rimuovo il successivo.`);
                    const out = tmp.link; // Il nodo da rimuovere

                    console.log(`[ALGORITMO] tmp.link = tmp.link.link (salto il nodo da rimuovere)`);
                    tmp.link = out.link;  // Scavalco out

                    out.link = null;
                    console.log(`[RISULTATO] Estratto ${out.info} dopo ${targetInfo}`);
                    return out.info;
                } else {
                    console.log(`[ALGORITMO] ${targetInfo} è l'ultimo nodo. Nulla da rimuovere dopo.`);
                    return null;
                }
            }
            tmp = tmp.link;
        }
        return null;
    }

    /**
     * Estrae il nodo precedente al target.
     */
    popPrimaNodo(targetInfo) {
        if (this.isEmpty()) return null;

        if (this.head.info === targetInfo) {
            console.log(`[ALGORITMO] Il target è la testa. Nessun precedente.`);
            return null;
        }

        if (this.head.link && this.head.link.info === targetInfo) {
            console.log(`[ALGORITMO] Il target è il secondo nodo. Rimuovo la testa.`);
            return this.popTesta();
        }

        console.log(`[ALGORITMO] Cerco nodo il cui successore del successore è ${targetInfo}`);
        let tmp = this.head;
        while (tmp.link && tmp.link.link) {
            // Cerco nodo il cui successore del successore è target
            if (tmp.link.link.info === targetInfo) {
                const out = tmp.link;
                console.log(`[ALGORITMO] Trovato pre-precedente (${tmp.info}). Rimuovo (${out.info})`);

                console.log(`[ALGORITMO] tmp.link = tmp.link.link (salto il nodo da rimuovere)`);
                tmp.link = out.link;

                out.link = null;
                console.log(`[RISULTATO] Estratto ${out.info} prima di ${targetInfo}`);
                return out.info;
            }
            tmp = tmp.link;
        }
        return null;
    }

    /**
     * Svuota la lista.
     */
    clearList() {
        this.head = null;
        console.log("Lista svuotata.");
    }

    /**
     * Stampa la lista per visualizzazione.
     */
    print() {
        let result = "Testa -> ";
        let corrente = this.head;
        while (corrente !== null) {
            result += `[${corrente.info}] -> `;
            corrente = corrente.link;
        }
        result += "NULL";
        console.log(result);
        return result;
    }
}
