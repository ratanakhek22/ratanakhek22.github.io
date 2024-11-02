//FLAGS
var uploaded = false;
var select = 1;
var betScore = 0;

//BINGO DATA
const data = [
  'Team loses a 6k gold lead',
  'Tower dive fails 2 for nothing or worse',
  'Fight breaks out over ward',
  'Predict or Fail Flash',
  '7 dragons one game',
  'ACE with no deaths',
  '45 Minute Game',
  '330 cs before 30 mins',
  'Players survives with less than 5%',
  'Rift herald to save themselves',
  'Objective steal',
  'Baron Power Play < 2.2k',
  'Kill from invade',
  '8 Deaths on player',
  '3 Lvl Lead Over Op',
  'Unorthodox Champ',
  '1 Kill Per Minute In A Game',
  '500g plate lead',
  'Flawless player',
  '500g+ bounty',
  'Backline Gets Caught With Sums Up',
  'Backdoor',
  'TP Play',
  'Faker dodge moment',
];

if(data.length != 24) {
  console.log("NOT ENOUGH DATA");
};

let bingoBoard = [
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1],
  [-1, -1, true, -1, -1],
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1],
];

function getPoints(streak) {
  if(streak == 5) return 9; //BINGO
  if(streak == 4) return 6;
  if(streak == 3) return 3;
  return 0;
};

function checkDiag1(row, col) {
  let score = 0;
  let cnt = 0;
  for(let offset = 0; row + offset < 5 && col + offset < 5; offset++) {
    if(bingoBoard[row + offset][col + offset] == true) {
      cnt++;
    } else {
      score += getPoints(cnt);
      cnt = 0;
    };
  };
  score += getPoints(cnt);
  return score;
};

function checkDiag2(row, col) {
  let score = 0;
  let cnt = 0;
  for(let offset = 0; row + offset < 5 && col - offset >= 0; offset++) {
    if(bingoBoard[row + offset][col - offset] == true) {
      cnt++;
    } else {
      score += getPoints(cnt);
      cnt = 0;
    };
  };
  score += getPoints(cnt);
  return score;
};

function checkBoard() {
  let score = 0;

  //check horizontal
  bingoBoard.forEach((row) => {
    let cnt = 0;
    row.forEach((box) => {
      if(box == true) {
        cnt++;
      } else {
        score += getPoints(cnt);
        cnt = 0;
      };
    });
    score += getPoints(cnt);
  });

  //check vertical
  for(let col = 0; col < 5; col++) {
    cnt = 0;
    for(let row = 0; row < 5; row++) {
      if(bingoBoard[row][col] == true) {
        cnt++;
      } else {
        score += getPoints(cnt);
        cnt = 0;
      };
    };
    score += getPoints(cnt);
  };

  //check Diags
  for(let row = 0; row < 3; row++) {
    score += checkDiag1(row, 0);
    score += checkDiag2(row, 4);
  };
  for(let col = 1; col < 4; col++) {
    if(col <= 2) {score += checkDiag1(0, col)};
    if(col >= 2) {score += checkDiag2(0, col)};
  };

  return score;
};

