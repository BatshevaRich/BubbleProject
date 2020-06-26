/////////////////////////////////////////////////////////
//GLOBALS
/////////////////////////////////////////////////////////
var arrSelectedColor = new Array;//arr of local storage colors
var uname = sessionStorage.getItem("userName");//user name
var password = sessionStorage.getItem("userPassword");//user password
sessionStorage.setItem(uname + password + "score", 0);//score needs to be saved only on current session
for (var i = 0; i < 4; i++) {//loop to put in arr the colors
    arrSelectedColor[i] = localStorage.getItem(uname + password + "clr" + i);
}
var curGame = localStorage.getItem(uname + password + "gameCount");
var won = false;//var to check if player won or not
var curScore = 0;//var to keep current score, in case player wants to keep playing, cant compare to meter anymore
var keepPlaying = false;//var in case player wants to keep playing.
var winning = 0;
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function initializeVal() {//function to initialize score and print
    var x = (parseInt(localStorage.getItem(uname + password + "gameCount")) + 1);
    curGame = (parseInt(curGame) + 1);
    if (localStorage.getItem(uname + password + "score" + (parseInt(x) - 1)) == null)//if actually played last game and didnt just reload, than increase game count
    {
        localStorage.setItem(uname + password + "gameCount", parseInt(x) - 1);
        curGame = (parseInt(curGame) - 1);

    }
    else {
        localStorage.setItem(uname + password + "gameCount", parseInt(x) + 1);
    }
    document.getElementById("welcome").innerHTML += uname[0].toUpperCase() + "!";
}

function drawCircle() {//function to draw the small circles for the game
    var circleButton = document.createElement("button");//dynamically created element
    circleButton.className = "myCircle";//style
    var rand = Math.floor((Math.random() * 4));
    circleButton.style.color = arrSelectedColor[rand];
    circleButton.style.backgroundColor = arrSelectedColor[rand];
    circleButton.style.borderColor = arrSelectedColor[rand];
    circleButton.name = "gameCircle";//name of all buttons is same, easier to get one
    circleButton.setAttribute("data-littleCircle", arrSelectedColor[rand]);//set the data
    circleButton.onclick = function () { checkColor(circleButton.getAttribute("data-littleCircle")); }//all buttons get same func to check color
    document.getElementById("article").append(circleButton);//append the element to the article element
}

function drawBigCircle() {//ditto, draw a big circle
    var circleButton = document.createElement("button");
    circleButton.className = "myBigCircle";
    var rand = Math.floor((Math.random() * 4));
    circleButton.style.color = arrSelectedColor[rand];
    circleButton.style.backgroundColor = arrSelectedColor[rand];
    circleButton.style.borderColor = arrSelectedColor[rand];
    circleButton.name = "gameBigCircle";
    circleButton.setAttribute("data-bigCircle", arrSelectedColor[rand]);
    document.getElementById("side").append(circleButton);//append to side element
}

function loadBubbles() {//first function, load all small bubbles. also used when reloading playing board
    for (var i = 0; i < 11; i++) {//fill article element in my screen
        for (var j = 0; j < 19; j++) {
            drawCircle();
        }
    }
}

function removeElement(name) {//helper function to remove element by name
    var elem = document.getElementsByName(name);
    elem[0].parentNode.removeChild(elem[0]);
}

