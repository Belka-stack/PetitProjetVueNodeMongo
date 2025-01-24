const Element = {
    props: ['element'],
    template: `
        <li>
            <span>{{ element.text }}</span>
            <button @click="modify">Modifier</button>
            <button @click="remove">Supprimer</button>
        </li>
    `,
    methods: {
        remove() {
            this.$emit('remove', this.element);  // Émettre l'événement 'remove'
        },
        modify() {
            let newValue = prompt("Modifie le texte", this.element.text);
            if (newValue !== null) {
                this.$emit('modify', { id: this.element._id, value: newValue });  // Émettre l'événement 'modify'
            }
        }
    }
};

export default Element;
