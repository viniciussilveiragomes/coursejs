class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });

    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = "Error";
    }

    getLastOperator() {

        return this._operation[this._operation.length - 1];
    }

    isOperator(value) {


        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;
    }

    pushOperation(value) {

        this._operation.push(value);
        if (this._operation.length > 3) {
            let last = this._operation.pop();

            this.Calc();

        }
    }

    calc() {

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];

       this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay() {

        let lastNumber;
        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperator(this._operation[i]){
                lastNumber = this._operation[i];
                
            }
            
        }

    }
    addOperator(value) {

        if (isNaN(this.getLastOperator())) {
            // string

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else if (isNaN(value)) {

                console.log(value);
            }

            else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();
            }

        } else {

            if (this.isOperator(value)) {
                this._isOperator.push(value);
            } else {
                let newValue = this.getLastOperator().toString() + value.toString();
                this.setLastOperation(paseInt(newValue));

            }
        }
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperator('+');
                break;
            case 'multiplicacao':
                this.addOperator('*');
                break;
            case 'porcento':
                this.addOperator('%');
                break;
            case 'igual':

                break;
            case 'subtracao':
                this.addOperator('/');
                break;
            case 'ponto':
                this.addOperator('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperator(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }
    }
    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', e => {

                this.addEventListenerAll(btn, "click drag mouseover", e => {
                    console.log(btn.className.baseVal.replace("btn-", ""));

                    this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                        btn.style.cursor = 'pointer';
                    });
                });
            });

        })
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        return this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return this._currentDate = new Date();
    }

    set currentDate(value) {
        return this._currentDate = value;
    }
}