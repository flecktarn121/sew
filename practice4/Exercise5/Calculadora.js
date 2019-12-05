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
        console.log(input);
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

class ReversePolishCalculator extends Calculator {

    constructor() {
        super();
        this.stack = [];
    }

    push() {
        var input = document.getElementById("display").nodeValue;
        if (!this.isValidInput(input)) {
            this.display("SYNTAX ERROR");
            this.clearStack();
            this.expression = "";
        } else {
            this.stack.push(parseFloat(input));
        }
    }

    clearStack() {
        this.stack = [];
    }

    getNumber() {
        var number = stack.pop();
        if ( isNaN(number)) {
            return null;
        }
        if(this.isValidInput(String(number))){
            try{
                return number;
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
            this.clearStack();
        } else {
            var result = Math.pow(number, 2)
            this.stack.push(result);
            this.expression = String(result);
        }
        this.updateDisplay();
    }

    power() {
        var n1 = this.getNumber();
        var n2 = this.getNumber();
        if (n1 === null || n2 === null) {
            this.display("ERROR");
            this.expression = "";
            this.clearStack();
            return;
        }
        var result = Math.pow(n1, n2);
        this.expression += result;
        this.stack.push(result);
        this.updateDisplay();
    }

    sin() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = Math.sin(number);
            this.expression = String(result);
        this.stack.push(result);
        }
        this.updateDisplay();
    }

    cos() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = Math.cos(number);
            this.expression = String(result);
            this.stack.push(result);
        }
        this.updateDisplay();
    }

    tan() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = Math.tan(number);
            this.expression = String(result);
            this.stack.push(result);
        }
        this.updateDisplay();
    }

    sqr() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = Math.pow(number, 1/2);
            this.expression = String(result);
            this.stack.push(result);
        }
        this.updateDisplay();
    }

    pwr10() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = Math.pow(10, number);
            this.expression = String(result);
            this.stack.push(result);
        }
        this.updateDisplay();
    }

    log() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = Math.log(number);
            this.expression = String(result);
            this.stack.push(result);
        }
        this.updateDisplay();
    }

    exp() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = Math.pow(10, number);
            this.expression = String(result);
            this.stack.push(result);
        }
        this.updateDisplay();
    }

    mod() {
        var n1 = this.getNumber();
        var n2 = this.getNumber();
        if (n1 === null || n2 === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var result = n1 % n2;
            this.expression = String(result);
            this.stack.push(result);
        }
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
        this.stack.push(Math.PI);
        this.updateDisplay();
    }

    factorial() {
        var number = this.getNumber();
        if (number === null) {
            this.display("SYNTAX ERROR");
            this.expression = "";
            this.clearStack();
        } else {
            var fac = this.calculateFactorial(number);
            this.expression = String(fac);
            this.stack.push(fac);
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
            this.clearStack();
        } else {
            number = - number;
            this.expression = String(number);
            this.stack.push(number);
        }
        this.updateDisplay();
    }

    leftParenthesis() {
    }

    rightParenthesis() {
    }

}

var calculator
window.addEventListener("load", function() {
    calculator = new ReversePolishCalculator();
});
