// Importa il metodo createApp dal pacchetto Vue
const { createApp } = Vue;

// Crea un'app Vue con i dati iniziali e i metodi
createApp({
  // Definisci i dati iniziali dell'app
  data() {
    // Restituisce un oggetto con le proprietà di dati iniziali
    return {
      apiUrl: "", // Una stringa vuota che rappresenta l'URL dell'API
      discs: [], // Un array vuoto che conterrà i dati dei dischi
      discDetails: {}, // Un oggetto vuoto che conterrà i dettagli di un singolo disco
      showDetails: false, // Una variabile booleana che indica se i dettagli di un disco sono mostrati o meno
    };
  },

  // Definisci i metodi dell'app
  methods: {
    // Metodo che richiede i dischi tramite l'API
    fetchDiscs() {
      axios.get("/php-dischi-json/API/get-discs.php").then((response) => {
        // Aggiorna l'array discs con i dati ricevuti dall'API
        this.discs = response.data;
      });
    },

    // Metodo che richiede i dettagli di un singolo disco tramite l'API
    fetchDisc(title) {
      axios
        .get("/php-dischi-json/API/get-discs.php", {
          params: {
            title, // Il titolo del disco da richiedere
          },
        })
        .then((response) => {
          // Aggiorna l'oggetto discDetails con i dettagli del disco ricevuti dall'API
          this.discDetails = response.data;
        });
    },

    // Metodo che mostra i dettagli di un singolo disco
    showDiscDetails(title) {
      // Imposta la variabile showDetails a true
      this.showDetails = true;
      // Richiede i dettagli del disco tramite l'API
      this.fetchDisc(title);
    },

    // Metodo che nasconde i dettagli di un disco
    hideDiscDetails() {
      // Imposta la variabile showDetails a false
      this.showDetails = false;
    },
  },

  // Metodo che viene eseguito quando l'app viene creata
  created() {
    // Richiedi i dischi tramite l'API
    this.fetchDiscs();
  },
})
// Monta l'app su un elemento HTML con id "app"
.mount("#app");