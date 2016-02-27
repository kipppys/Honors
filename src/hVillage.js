/**
 * Created by William on 27/02/2016.
 */
var hVillage = function(game){

};

var map;
var layers = [];

var player;

var shopDoor;
var homeDoor;

hVillage.prototype = {
    preload: function(){

    },
    create: function(){

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;

       this.loadLevel("shop");

        player.x = 407;
        player.y = 340;
        shopDoor = this.game.add.sprite(680,416, "door");
        game.physics.enable(shopDoor, Phaser.Physics.ARCADE);
        shopDoor.visible = false;

        homeDoor = this.game.add.sprite(552,80, "door");
        game.physics.enable(homeDoor, Phaser.Physics.ARCADE);
        homeDoor.visible = false;

        //make the camera follow the player
        this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

    },
    update: function(){
        this.game.physics.arcade.collide(player, layers[1], null);
        this.game.physics.arcade.collide(player, layers[2], null);

        this.game.physics.arcade.overlap(player, shopDoor, function(){
            if(player.interactKey.isDown == true)
                player.x = 394;
                player.y = 300;
                this.loadLevel("shop");
        });

        this.game.physics.arcade.overlap(player, homeDoor, function(){
            if(player.interactKey.isDown == true) {
                this.loadLevel("home");
                player.x = 407;
                player.y = 340;
            }
        }, null, this);

    },

    render: function(){
        game.debug.body(player);
        game.debug.body(player.arrow);

    },

    loadLevel: function(newMap){

        if(map!= null){
            map.destroy();
            layers[0].destroy();
            layers[1].destroy();
            player.destroy();
        }

        map = game.add.tilemap(newMap);
        map.addTilesetImage('tileset');

        layers[0] = map.createLayer("background");
        layers[1] = map.createLayer("collision");

        map.setCollision([1,20], true, layers[1]);

        layers[0].resizeWorld();
        layers[1].visible = false;
        this.game.camera.setBoundsToWorld();

        player = new hPlayer(this.game, 150,200,"playerSheet");
        this.game.add.existing(player);

    }
};