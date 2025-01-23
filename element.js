const Element = {
    data() {
        return {
            input : false //afficher le texte de l'élément par défault
        }
    },
    template : `
    <li>
    <span v-if="!input"> {{text}} </span>
    <input v-else type="text" :value="text" @blur="modify($event)" ref="refInput" />
    <button @click="remove()"> Supprimer </button>
    <button @click="input=true"> Modifier </button>
    
    </li>
    `,
    props : ["text", "index"],
    methods : {
        remove() {
            this.$emit("remove", { index : this.index });
        },
        modify(event) {
            var value = event.target.value; // valeur saisie dans le champ
            this.input = false; // supprimer le champ de saisie
            this.$emit("modify", { index : this.index, value : value}); // mettre à jour l'élément 
        }
    },

    emits : ["remove", "modify"],
    updated() {
        // vérifier que l'attribut ref="refInput" existe et ,si oui, donner le focus au champ de saisie

        if (this.$refs.refInput) this.$refs.refInput.focus();
    }
}

export default Element;