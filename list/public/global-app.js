import Element from "./element.js";

const GlobalApp = {
    data() {
        return {
            elements: []  // Liste vide d'éléments
        }
    },
    components: {
        Element:Element
    },
    template: `
        <button @click="add()">Ajouter un élément</button>
        <ul>
            <Element 
                v-for="(element, index) in elements" 
                :key="index" 
                :text="element"  
                :index="index"
                @remove="remove($event)" @modify="modify($event)"
            />
        </ul>
    `,
    methods: {
        add() {
            // Ajouter un nouvel élément à la liste
            var element = "Element " + (this.elements.length + 1);
            this.elements.push({text:text, _id:this.elements.length});
            // à modifier pour récupérer levrai _id fourni par MongoDB
        },
        remove(params) {
            var id = params.id;
            // supprimer l'élément ayant cet id dans le tableau elements
            this.elements = this.elements.filter(function(element) {
                if (element._id == id) return false;
                else return true;
            });
        },
        modify(params) {
            var id = params.id;
            var value = params.value;
            // modifier letexte de l'élément ayan cet id dans letableau elements
            this.elements = this.elements.map(function(element) {
                if (element._id == id){
                    element.text = value;
                    return element;
                }
                else return element
            });
        }
    }
}

export default GlobalApp;
