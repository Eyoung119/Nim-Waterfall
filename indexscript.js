const indexForm = document.getElementById("startSelection");
const playerFirst = document.getElementById('playerFirst').checked;
const botFirst = document.getElementById('botFirst').checked;

// const checkIfValid = () => {
//     if(playerFirst || botFirst){
//         sessionStorage.setItem("startBot", botFirst);
//         window.location.href = 'matchPage.html';
//     }
//     else{
//         return false;
//     }
// }

// function start() {
//     const playerFirst = document.getElementById('playerFirst').checked;
//     const botFirst = document.getElementById('botFirst').checked;
//     if(playerFirst || botFirst){
//         sessionStorage.setItem("startBot", botFirst);
//         return true;
//     }
//     return false;
// }

function start() {
    sessionStorage.setItem("startBot", botFirst);
    window.location.href = 'matchPage.html';
}

// indexForm.addEventListener("submit", checkIfValid);
