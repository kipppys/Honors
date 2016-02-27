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
var villageDoor;

hVillage.prototype = {
    preload: function(){

    },
    create: function(){

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;

        shopDoor = this.game.add.sprite(680,416, "door");
        game.physics.enable(shopDoor, Phaser.Physics.ARCADE);
        shopDoor.visible = false;

        homeDoor = this.game.add.sprite(552,80, "door");
        game.physics.enable(homeDoor, Phaser.Physics.ARCADE);
        homeDoor.visible = false;

        villageDoor = this.game.add.sprite(0,0, "door");
        game.physics.enable(villageDoor, Phaser.Physics.ARCADE);
        homeDoor.visible = true;

       this.loadLevel("home");

        player.x = 373;
        player.y = 320;

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

        this.game.physics.arcade.overlap(player, villageDoor, function(){
            if(player.interactKey.isDown == true) {

                if(map.key == "home"){
                    this.loadLevel("village", 552, 96);
                } else if(map.key == "shop") {

                }

            }
        }, null, this);

    },

    render: function(){
        game.debug.body(player);
        game.debug.body(player.arrow);

    },

    loadLevel: function(newMap, x,y){

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


        player = new hPlayer(this.game, x, y, "playerSheet");
        this.game.add.existing(player);

        if(newMap == "home" || newMap == "shop"){
            villageDoor.x = 416;
            villageDoor.y = 368;
        }
    }
};