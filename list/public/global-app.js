import Element from "./element.js";  // Utiliser un chemin absolu

const GlobalApp = {
    data() {
        return {
            elements: []  // Liste vide d'éléments
        }
    },
    components: {
        Element: Element  // Déclare le composant Element dans GlobalApp
    },
    template: `
        <button @click="add()">Ajouter un élément</button>
        <ul>
            <Element 
                v-for="(element, index) in elements" 
                :key="index" 
                :element="element"  
                @remove="remove($event)" 
                @modify="modify($event)"
            />
        </ul>
    `,
    methods: {
        add() {
            var text = "Element " + (this.elements.length + 1);
            axios.post("/list", { text: text })
                .then((response) => {
                    this.elements.push({ text: text, _id: response.data.id });
                })
                .catch((error) => {
                    console.error("Erreur lors de l'ajout de l'élément:", error);
                });
        },
        remove(params) {
            var id = params.id;
            this.elements = this.elements.filter(function(element) {
                return element._id !== id;
            });
            axios.delete("/list", { data: { id: id } })
                .then(() => {
                    console.log("Élément supprimé avec succès");
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression de l'élément:", error);
                });
        },
        modify(params) {
            var id = params.id;
            var value = params.value;
            this.elements = this.elements.map(function(element) {
                if (element._id == id) {
                    element.text = value;
                    return element;
                }
                return element;
            });
            axios.put("/list", { text: value, id: id })
                .then(() => {
                    console.log("Élément modifié avec succès");
                })
                .catch((error) => {
                    console.error("Erreur lors de la modification de l'élément:", error);
                });
        }
    },
    created() {
        axios.get("/list")
            .then((response) => {
                this.elements = response.data.elements.map(function(element) {
                    return { _id: element._id, text: element.text };
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des éléments:", error);
            });
    }
}

export default GlobalApp;
