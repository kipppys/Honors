hEnemy = function(game, x, y, img){
    Phaser.Sprite.call(this, game, x, y, img);



};

hEnemy.prototype = Object.create(Phaser.Sprite.prototype);
hEnemy.prototype.constructor = hEnemy;

hEnemy.prototype.updateMovement = function(){



};


