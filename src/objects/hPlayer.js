hPlayer = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);
    this.frame = 3;

    this.speed = 240;

    this.facing = "down";
    this.currWeapon = "";

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.maxVelocity.x = 60;
    this.body.maxVelocity.y = 60;
    this.body.setSize(19,23);
    this.body.offset.setTo(8,9);

    //define movement keys
    this.moveUpKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.moveLeftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.moveDownKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.moveRightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

    //define interact key
    this.interactKey = game.input.keyboard.addKey(Phaser.Keyboard.E);

    //define attack keys
    this.attackUpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.attackLeftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.attackDownKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.attackRightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    //movement animations
    //with weapons
    this.animations.add("runUp", [24,25,26,27,28,29], 6, true);
    this.animations.add("runLeft", [18,19,20,21,22,23], 6, true);
    this.animations.add("runRight", [12,13,14,15,16,17], 6, true);
    this.animations.add("runDown", [30,31,32,33,34,35], 6, true);

    //without weapons
    this.animations.add("runUpWw", [102,103,104,105,106,107], 6, true);
    this.animations.add("runLeftWw", [96,97,98,99,100,101], 6, true);
    this.animations.add("runRightWw", [90,91,92,93,94,95], 6, true);
    this.animations.add("runDownWw", [108,109,110,111,112,113], 6, true);

    //sword swing animations
    this.animations.add("swordUp", [48,49,50,51,52], 6, false);
    this.animations.add("swordLeft", [36,37,38,39,40], 6, false);
    this.animations.add("swordRight", [42,43,44,45,46], 6, false);
    this.animations.add("swordDown", [54,55,56,57,58], 6, false);

    //bow animations
    this.animations.add("bowUp", [60,61,62,63,64,65], 6, false);
    this.animations.add("bowLeft", [72,73,74,75,76,77], 6, false);
    this.animations.add("bowRight", [78,79,80,81,82,83], 6, false);
    this.animations.add("bowDown", [66,67,68,69,70,71], 6, false);

    this.bowFireSound = this.game.add.audio("bowFire");
    this.playerDamagedSound = this.game.add.audio("playerDam");
    this.swordSwingSound = this.game.add.audio("swordSwing");

    this.arrows();

    this.attacking = false;

    this.canMove = true;
};

hPlayer.prototype = Object.create(Phaser.Sprite.prototype);
hPlayer.prototype.constructor = hPlayer;

hPlayer.prototype.update = function(){

    if(this.currWeapon != "") {
        this.attack();
    }

    if(this.canMove == true) {
        this.movement();
    }
    this.idleDir();

};

hPlayer.prototype.idleDir = function() {
    if(this.moveDownKey.isUp && this.moveUpKey.isUp && this.moveRightKey.isUp && this.moveLeftKey.isUp && this.attacking == false) {

        this.animations.stop();

        //no weapon idle
        if(this.currWeapon == ""){
            switch (this.facing) {
                case "up":
                    this.frame = 86;

                    break;
                case "left":
                    this.frame = 84;

                    break;
                case "down":
                    this.frame = 87;

                    break;
                case "right":
                    this.frame = 85;

                    break;
            }
        }
        //with weapon idle
        else {
            switch (this.facing) {
                case "up":
                    this.frame = 2;

                    break;
                case "left":
                    this.frame = 0;

                    break;
                case "down":
                    this.frame = 3;

                    break;
                case "right":
                    this.frame = 1;

                    break;
            }
        }

    }
};

hPlayer.prototype.movement = function(){
    if(this.attacking == false) {
        if (this.moveUpKey.isDown && this.moveDownKey.isUp && this.moveRightKey.isUp && this.moveLeftKey.isUp) {
            this.body.velocity.y -= this.speed;

            if(this.currWeapon == ""){
                this.animations.play("runUpWw");
            } else {
                this.animations.play("runUp");
            }

            this.facing = "up";
        }

        if (this.moveLeftKey.isDown && this.moveDownKey.isUp && this.moveUpKey.isUp && this.moveRightKey.isUp) {
            this.body.velocity.x -= this.speed;
            if(this.currWeapon == ""){
                this.animations.play("runLeftWw");
            } else {
                this.animations.play("runLeft");
            }

            this.facing = "left";
        }

        if (this.moveDownKey.isDown && this.moveUpKey.isUp && this.moveRightKey.isUp && this.moveLeftKey.isUp) {
            this.body.velocity.y += this.speed;
            if(this.currWeapon == ""){
                this.animations.play("runDownWw");
            } else {
                this.animations.play("runDown");
            }

            this.facing = "down";
        }

        if (this.moveRightKey.isDown && this.moveDownKey.isUp && this.moveUpKey.isUp && this.moveLeftKey.isUp) {
            this.body.velocity.x += this.speed;
            if(this.currWeapon == ""){
                this.animations.play("runRightWw");
            } else {
                this.animations.play("runRight");
            }

            this.facing = "right";
        }

        if (this.moveDownKey.isUp && this.moveUpKey.isUp) {
            this.body.velocity.y = 0;
        }

        if (this.moveRightKey.isUp && this.moveLeftKey.isUp) {
            this.body.velocity.x = 0;
        }
    }
};

