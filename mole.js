let currentMoleTile ;
let currentPlantTile ; 
let score = 0 ; 
let gameOver = false ;  



window.onload = function(){ //when our page loads , we want to load the game
    setGame() ; 
}


function setGame(){
    //set the grid for the game in the inner html 
    //as we have 3 x 3 grid , we need 9 tiles
    for(let i = 0 ; i < 9 ; i++){  //i goes from 0 to 8 , stops at 9 
        //so every time , we are creating a new tile with a div having id from 0 to 8 
        //this is important because we'll be identifying which tiles contains mole or piranha tree 

        //here we are creating the <div id = "0 to 8"></div> tag with id 
        let tile = document.createElement("div") ;
        tile.id =i.toString() ; 

        tile.addEventListener('click' , selectTile) ; 


        //Now we need to append this created tile into the board 
        document.getElementById("board").append(tile) ; 
    }
    setInterval(setMole , 1000) ; //so the setMole function will be called each  second
    setInterval(setPlant , 2000) ; //we're giving it 2 seconds interval
}


function getRandomTile(){

    //math.random return a number between 0 to 1 .so (0-1)*9 --> (0-9) but it exclude 9. Round down to (0-8) integers
    let num = Math.floor(Math.random()*9) ; 
    return num.toString() ; 
    
}

function setMole(){

    if(gameOver==true) return ; 

    if(currentMoleTile){                      //if currentMoleTile is not null , that mean mole is in this tile now . 
                                            // So we've to clear the current tile and select a new tile 
        currentMoleTile.innerHTML = "" ; 
    }

    let mole = document.createElement("img") ; //creating an image element
    mole.src = "./monty-mole.png" ;            //set the image element source 
    let num = getRandomTile() ;                 //getting a random tile number to put the mole image
    if(currentPlantTile && currentPlantTile.id == num){   //if currentPlantTile is occupied and has the same number, then they can clash 
                                                            //so just return .We're not gonna set mole for this round

    }
    currentMoleTile= document.getElementById(num) ; //getting the tile with the selected number

    currentMoleTile.appendChild(mole) ;        //Here currentMoleTile is a random div tag and mole is an image . We're 
                                                //now appending the image into the the div tag 

}

function setPlant(){
    if(gameOver) return ; 
    if(currentPlantTile){
        currentPlantTile.innerHTML = "" ; 
    }
    let plant = document.createElement("img") ; 
    plant.src = "./piranha-plant.png" ; 
    
    let num = getRandomTile() ; 

    if(currentMoleTile && currentMoleTile.id == num){   
        return ; 

}
    currentPlantTile = document.getElementById(num) ; 
    currentPlantTile.appendChild(plant) ; 
}

function selectTile(){
    if(gameOver) return ; 
    if(this == currentMoleTile){  //this refers to the tiles that is clicked.

        score+=10 ; 
        document.getElementById("score").innerText = score.toString()  ;

    }
    else if(this == currentPlantTile){
        document.getElementById("score").innerText = "Game is Over" + " .Your total score is: " + score.toString() ; 
        gameOver = true; 
    }
}

