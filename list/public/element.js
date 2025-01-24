const Element = {
    data() {
        return {
            input : false 
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
    props : ["element"],
    methods : {
        remove() {
            // traiter le clic sur le bouton Supprimer
            this.$emit("remove", { id : this.element._id });
        },
        modify(event) {
            var value = event.target.value; // valeur saisie dans le champ
            this.input = false; // supprimer le champ de saisie
            this.$emit("modify", { id : this.element._id, value : value}); // mettre à jour l'élément 
        }
    },

    emits : ["remove", "modify"],
    updated() {
        // vérifier que l'attribut ref="refInput" existe et ,si oui, donner le focus au champ de saisie

        if (this.$refs.refInput) this.$refs.refInput.focus();
    }
}

export default Element;