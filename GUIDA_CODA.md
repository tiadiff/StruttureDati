# 📗 Guida allo Studio: La Coda (Queue)

## 1. Il Concetto FIFO
**Queue** = First In, First Out.
Si inserisce dietro, si serve davanti.

---

## 2. Operazioni
*   **ENQUEUE**: Aggiunge in fondo.
*   **DEQUEUE**: Rimuove dal fronte.
*   **FRONT**: Legge il primo.

---

## 3. Traversamento e Buffer

### Iterazione
Come per lo Stack, in una Coda pura si dovrebbe guardare solo il primo elemento. Tuttavia, scorrere una coda (dal primo all'ultimo) è molto comune per monitorare lo stato del "traffico" o delle richieste in attesa.

```javascript
// Esempio di visualizzazione (non distruttiva se accediamo alla lista interna)
let tmp = coda.list.head;
while (tmp !== null) {
    console.log("In attesa: " + tmp.info);
    tmp = tmp.link;
}
```

---

## 4. Altre Funzioni e Varianti

### `isEmpty()`
Controlla se ci sono elementi in attesa.

### `contains(valore)`
Verifica se un dato elemento è già in coda (utile per evitare duplicati nelle code di processi).

### `Queue Circolare` (Variante Avanzata)
In ARRAY a dimensione fissa, quando la coda arriva alla fine dell'array, riparte dall'indice 0. Questo ottimizza la memoria evitando di dover riallocare l'array o spostare gli elementi.

### `Priority Queue` (Coda a Priorità)
Una variante fondamentale dove gli elementi non escono solo in base all'ordine di arrivo, ma in base a un valore di "priorità".
*   *Enqueue*: Inserisce l'elemento al posto giusto mantenendo l'ordine di priorità (O(N)).
*   *Dequeue*: Rimuove sempre la testa (che è l'elemento a priorità più alta).
