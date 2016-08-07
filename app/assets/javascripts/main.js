// $( document ).ready(function() {

var mainState = {

      preload: function() {
        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.load.image('diamond', 'assets/diamond.png');
    },

    create: function() {
        // Change the background color of the game to blue
        game.stage.backgroundColor = '#00ffff';
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        player1 = game.add.sprite(100, 150, 'bird');
        player2 = game.add.sprite(100, 250, 'diamond');

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);

        player1.body.gravity.y = 0;
        player1.body.gravity.x = 0;
        player1.body.bounce.set(0.8);
        player2.body.gravity.y = 0;
        player2.body.gravity.x = 0;
        player2.body.bounce.set(0.8);

        obsticles = game.add.group();

        pipes = game.add.group();
        pipes.enableBody = true;
        pipes.immovable = true;
        this.timer = game.time.events.loop(250, this.borderPipes, this);
        this.timer = game.time.events.loop(2000, this.placeObsticle, this);
        var wKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.W);
        var sKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.S);
        var aKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.A);
        var dKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.D);
        var upKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.UP);
        var downKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.DOWN);
        var leftKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.LEFT);
        var rightKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.RIGHT);
        // Call the 'up_motion1' function when the spacekey is hit
        wKey.onDown.add(this.up_motion1, this);
        sKey.onDown.add(this.down_motion1, this);
        aKey.onDown.add(this.left_motion1, this);
        dKey.onDown.add(this.right_motion1, this);
        upKey.onDown.add(this.up_motion2, this);
        downKey.onDown.add(this.down_motion2, this);
        leftKey.onDown.add(this.left_motion2, this);
        rightKey.onDown.add(this.right_motion2, this);

        // Call the 'stop_motion' function when the spacekey is released
        wKey.onUp.add(this.stop_vertical_motion1, this);      // NICK ADDED THIS
        sKey.onUp.add(this.stop_vertical_motion1, this);      // NICK ADDED THIS
        aKey.onUp.add(this.stop_horizontal_motion1, this);      // NICK ADDED THIS
        dKey.onUp.add(this.stop_horizontal_motion1, this);      // NICK ADDED THIS
        upKey.onUp.add(this.stop_vertical_motion2, this);      // NICK ADDED THIS
        downKey.onUp.add(this.stop_vertical_motion2, this);      // NICK ADDED THIS
        leftKey.onUp.add(this.stop_horizontal_motion2, this);      // NICK ADDED THIS
        rightKey.onUp.add(this.stop_horizontal_motion2, this);      // NICK ADDED THIS
    },

    addOnePipe: function(x,y) {
          var pipe = game.add.sprite(x,y, 'pipe');
          pipes.add(pipe);
          game.physics.arcade.enable(pipe);
          pipe.body.velocity.x = -200;
          pipe.checkWorldBounds = true;
          pipe.outOfBoundsKill = true;
          pipe.body.immovable = true;

    },

    addObsticle: function(x,y) {
          var obsticle = game.add.sprite(x,y, 'pipe');
          obsticles.add(obsticle);
          game.physics.arcade.enable(obsticle);
          obsticle.body.velocity.x = -200;
          obsticle.checkWorldBounds = true;
          obsticle.outOfBoundsKill = true;
          obsticle.body.immovable = true;
    },

    placeObsticle: function() {
        this.addObsticle(400, 300)
    },

    borderPipes: function() {
        this.addOnePipe(400, 0);
        this.addOnePipe(400, 440);
    },



    update: function() {

        game.physics.arcade.collide(player1, pipes);
        game.physics.arcade.collide(player2, pipes);
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.overlap(player1, obsticles, this.restartGame, null, this);
        game.physics.arcade.overlap(player2, obsticles, this.restartGame, null, this);

    },

    up_motion1: function() {
        player1.body.velocity.y = -300;
    },

    down_motion1: function() {
        player1.body.velocity.y = +300;
    },

    up_motion2: function() {
        player2.body.velocity.y = -300;
    },

    down_motion2: function() {
        player2.body.velocity.y = +300;
    },

    left_motion1: function() {
        player1.body.velocity.x = -300;
    },

    right_motion1: function() {
        player1.body.velocity.x = +300;
    },

    left_motion2: function() {
        player2.body.velocity.x = -300;
    },

    right_motion2: function() {
        player2.body.velocity.x = +300;
    },

    stop_vertical_motion1: function() {
        player1.body.velocity.y = 0;
    },

    stop_vertical_motion2: function() {
        player2.body.velocity.y = 0;
    },

    stop_horizontal_motion1: function() {
        player1.body.velocity.x = 0;
    },

    stop_horizontal_motion2: function() {
        player2.body.velocity.x = 0;
    },

    restartGame: function() {
        game.state.start('main');
    },

};

var game = new Phaser.Game(800, 490);

game.state.add('main', mainState);

game.state.start('main');

// });
