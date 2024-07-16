class Validator {
    constructor(config) {
        this.elementsConfig = config;
        this.errors = {};

        console.log(config)
        //methods
        this.generateErrorObject();
        this.inputListener();
    }

    generateErrorObject() {
        for (let field in this.elementsConfig) {
            this.errors[field] = [];
        }
    }

    inputListener() {
        let inputSelector = this.elementsConfig;
        for (let field in inputSelector) {
            let selector = `input[name = ${field}]`;
            let el = document.querySelector(selector);

            if (el != null) {
                el.addEventListener('input', this.validate.bind(this));
            }
        }
    }

    checkInput() {
        let textarea = document.querySelector('.messageForm textarea');
        let inputs = document.querySelectorAll('.messageForm input');
        let i = 1;
        for (let input of inputs) {
            if (input.value === '' && inputs.length === i) {
                alert('Please, fill the all inputs!');
            }
            i++;
        }



    }


    validate(e) {
        let elFields = this.elementsConfig;
        let field = e.target;
        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;
        this.errors[fieldName] = [];

        //validacija praznog polja
        if (elFields[fieldName].required) {
            if (fieldValue === '') {
                this.errors[fieldName].push('Polje je prazno');
                console.log('Polje je prazno')
            }
        }

        //validacija emaila
        if (elFields[fieldName].email) {
            if (!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push('Neispravna email adresa');
            }
        }

        //validacije duljine polja
        if (fieldValue.length < elFields[fieldName].minLength || fieldValue.length > elFields[fieldName].maxLength) {
            this.errors[fieldName].push(`Polje mora sadržavati minimalno ${elFields[fieldName].minLength} i maksimalno ${elFields[fieldName].maxLength} znakova`);
        }

        // sprječavanje da se polja konstantno uspoređuju jedan sa drugim
        if (this.errors[fieldName].length === 0) {
            this.errors[fieldName] = [];
            this.errors[elFields[fieldName].matching] = [];
        }

        this.populateErrors(this.errors);
        console.log(this.errors);
    }


    //Funkcija za provjeru ispravnost formulara
    validationPassed() {
        for (let key of Object.keys(this.errors)) {
            console.log(this.errors)
            if (this.errors[key].length > 0) {
                return false;
            }
        }

        return true;
    }


    //Ispis grešaka u browser
    populateErrors(errors) {
        for (const elem of document.querySelectorAll('ul')) {
            elem.remove();
        }

        for (let key of Object.keys(errors)) {
            let input = document.querySelector(`input[name = ${key}]`);
            if (input != null) {
                let parentElement = input.parentElement;
                let errorsElement = document.createElement('ul');
                parentElement.appendChild(errorsElement);

                errors[key].forEach(error => {
                    let li = document.createElement('li');
                    li.innerHTML = error;
                    errorsElement.appendChild(li);
                })
            }

        }
    }


    //regex- email validation
    validateEmail = (email) => {
        //REGEX- validacija email-a
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;

        }
        else false;
    }
}