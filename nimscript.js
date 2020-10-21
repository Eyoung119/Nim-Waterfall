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

const declareWinner = document.getElementById("declareWinner");
const rowIds = ["row1", "row2", "row3", "row4"];

class Game {
    constructor(isPlaying, matchRows, selectedRow, isBotTurn) {
        this.isPlaying = isPlaying;
        this.matchRows = matchRows;
        this.selectedRow = selectedRow;
        this.isBotTurn = isBotTurn;
        this.bot = new Bot(this);

        matchRows.push(new MatchRow([new Match("match.png", false)], 1, false));
        matchRows.push(new MatchRow([new Match("match.png", false), new Match("match.png", false), new Match("match.png", false)], 3, false));
        matchRows.push(new MatchRow([new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false)], 5, false));
        matchRows.push(new MatchRow([new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false)], 7, false));
        for (let i = 0; i < rowIds.length; i++) {
            matchRows[i].matches.forEach(match => {
                let node = document.createElement("img");
                node.classList.add("match")
                node.src = match.imageURI;
                document.getElementById(rowIds[i]).appendChild(node);
            });
        }
    }


    resetGame() {
        matchRows.push(new MatchRow([new Match("match.png", false)], 1, false));
        matchRows.push(new MatchRow([new Match("match.png", false), new Match("match.png", false), new Match("match.png", false)], 3, false));
        matchRows.push(new MatchRow([new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false)], 5, false));
        matchRows.push(new MatchRow([new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("match.png", false), new Match("", false), new Match("match.png", false)], 7, false));
        declareWinner.innerHTML = ""
    }

    isGameOver() {
        return this.matchRows.filter(v => !v.isEmpty).length === 0
    }

    doBotTurn() {
        this.bot.doTurn();
        refreshMatches();
    }

    changeTurn() {

    }

    checkWinner() {
        isBotTurn ? (declareWinner.innerText = "Bot Won!") : (declareWinner.innerText = "Player Won!")
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
        console.log("After Pickup: ", ...this.game.matchRows.map((v) => v.matches.length))
    }
}

let isSelectedBot = sessionStorage.getItem('startBot');
let game = new Game(true, [], undefined, isSelectedBot || false);
let pickUpMatchCount = 0;
let selectedRow = undefined;

//Find which row they are selecting from. Cant take from another
//Count how many times they click the button
//End turn reset(wait)
//hide match
function findRow(evt) {
    if (evt.target.id === 'rowBtn1') {
        if (game.matchRows[0].matches.length > 0) {
            pickUpMatchCount++;
            selectedRow = game.matchRows[0];
            console.log("Hit row1");
            document.getElementById("rowBtn2").disabled = true;
            document.getElementById("rowBtn3").disabled = true;
            document.getElementById("rowBtn4").disabled = true;
            game.matchRows[0].matches[pickUpMatchCount - 1].imageURI = "";
            refreshMatchesTemp()
        }
    } else if (evt.target.id === 'rowBtn2') {
        if (game.matchRows[1].matches.length > 0) {
            pickUpMatchCount++;
            selectedRow = game.matchRows[1];
            console.log("Hit row2");
            document.getElementById("rowBtn1").disabled = true;
            document.getElementById("rowBtn3").disabled = true;
            document.getElementById("rowBtn4").disabled = true;
            game.matchRows[1].matches[pickUpMatchCount - 1].imageURI = "";
            refreshMatchesTemp()
        }
    } else if (evt.target.id === 'rowBtn3') {
        if (game.matchRows[2].matches.length > 0) {
            pickUpMatchCount++;
            selectedRow = game.matchRows[2];
            console.log("Hit row3");
            document.getElementById("rowBtn1").disabled = true;
            document.getElementById("rowBtn2").disabled = true;
            document.getElementById("rowBtn4").disabled = true;
            game.matchRows[2].matches[pickUpMatchCount - 1].imageURI = "";
            refreshMatchesTemp()
        }

    } else if (evt.target.id === 'rowBtn4') {
        if (game.matchRows[3].matches.length > 0) {
            pickUpMatchCount++;
            selectedRow = game.matchRows[3];
            console.log("Hit row4");
            document.getElementById("rowBtn1").disabled = true;
            document.getElementById("rowBtn2").disabled = true;
            document.getElementById("rowBtn3").disabled = true;
            game.matchRows[3].matches[pickUpMatchCount - 1].imageURI = "";
            refreshMatchesTemp()
        }

    }
}

function refreshMatchesTemp() {
    for (let i = 0; i < rowIds.length; i++) {
        while (document.getElementById(rowIds[i]).firstChild) {
            document.getElementById(rowIds[i]).removeChild(document.getElementById(rowIds[i]).firstChild)
        }
        game.matchRows[i].matches.forEach(match => {
            let node = document.createElement("img");
            node.classList.add("match")
            node.src = match.imageURI;
            document.getElementById(rowIds[i]).appendChild(node);
        });
    }
}

function refreshMatches() {
    for (let i = 0; i < rowIds.length; i++) {
        while (document.getElementById(rowIds[i]).firstChild) {
            document.getElementById(rowIds[i]).removeChild(document.getElementById(rowIds[i]).firstChild)
        }
        game.matchRows[i].matches.forEach(match => {
            match.imageURI = "match.png"
            let node = document.createElement("img");
            node.classList.add("match")
            node.src = match.imageURI;
            document.getElementById(rowIds[i]).appendChild(node);
        });
        if (game.matchRows[i].matches.length <= 0) {
            document.getElementById(`rowBtn${i+1}`).style.visibility = "hidden"
        }
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
    refreshMatches()
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

const queryString = window.location.search;
console.log(queryString)

const urlParams = new URLSearchParams(queryString);

const whoStarts = urlParams.get('whoStarts')

if (whoStarts === "bot") {
    game.doBotTurn()
}