document.addEventListener("DOMContentLoaded", () => {

  //Page elements
  const board_container = document.getElementById("board-container");
  const square_bank = document.getElementById("square-bank");
  
  //create board graphic
  let cnt = 0;
  bingoBoard.forEach((row) => {
    const row_div = document.createElement("div");
    Object.assign(row_div.style, {
      display: "flex",
      gap: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
    });
    
    row.forEach(() => {
      const bingoBox = document.createElement("div");
      Object.assign(bingoBox.style, {
        backgroundColor: "white",
        height: "100px",
        border: "1px solid black",
        borderRadius: "8px",
        flex: "1",
        padding: "10px",
        textAlign: "center",
        verticalAlign: "middle",
        fontSize: "20pt",
        overflow: "auto",
        userSelect: "none",
      });
      
      if(cnt == 12) {
        bingoBox.innerHTML = "Free";
        bingoBox.dataset.filled = "true";
        bingoBox.style.backgroundColor = "yellow";
      } else {
        bingoBox.className = "box-dropzone";
        bingoBox.dataset.filled = "false";
      };
      
      bingoBox.id = `box-${cnt}`;
      bingoBox.dataset.index = cnt;
      bingoBox.dataset.bingo = "-1";

      row_div.appendChild(bingoBox);
      cnt++;
    });
    
    board_container.appendChild(row_div);
  });
  
  data.forEach((input, i) => {
    const box = document.createElement("div")
    Object.assign(box.style, {
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "10px",
      cursor: "pointer",
    });
    box.draggable = true;
    box.innerHTML = input;
    
    box.id = `box-${i}`;
    box.className = "box-draggable";

    //data
    box.dataset.bingo = i;
    
    square_bank.appendChild(box);
  });

  var draggables = document.getElementsByClassName("box-draggable");
  var dropzones = document.getElementsByClassName("box-dropzone");
  
  //used to create functions for boxes
  const box_init = (box) => {
    const dragoverEvent = (event) => {
      event.preventDefault();
    };
    
    const dropEvent = (event) => {
      if(event.target.dataset.filled == "false") {
        boardBox = event.target;
    
        //update flags
        boardBox.dataset.filled = "true";
        
        //update the board
        boardBox.style.cursor = "pointer";
        boardBox.innerHTML = box.innerHTML;
        boardBox.dataset.bingo = box.dataset.bingo;
    
        //change box color on hover
        const makeRed = (event) => {
          event.target.style.backgroundColor = "red";
        };
        boardBox.addEventListener("mouseover", makeRed)
    
        //change box color on hover
        const makeWhite = (event) => {
          event.target.style.backgroundColor = "white";
        };
        boardBox.addEventListener("mouseout", makeWhite)
    
        //reset the box when clicked
        const clickEvent = (event) => {
          //add the box back to bank
          const newBox = document.createElement("div")
          Object.assign(newBox.style, {
            border: "1px solid black",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "10px",
            cursor: "pointer",
          });
          newBox.draggable = true;
          newBox.innerHTML = event.target.innerHTML;
          
          newBox.id = `${box.id}`;
          newBox.className = "box-draggable";

          //data
          newBox.dataset.bingo = event.target.bingo;

          square_bank.appendChild(newBox);
          box_init(newBox);
    
          //update board
          event.target.style.cursor = "auto";
          event.target.innerHTML = "";
          event.target.dataset.filled = "false";
          event.target.style.backgroundColor = "white";
          event.target.removeEventListener("mouseover", makeRed);
          event.target.removeEventListener("mouseout", makeWhite);
          event.target.removeEventListener("click", clickEvent);
        };
        boardBox.addEventListener("click", clickEvent);
    
        //update boxbank
        box.remove();
      };
    };
    
    box.addEventListener("dragstart", () => {
      //user feedback events
      box.style.opacity = "0.5";
    
      //add event listeners
      for(let zone of dropzones) {
        zone.addEventListener("dragover", dragoverEvent);
        zone.addEventListener("drop", dropEvent);
      };
      
      box.addEventListener("dragend", () => {
        //user feedback events
        box.style.opacity = "1";
    
        //clean up event listeners
        for(let zone of dropzones) {
          zone.removeEventListener("dragover", dragoverEvent);
          zone.removeEventListener("drop", dropEvent);
        };
      });
    });
  };

  for(let box of draggables) {
    box_init(box)
  };
  
  const lockBtn = document.getElementById("lock-btn");
  const scoreCounter = document.getElementById("score-counter");
  const betContainer = document.getElementById("bet-container");
  const fileForm = document.getElementById("file-upload");
  
  lockBtn.addEventListener("click", () => {    
    if(square_bank.childElementCount == 0 || uploaded) {
      scoreCounter.hidden = false;
      lockBtn.style.display = "none";
      square_bank.hidden = true;
      betContainer.style.display = "flex";
      fileForm.hidden = true;

      console.log("Can Lock");

      for(let zone of dropzones) {
        zone.draggable = false;
        zone.style.cursor = "auto";

        //update bingo board array
        let row = Math.floor(parseInt(zone.dataset.index) / 5);
        let col = parseInt(zone.dataset.index) - (row * 5);
        bingoBoard[row][col] = parseInt(zone.dataset.bingo);
        
        //removes all event listeners
        var newZone = zone.cloneNode(true);
        zone.parentNode.replaceChild(newZone, zone);

        //data
        newZone.dataset.state = "0";

        //add new event listeners
        newZone.addEventListener("click", (event) => {
          if(parseInt(event.target.dataset.state) == 0) {
            bingoBoard[row][col] = true;
            event.target.dataset.state = "1";
            event.target.style.backgroundColor = "yellow";
          } else {
            bingoBoard[row][col] = false;
            event.target.dataset.state = "0";
            event.target.style.backgroundColor = "white";
          };
          
          let score = checkBoard();
          scoreCounter.innerHTML = `Score: ${score + betScore}`
        });
      };

      //save mechanism
      const link = document.createElement("a");
      const blob = new Blob([bingoBoard.toString()], {type: "text/plain;charset=utf-8"});
      link.href = URL.createObjectURL(blob);
      link.download = "save.txt";
      if(!uploaded) link.click();
    } else {
      console.log("Fill Board");
    };
  });

  const form = document.getElementById("file-upload");

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      let input = reader.result.replaceAll(" ", "").split(",");
      for(let zone of dropzones) {
        zone.innerHTML = data[parseInt(input[parseInt(zone.dataset.index)])];
      };
      uploaded = true;
      form.hidden = true;
      lockBtn.click();
    });
    if(file) {
      reader.readAsText(file);
    };
  });

  const blueTeamBtn = document.getElementById("blue-team");
  const redTeamBtn = document.getElementById("red-team");
  const trophyIMG = document.createElement("img");
  trophyIMG.src = "./trophy.png";
  trophyIMG.alt = "Image description"; 
  trophyIMG.height = 100;
  trophyIMG.width = 100;
  blueTeamBtn.appendChild(trophyIMG);

  blueTeamBtn.addEventListener("click", () => {
    blueTeamBtn.appendChild(trophyIMG);
    select = 1;
  });
  
  redTeamBtn.addEventListener("click", () => {
    redTeamBtn.appendChild(trophyIMG);
    select = 2;
  });

  const blueWonBtn = document.getElementById("blue-submit");
  const redWonBtn = document.getElementById("red-submit");

  blueWonBtn.addEventListener("click" , () => {
    if(select == 1) {
      betScore += 8;
      let score = checkBoard();
      scoreCounter.innerHTML = `Score: ${score + betScore}`
    }
  });

  redWonBtn.addEventListener("click" , () => {
    if(select == 2) {
      betScore += 8;
      let score = checkBoard();
      scoreCounter.innerHTML = `Score: ${score + betScore}`
    };
  });
});