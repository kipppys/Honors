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

var NPCGroup;
var mother1;
var day;

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
        villageDoor.visible = true;

        player = new hPlayer(this.game, 600, 500, "playerSheet");
        this.game.add.existing(player);
        player.x = 407;
        player.y = 335;

        NPCGroup = this.game.add.group();

        this.loadLevel("home");

        mother1 = new hNPC(game, 416,256, "mother",
            [
                "Good morning Allan, could you run to the shop before you go out with your friends?",
                "Yes of course mother.",
                "Such a good boy, we need some carrots and a sack of potatoes",
                "Ok mother ill be back soon.",
                "Be Careful.",
                "I will."]
        , 15, 15);

        mother1.anchor.setTo(.5,.5);
        mother1.x = 416;
        mother1.y = 256;

        NPCGroup.add(mother1);
        //make the camera follow the player
        this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

    },
    update: function(){
        this.game.physics.arcade.collide(player, layers[1], null);
        this.game.physics.arcade.collide(player, layers[2], null);

        this.game.physics.arcade.overlap(player, shopDoor, function(){
            if(player.interactKey.isDown == true) {
                this.loadLevel("shop");
                player.x = 407;
                player.y = 335;
            }
        },null, this);

        this.game.physics.arcade.overlap(player, homeDoor, function(){
            if(player.interactKey.isDown == true) {
                this.loadLevel("home");
                player.x = 407;
                player.y = 335;
            }
        }, null, this);

        this.game.physics.arcade.overlap(player, villageDoor, function(){
            if(player.interactKey.isDown == true) {

                if(map.key == "home"){
                    this.loadLevel("village");
                    player.x = 542;
                    player.y = 90;
                } else if(map.key == "shop") {
                    this.loadLevel("village");
                    player.x = 670;
                    player.y = 424;
                }
            }
        }, null, this);

        this.game.physics.arcade.overlap(player, NPCGroup, function(player, npc){
            if(player.interactKey.isDown && npc.talked == false){
                npc.openDialog();
            }
        }, null, this);

        NPCGroup.forEach(function(npc){
            this.game.physics.arcade.collide(player, npc.collideBody, null);
        });

    },

    render: function(){
        game.debug.body(player);
        game.debug.body(player.arrow);


        NPCGroup.forEach(function(npc){
            game.debug.body(npc.collideBody);
        });


    },

    loadLevel: function(newMap){

        if(map!= null){
            map.destroy();
            layers[0].destroy();
            layers[1].destroy();
        }

        map = game.add.tilemap(newMap);
        map.addTilesetImage('tileset');

        layers[0] = map.createLayer("background");
        layers[1] = map.createLayer("collision");

        map.setCollision([1,20], true, layers[1]);

        layers[0].resizeWorld();
        layers[1].visible = false;
        this.game.camera.setBoundsToWorld();

        player.bringToTop();
        game.world.bringToTop(NPCGroup);

        if(newMap == "home" || newMap == "shop"){
            villageDoor.x = 416;
            villageDoor.y = 368;
        }
    }
};