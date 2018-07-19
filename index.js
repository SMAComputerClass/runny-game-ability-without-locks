'use strict';
var today = "4-23-18"; // fully working scrolling, I think!
var yourCharacter;
var yourCharacterName;
var opponentHealth = 100;
var opponent;
var yourCharacterPicture;
var yourStrength;
var yourAgility;
var yourIntellect;
var yourVitality;
var yourCharisma;
var yourLevel;
var yourClass;
var yourExperience = 0;
var yourPlayerNumber = 0;
var boardSize = 9; // increase from 8 to 9 for scrolling
var viewSize = 7; // only the visible squares to facilitate scrolling
var hiddenPadding = (boardSize - viewSize) / 2; // # of hidden rows and columns if starting at center of board
var currentSquare = ((boardSize * boardSize) - 1) / 2; // start in middle of the screen
var foundKey = false;
var ability1Ready = true;
var basicAdlaniTrapImmunity = false;
var mrMugglesTrapKnowledgeStatus = "ready"
var ickyThumpBuildStatus = "ready"
var yourHealth;
var yourMoney=100;
document.getElementById("moneyBar").innerHTML=yourMoney
// var playerDirection;

var squares; // define globally once, going to be array of individual squares

var SQUARE_SIZE = 60;
// pac man direction
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var ONE_KEY = 49;
var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_RIGHT = 39;
var ARROW_DOWN = 40;

var MOVE_RIGHT_EVENT = 1;
var MOVE_LEFT_EVENT = 2;
var MOVE_DOWN_EVENT = 3;
var MOVE_UP_EVENT = 4;
var FIND_TREASURE_EVENT = 5;

var yourBoardIcon;

var SQ_STATUS_PAC_ON_BLANK = 1;
var SQ_STATUS_TREASURE_ON_BLANK = 2;
var SQ_STATUS_PAC_ON_TREASURE_BAD = 3;
var SQ_STATUS_PAC_ON_TREASURE_MEDIUM = 4;
var SQ_STATUS_PAC_ON_TREASURE_GOOD = 5;
var SQ_STATUS_NPC_ON_BLANK = 6;
var SQ_STATUS_PAC_ON_NPC = 7; // Not sure if you need this one???
var SQ_STATUS_PAC_ON_ICHABOD_TRISKET = 8;
var SQ_STATUS_ICHABOD_TRISKET = 9;
var SQ_STATUS_PAC_ON_FLOJO_SUMMERSTREAM = 10;
var SQ_STATUS_FLOJO_SUMMERSTREAM = 11;
var SQ_STATUS_PAC_ON_RED_LOCK = 12;
var SQ_STATUS_PAC_ON_RED_KEY = 13;
var SQ_STATUS_RED_LOCK = 14;
var SQ_STATUS_RED_KEY = 15;
var SQ_STATUS_PIT_TRAP = 16;
var SQ_STATUS_PAC_ON_PIT_TRAP = 17;

var SQ_STATUS_TREASURE_BAD = 20;
var SQ_STATUS_TREASURE_MEDIUM = 21;
var SQ_STATUS_TREASURE_GOOD = 22;

var SQ_STATUS_OTHER_PLAYER = 30;

var SQ_STATUS_WALL = 50;

var RED = 1;
var GREEN = 2;
var WALL = 1;
var WALL_CHANCE = 10; // target percentage of number of walls in random wall mode

var PIT = 1;

var SQ_STATUS_BLANK = 100;

var TREASURE_INDEX_POSITION = 0;
var TREASURE_INDEX_TYPE = 1;
var TREASURE_INDEX_ICON = 2; // appearance

var NPC_INDEX_POSITION = 0;
var NPC_INDEX_NAME = 1;

var OTHER_PLAYER_INDEX_NAME = 0;
var OTHER_PLAYER_INDEX_POSITION = 1;

var TREASURE_TYPE_BAD = 1;
var TREASURE_TYPE_MEDIUM = 2;
var TREASURE_TYPE_GOOD = 3;
var TREASURE_TYPE_RED_KEY = 5;

var TREASURE_ICON_1 = "<img src= 'treasure 1.jpg'>";
var TREASURE_ICON_2 = "<img src= 'treasure 2.jpg'>";
var TREASURE_ICON_3 = "<img src= 'treasure 3.jpg'>";
var TREASURE_ICON_4 = "<img src= 'treasure 4.jpg'>";

var NPC_ICHABOD_TRISKET = 1;
var NPC_FLOJO_SUMMERSTREAM = 2

var PLAYER1 = "Player1";
var PLAYER2 = "Player2";

var treasures = new Array;
var NPCs = new Array;
var yourLoot = new Array;
var walls = new Array;
var locks = new Array;
var traps = new Array;
var yourKeys = new Array;
var otherPlayers = new Array;

var player1StatusRef; // reference to player 1 in the db
var player2StatusRef; // reference to player 2 in the db

var player1StatusVar = false; // stores whether this player is active
var player2StatusVar = false; // stores whether this player is active

var themesong = new Audio("peanuts song.mp3");
var ickyThumpSound = new Audio("icky thump sound.wav");
var denchSound = new Audio("dench sound.wav");
var uncleUbSound = new Audio("uncle ub sound.wav");
var mrMugglesSound = new Audio("mr muggles sound.wav")
var biggyCheeseSound = new Audio("biggy cheese sound.wav")
var bizmoFunionsSound = new Audio("bizmo funions sound.wav");
themesong.loop = true;

themesong.volume = 0; //0.05;


// ----- Initialize Firebase -----------------------------------

