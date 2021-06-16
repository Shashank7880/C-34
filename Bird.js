class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image1 = loadImage("sprites/red.png");
    this.image2 = loadImage("sprites/chuck.png")
    this.image3 = loadImage("sprites/triplets.png")
    this.smokeImage = loadImage("sprites/smoke.png");
    this.trajectory =[];
    this.Visiblity = 255;
    //  removing somkesby by using visibility and tint
  }
   

  displayRed(){
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image1, 0, 0, this.width, this.height);
    pop();
  }

  displayChuck(){
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image2, 0, 0, this.width, this.height);
    pop();
  }

  displayTriplets(){
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image3, 0, 0, this.width, this.height);
    pop();
  }



  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;

    // super.display();

    if(this.body.velocity.x > 10 && this.body.position.x > 200){
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }
   

    for(var i=0; i<this.trajectory.length; i++){
      push()
      this.Visiblity = this.Visiblity - 2;
      tint(255,this.Visiblity);
      image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
    pop()
    } 
  }
}