function checkColor(event) {//main function, check color of selected bubble, and do winning tasks
    if (event == document.getElementsByName("gameBigCircle")[0].getAttribute("data-bigCircle")) {//if sent color is equal to big circle data-color
        var curElement = document.activeElement;//hold clicked element
        document.activeElement.disabled = true;//player cant keep clicking on the button
        curElement.style.animationName = "popBubble";//set animation style
        curElement.style.animationDuration = "1.25s";
        setTimeout(function () {//timeout untill animation is done
            curElement.style.borderWidth = 0;//preferred to set the circle to bgcolor, rather than removing element and all circles will jump
            curElement.style.backgroundColor = "gray";
            //document.getElementById("article").removeChild(curElement);//remove that bubble
        }, 1250);
        if (/*sessionStorage.getItem(uname + password + "score") >*/document.getElementById("gameProgress").value == 400 || document.getElementById("gameMeter").value == 400 && localStorage.getItem(uname + password + "score") == 400 && !keepPlaying) {//if player filled the quota
            var elm = document.getElementById("article");//remove all small bubbles from playing board
            while (elm.hasChildNodes()) {
                elm.removeChild(elm.lastChild);
            }
            document.getElementById("myAudio").src = localStorage.getItem(uname + password + "sound");//play music the player chose
            document.getElementById("myAudio").autoplay = true;
            document.getElementById("myAudio").hidden = false;
            won = true;//stop all the intervals
            winning = parseInt(winning) + 10;
            if (confirm("Keep playing? ")) {//ask player if he wants to keep playing
                keepPlaying = true;
                loadBubbles();
                won = false;//so player can keep playing
                document.getElementById("gameProgress").value = 0;
            }
            else {
                document.getElementById("side").removeChild(document.getElementsByName("gameBigCircle")[0]);//remove the big circle
                var x = document.createElement("h2");//create winning message for player, and append to main article
                x.style.animationName = "wonGame";
                x.style.animationDuration = "3s";
                x.innerHTML = "Great Job!! You Won!!";
                document.getElementById("article").appendChild(x);
                setTimeout(function () {//timeout untill animation is done
                    x.style.color = "purple";
                }, 3550);
            }
        }
        curScore = parseInt(curScore) + 10;//increase score
        localStorage.setItem(uname + password + "score" + curGame, parseInt(curScore));//set players score
        sessionStorage.setItem(uname + password + "score", parseInt(curScore));
        document.getElementById("curScore").innerHTML = sessionStorage.getItem(uname + password + "score");
        if (keepPlaying == true)
            document.getElementById("gameProgress").value = parseInt(curScore) - 400 + parseInt(winning);
        else document.getElementById("gameProgress").value = curScore;

    }
}

function switchBubble() {//function to change big bubble randomly
    drawBigCircle();
    setInterval(function () {
        if (won == true)
            return;//if player won, no point in removing and redrawing
        while (removeElement("gameBigCircle")) {
            removeElement("gameBigCircle");
        }
        drawBigCircle();
    }, 9000 / localStorage.getItem(uname + password + "speed"));
}

function reloadBubbles() {//function to reload little bubbles
    setInterval(function () {
        if (won == true) return;//if player won, no point in removing and redrawing
        var elm = document.getElementById("article");
        while (elm.hasChildNodes()) {
            elm.removeChild(elm.lastChild);
        }
        loadBubbles();
    }, 27000 / localStorage.getItem(uname + password + "speed"));
}

function playAgain() {//function for reload page for new game, occurs after timer ended
    var z = document.createElement("button");
    z.className = "button";
    z.onclick = function () { location.reload(true); }//all buttons get same func to check color
    z.innerHTML = "Play Again?";
    document.getElementById("article").appendChild(z);
}

function increaseTime() {
    setInterval(function () {
        document.getElementById("gameMeter").value += 20;//increase meter
        if (document.getElementById("gameMeter").value == 400 && parseInt(sessionStorage.getItem(uname + password + "score")) < 400 && !won) {
            won = true;
            var elm = document.getElementById("article");//remove all small bubbles from playing board
            while (elm.hasChildNodes()) {
                elm.removeChild(elm.lastChild);
            }
            document.getElementById("side").removeChild(document.getElementsByName("gameBigCircle")[0]);//remove the big circle
            var x = document.createElement("h2");//create losing message for player, and append to main article
            x.style.animationName = "wonGame";
            x.style.animationDuration = "3s";
            x.innerHTML = "You Lose!!";
            document.getElementById("article").appendChild(x);
            setTimeout(function () {//timeout untill animation is done
                x.style.color = "purple";
                playAgain();
            }, 3550);
        }
    }, 10000 / localStorage.getItem(uname + password + "speed"));
}

function GoScore() {//if player wants to see scores
    location.assign("Scores.html");
}