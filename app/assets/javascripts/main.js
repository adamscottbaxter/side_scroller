var mainState = {

  preload: function() {
    // Load the bird sprite
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
},

create: function() {
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#00ffff';
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 0;
    // this.bird.body.checkCollision.up = true;   COLLISION NOT WORKING YET
    // this.bird.body.checkCollision.down = true;
    // this.bird.body.setSize(220, 220, 0, 0);
    this.pipes = game.add.group();
    this.timer = game.time.events.loop(250, this.borderPipes, this);
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);

    // Call the 'up_motion' function when the spacekey is hit
    spaceKey.onDown.add(this.up_motion, this);

    // Call the 'stop_motion' function when the spacekey is released
    spaceKey.onUp.add(this.stop_motion, this);      // NICK ADDED THIS
},

addOnePipe: function(x,y) {
      var pipe = game.add.sprite(x,y, 'pipe');
      this.pipes.add(pipe);
      game.physics.arcade.enable(pipe);
      pipe.body.velocity.x = -200;
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
      // pipe.body.checkCollision.up = true;
      // pipe.body.checkCollision.down = true;
},

borderPipes: function() {
    this.addOnePipe(400, 0);
    this.addOnePipe(400, 440);
},

addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1)
            this.addOnePipe(400, i * 60 + 10);
},

update: function() {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();
},

up_motion: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
},

stop_motion: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = 0;
},

// Restart the game
restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
},

};

var game = new Phaser.Game(400, 490);

game.state.add('main', mainState);

game.state.start('main');
