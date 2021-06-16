const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var sound1 
var sound2  
var refresh 

// inside the birds array we are adding 3 birds
var birds=[]
var bird1,bird2,bird3
function preload() {
    getBackgroundImg();
    sound1=loadSound("sprites/bird_flying.mp3")
    sound2=loadSound("sprites/bird_select.mp3")
    // refresh = loadImage("sprites/refresh.png")
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird1 = new Bird(200,50);
    bird2 = new Bird(150,150)
    bird3 = new Bird(110,150)

    birds.push(bird3)
    birds.push(bird2)
    birds.push(bird1)
    console.log(birds)
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird1.body,{x:200, y:50});

    refresh=createImg("sprites/refresh.png")
    refresh.position(10,10)
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird1.displayRed();
    bird2.displayChuck();
    bird3.displayTriplets();

    bird1.display()
    bird2.display()
    bird3.display()

    platform.display();
    //log6.display();
    slingshot.display();   
    
    
   refresh.mousePressed(reset)
}

// we limitimg the dargging position 
function mouseDragged(){
    // if (gameState!=="launched"){
    //     Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    // }
    if(mouseX>=0 && mouseX<200 & gameState !== "lanuched"){
     Matter.Body.setPosition(birds[birds.length-1].body,{x:mouseX, y:mouseY})
   }
}


function mouseReleased(){
    slingshot.fly();
    birds.pop()
    gameState = "launched";
    sound1.play()
}

function keyPressed(){
    if(keyCode === 32 && gameState==="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body,{x:200, y:50})
        gameState="onSling"
       slingshot.attach(birds[birds.length-1].body);
       sound2.play()
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}


function reset (){
location.reload()
    
}