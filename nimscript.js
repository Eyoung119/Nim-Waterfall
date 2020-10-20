
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

    pickUpMatches = (numberOfMatches) => {

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
        return true;
    }

    doBotTurn() {

    }

    changeTurn() {

    }
}

class Bot {
    doTurn() {

    }
}

