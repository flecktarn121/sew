"use strict";
class Calculator {

    constructor (display, memoria){
        this.display=display;
        this.memoria=memoria;
        this.calculado=0;
    }

    show() {
        document.getElementById('display').value = this.display;
    }

    setDisplay(display){
        this.display= display;
    }

    getDisplay(){
        return this.display;
    }

    enterNumber(x){
        if(this.calculado == 0) {
            var n = this.getDisplay().lastIndexOf(" ");
            if(this.getDisplay().substring(n+1,n+2)!="0"){
                this.setDisplay(this.display + x);
            }
            else if(x!="0"){
                this.setDisplay(this.getDisplay().substring(0,n+1)+ x);
            }
        }
        else {
            this.calculado = 0;
            this.setDisplay("" + x);
        }
        this.show();
    }

    enterOperation(x){
        var len = this.getDisplay().length;
        if(len>0 && (this.esDigito(this.getDisplay().charAt(len-1)) || this.getDisplay().charAt(len-1) == ')')){
            this.setDisplay(this.display + x);
            this.calculado = 0;
        } else if (len>0){
            this.setDisplay(this.display.substring(0, len-3) + x);
        }
        this.show();
    }

    calcular(){
        if(this.display != "") {
            try {
                this.setDisplay("" + eval(this.display));
            }
            catch(err) {
                this.setDisplay("Operación no admitida");
            }
        }
        this.calculado = 1;
        this.show();
    }

    limpiar() {
        this.setDisplay("");
        this.show();
    }

    showMemoria(){
        this.setDisplay("" + this.memoria);
        this.calculado = 1;
        this.show();
    }

    operarMemoria(op) {
        var n;
        var ultimoCar;
        if(this.getDisplay().length>1){
            n = this.ultimoEspacio();
            ultimoCar = this.getDisplay().charAt(n+1);
            if(this.esDigito(ultimoCar) || n==-1){
                this.memoria = eval(this.memoria +op + this.getDisplay());
            } else {
                this.memoria = eval(this.memoria + op + this.getDisplay().substring(0,n-2));
            }
        }
        else if(this.getDisplay().length==1){
            this.memoria = eval(this.memoria +op + this.getDisplay());
        }
    }

    borrarMemoria(){
        this.memoria = "";
    }

    esDigito(x){
        return(x=="0" || x=="1" || x=="2" || x=="3" || x=="4" || x=="5" ||
            x=="6" || x=="7" || x=="8" || x=="9");
    }

    ultimoEspacio() {
        return this.getDisplay().lastIndexOf(" ");
    }
}
