class Match {
    constructor(imageURI, isPickedUp) {
        this.imageURI = imageURI;
        this.isPickedUp = isPickedUp;
    }
}

class MatchRow {
    constructor(matches, matchesInRow, isEmpty) {
        this.matches = matches;
        this.matchesInRow = matchesInRow;
        this.isEmpty = isEmpty;
    }

    pickUpMatches = (numberOfMatches = 1) => {
        for (let i = 0; i < numberOfMatches; i++) {
            this.matches.pop();
        }
        this.isEmpty = this.matches.length <= 0
    }
}

let isPlaying = false;
let matchRows = [];
let selectedRow = undefined;
let isBotTurn = false;

class Game {
    constructor(isPlaying, matchRows, selectedRow, isBotTurn) {
        this.isPlaying = isPlaying;
        this.matchRows = matchRows;
        this.selectedRow = selectedRow;
        this.isBotTurn = isBotTurn;

        matchRows.push(new MatchRow([new Match("", false)], 1, false));
        matchRows.push(new MatchRow([new Match("", false), new Match("", false), new Match("", false)], 3, false));
        matchRows.push(new MatchRow([new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false)], 5, false));
        matchRows.push(new MatchRow([new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false)], 7, false));
    }

    resetGame() {
        matchRows.push(new MatchRow([new Match("", false)], 1, false));
        matchRows.push(new MatchRow([new Match("", false), new Match("", false), new Match("", false)], 3, false));
        matchRows.push(new MatchRow([new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false)], 5, false));
        matchRows.push(new MatchRow([new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false), new Match("", false)], 7, false));
    }

    isGameOver() {
        return this.matchRows.filter(v => !v.isEmpty).length === 0
    }

    doBotTurn() {

    }

    changeTurn() {

    }
}

class Bot {
    constructor(game) {
        this.game = game
    }
    doTurn() {
        let rowNumsDec = this.game.matchRows.map((v, i) => v.matches.length)
        let xorCalc = rowNumsDec.reduce((a, b) => a ^ b, 0)
        console.log("Before Pickup: ", ...this.game.matchRows.map((v) => v.matches.length))
        if (xorCalc > 0) {
            for (let matchRow of this.game.matchRows) {
                if (matchRow.matches.length >= xorCalc) {
                    matchRow.pickUpMatches(xorCalc);
                    return
                }
            }
        }
        let nonemptyRows = this.game.matchRows.filter((v) => !v.isEmpty)
        let randomRow = nonemptyRows[Math.floor(Math.random() * (nonemptyRows.length - 1))]
        randomRow.pickUpMatches(Math.floor(Math.random() * (randomRow.matches.length) + 1))
    }
}

let game = new Game(true, [], undefined, false)
let bot = new Bot(game)
let testTurn = 1
while (!game.isGameOver() && testTurn < 500) {
    console.log(testTurn)
    bot.doTurn()
    console.log("After Pickup: ", ...game.matchRows.map((v) => v.matches.length))
    testTurn++
}


// const rowBtn1 = document.getElementById("rowBtn1");
// const rowBtn2 = document.getElementById("rowBtn2");
// const rowBtn3 = document.getElementById("rowBtn3");
// const rowBtn4 = document.getElementById("rowBtn4");
// const endTurnBtn = document.getElementById("endTurnBtn");

// rowBtn1.addEventListener("click", pickUpMatches(1));
// rowBtn2.addEventListener("click", pickUpMatches(3));
// rowBtn3.addEventListener("click", pickUpMatches(5));
// rowBtn4.addEventListener("click", pickUpMatches(7));
// endTurnBtn.addEventListener("click", changeTurn());
// console.log("Working")

const start = () => {
    document.getElementById('startSelection').style.display = 'none';
    const playerFirst = document.getElementById('playerFirst').checked;
    const botFirst = document.getElementById('botFirst').checked;
    return false;
}