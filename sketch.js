var dogImg,happyDogImg, database;
var foodS,foodStock;
var foodObj;
var feed, addFood;
var fedTime, lastFed;

function preload(){

happyDogImg=loadImage("images/happydog.png");
dogImg = loadImage("images/Dog.png");
}

function setup() {
  createCanvas(1000,500);

  foodObj = new Food();
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
   
  dog=createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255);
  textSize(20);
  if(lastFed >=12){
    text("Last Feed :" + lastFed % 12 + "PM", 450, 30);
  }
  else if (lastFed == 0){
    text("Last Feed : 12 AM", 450, 30);
  }
  else {
    text("Last FEED : " + lastFed + "AM", 450, 30);
  }

  foodObj.display();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    Feedtime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}





