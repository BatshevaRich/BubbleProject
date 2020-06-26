function saveName() {//function called after submit, saves player name to session storage
    sessionStorage.setItem("userName", document.getElementById("playerName").value);
}
function savePassword() {//function called after submit, saves player password to session storage,
    //if that player is not in the browser memory, set his game count to 0- he is a new player
    sessionStorage.setItem("userPassword", document.getElementById("playerPassword").value);
    if (localStorage.getItem(sessionStorage.getItem("userName") + sessionStorage.getItem("userPassword") + "gameCount") == null)
        localStorage.setItem(sessionStorage.getItem("userName") + sessionStorage.getItem("userPassword") + "gameCount", 0)
}
function nextPage() {//function occurs on submit, saves name and password. call to next page happens automatically onsubmit
    localStorage.setItem(document.getElementById("playerName").value + document.getElementById("playerPassword").value + "HighestScore", 0);
    saveName();
    savePassword();
}