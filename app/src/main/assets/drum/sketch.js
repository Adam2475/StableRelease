var song;
var fft;
var wave;
var index;
var p;
var amp;
var img;
var particles = [];

function preload() {
  song = loadSound('https://Adam2475.github.io/filehostingtest/test.mp3')
  img = loadImage('https://Adam2475.github.io/filehostingtest/bg.jpg')
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
    // For better performance, consider a smaller canvas
     createCanvas(windowWidth * 0.6, windowHeight * 0.6);
  frameRate(30);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  img.filter(BLUR, 2)
  // analyze the sound art given time and return array of values
  // reduced sample rate to 0.1
  fft = new p5.FFT(0.1);
}

function draw() {
  background(0);

  translate(width / 2, height / 2)

  push()
  if(amp > 230) {
    rotate(random(-0.5, 0.5))
  }

  fft.analyze();
  amp = fft.getEnergy(20, 200);

  image(img, 0, 0, width + 100, height + 100)
  pop();

  var alpha = map(amp, 0, 255, 180, 150)
  fill(0, alpha)
  noStroke()
  rect(0,0, width, height)

  stroke(255);
  strokeWeight(3)
  noFill()

  wave = fft.waveform()

  for (var t = -1; t <= 1; t += 2)
  {
    beginShape()
    for (var i = 0; i < 180; i += 0.5) {
      index = floor(map(i, 0, width, 0, wave.length));

      var r = map(wave[index], -1, 1, 150, 350)

      // draw a circular visualizer
      var x = r * -sin(i) * t;
      var y = r * cos(i);
      vertex(x, y);
    }
    endShape()
  }


  p = new Particle()
  particles.push(p);

  for(var i = particles.length - 1; i >= 0 ; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 190)
      particles[i].show();
    } else {
      particles.splice(i, 1)
    }

  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause()
    noLoop()
  } else {
    song.play()
    loop()
  }
}

// todo: set particle effects responding to device performance

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    // particles will have velocity and acceleration
    this.vel = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3, 5)

    this.color = [random(200, 255), random(200, 255), random(200, 255),]
  }
  update (cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  edges() {
    if(this.pos.x < -width / 2 || this.pos.x > width / 2 ||
      this.pos.y < -height / 2 || this.pos.y > height / 2) {
        return true;
      } else {
        return false;
      }
  }
  show() {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, 4)
  }
}