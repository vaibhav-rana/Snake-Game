const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create a unit
const grid=32;

//load image
const ground = new Image();
ground.src="ground.png";

const foodImg = new Image();
foodImg.src="food.png";

//load audio file

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

//create a snake
let snake = [];
snake[0]={
    x : 5*grid,
    y : 8*grid
}

//crete a food
let food={
    x:Math.floor(Math.random()*17+1)*grid,
    y:Math.floor(Math.random()*15+3)*grid
}

// create a score
let score= 0;

//control snake
let d;
document.addEventListener("keydown",direction);
function direction(event){
    if(event.keyCode==37 && d!="RIGHT"){
        left.play();
        d = "LEFT";
    }
    else if(event.keyCode==38 && d!="DOWN"){
        d = "UP";
        up.play();
    }
    else if(event.keyCode==39 && d!="LEFT"){
        d = "RIGHT";
        right.play();
    }
    else if(event.keyCode==40 && d!="UP"){
        d = "DOWN";
        down.play();
    }
}
//collision function
function collision(head,array){
    for(let i = 0; i < array.length;i++)
    {
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
//draw everything on canvas
function draw(){
    ctx.drawImage(ground,0,0);
    
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle=(i==0)?"green":"white";
        ctx.fillRect(snake[i].x,snake[i].y,grid,grid);
//        ctx.strokeStyle="#000";
//        ctx.strokeRect(snake[i].x,snake[i].y,grid,grid);
    }
    ctx.drawImage(foodImg,food.x,food.y);
    
    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    
    //which direction
    if(d == "LEFT") snakeX -= grid;
    if(d == "UP") snakeY -= grid;
    if(d == "RIGHT") snakeX += grid;
    if(d == "DOWN") snakeY += grid;
    
    //if eat food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food={
            x:Math.floor(Math.random()*17+1)*grid,
            y:Math.floor(Math.random()*15+3)*grid
        }
    }
    else{
            //remove a tail
    snake.pop();
    }
    
       //add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    //game over
    if(snakeX < grid || snakeX > 17 * grid || snakeY < 3 * grid || snakeY > 17 * grid || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
 
    snake.unshift(newHead);
    
    ctx.fillStyle="white";
    ctx.font="40px kalam";
    ctx.fillText(score,2.4*grid,1.6*grid);
}

let game=setInterval(draw,100);