var config = {
  apiKey: "AIzaSyCjDv3SCpejiIugQtMapj8rTr2U1Jh0s8I",
  authDomain: "runny1-e2d7c.firebaseapp.com",
  databaseURL: "https://runny1-e2d7c.firebaseio.com",
  projectId: "runny1-e2d7c",
  storageBucket: "runny1-e2d7c.appspot.com",
  messagingSenderId: "334941426331"
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var firestore = firebase.firestore();

// ------------------------------------------------

function chooseAdlani() {

  biggyCheeseSound.play();
  document.getElementById("title").style.visibility = "visible";
  characterSelector.parentNode.removeChild(characterSelector);
  document.getElementById("yourStrength").innerHTML = 4;
  document.getElementById("yourAgility").innerHTML = 1;
  document.getElementById("yourIntellect").innerHTML = 7;
  document.getElementById("yourVitality").innerHTML = 10;
  document.getElementById("yourCharisma").innerHTML = 5;
  document.getElementById("ability1").innerHTML = "Stone Adlani: ";
  document.getElementById("ability1Status").innerHTML = "READY";
  document.getElementById("ability2").innerHTML = "Coming Soon";
  document.getElementById("ability3").innerHTML = "Coming Soon";


  yourCharacter = "Biggy Cheese";
  yourCharacterName = "BIGGY CHEESE";
  banana.innerHTML = "<img src= 'adlani baby.jpg'>";
  yourLevel = 1;
  yourStrength = 4;
  yourAgility = 1;
  yourIntellect = 7;
  yourVitality = 10;
  yourCharisma = 5;
  yourHealth = yourVitality * 10
  document.getElementById("healthBar").innerHTML = yourHealth;
  yourBoardIcon = "<img src= 'adlani grass.jpg'>"
  calculateClass();

  title.innerHTML = "YOUR NAME IS " + yourCharacterName + ", LEVEL " + yourLevel + " " + yourClass;

  selectPlayer();


  var i;
  for (i = 0; i < squares.length; i++) {
    processSquare(i);
  }

  return;
}



// -------------

function chooseNoah() {

  console.log("Noah chosen");
  denchSound.play();
  document.getElementById("title").style.visibility = "visible";
  characterSelector.parentNode.removeChild(characterSelector);
  document.getElementById("yourStrength").innerHTML = 5;
  document.getElementById("yourAgility").innerHTML = 10;
  document.getElementById("yourIntellect").innerHTML = 8;
  document.getElementById("yourVitality").innerHTML = 4;
  document.getElementById("yourCharisma").innerHTML = 5;
  document.getElementById("ability1").innerHTML = "Shapeshift: ";
  document.getElementById("ability1Status").innerHTML = "READY";
  document.getElementById("ability2").innerHTML = "Coming Soon";
  document.getElementById("ability3").innerHTML = "Coming Soon";

  yourCharacter = "Dench";
  yourCharacterName = "DENCH";
  banana.innerHTML = "<img src= 'noah baby.jpg'>";
  yourLevel = 1;
  yourStrength = 5;
  yourAgility = 10;
  yourIntellect = 8;
  yourVitality = 4;
  yourCharisma = 5;
  yourHealth = yourVitality * 10
  document.getElementById("healthBar").innerHTML = yourHealth;

  calculateClass();

  yourBoardIcon = "<img src= 'noah grass.jpg'>";
  // processSquare(currentSquare);
  title.innerHTML = "YOUR NAME IS " + yourCharacterName + ", LEVEL " + yourLevel + " " + yourClass;

  selectPlayer();


  var i;
  for (i = 0; i < squares.length; i++) {
    processSquare(i);
  }
  return
}



function chooseJoey() {

  bizmoFunionsSound.play();
  document.getElementById("title").style.visibility = "visible";
  characterSelector.parentNode.removeChild(characterSelector);
  document.getElementById("yourStrength").innerHTML = 5;
  document.getElementById("yourAgility").innerHTML = 3;
  document.getElementById("yourIntellect").innerHTML = 9;
  document.getElementById("yourVitality").innerHTML = 6;
  document.getElementById("yourCharisma").innerHTML = 10;
  document.getElementById("ability1").innerHTML = "Mind Control: ";
  document.getElementById("ability1Status").innerHTML = "READY";
  document.getElementById("ability2").innerHTML = "Coming Soon";
  document.getElementById("ability3").innerHTML = "Coming Soon";

  yourCharacter = "Bizmo Funions";
  yourCharacterName = "BIZMO FUNIONS";
  banana.innerHTML = "<img src= 'joey baby.jpg'>";
  yourLevel = 1;
  yourStrength = 5;
  yourAgility = 3;
  yourIntellect = 9;
  yourVitality = 6;
  yourCharisma = 10;
  yourHealth = yourVitality * 10
  document.getElementById("healthBar").innerHTML = yourHealth;
  yourBoardIcon = "<img src= 'joey grass.jpg'>"
  calculateClass();

  // processSquare(currentSquare);
  title.innerHTML = "YOUR NAME IS " + yourCharacterName + ", LEVEL " + yourLevel + " " + yourClass;

  selectPlayer();


  var i;
  for (i = 0; i < squares.length; i++) {
    processSquare(i);
  }
  return
}



function chooseCarlo() {

  uncleUbSound.play();
  document.getElementById("title").style.visibility = "visible";
  characterSelector.parentNode.removeChild(characterSelector);
  document.getElementById("yourStrength").innerHTML = 10;
  document.getElementById("yourAgility").innerHTML = 3;
  document.getElementById("yourIntellect").innerHTML = 2;
  document.getElementById("yourVitality").innerHTML = 8;
  document.getElementById("yourCharisma").innerHTML = 4;
  document.getElementById("ability1").innerHTML = "Regenerate: ";
  document.getElementById("ability1Status").innerHTML = "READY";
  document.getElementById("ability2").innerHTML = "Coming Soon";
  document.getElementById("ability3").innerHTML = "Coming Soon";

  yourCharacter = "Uncle Ub";
  yourCharacterName = "UNCLE UB";
  banana.innerHTML = "<img src= 'carlo baby.jpg'>";
  yourLevel = 1;
  yourStrength = 10;
  yourAgility = 3;
  yourIntellect = 2;
  yourVitality = 8;
  yourCharisma = 4;
  yourHealth = yourVitality * 10
  document.getElementById("healthBar").innerHTML = yourHealth;
  yourMoney=200;
  document.getElementById("moneyBar").innerHTML=yourMoney
  yourBoardIcon = "<img src= 'carlo grass.jpg'>";
  // processSquare(currentSquare);
  calculateClass();

  title.innerHTML = "YOUR NAME IS " + yourCharacterName + ", LEVEL " + yourLevel + " " + yourClass;

  selectPlayer();


  var i;
  for (i = 0; i < squares.length; i++) {
    processSquare(i);
  }
  return;
}


// -------------------------

function chooseDiego() {

  mrMugglesSound.play();
  document.getElementById("title").style.visibility = "visible";
  characterSelector.parentNode.removeChild(characterSelector);
  document.getElementById("yourStrength").innerHTML = 2;
  document.getElementById("yourAgility").innerHTML = 7;
  document.getElementById("yourIntellect").innerHTML = 10;
  document.getElementById("yourVitality").innerHTML = 4;
  document.getElementById("yourCharisma").innerHTML = 6;
  document.getElementById("ability1").innerHTML = "Trap Knowledge: ";
  document.getElementById("ability1Status").innerHTML = "READY";
  document.getElementById("ability2").innerHTML = "Coming Soon";
  document.getElementById("ability3").innerHTML = "Coming Soon";

  yourCharacter = "Mr. Muggle";
  yourCharacterName = "MR. MUGGLE";
  banana.innerHTML = "<img src= 'diego baby.jpg'>";
  yourLevel = 1;
  yourStrength = 2;
  yourAgility = 7;
  yourIntellect = 10;
  yourVitality = 4;
  yourCharisma = 6;
  yourHealth = yourVitality * 10
  document.getElementById("healthBar").innerHTML = yourHealth;
  yourBoardIcon = "<img src= 'diego grass.jpg'>";
  // processSquare(currentSquare);
  calculateClass();

  title.innerHTML = "YOUR NAME IS " + yourCharacterName + ", LEVEL " + yourLevel + " " + yourClass;

  selectPlayer();


  var i;
  for (i = 0; i < squares.length; i++) {
    processSquare(i);
  }
  return
}


// --------------------------------------------

function chooseJon() {

  ickyThumpSound.play();
  document.getElementById("title").style.visibility = "visible";
  characterSelector.parentNode.removeChild(characterSelector);
  document.getElementById("yourStrength").innerHTML = 7;
  document.getElementById("yourAgility").innerHTML = 7;
  document.getElementById("yourIntellect").innerHTML = 7;
  document.getElementById("yourVitality").innerHTML = 7;
  document.getElementById("yourCharisma").innerHTML = 7;
  document.getElementById("ability1").innerHTML = "Build: ";
  document.getElementById("ability1Status").innerHTML = "READY";
  document.getElementById("ability2").innerHTML = "Coming Soon";
  document.getElementById("ability3").innerHTML = "Coming Soon";

  yourCharacter = "Icky Thump";
  yourCharacterName = "ICKY THUMP";
  banana.innerHTML = "<img src= 'jon baby.jpg'>";
  yourLevel = 1;
  yourStrength = 7;
  yourAgility = 7;
  yourIntellect = 7;
  yourVitality = 7;
  yourCharisma = 7;
  yourHealth = yourVitality * 10
  document.getElementById("healthBar").innerHTML = yourHealth;
  yourBoardIcon = "<img src= 'jon grass.jpg'>";
  // processSquare(currentSquare);
  calculateClass();

  title.innerHTML = "YOUR NAME IS " + yourCharacterName + ", LEVEL " + yourLevel + " " + yourClass;
  var i;

  selectPlayer();

  // draw board
  for (i = 0; i < squares.length; i++) {
    processSquare(i);
  }
  return

}

// -------------------------------------------

// Connect to firebase and set your player 1 or 2

function selectPlayer() {

  // Check for player 1
  var player1Ref = db.collection("GameData").doc("Player1");

  player1Ref.get().then(function(doc) {
    if (doc.exists) {
      console.log("Player 1 Doc exists");
      var player1Status = doc.data().status;
      console.log("Player 1 status is " + player1Status);

      // if nobody has taken player 1, set yourself to player 1
      if (player1Status == false) {
        yourPlayerNumber = PLAYER1;
        player1StatusVar = true; // global var, not sure I need this
        console.log("Setting you to player 1 : " + yourPlayerNumber);

        db.collection("GameData").doc("Player1").set({
            status: true,
            name: yourCharacterName,
            currentSquare: currentSquare
          })
          .then(function() {
            console.log("Player 1 successfully claimed!");
          })
          .catch(function(error) {
            console.error("Error writing player 1 data: ", error);
          });

        // you are player 1, set listener for player 2
        // check for player 2.  If true, set the otherPlayer Array
        var player2Ref = db.collection("GameData").doc("Player2");

        // ---- Player 2 listener - called when player 2 changes  -----------
        player2Ref.onSnapshot(function(doc) {
          console.log("Player 2 change triggered ");
          var player2Status = doc.data().status;
          console.log("Player 2 status is " + player2Status);

          // if status is false in the db, do nothing (this gets called once automatically), if true, process change
          if (player2Status == true) {
            if (player2StatusVar == false) {
              console.log("Player 2 just joined");
              player2StatusVar = true;
              otherPlayers.push([doc.data().name, doc.data().currentSquare]);
            } else // player 2 already joined, only update currentSquare
            {
              console.log("Player 2 already joined now he changed");
              otherPlayers[0][OTHER_PLAYER_INDEX_POSITION] = doc.data().currentSquare;
            }
            redrawView();
          }
        }); // end listener for player 2 changes

      } // end if Player 1 is available.
      else // take Player 2
      {
        yourPlayerNumber = PLAYER2;
        player2StatusVar = true;

        console.log("Setting you to player 2 : " + yourPlayerNumber);

        db.collection("GameData").doc("Player2").set({
            status: true,
            name: yourCharacterName,
            currentSquare: currentSquare
          })
          .then(function() {
            console.log("Player 2 successfully claimed!");
          })
          .catch(function(error) {
            console.error("Error writing player 2 data: ", error);
          });

        // you are player 2, set listener for player 1
        // check for player 1.  If true, set the otherPlayer Array
        var player1Ref = db.collection("GameData").doc("Player1");

        // ---- Player 1 listener - called when player 1 changes  -----------
        player1Ref.onSnapshot(function(doc) {
          console.log("Player 1 change triggered ");
          var player1Status = doc.data().status;
          console.log("Player 1 status is " + player1Status);

          // if status is false in the db, do nothing, if true, process change
          if (player1Status == true) {
            if (player1StatusVar == false) {
              console.log("Player 1 just joined");
              player1StatusVar = true;
              otherPlayers.push([doc.data().name, doc.data().currentSquare]);
            } else // player 1 already joined, only update currentSquare
            {
              console.log("Player 1 already joined now changed");
              otherPlayers[0][OTHER_PLAYER_INDEX_POSITION] = doc.data().currentSquare;
            }
            redrawView();
          }
        }); // end listener for player 1 changes

      } // end else take player 2

    } // end if doc exists

  }).catch(function(error) {
    console.log("Error getting player1ref.get() document:", error);
  });

} // end function selectPlayer

// -----------------------------------------
function joeyHover() {
  document.getElementById("characterSpecialty").innerHTML = "kills enemies with jokes";
  document.getElementById("characterWeakness").innerHTML = "weak to punches";
  document.getElementById("yourStrength").innerHTML = "5";
  document.getElementById("yourAgility").innerHTML = "3";
  document.getElementById("yourIntellect").innerHTML = "9";
  document.getElementById("yourVitality").innerHTML = "6";
  document.getElementById("yourCharisma").innerHTML = "10";
}

// -----------------------------------------

function adlaniHover() {
  document.getElementById("characterSpecialty").innerHTML = "takes hits like a champ";
  document.getElementById("characterWeakness").innerHTML = "vulnerable to throat chops";
  document.getElementById("yourStrength").innerHTML = "4";
  document.getElementById("yourAgility").innerHTML = "1";
  document.getElementById("yourIntellect").innerHTML = "7";
  document.getElementById("yourVitality").innerHTML = "10";
  document.getElementById("yourCharisma").innerHTML = "5";
}

// -----------------------------------------

function noahHover() {
  document.getElementById("characterSpecialty").innerHTML = "enjoys throat chopping";
  document.getElementById("characterWeakness").innerHTML = "spazzes out and misses attacks";
  document.getElementById("yourStrength").innerHTML = "5";
  document.getElementById("yourAgility").innerHTML = "10";
  document.getElementById("yourIntellect").innerHTML = "8";
  document.getElementById("yourVitality").innerHTML = "4";
  document.getElementById("yourCharisma").innerHTML = "5";
}

// -----------------------------------------

function diegoHover() {
  document.getElementById("characterSpecialty").innerHTML = "very smart";
  document.getElementById("characterWeakness").innerHTML = "weak attacks";
  document.getElementById("yourStrength").innerHTML = "2";
  document.getElementById("yourAgility").innerHTML = "7";
  document.getElementById("yourIntellect").innerHTML = "10";
  document.getElementById("yourVitality").innerHTML = "4";
  document.getElementById("yourCharisma").innerHTML = "6";
}

// -----------------------------------------

function carloHover() {
  document.getElementById("characterSpecialty").innerHTML = "punches hard";
  document.getElementById("characterWeakness").innerHTML = "vulnerable to insults";
  document.getElementById("yourStrength").innerHTML = "10";
  document.getElementById("yourAgility").innerHTML = "3";
  document.getElementById("yourIntellect").innerHTML = "2";
  document.getElementById("yourVitality").innerHTML = "8";
  document.getElementById("yourCharisma").innerHTML = "4";
}

// -----------------------------------------

function jonHover() {
  document.getElementById("characterSpecialty").innerHTML = "no weaknesses";
  document.getElementById("characterWeakness").innerHTML = "no Specialty";
  document.getElementById("yourStrength").innerHTML = "7";
  document.getElementById("yourAgility").innerHTML = "7";
  document.getElementById("yourIntellect").innerHTML = "7";
  document.getElementById("yourVitality").innerHTML = "7";
  document.getElementById("yourCharisma").innerHTML = "7";
}

// -----------------------------------------
function pauseThemeSong() {
  themesong.pause();
}

function playThemeSong() {
  themesong.play();
}

function resetDB() {

  db.collection("GameData").doc("Player1").set({
      status: false,
      name: "",
      currentSquare: 0
    })
    .then(function() {
      console.log("db reset success player 1");
    })
    .catch(function(error) {
      console.error("reset db fail player 1", error);
    });


  db.collection("GameData").doc("Player2").set({
      status: false,
      name: "",
      currentSquare: 0
    })
    .then(function() {
      console.log("db reset success player 2");
    })
    .catch(function(error) {
      console.error("reset db player 2 fail", error);
    });

  var locksRef = db.collection("Locks");
  var query = locksRef.get().then(snapshot => {
      var batch = db.batch();
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      batch.commit();
    })
    .catch(err => {
      console.log('Error getting documents related to locks', err);
      alert("Lock getting error " + err);
    });


}


//--------------------------------------player movment

// function {
//   document.getElementById("goBattle").style.visibility = "visible";
// }

// Enter your js code Her
function finishCooldown() {
  ability1Ready = true;
  document.getElementById("ability1Status").innerHTML = "READY";
}

document.onkeydown = checkKey;

function checkKey(evt) {
  // this line of code was needed due to old browsers, possibly firefox, Nathan had an issue
  evt = evt || window.event;

  //console.log ("Keycode pressed from event: " + evt.keyCode);

  var key = evt.keyCode;
  switch (key) {
    case ARROW_RIGHT:

      // console.log("**************** Right key is pressed **********");
      // console.log("**************** Right key is pressed **********");
      processEvent(currentSquare, MOVE_RIGHT_EVENT);
      break;
    case ARROW_LEFT:

      // console.log("**************** Left key is pressed **********");
      //console.log("**************** Left key is pressed **********");
      processEvent(currentSquare, MOVE_LEFT_EVENT);
      break;
    case ARROW_DOWN:

      // console.log("**************** Down key is pressed **********");
      // console.log("**************** Down key is pressed **********");
      processEvent(currentSquare, MOVE_DOWN_EVENT);
      break;
    case ARROW_UP:

      // console.log("**************** Up key is pressed **********");
      // console.log("**************** Up key is pressed **********");
      processEvent(currentSquare, MOVE_UP_EVENT);
      break;
    case ONE_KEY:

      switch (yourCharacter) {

        case "Biggy Cheese":
          if (ability1Ready == true) {
            yourBoardIcon = "<img src= 'stone adlani grass.jpg'>"
            basicAdlaniTrapImmunity = true;

            function undoStoneAdlani() {
              yourBoardIcon = "<img src= 'adlani grass.jpg'>"
              basicAdlaniTrapImmunity = false;
            }
            setTimeout(undoStoneAdlani, 5000);
            ability1Ready = false;
            document.getElementById("ability1Status").innerHTML = "COOLDOWN";
            setTimeout(finishCooldown, 20000);
          }
          break;
          //------------------------------------------
        case "Dench":
          if (ability1Ready == true) {
            var number = Math.floor(Math.random() * 5 + 1);
            switch (number) {
              case 1:
                yourBoardIcon = "<img src= 'adlani grass.jpg'>"
                break;
              case 2:
                yourBoardIcon = "<img src= 'joey grass.jpg'>"
                break;
              case 3:
                yourBoardIcon = "<img src= 'diego grass.jpg'>"
                break;
              case 4:
                yourBoardIcon = "<img src= 'jon grass.jpg'>"
                break;
              case 5:
                yourBoardIcon = "<img src= 'carlo grass.jpg'>"
                break;
              default:
            }

            function undoShapeshift() {
              yourBoardIcon = "<img src= 'noah grass.jpg'>"
            }
            setTimeout(undoShapeshift, 10000);
            ability1Ready = false;
            document.getElementById("ability1Status").innerHTML = "COOLDOWN";
            setTimeout(finishCooldown, 20000);
          }
          break;
          //------------------------------------------
        case "Bizmo Funions":
          if (ability1Ready == true) {
            yourCharisma = yourCharisma + 100;
            document.getElementById("yourCharisma").innerHTML = yourCharisma;

            function removeCharisma() {
              yourCharisma = yourCharisma - 100;
              document.getElementById("yourCharisma").innerHTML = yourCharisma;
            }
            setTimeout(removeCharisma, 5000);
            ability1Ready = false;
            document.getElementById("ability1Status").innerHTML = "COOLDOWN";
            setTimeout(finishCooldown, 20000);
          }
          break;
          //------------------------------------------
        case "Mr. Muggle":
          if (ability1Ready == true) {
            mrMugglesTrapKnowledgeStatus = "click"
            document.getElementById("ability1Status").innerHTML = "CLICK";
          }
          break;
          //------------------------------------------
        case "Icky Thump":
          if (ability1Ready == true) {
            ickyThumpBuildStatus = "click"
            document.getElementById("ability1Status").innerHTML = "CLICK";
          }
          break;
          //------------------------------------------
        case "Uncle Ub":
          if (ability1Ready == true) {

            var myVar = setInterval(regenTimer, 1000);
            function gogo(){
              clearInterval(myVar)
            }
            setTimeout(gogo, 21000)
            function regenTimer(){
              yourHealth++
              document.getElementById("healthBar").innerHTML = yourHealth;
              if (yourHealth==80)
                clearInterval(myVar)
            }
            ability1Ready = false;
            document.getElementById("ability1Status").innerHTML = "COOLDOWN";
            setTimeout(finishCooldown, 20000);
          }
          break;
          //------------------------------------------
        default:

      }
      break;
    default:

      // do nothing
  } // end switch

}
board.addEventListener('click', function(e) {
  if (yourCharacter == "Mr. Muggle") {
    if (mrMugglesTrapKnowledgeStatus == "click") {
      ability1Ready = false;
      document.getElementById("ability1Status").innerHTML = "COOLDOWN";
      setTimeout(finishCooldown, 20000);
      for (var i = 0; i < traps.length; i++) {
        switch (traps[i]) {
          case PIT:
            alert("This is a pit.\nYou need an agility of 6 or higher to pass safely.\nDoes 10 damage.\nMr. Muggle danger rating: Puppy")
            return
            break;
          default:


        }
      }
      mrMugglesTrapKnowledgeStatus == "ready"
    }
  }
  // if (yourCharacter == "Icky Thump") {
  //
  //   e.target.innerHTML = "Q";
  //
  //   alert("outside e.target.id = " + e.target.id);
  //
  //
  //   if (ickyThumpBuildStatus == "click") {
  //     ability1Ready = false;
  //     document.getElementById("ability1Status").innerHTML = "COOLDOWN";
  //     setTimeout(finishCooldown, 20000);
  //     alert("inside e.target.id = " + e.target.id);
  //     e.target.innerHTML = "X";
  //     walls[e.target.id] = 1;
  //     mrMugglesTrapKnowledgeStatus == "ready";
  //     redrawView();
  //   }
  //
  // }
});
// -------------------------------------------------


function processEvent(pos, code) {
  var i; // for loop through squares

  switch (code) {
    case MOVE_RIGHT_EVENT:
      if (checkLegalMove(currentSquare, RIGHT) == false) return;

      currentSquare++;
      break;

    case MOVE_LEFT_EVENT:
      if (checkLegalMove(currentSquare, LEFT) == false) return;

      currentSquare = currentSquare - 1;
      break;

    case MOVE_DOWN_EVENT:
      if (checkLegalMove(currentSquare, DOWN) == false) return;

      currentSquare = currentSquare + boardSize;
      break;

    case MOVE_UP_EVENT:
      if (checkLegalMove(currentSquare, UP) == false) return;

      currentSquare = currentSquare - boardSize;
      break;

    default:

  }

  db.collection("GameData").doc(yourPlayerNumber).update({
      currentSquare: currentSquare
    })
    .then(function() {
      console.log("Success move right written to db");
    })
    .catch(function(error) {
      console.error("Error writing move right write to db.", error);
    });

  redrawView();

}

// -------------------------------------------------

// Position in this function is current square within board size, not pos within view size

function checkLegalMove(position, direction) {
  switch (direction) {
    case UP:

      console.log("In Check Legal Move Up - position is " + position + "  boardsize is " + boardSize + "  locks pos minus board size has value " + locks[position - boardSize]);

      if (position < boardSize)
        return false;
      else {

        // check for lock and key
        switch (locks[position - boardSize]) {
          case RED:
            for (var i = 0; i < yourKeys.length; i++) {
              if (yourKeys[i] == "red key")
                return true;
            }

            return false;
            break;

          default:
            ;

        }


        // legal move, now check the square for an obstruction wall
        if (walls[position - boardSize] == 0)
          return true;
        else
          return false;
      }

      break;

    case DOWN:

      if (position > (boardSize * boardSize) - (boardSize + 1))
        return false;
      else {

        switch (locks[position + boardSize]) {

          case RED:
            for (var i = 0; i < yourKeys.length; i++) {
              if (yourKeys[i] == "red key")
                return true;
            }

            return false;
            break;

          default:
            ; // what is this?

        }

        // legal move, now check the square for an obstruction wall
        if (walls[position + boardSize] == 0)
          return true;
        else
          return false;
      }

      break;

    case LEFT:

      if (position % boardSize == 0)
        return false;
      else {

        switch (locks[position - 1]) {

          case RED:
            for (var i = 0; i < yourKeys.length; i++) {
              if (yourKeys[i] == "red key")
                return true;
            }

            return false;
            break;

          default:
            ;

        }

        // legal move, now check the square for an obstruction wall
        if (walls[position - 1] == 0)
          return true;
        else
          return false;
      }

      break;

    case RIGHT:

      if ((position % boardSize) == (boardSize - 1))
        return false;
      else {

        switch (locks[position + 1]) {

          case RED:
            for (var i = 0; i < yourKeys.length; i++) {
              if (yourKeys[i] == "red key")
                return true;
            }

            return false;
            break;

          default:
            ;

        }

        // legal move, now check the square for an obstruction wall
        if (walls[position + 1] == 0)
          return true;
        else
          return false;
      }

      break;

    default:

  } // end switch

  return true;

}


// -------------------------------

function redrawView() {
  var i;

  for (i = 0; i < squares.length; i++) {
    processSquare(i);
  }
}

// ---------------------------------------

function processSquare(pos) {
  var squareStatus = getSquareStatus(pos);
  //var squares = document.querySelectorAll('.square');  // faster to get first?

  console.log("Get Square Status called for current square = " + currentSquare + " Pos is " + pos + " Status is " + squareStatus);

  switch (squareStatus) {
    case SQ_STATUS_PAC_ON_BLANK:

      squares[pos].innerHTML = yourBoardIcon;
      break;

    case SQ_STATUS_OTHER_PLAYER:

      console.log("Other Player Found");

      switch (otherPlayers[0][OTHER_PLAYER_INDEX_NAME]) {
        case "BIGGY CHEESE":
          console.log("Biggy Cheese Found");
          squares[pos].innerHTML = "<img src= 'adlani grass.jpg'>";
          break;

        case "BIZMO FUNIONS":
          console.log("Bizmo Found");
          squares[pos].innerHTML = "<img src= 'joey grass.jpg'>";
          break;

        case "ICKY THUMP":
          console.log("ICKY THUMP Found");
          squares[pos].innerHTML = "<img src= 'jon grass.jpg'>";
          break;

        case "DENCH":
          console.log("Dench Found");
          squares[pos].innerHTML = "<img src= 'noah grass.jpg'>";
          break;

        case "MR. MUGGLE":
          console.log("Mr Muggle Found");
          squares[pos].innerHTML = "<img src= 'diego grass.jpg'>";
          break;

        case "UNCLE UB":
          console.log("Uncle Ub Found");
          squares[pos].innerHTML = "<img src= 'carlo grass.jpg'>";
          break;

        default:
          console.log("Other player not found - looking for " + otherPlayers[0][OTHER_PLAYER_INDEX_NAME]);

      }

      break;


    case SQ_STATUS_WALL:

      squares[pos].innerHTML = "<img src= 'wall.jpg'>";
      break;

    case SQ_STATUS_PAC_ON_TREASURE_BAD:

      // what treasue does
      squares[pos].innerHTML = yourBoardIcon;
      getBadTreasure();
      deleteTreasure(pos);
      break;


    case SQ_STATUS_PAC_ON_TREASURE_MEDIUM:

      // what treasue does
      squares[pos].innerHTML = yourBoardIcon;
      deleteTreasure(pos);
      getMediumTreasure();
      break;

    case SQ_STATUS_PAC_ON_TREASURE_GOOD:

      // what treasue does
      squares[pos].innerHTML = yourBoardIcon;
      deleteTreasure(pos);
      getGoodTreasure();
      break;

    case SQ_STATUS_TREASURE_BAD:

      // shouldn't need to check treasure index first because we know status is treasure
      squares[pos].innerHTML = treasures[getTreasureIndex(pos)][TREASURE_INDEX_ICON];
      break;

    case SQ_STATUS_TREASURE_MEDIUM:

      squares[pos].innerHTML = treasures[getTreasureIndex(pos)][TREASURE_INDEX_ICON];
      break;

    case SQ_STATUS_TREASURE_GOOD:

      squares[pos].innerHTML = treasures[getTreasureIndex(pos)][TREASURE_INDEX_ICON];
      break;

    case SQ_STATUS_RED_LOCK:

      squares[pos].innerHTML = "<img src= 'red lock.jpg'>";
      break;

    case SQ_STATUS_RED_KEY:

      squares[pos].innerHTML = "<img src= 'red key.jpg'>";
      break;

    case SQ_STATUS_PAC_ON_RED_KEY:
      foundKey = true;
      yourKeys.push("red key")
      squares[pos].innerHTML = yourBoardIcon;
      deleteTreasure(pos);
      break;


    case SQ_STATUS_PAC_ON_RED_LOCK:
      locks[currentSquare] = 0;
      squares[pos].innerHTML = yourBoardIcon;
      break;

    case SQ_STATUS_PAC_ON_ICHABOD_TRISKET:

      // what treasue does
      squares[pos].innerHTML = "<img src= 'ichabod trisket grass.jpg'>";
      var poo = prompt("How's it hangin' "+ yourCharacter +".\nEnter 1 too sell a treasure for 10 bucks.\nEnter 2 to sell all treasures for 10 bucks each.\nEnter 3 to sell all treasures for jumbled bun crumbles");
      if (poo == 1){
        yourLoot.splice(0, 1);
        yourMoney=yourMoney+10;
        document.getElementById("moneyBar").innerHTML = yourMoney;
      }
      if (poo == 2){
        yourMoney=yourMoney+(10*yourLoot.length);
        yourLoot.splice(0, yourLoot.length);
        document.getElementById("moneyBar").innerHTML = yourMoney;
      }
      if (poo == 3){
        yourLoot.splice(0, yourLoot.length);
        yourLoot.push("jumbled bun crumbles");
      }
      break;

    case SQ_STATUS_ICHABOD_TRISKET:
      ;

      squares[pos].innerHTML = "<img src= 'ichabod trisket grass.jpg'>";

      break;
    case SQ_STATUS_PAC_ON_FLOJO_SUMMERSTREAM:

      // what treasue does


      squares[pos].innerHTML = "<img src= 'flojo summerstream grass.jpg'>";
      var poo = prompt("Sup "+ yourCharacter +".\nEnter 1 to buy a good treasure for 10 bucks.\nEnter 2 to buy 5 good treasures for 10 bucks each.\nEnter 3 to sell all treasures for a level");
      if (poo == 1){
        if (yourMoney>=10){
        yourMoney=yourMoney-10;
        document.getElementById("moneyBar").innerHTML = yourMoney;
        getGoodTreasure()
        }
      }
      if (poo == 2){
        if (yourMoney>=50){
        yourMoney=yourMoney-50;
        document.getElementById("moneyBar").innerHTML = yourMoney;
        getGoodTreasure()
        getGoodTreasure()
        getGoodTreasure()
        getGoodTreasure()
        getGoodTreasure()
        }
      }
      if (poo == 3){
        if (yourMoney>=10){
        yourMoney=yourMoney-10;
        getExperience()
        }
      }
      break;
    case SQ_STATUS_FLOJO_SUMMERSTREAM:
      ;

      squares[pos].innerHTML = "<img src= 'flojo summerstream grass.jpg'>";

      break;
    case SQ_STATUS_PIT_TRAP:

      squares[pos].innerHTML = "<img src= 'pit trap.jpg'>";
      break;
    case SQ_STATUS_PAC_ON_PIT_TRAP:
      if (yourAgility >= 6)
        break;
      else if (basicAdlaniTrapImmunity == true)
        break;
      else {
        yourHealth = yourHealth - 10
        document.getElementById("healthBar").innerHTML = yourHealth;
        checkForDeath()
      }
      break;

    case SQ_STATUS_BLANK:

      squares[pos].innerHTML = "<img src= 'grass.jpg'>";
      break;

    default:
      console.log("Error in renderGame switch, invalid square status : " + squareStatus);

  } // end switch

}

function checkForDeath() {
  if (yourHealth == 0) {
    document.getElementById("board").innerHTML = "YOU DIED"
  }
}
// -----------------------------------------------------------------------------

function getNPCIndex(pos) {
  // new pos calcs
  var row = Math.floor(pos / viewSize);
  // calculate offsets from center
  var offsets = getOffsets();
  var anchorPos = pos + (hiddenPadding * boardSize) + (((row + 1) * 2 * hiddenPadding) - hiddenPadding);
  var newPos = anchorPos + (offsets[0] * boardSize) + offsets[1];

  console.log("In getNPCIndex - pos is " + pos + "  New pos is " + newPos);

  var i = 0;
  var npcFound = false;

  while ((i < NPCs.length) && (npcFound == false)) {
    if (NPCs[i][NPC_INDEX_POSITION] == newPos)
      npcFound = true;
    else
      i++;
  } // end while

  if (npcFound == true)
    return i;
  else {
    return -1; // no npc in  pos passed in
  }

} // end function

// -----------------------------------------------------------------------------

function getOtherPlayerIndex(pos) {
  // new pos calcs
  var row = Math.floor(pos / viewSize);
  // calculate offsets from center
  var offsets = getOffsets();
  var anchorPos = pos + (hiddenPadding * boardSize) + (((row + 1) * 2 * hiddenPadding) - hiddenPadding);
  var newPos = anchorPos + (offsets[0] * boardSize) + offsets[1];

  console.log("In getOtherPlayerIndex - pos is " + pos + "  New pos is " + newPos);

  var i = 0;
  var otherPlayerFound = false;

  while ((i < otherPlayers.length) && (otherPlayerFound == false)) {
    if (otherPlayers[i][OTHER_PLAYER_INDEX_POSITION] == newPos)
      otherPlayerFound = true;
    else
      i++;
  } // end while

  if (otherPlayerFound == true)
    return i;
  else {
    return -1; // no player in  pos passed in
  }

} // end function

// -----------------------------------------------------------------------------

function getTreasureIndex(pos) {
  // new pos calcs
  var row = Math.floor(pos / viewSize);
  // calculate offsets from center
  var offsets = getOffsets();
  var anchorPos = pos + (hiddenPadding * boardSize) + (((row + 1) * 2 * hiddenPadding) - hiddenPadding);
  var newPos = anchorPos + (offsets[0] * boardSize) + offsets[1];

  console.log("In getTreasureIndex - pos is " + pos + "  New pos is " + newPos);

  var i = 0;
  var treasureFound = false;

  while ((i < treasures.length) && (treasureFound == false)) {
    if (treasures[i][TREASURE_INDEX_POSITION] == newPos)
      treasureFound = true;
    else
      i++;
  } // end while

  if (treasureFound == true)
    return i;
  else {
    return -1; // no treasure in  pos passed in
  }

} // end function

// ------------------------------

function deleteTreasure(pos) {
  var index = getTreasureIndex(pos); // returns -1 if no treasure

  if (index >= 0) // treasure found
  {
    treasures.splice(index, 1);
  } else {
    console.log("No treasure at this pos " + pos);
  }

}

// ---------------------------------------------------------------

function getBadTreasure() {
  var lootAmount = Math.floor((Math.random() * 3 + 1));
  var i;
  for (i = 0; i < lootAmount; i++) {
    var lootNumber = Math.floor((Math.random() * 12 + 1));
    switch (lootNumber) {
      case 1:
        yourLoot.push("banana peel");
        break;
      case 2:
        yourLoot.push("old spice deoderant");
        break;
      case 3:
        yourLoot.push("bottle of lard");
        break;
      case 4:
        yourLoot.push("a pile of bat guano");
        break;
      case 5:
        yourLoot.push("used band-aid");
        break;
      case 6:
        yourLoot.push("a knickleback album");
        break;
      case 7:
        yourLoot.push("some moldy cole slaw");
        break;
      case 8:
        yourLoot.push("Biggy Cheese's long lost sandal");
        break;
      case 9:
        yourLoot.push("a cat");
        break;
      case 10:
        yourLoot.push("rusty bucket o' fish heads");
        break;
      case 11:
        yourLoot.push("donkey teeth");
        break;
      case 12:
        yourLoot.push("Sharknado 5 DVD");
        break;

      default:

    }
  }
}

function getMediumTreasure() {
  var lootAmount = Math.floor((Math.random() * 3 + 1));
  var lootFoundAlert;
  var i;
  for (i = 0; i < lootAmount; i++) {
    var lootNumber = Math.floor((Math.random() * 13 + 1));
    switch (lootNumber) {
      case 1:
        yourLoot.push("The Mantle of Virginity");
        break;
      case 2:
        yourLoot.push("Pokemon card");
        break;
      case 3:
        yourLoot.push("box labeled GABI'S ESTUCHE");
        break;
      case 4:
        yourLoot.push("angry inchworm in a tupperware");
        break;
      case 5:
        yourLoot.push("cell phone charger");
        break;
      case 6:
        yourLoot.push("the urn of a very particular lime");
        break;
      case 7:
        yourLoot.push("a chocolate coated camel hemorrhoid");
        break;
      case 8:
        yourLoot.push("a Peewee Herman doll");
        break;
      case 9:
        yourLoot.push("a talking map");
        break;
      case 10:
        yourLoot.push("a talking backpack");
        break;
      case 11:
        yourLoot.push("glowing pill");
        break;
      case 12:
        yourLoot.push("The Temporary Tattoo of Drunkeness");
        break;
      case 13:
        yourLoot.push("a tiny album of PSY's greatest hits");
        break;

      default:

    }
  }
}

// -----------------------------------------

function getGoodTreasure() {
  var lootAmount = Math.floor((Math.random() * 3 + 1));
  var lootFoundAlert;
  var i;
  for (i = 0; i < lootAmount; i++) {
    var lootNumber = Math.floor((Math.random() * 13 + 1));
    switch (lootNumber) {
      case 1:
        yourLoot.push("phantom menace on blu-ray");
        break;
      case 2:
        yourLoot.push("leopard skin speedo");
        break;
      case 3:
        yourLoot.push("The Thimble of Circumcision");
        break;
      case 4:
        yourLoot.push("CARL'S JR. EXTRA BIG*** TACO");
        break;
      case 5:
        yourLoot.push("a 7 pound chunk of whale vomit");
        break;
      case 6:
        yourLoot.push("a mint condition Mr. Potato Head");
        break;
      case 7:
        yourLoot.push("The Banana Hammock of Gorilla Seduction");
        break;
      case 8:
        yourLoot.push("a 7 sided die made of pure gold");
        break;
      case 9:
        yourLoot.push("a whip made of an elephant trunk");
        break;
      case 10:
        yourLoot.push("a diamond formed into an indistinguishable utensil");
        break;
      case 11:
        yourLoot.push("The Portable Orb of Negate Sludge");
        break;
      case 12:
        yourLoot.push("Yellow Mechanism");
        break;

      default:

    }
  }
}

function yourLootAlert() {
  alert("Your loot: " + yourLoot + "\nYour keys: " + yourKeys)
}
// -------------------------------------

function getOffsets() {
  var rowOffset = 0;
  var colOffset = 0;
  var center = ((boardSize * boardSize) - 1) / 2;
  var half = (boardSize - 1) / 2; // half of the board not counting center
  var finished = false;
  var tempCurr = currentSquare;
  var tempRowOffset = 0;
  var rowOffsetFound = false;
  var colOffsetFound = false;

  // console.log ("In new get offsets - tempCurr = " + tempCurr + " center = " + center + " half = " + half);

  //  If you are in my row, return 0
  //  Works whether you are in the center or not
  if (Math.abs(tempCurr - center) <= half) {
    console.log("You're in my row.");
    rowOffset = 0;
    rowOffsetFound = true;
  }
  //  if you weren't in my row, check if u are in my col, return the distance between us
  //  But consider if you are out of the center
  if ((rowOffsetFound == false) & ((Math.abs(tempCurr - center) % boardSize) == 0)) {
    colOffset = 0;
    colOffsetFound = true;
    tempRowOffset = ((tempCurr - center) / boardSize);
    console.log("You are in my column tempCurr is " + tempCurr + "  Center is " + center + " Half is " + half + " tempRowOffset is " + tempRowOffset);

    rowOffsetFound = true;

    // check if off center and adjust
    if (Math.abs(tempRowOffset) > hiddenPadding) {
      if (tempRowOffset > 0)
        rowOffset = tempRowOffset - (tempRowOffset - hiddenPadding);
      else
        rowOffset = tempRowOffset + (Math.abs(tempRowOffset) - hiddenPadding);
    } else {
      rowOffset = tempRowOffset;
    }
  } // end if you are in my column

  // If you are not in my row or column - Execute loop to bring cell down to my rows

  // Check if rowOffset already done... if no, then you are not in my row or col
  // Cycle through bringing tempCurr close to my row
  while ((Math.abs(tempCurr - center) > half) && (rowOffsetFound == false)) {
    console.log("You're not in my row or col.")
    if (currentSquare > center) {
      tempCurr = tempCurr - boardSize;
      rowOffset++
    } else {
      tempCurr = tempCurr + boardSize;
      rowOffset--;
    }
  }

  console.log("Row offset before off center check is " + rowOffset);

  // check if off center and adjust
  if (Math.abs(rowOffset) > hiddenPadding) {
    if (rowOffset > 0)
      rowOffset = rowOffset - (rowOffset - hiddenPadding);
    else
      rowOffset = rowOffset + (Math.abs(rowOffset) - hiddenPadding);

  }

  if (colOffsetFound == false) {
    // calc colOffset last, should be in my row now
    colOffset = (tempCurr - center) % center;
  }

  // check if off center and adjust
  if (Math.abs(colOffset) > hiddenPadding) {
    if (colOffset > 0)
      colOffset = colOffset - (colOffset - hiddenPadding);
    else
      colOffset = colOffset + (Math.abs(colOffset) - hiddenPadding);
  }

  console.log(" Returning row and col " + rowOffset + " " + colOffset)
  return [rowOffset, colOffset];

} // end function get offsets

// -------------------------------------
// --------------------------------------------

function getSquareStatus(pos) {
  // pos passed in will always be from 0 to ((viewSize * viewSize)-1)

  // check if player is the center vs moving off center

  console.log("---------------------- In getSquareStatus --------------------------");

  var row = Math.floor(pos / viewSize);
  // calculate offsets from center
  var offsets = getOffsets();
  var anchorPos = pos + (hiddenPadding * boardSize) + (((row + 1) * 2 * hiddenPadding) - hiddenPadding);
  var newPos = anchorPos + (offsets[0] * boardSize) + offsets[1];

  console.log("Get Square Status - Current square is " + currentSquare + "  Pos is " + pos + "  Anchor pos is " + anchorPos + "  row offset is " + offsets[0] + "  Col offset is " + offsets[1] + "  New pos is " + newPos);

  if (walls[newPos] == WALL) // check for wall
    return SQ_STATUS_WALL;

  if (newPos == currentSquare) // pac man found
  {
    if (locks[currentSquare] == 1)
      return SQ_STATUS_PAC_ON_RED_LOCK;

    if (traps[currentSquare] == 1)
      return SQ_STATUS_PAC_ON_PIT_TRAP;
    // Check for Pac Man on a treasure

    var index = getTreasureIndex(pos); // returns -1 if no treasure

    if (index >= 0) // treasure found in this square)
    {

      switch (treasures[index][TREASURE_INDEX_TYPE]) // switch on treasure type
      {
        case TREASURE_TYPE_BAD:
          return SQ_STATUS_PAC_ON_TREASURE_BAD;
          break;

        case TREASURE_TYPE_MEDIUM:
          return SQ_STATUS_PAC_ON_TREASURE_MEDIUM;
          break;

        case TREASURE_TYPE_GOOD:
          return SQ_STATUS_PAC_ON_TREASURE_GOOD;
          break;

        case TREASURE_TYPE_RED_KEY:
          console.log("Player landed on key");
          return SQ_STATUS_PAC_ON_RED_KEY;
          break;

        default:

      } // END SWITCH

    } // end if found treasure

    var npcIndex = getNPCIndex(pos); // will return -1 if no npc in this pos

    if (npcIndex >= 0) // npc found
    {

      switch (NPCs[npcIndex][NPC_INDEX_NAME]) {
        case NPC_ICHABOD_TRISKET:
          return SQ_STATUS_PAC_ON_ICHABOD_TRISKET;
          break;
        case NPC_FLOJO_SUMMERSTREAM:
          return SQ_STATUS_PAC_ON_FLOJO_SUMMERSTREAM;
          break;
        default:

      } // END SWITCH for npc

    } // end if npcIndex found

    // check for other players
    var otherPlayerIndex = getOtherPlayerIndex(pos); // will return -1 if no other player in this pos

    if (otherPlayerIndex >= 0) // otherPlayer found
    {
      //alert("Friends");
      console.log("Friends");

    } // end if npcIndex found

    return SQ_STATUS_PAC_ON_BLANK; // may want to return something different

  } // end pac man found


  if (locks[newPos] == 1) // check for lock
    return SQ_STATUS_RED_LOCK;

  if (traps[newPos] == 1)
    return SQ_STATUS_PIT_TRAP;
  // Pac Man not in this square --- Check for other conditions

  var index = getTreasureIndex(pos); // returns -1 if no treasure

  if (index >= 0) // treasure found
  {

    switch (treasures[index][TREASURE_INDEX_TYPE]) // switch on treasure type
    {
      case TREASURE_TYPE_BAD:
        return SQ_STATUS_TREASURE_BAD;
        break;

      case TREASURE_TYPE_MEDIUM:
        return SQ_STATUS_TREASURE_MEDIUM;
        break;

      case TREASURE_TYPE_GOOD:
        return SQ_STATUS_TREASURE_GOOD;
        break;
      case TREASURE_TYPE_RED_KEY:
        return SQ_STATUS_RED_KEY;
        break;

      default:

    } // END SWITCH

  } // end if found treasure

  // NPCNameNum = checkForNPC(pos);

  var npcIndex = getNPCIndex(pos); // will return -1 if no npc in this pos

  if (npcIndex >= 0) // npc found
  {
    switch (NPCs[npcIndex][NPC_INDEX_NAME]) {
      case NPC_ICHABOD_TRISKET:
        return SQ_STATUS_ICHABOD_TRISKET;
        break;
      case NPC_FLOJO_SUMMERSTREAM:
        return SQ_STATUS_FLOJO_SUMMERSTREAM;
        break;
      default:
    } // END SWITCH for NPCNameNum

  } // end if npc found


  var otherPlayerIndex = getOtherPlayerIndex(pos); // will return -1 if no player in this pos

  if (otherPlayerIndex >= 0) // otherPlayer found
  {
    return SQ_STATUS_OTHER_PLAYER;
  } // end if other player found

  return SQ_STATUS_BLANK;

} // end function get Square status

// ---------------------------------------

function createBoard() {
  // get the board
  var myBoard = document.getElementById("board");
  myBoard.innerHTML = "";
  var i;

  //  set the width and height styles to the number of pixels
  myBoard.style.width = (viewSize * SQUARE_SIZE) + "px";
  myBoard.style.height = (viewSize * SQUARE_SIZE) + "px";

  // Create the squares
  for (i = 0; i < viewSize * viewSize; i++) {
    myBoard.innerHTML = myBoard.innerHTML + '<div class="square" id ="' + i + '"></div>';

  }

  squares = document.querySelectorAll('.square');

}

// ----------------------------------------

function createTreasures() {
  treasures.push([3, TREASURE_TYPE_GOOD, TREASURE_ICON_1]);
  treasures.push([5, TREASURE_TYPE_MEDIUM, TREASURE_ICON_2]);
  treasures.push([0, TREASURE_TYPE_BAD, TREASURE_ICON_3]);
  treasures.push([80, TREASURE_TYPE_RED_KEY, TREASURE_ICON_4]);
}

function createNPCs() {
  NPCs.push([41, NPC_ICHABOD_TRISKET])
  NPCs.push([7, NPC_FLOJO_SUMMERSTREAM])
}

function createOtherPlayers() {
  // otherPlayers.push([currentSquare + 2, "Jon"]);   // only needed for testing, now in db
}

// ----------------------------------------

function createWalls() {
  walls = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0];
  locks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, RED, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  traps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, PIT, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (walls.length != (boardSize * boardSize)) {
    // Exit and change the boardSize, use no walls, or accept random walls

    var choice = prompt("Your walls array doesn't match the boardSize.  Enter 1 for no walls or Enter 2 for random walls.  Hitting cancel will lead to unpredictable results.", "1");

    if (choice == null || choice == "") { // user hit cancel, just continue and let the chips fall
      return;
    } else // user chose 1 or 2 or something else
    {

      var i;

      switch (choice) {
        case "1":

          walls = [];
          for (i = 0; i < (boardSize * boardSize); i++) {
            walls.push(0);
          }

          break;

        case "2":

          walls = [];
          for (i = 0; i < (boardSize * boardSize); i++) {
            var wallChance = Math.floor((Math.random() * 10)); // 10 numbers

            if (wallChance < WALL_CHANCE / 10)
              walls.push(1);
            else
              walls.push(0);
          } // end for loop

          break;

        default:

          return; // user entered something bad

      } // end switch

    } // end else

  } // end if bad boardsize


} // end function

