var uname = sessionStorage.getItem("userName");
var password = sessionStorage.getItem("userPassword");

function ScoresPage() {//function called when page loads, displays all scores and max score
    var max = localStorage.getItem(uname + password + "HighestScore");//extract max to compare with each score
    document.getElementById("gameScores").innerHTML = "";//cleans the inner HTML of the game scores, to add the new score
    for (var i = 0; i <= localStorage.getItem(uname + password + "gameCount"); i++) {
        if (localStorage.getItem(uname + password + "score" + i) != null)//if player actually played and didnt just reload
            document.getElementById("gameScores").innerHTML += "<li>" + "Game " + (i + 1) + ": " + localStorage.getItem(uname + password + "score" + i) + "</li>" + "<br>";//display
        if (parseInt(localStorage.getItem(uname + password + "score" + i)) > parseInt(max))//if cur score is greater than max score, update the max
            max = localStorage.getItem(uname + password + "score" + i);
    }
    document.getElementById("all").innerHTML += "Player " + uname;
    document.getElementById("highest").innerHTML = "<br>Highest Score: " + max;//print to page highest score
    localStorage.setItem(uname + password + "HighestScore", max);
}