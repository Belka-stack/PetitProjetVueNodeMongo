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
    <div>
        <button @click="add()">Ajouter un élément</button>
        <ul>
            <Element 
                v-for="(element, index) in elements" 
                :key="index" 
                :text="element"  // Passer le texte de chaque élément au composant Element
                : index = "index"
                @remove="remove($event)" @modify="modify($event)"
            />
        </ul>
    </div>
    `,
    methods: {
        add() {
            // Ajouter un nouvel élément à la liste
            var element = "Element " + (this.elements.length + 1);
            this.elements.push(element);
        },
        remove(params) {
            var index = params.index;
            this.elements.splice(index, 1);// supprime l'élément dans le table
        },
        modify(params) {
            var index = params.index;
            var value = params.value;
            this.elements[index] = value; // nouvelle valeur de l'élément
        }
    }
};

export default GlobalApp;
