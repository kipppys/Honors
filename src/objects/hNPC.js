hNPC = function(game, x, y, img, textNarrative, audioNarrative, bsX, bsY, key){
    Phaser.Sprite.call(this, game, x, y, img);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    this.collideBody = this.game.add.sprite(this.x, this.y, null);
    //this.collideBody.anchor.setTo(.5,.5);
    game.physics.enable(this.collideBody, Phaser.Physics.ARCADE);
    this.collideBody.body.immovable = true;
    this.collideBody.anchor.setTo(.5,.5);
    this.collideBody.body.setSize(bsX,bsY);

    this.textDialogArray = textNarrative;
    this.audioDialogArray = audioNarrative;

    this.dialogBox = this.game.add.sprite(400,500,"dialog");
    this.dialogBox.anchor.setTo(.5,.5);
    this.dialogBox.visible = false;

    var style = { font: "21px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: this.dialogBox.width, wordWrapHeight: this.dialogBox.height, align: "center"};

    this.dialogText = this.game.add.text(this.dialogBox.x, this.dialogBox.y,"", style);
    this.dialogText.anchor.setTo(.5,.5);
    this.dialogText.visible = false;

    this.nextText = this.game.add.text(this.dialogBox.x+150, this.dialogBox.y+30, "Space ►", style);
    this.nextText.visible = false;

    this.nextButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.nextDely = 1;
    this.lastNext = 0;
    this.canNext = true;
    this.talked = false;

    this.sentence = 0;
    this.nextAudio = 0;
};

hNPC.prototype = Object.create(Phaser.Sprite.prototype);
hNPC.prototype.constructor = hNPC;

hNPC.prototype.update = function(){

    if(this.canNext == false){
        if(this.lastNext + this.nextDely < this.game.time.totalElapsedSeconds()){
            this.canNext = true;
        }
    }

    if(this.dialogBox.visible == true) {
        if (this.canNext == true && this.nextButton.isDown) {
            this.sentence += 1;
            if (this.sentence == this.textDialogArray.length) {
                this.dialogBox.visible = false;
                this.dialogText.visible = false;
                this.talked = true;
            } else {
                this.dialogText.setText(this.textDialogArray[this.sentence]);

                if(this.textDialogArray[this.sentence].indexOf("Allan: ") < 0){
                    this.audioDialogArray[this.nextAudio].play();
                    this.nextAudio += 1;
                }

            }
            this.canNext = false;
            this.lastNext = this.game.time.totalElapsedSeconds() + this.nextDely;
        }
    }

    if(this.dialogBox.visible && this.canNext == true){
        this.nextText.visible = true;
    } else {
        this.nextText.visible = false;
    }

    if(this.visible == false && this.collideBody.alive == true){
        this.collideBody.kill();
    } else if(this.visible == true && this.collideBody.alive == false){
        this.collideBody.revive();
    }

};

hNPC.prototype.openDialog = function(){

    this.dialogBox.bringToTop();
    this.dialogText.bringToTop();
    this.nextText.bringToTop();

    this.dialogBox.visible = true;
    this.dialogText.visible = true;

    this.canNext = false;
    this.lastNext = this.game.time.totalElapsedSeconds() + this.nextDely;

    this.dialogText.setText(this.textDialogArray[this.sentence]);

    if(this.textDialogArray[this.sentence].indexOf("Allan: ") < 0){
        this.audioDialogArray[this.nextAudio].play();
        this.nextAudio += 1;
    }

};


