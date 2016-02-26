hNPC = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);



};

hNPC.prototype = Object.create(Phaser.Sprite.prototype);
hNPC.prototype.constructor = hNPC;

hNPC.prototype.updateMovement = function(){



};


