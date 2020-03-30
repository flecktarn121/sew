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
        input = input.replace("(", "");
        input = input.replace(")", "");
        input = input.replace("**", "*");
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

class ScientificCalculator extends Calculator {

    getNumber() {
        if(this.isValidInput(this.expression)){
            try{
                var result = eval(String(this.expression));
                return result;
            } catch (e) {
                this.expression = "";
                return null;
            }
        } else {
            this.expression = "";
            return null;
        }
    }

    ms() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.register = number;
        }
    }

    mc() {
        this.register = 0;
    }

    mr() {
        this.mrc();
    }

    square() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.pow(number, 2));
        }
        this.updateDisplay();
    }

    power() {
        this.expression += "**";
        this.updateDisplay();
    }

    sin() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.sin(number));
        }
        this.updateDisplay();
    }

    cos() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.cos(number));
        }
        this.updateDisplay();
    }

    tan() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.tan(number));
        }
        this.updateDisplay();
    }

    sqr() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.pow(number, 1/2));
        }
        this.updateDisplay();
    }

    pwr10() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.pow(10, number));
        }
        this.updateDisplay();
    }

    log() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.log(number));
        }
        this.updateDisplay();
    }

    exp() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            this.expression = String(Math.pow(number, 10));
        }
        this.updateDisplay();
    }

    mod() {
        this.expression += "%";
        this.updateDisplay();
    }

    arrow() {

    }

    ce(){

    }

    del() {
        if (this.expression.length > 0) {
            this.expression = this.expression.substring(0, this.expression.length - 1);
        }
        this.updateDisplay();
    }

    pi() {
        this.expression += String(Math.PI);
        this.updateDisplay();
    }

    factorial() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            var fac = this.calculateFactorial(number);
            this.expression = String(fac);
        }

        this.updateDisplay();
    }

    calculateFactorial(number) {
        if (number == 0) {
            return 1;
        } else {
            return number * this.calculateFactorial(number - 1);
        }
    }

    sign() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
        } else {
            number = - number;
            this.expression = String(number);
        }
        this.updateDisplay();
    }

    leftParenthesis() {
        this.expression += "(";
        this.updateDisplay();
    }

    rightParenthesis() {
        this.expression += ")";
        this.updateDisplay();
    }

}

var calculator
window.addEventListener("load", function() {
    calculator = new ScientificCalculator();
});
