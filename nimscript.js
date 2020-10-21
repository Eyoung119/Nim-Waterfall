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

class Game {
    constructor(isPlaying, matchRows, selectedRow, isBotTurn) {
        this.isPlaying = isPlaying;
        this.matchRows = matchRows;
        this.selectedRow = selectedRow;
        this.isBotTurn = isBotTurn;
        this.bot = new Bot(this);

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
        this.bot.doTurn();
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

let game = new Game(true, [], undefined, false);
let pickUpMatchCount = 0;
let selectedRow = undefined;

//Find which row they are selecting from. Cant take from another
//Count how many times they click the button
//End turn reset(wait)
//hide match
function findRow(evt) {
    if (evt.target.id === 'rowBtn1') {
        pickUpMatchCount++;
        selectedRow = game.matchRows[0];
        console.log("Hit row1");
        document.getElementById("rowBtn2").disabled = true;
        document.getElementById("rowBtn3").disabled = true;
        document.getElementById("rowBtn4").disabled = true;
    }
    else if (evt.target.id === 'rowBtn2') {
        pickUpMatchCount++;
        selectedRow = game.matchRows[1];
        console.log("Hit row2");
        document.getElementById("rowBtn1").disabled = true;
        document.getElementById("rowBtn3").disabled = true;
        document.getElementById("rowBtn4").disabled = true;
    }
    else if (evt.target.id === 'rowBtn3') {
        pickUpMatchCount++;
        selectedRow = game.matchRows[2];
        console.log("Hit row3");
        document.getElementById("rowBtn1").disabled = true;
        document.getElementById("rowBtn2").disabled = true;
        document.getElementById("rowBtn4").disabled = true;
    }
    else if (evt.target.id === 'rowBtn4') {
        pickUpMatchCount++;
        selectedRow = game.matchRows[3];
        console.log("Hit row4");
        document.getElementById("rowBtn1").disabled = true;
        document.getElementById("rowBtn2").disabled = true;
        document.getElementById("rowBtn3").disabled = true;
    }
}

function endTurn() {
    selectedRow.pickUpMatches(pickUpMatchCount);
    pickUpMatchCount = 0;
    selectedRow = undefined;
    console.log(game.matchRows.map(v => v.matches.length));

    game.doBotTurn();
    console.log(game.matchRows.map(v => v.matches.length));

    document.getElementById("rowBtn1").disabled = false;
    document.getElementById("rowBtn2").disabled = false;
    document.getElementById("rowBtn3").disabled = false;
    document.getElementById("rowBtn4").disabled = false;
}

const rowBtn1 = document.getElementById("rowBtn1");
const rowBtn2 = document.getElementById("rowBtn2");
const rowBtn3 = document.getElementById("rowBtn3");
const rowBtn4 = document.getElementById("rowBtn4");
const endTurnBtn = document.getElementById("endTurnBtn");

rowBtn1.addEventListener("click", findRow);
rowBtn2.addEventListener("click", findRow);
rowBtn3.addEventListener("click", findRow);
rowBtn4.addEventListener("click", findRow);
endTurnBtn.addEventListener("click", endTurn);

const start = () => {
    document.getElementById('startSelection').style.display = 'none';
    const playerFirst = document.getElementById('playerFirst').checked;
    const botFirst = document.getElementById('botFirst').checked;
    return false;
}