// ----------------------------------------

function calculateClass() {
  if ((yourStrength > yourAgility) && (yourStrength > yourIntellect) && (yourStrength > yourVitality) && (yourStrength > yourCharisma)) {
    yourClass = "DESTROYER";
    return
  }
  if ((yourStrength == yourAgility) && (yourStrength > yourIntellect) && (yourStrength > yourVitality) && (yourStrength > yourCharisma)) {
    yourClass = "KNIGHT";
    return
  }
  if ((yourStrength > yourAgility) && (yourStrength == yourIntellect) && (yourStrength > yourVitality) && (yourStrength > yourCharisma)) {
    yourClass = "WARLORD";
    return
  }
  if ((yourStrength > yourAgility) && (yourStrength > yourIntellect) && (yourStrength == yourVitality) && (yourStrength > yourCharisma)) {
    yourClass = "SOLDIER";
    return
  }
  if ((yourStrength > yourAgility) && (yourStrength > yourIntellect) && (yourStrength > yourVitality) && (yourStrength == yourCharisma)) {
    yourClass = "HERO";
    return
  }
  if ((yourAgility > yourStrength) && (yourAgility > yourIntellect) && (yourAgility > yourVitality) && (yourAgility > yourCharisma)) {
    yourClass = "NINJA";
    return
  }
  if ((yourAgility > yourStrength) && (yourAgility == yourIntellect) && (yourAgility > yourVitality) && (yourAgility > yourCharisma)) {
    yourClass = "PEE-WEE";
    return
  }
  if ((yourAgility > yourStrength) && (yourAgility > yourIntellect) && (yourAgility == yourVitality) && (yourAgility > yourCharisma)) {
    yourClass = "SPY";
    return
  }
  if ((yourAgility > yourStrength) && (yourAgility > yourIntellect) && (yourAgility > yourVitality) && (yourAgility == yourCharisma)) {
    yourClass = "ROGUE";
    return
  }
  if ((yourIntellect > yourStrength) && (yourIntellect > yourAgility) && (yourIntellect > yourVitality) && (yourIntellect > yourCharisma)) {
    yourClass = "GENIUS";
    return
  }
  if ((yourIntellect > yourStrength) && (yourIntellect > yourAgility) && (yourIntellect == yourVitality) && (yourIntellect > yourCharisma)) {
    yourClass = "CHIEF";
    return
  }
  if ((yourIntellect > yourStrength) && (yourIntellect > yourAgility) && (yourIntellect > yourVitality) && (yourIntellect == yourCharisma)) {
    yourClass = "TRICKSTER";
    return
  }
  if ((yourVitality > yourStrength) && (yourVitality > yourAgility) && (yourVitality > yourIntellect) && (yourVitality > yourCharisma)) {
    yourClass = "TANK";
    return
  }
  if ((yourVitality > yourStrength) && (yourVitality > yourAgility) && (yourVitality > yourIntellect) && (yourVitality == yourCharisma)) {
    yourClass = "COOL-DUDE";
    return
  }
  if ((yourCharisma > yourStrength) && (yourCharisma > yourAgility) && (yourCharisma > yourIntellect) && (yourCharisma > yourVitality)) {
    yourClass = "TONGUE-LASHER";
  } else yourClass = "DUDE"


}

