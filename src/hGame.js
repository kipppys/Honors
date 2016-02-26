var hGame = function(game){

};

var map;
var layers = [];

var player;

hGame.prototype = {
    preload: function(){

    },
    create: function(){

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;

        map = game.add.tilemap('village');
        map.addTilesetImage('tileset');

        //map.setCollision([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], true, layers[0]);

        layers[0] = map.createLayer("background");
        layers[1] = map.createLayer("collision");
        map.setCollision([1], true, layers[1]);
        layers[0].resizeWorld();

        layers[1].visible = false;

        this.game.camera.setBoundsToWorld();

        player = new hPlayer(this.game, 150,200,"playerSheet");
        this.game.add.existing(player);

        //make the camera follow the player
        this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

    },
    update: function(){
        this.game.physics.arcade.collide(player, layers[1], null);
    },

    render: function(){
        game.debug.body(player);

    }
};