hPlayer.prototype.attack = function(){

    if(this.attacking == false  && this.arrow.alive == false) {
        //attack up
        if (this.attackUpKey.isDown && this.attackDownKey.isUp && this.attackRightKey.isUp && this.attackLeftKey.isUp) {
            if (this.currWeapon == "sword") {
                this.animations.play("swordUp");
                this.swordSwingSound.play();
            } else if (this.currWeapon == "bow") {
                this.animations.play("bowUp");
                this.bowFireSound.play();
            }
            this.facing = "up";
        }

        //attack down
        if (this.attackUpKey.isUp && this.attackDownKey.isDown && this.attackRightKey.isUp && this.attackLeftKey.isUp) {

            if (this.currWeapon == "sword") {
                this.animations.play("swordDown");
                this.swordSwingSound.play();
            } else if (this.currWeapon == "bow") {
                this.animations.play("bowDown");
                this.bowFireSound.play();
            }
            this.facing = "down";
        }

        //attack right
        if (this.attackUpKey.isUp && this.attackDownKey.isUp && this.attackRightKey.isDown && this.attackLeftKey.isUp) {

            if (this.currWeapon == "sword") {
                this.animations.play("swordRight");
                this.swordSwingSound.play();
            } else if (this.currWeapon == "bow") {
                this.animations.play("bowRight");
                this.bowFireSound.play();
            }
            this.facing = "right";
        }

        //attack left
        if (this.attackUpKey.isUp && this.attackDownKey.isUp && this.attackRightKey.isUp && this.attackLeftKey.isDown) {

            if (this.currWeapon == "sword") {
                this.animations.play("swordLeft");
                this.swordSwingSound.play();
            } else if (this.currWeapon == "bow") {
                this.animations.play("bowLeft");
                this.bowFireSound.play();
            }
            this.facing = "left";
        }

    }

    if(this.currWeapon =="bow" && this.arrow.alive == false){
        if(this.animations.currentAnim.currentFrame.index == 64 || this.animations.currentAnim.currentFrame.index == 76 ||
            this.animations.currentAnim.currentFrame.index == 70 || this.animations.currentAnim.currentFrame.index == 82){

            this.arrow.revive();

        }
    }
    if(this.arrow.alive == false || this.currWeapon == "sword"){
        if(this.attackUpKey.isDown || this.attackDownKey.isDown || this.attackRightKey.isDown || this.attackLeftKey.isDown){
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            this.attacking = true;
            this.animations.currentAnim.onComplete.add(function(){
                this.attacking = false;
            }, this);
        }
    }

};

hPlayer.prototype.arrows = function(){

    this.arrow = this.game.add.sprite(this.x, this.y, "playerArrow");
    this.arrowSpeed = 120;
    this.arrowLifeSpan = 1000;
    game.physics.enable(this.arrow, Phaser.Physics.ARCADE);
    this.arrow.anchor.setTo(.5,.5);
    this.arrow.lifespan = this.arrowLifeSpan;
    this.arrow.kill();

    this.arrow.events.onRevived.add(function(){
        this.arrow.x = this.x;
        this.arrow.y = this.y;

        this.arrow.bringToTop();

        this.arrow.lifespan = this.arrowLifeSpan;

        switch (this.facing) {
            case "up":
                this.arrow.frame = 2;
                this.arrow.body.velocity.y -= this.arrowSpeed;
                this.arrow.x = this.x+16;
                this.arrow.y = this.y;
                this.arrow.body.setSize(5,15);

                break;
            case "left":
                this.arrow.frame = 0;
                this.arrow.body.velocity.x -= this.arrowSpeed;
                this.arrow.x = this.x+5;
                this.arrow.y = this.y+23;
                this.arrow.body.setSize(15,5);

                break;
            case "down":
                this.arrow.frame = 3;
                this.arrow.body.velocity.y += this.arrowSpeed;
                this.arrow.x = this.x+20;
                this.arrow.y = this.y+40;
                this.arrow.body.setSize(5,15);

                break;
            case "right":
                this.arrow.frame = 1;
                this.arrow.body.velocity.x += this.arrowSpeed;
                this.arrow.x = this.x+20;
                this.arrow.y = this.y+23;
                this.arrow.body.setSize(15,5);

                break;
        }
    }, this);

    this.arrow.events.onKilled.add(function(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    },this.arrow);

};


