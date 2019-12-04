class Calculator {
    constructor() {
        this.expression = "";
        this.register = 0;
        this.clear();
    }

    sum() {
        this.expression += "+";
        this.updateDisplay();
    }

    substraction() {
        this.expression += "-";
        this.updateDisplay();
    }

    multiplication() {
        this.expression += "*";
        this.updateDisplay();
    }

    division(){
        this.expression += "/";
        this.updateDisplay();
    }

    number(n) {
        if (!isNaN(n)) {
            this.expression += String(n);
            this.updateDisplay();
        }
    }

    decimal() {
        this.expression += ".";
        this.updateDisplay();
    }

    mrPlus() {
        if (this.isValidInput(this.expression)){
            try{
                var result = eval(String(this.register) + "+" + this.expression);
                this.register = result;
            } catch (e) {
                this.display("SYNTAX ERROR");
                this.expression = "";
            }
        } else {
            this.display("SYNTAX ERROR");
            this.expression = "";
        }
    }

    mrMinus() {
        if (this.isValidInput(this.expression)){
            try{
                var result = eval(String(this.register) + "-" + this.expression);
                this.register = result;
            } catch (e) {
                this.display("SYNTAX ERROR");
                this.expression = "";
            }
        } else {
            this.display("SYNTAX ERROR");
            this.expression = "";
        }
    }

    mrc() {
        this.display(String(this.register));
        this.register = 0;
    }

    equals() {
        if(this.isValidInput(this.expression)){
            try{
                var result = eval(String(this.expression));
                this.expression = String(result);
                this.updateDisplay();
            } catch (e) {
                this.display("SYNTAX ERROR");
                this.expression = "";
            }
        } else {
            this.display("SYNTAX ERROR");
            this.expression = "";
        }
    }

    isValidInput(input) {
        var result = /^-?[0-9]+(.[0-9]+)*((\+|\-|\*|\/)-?[0-9]+(.[0-9]+)*)*$/.test(input);
        return result;
    }

    clear() {
        this.expression = "";
        this.display("");
    }

    display(content) {
        document.getElementsByTagName("input")[0].value = content;
    }

    updateDisplay() {
        document.getElementsByTagName("input")[0].value = this.expression;
    }
}

var calculator
window.addEventListener("load", function() {
    calculator = new Calculator();
});