function getExperience() {
  yourExperience = yourExperience + 1
  if (yourExperience == 1) {
    var statBoost = Math.floor((Math.random() * 5) + 1);
    yourLevel++;
    yourExperience = 0;
    if (statBoost == 1) {
      yourStrength++;
      document.getElementById("yourStrength").innerHTML++;
    }
    if (statBoost == 2) {
      yourAgility++;
      document.getElementById("yourAgility").innerHTML++;
    }
    if (statBoost == 3) {
      yourIntellect++;
      document.getElementById("yourIntellect").innerHTML++;
    }
    if (statBoost == 4) {
      yourVitality++;
      document.getElementById("yourVitality").innerHTML++;
    }
    if (statBoost == 5) {
      yourCharisma++;
      document.getElementById("yourCharisma").innerHTML++;
    }
    calculateClass();
    title.innerHTML = "YOUR NAME IS " + yourCharacterName + ", LEVEL " + yourLevel + " " + yourClass;
  }
}
// ---------------------------
function ichabodTrisketPurchase() {
  getGoodTreasure();
}

document.getElementById("title").style.visibility = "hidden";

themesong.play();


createBoard();
createWalls();
createTreasures();
createNPCs();
// createOtherPlayers();

squares = document.querySelectorAll('.square'); // faster to get first?


var i;
for (i = 0; i < squares.length; i++) {
  //processSquare(i);
  squares[i].innerHTML = "<img src= 'grass.jpg'>";
}
