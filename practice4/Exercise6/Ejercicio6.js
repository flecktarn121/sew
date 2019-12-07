class TicTacToe {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;
        this.finished = false;
        this.grid = [["","",""], ["","",""], ["","",""]];
    }

    play(row, col, id) {
        if (!this.isFinished()) {
            this.setMove(row, col);
            document.getElementById("btn" + id).disabled = true;
            document.getElementById("btn" + id).textContent = this.currentPlayer.icon;
        }

        if(this.isFinished()) {
            alert("!Juego terminado, " + this.currentPlayer.name + " ha ganado!")
            this.updatePunctuation();
            document.getElementById("restart").disabled = false;
        }
        this.changePlayers();
    }

    restart() {
        this.grid = [["","",""], ["","",""], ["","",""]]
        this.finished = false;
        var id;
        for (id = 0; id < 9; id++) {
            document.getElementById("btn" + String(id)).textContent = "";
            document.getElementById("btn" + String(id)).disabled = false;
        }
        document.getElementById("restart").disabled = true;
    }

    setMove(row, col) {
        this.grid[row][col] = this.currentPlayer.icon;
    }

    isFinished() {
        if (this.finished) {
            console.log("aqui")
            this.finished = true;
            return true;
        }

        if (this.hasRow()) {
            console.log("row")
            this.finished = true;
            return true;
        }

        if (this.hasColumn()) {
            console.log("col")
            this.finished = true;
            return true;
        }

        if (this.hasDiagonal()) {
            this.finished = true;
            console.log("diag")
            return true;
        }

        return false;
    }

    hasRow() {
        var grid = this.grid;
        var _this = this;
        var result;
        var i;
        for (i = 0; i < 3; i++) {
            result = grid[i][0] === grid[i][1];
            result &= grid[i][1] === grid[i][2];
            result &= grid[i][0] === _this.currentPlayer.icon;
            if (result) {
                return result;
            }
        }
        return result;
    }

    hasColumn() {
        var grid = this.grid;
        var _this = this;
        var result;
        var i;
        for (i = 0; i < 3; i++) {
            result = grid[0][i] === grid[1][i];
            result &= grid[1][i] === grid[2][i];
            result &= grid[0][i] === _this.currentPlayer.icon;
            if (result) {
                return result;
            }
        }
        return result;
    }

    hasDiagonal() {
        var result;
        result = this.grid[0][0] === this.grid[1][1];
        result &= this.grid[1][1] === this.grid[2][2];
        result &= this.grid[0][0] === this.currentPlayer.icon;

        if (result) {
            return true;
        }

        result = this.grid[0][2] === this.grid[1][1];
        result &= this.grid[1][1] === this.grid[2][0];
        result &= this.grid[0][2] != "";

        return result;

    }

    changePlayers() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    updatePunctuation() {
        this.currentPlayer.points += 1;
        var punctuation = "<li>" + this.player1.name + ": " + this.player1.points + "</li>";
        punctuation += "<li>" + this.player2.name + ": " + this.player2.points + "</li>";
        document.getElementById("players").innerHTML = punctuation;
    }
}

class Player {
    constructor(icon, name) {
        this.icon = icon;
        this.points = 0;
        this.name = name;
    }
}

var ttt;
window.addEventListener("load", function() {
    ttt = new TicTacToe( new Player("x", "Jugador 1"), new Player("o", "Jugador 2") );
});
