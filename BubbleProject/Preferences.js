var uname = sessionStorage.getItem("userName");//global user name, used in most functions
var password = sessionStorage.getItem("userPassword");//global user password, used in most functions
function saveColor() {//function to save colors to local storage and to array, called by form submit
    for (var i = 0; i < 4; i++) {//loop to save users colors in local storage
        localStorage.setItem(uname + password + "clr" + i, document.getElementById("chosenColor" + parseInt(1 + i)).value);
    }
}
function saveSpeed() {//function to save user speed, called by form submit
    localStorage.setItem(uname + password + "speed", document.getElementById("ChosenSpeed").value);
}
function initVal() {//called on body load, welcomes player,
    //and if it is a recurring player initializes the values to values chosen last time that player played a game
    document.getElementById("welcome").innerHTML += uname[0].toUpperCase() + "!";//welcoming player by his name initial
    if (parseInt(localStorage.getItem(sessionStorage.getItem("userName") + sessionStorage.getItem("userPassword") + "gameCount")) > 0) {//if played more than once
        for (var i = 1; i <= 4; i++) {
            document.getElementById("chosenColor" + i).value = localStorage.getItem(uname + password + "clr" + (parseInt(i) - 1));//set the colors
        }
        document.getElementById("ChosenSpeed").value = localStorage.getItem(uname + password + "speed");//set the speed
    }
}
function ScoresPage() {//aside func for player to see max score
    var max = localStorage.getItem(uname + password + "HighestScore");
    document.getElementById("gameScores").innerHTML = max;//print highest score
}
function getFileDetails(e) {//function to save winning music
    var files = e.target.files;
    localStorage.setItem(uname + password + "soundValue", files[0].name);

    for (var i = 0, file; file = files[i]; i++) {
        var reader = new FileReader();
        if (file.type.match("audio*")) {
            reader.onload = function (e) {
                var x = e.target.result;
                localStorage.setItem(uname + password + "sound", x);
            }
            reader.readAsDataURL(file);
        }
    }
}
function nextPage() {//function occurs on submit, saves colors and speed. call to next page happens automatically onsubmit
    saveColor();//saves the colors
    saveSpeed();//saves the speed
}