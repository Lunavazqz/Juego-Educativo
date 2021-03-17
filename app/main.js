//document.getElementById("version").textContent = "Phaser v" + Phaser.VERSION;



var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1420,
        height: 810
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
         preload: preload,
         create: create,
         update: update
   },
  
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score;
var gameOver;
var scoreText;

var scene = {
  init: init,
  preload: preload,
  create: create,
  update: update
};

var game = new Phaser.Game(config);

game.scene.add("play", scene, true, { level: 1 });

function init(data) {
  console.log("data", data);

  score = 0;
  gameOver = false;
}

function preload() {


    this.load.image('sky', 'assets/img/fondo.jpg');        
    this.load.image('s1a', 'assets/img/1a.svg');
    this.load.image('ground', 'assets/img/carretera.jpg');
    this.load.image('s0a', 'assets/img/0a.svg');
    this.load.image('s0b', 'assets/img/0b.svg');
    this.load.image('s1b', 'assets/img/1b.svg');
    this.load.image('s1c', 'assets/img/1c.svg');
    this.load.image('invisible', 'assets/img/inv.jpg');
    this.load.image('s2a', 'assets/img/2a.svg');
    this.load.image('s2b', 'assets/img/2b.svg');
    this.load.image('s2c', 'assets/img/2c.svg');
    this.load.image('s3a', 'assets/img/3a.svg');
    this.load.image('s3b', 'assets/img/3b.svg');
    this.load.image('s3b', 'assets/img/3b.svg');
    this.load.image('s4b', 'assets/img/4b.svg');
    this.load.image('s4a', 'assets/img/4a.svg');
   


    this.load.spritesheet('dude',
        'assets/img/muñecoss.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create(data) {
  var signalsCount = data.level;
  var bombsCount = data.level;
  /**var scoreCount = data.level;*/
  

 /**crear fondo  */
  this.add.image(710, 400, 'sky');

/**crear bases */

  platforms = this.physics.add.staticGroup();
  
  platforms.create(610, 780, "ground").setScale(2).refreshBody();
  

/**crear juegador */
  player = this.physics.add.sprite(100 + 50 * (data.level % 10), 480, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setSize(16, 32, false).setOffset(8, 16);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  this.input.keyboard.on(
    "keydown-N",
    function () {
      this.scene.restart({ level: 1 + this.sys.settings.data.level });
    },
    this
  );

  

  this.input.keyboard.on(
    "keydown-R",
    function () {
      this.scene.restart({ level: this.sys.settings.data.level });
    },
    this
  );



 /**NIVELES */ 

 switch (data.level) {

  case 1:
  
    signals = this.physics.add.staticGroup({
      key: "s0b",
      quantity: 1,
      setXY: { x: 900 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });
  
    
    bombs = this.physics.add.staticGroup({
      key: "s0a",
      quantity: 1,
      setXY: { x: 500 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });
  
  
    this.add.text(470, 150, 'PROHIBICIÓN', { fontSize: '52px', fill: '#000', fontFamily: 'Arial Black' });
    break;

  case 2:
  
    signals = this.physics.add.staticGroup({
      key: "s1c",
      quantity: 1,
      setXY: { x: 500 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });
  
    
    bombs = this.physics.add.staticGroup({
      key: "s1b",
      quantity: 1,
      setXY: { x: 900 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });
  
  
    this.add.text(200, 150, 'PROHIBIDO GIRAR A LA IZQUIERDA', { fontSize: '52px', fill: '#000', fontFamily: 'Arial Black' });
    break;
  case 3:
  
    signals = this.physics.add.staticGroup({
      key: "s2b",
      quantity: 1,
      setXY: { x: 900 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });
  
  
    bombs = this.physics.add.staticGroup({
      key: "s2a",
      quantity: 1,
      setXY: { x: 500 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });

    
  
  
    this.add.text(305, 150, 'PELIGRO VIENTO LATERAL', { fontSize: '52px', fill: '#000', fontFamily: 'Arial Black' });
    
    break;
  
  case 4:
  
    signals = this.physics.add.staticGroup({
      key: "s3a",
      quantity: 1,

      setXY: { x: 900 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
      
      
    });
  
    bombs = this.physics.add.staticGroup({
      key: "s3b",
      quantity: 1,
      setXY: { x: 500 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });
  
    
  
  
    this.add.text(200, 150, 'PROHIBIDO PASO A CICLOMOTORES', { fontSize: '52px', fill: '#000', fontFamily: 'Arial Black' });
    
    break;

  case 5:
    signals = this.physics.add.staticGroup({
      key: "s4a",
      quantity: 1,

      setXY: { x: 500 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
      
      
    });
  
    bombs = this.physics.add.staticGroup({
      key: "s4b",
      quantity: 1,
      setXY: { x: 900 + (data.level % 10), y: 450 - 5 * data.level, stepX: 50 }
    });
    
    

    this.add.text(350, 150, 'OBLIGATORIO SEGUIR RECTO', { fontSize: '52px', fill: '#000', fontFamily: 'Arial Black' });
    break;
  default:
    
    console.log("error")
}

 

/**CONTADOR */

  scoreText = this.add.text(20, 20, "", {
    font: "24px sans-serif",
    fill: "blue"
  }); 
  



  this.add.text(20, 760, "[Co.R] Restart — [N] Next Level  ", {
    font: "24px sans-serif",
    fill: "yellow"
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(signals, platforms);
  this.physics.add.collider(bombs, platforms);
  

  this.physics.add.overlap(player, signals, collectSignal, null, this);
  this.physics.add.overlap(player, bombs, hitBomb, null, this);

}


/**MOVIMIENTOS */
function update() {
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }

  scoreText.setText(`Level: ${this.sys.settings.data.level} — Score: ${score}`);
}
/**COGER SEÑALES */
function collectSignal(player, signal) {
  signal.disableBody(true, true);

  score += 20;
  

  if (signals.countActive(true) === 0) {
    
    this.scene.restart({ level: 1 + this.sys.settings.data.level });
  }
}

/**MUERTE.ERROR */
function hitBomb(player, bomb) {
  this.cameras.main.fadeOut(2000, 190, 0, 0);
  player.anims.play("turn");
  this.physics.pause();

  gameOver = true;
}



