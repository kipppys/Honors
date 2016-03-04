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
var shopKeep;

var canExit = false;
var gotFood = false;

var villageMusic;

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

        player = new hPlayer(this.game, 373, 320, "playerSheet");
        this.game.add.existing(player);

        NPCGroup = this.game.add.group();

        villageMusic = this.game.add.audio("villageMusic");
        villageMusic.play("", 0, 0.1, true,true);

        mother1 = new hNPC(game, 416,256, "mother",
            [
                "Mother: Good morning Allan, could you run to the shop for me?",
                "Allan: Yes of course mother.",
                "Mother: Such a good boy, we need some carrots and a sack of potatoes",
                "Allan: Ok mother ill be back soon.",
                "Mother: Be Careful.",
                "Allan: I will."],
            [
                game.add.audio("mother1"),
                game.add.audio("mother2"),
                game.add.audio("mother3")],
            15, 15, "mother");
        mother1.anchor.setTo(.5,.5);
        mother1.x = 416;
        mother1.y = 256;

        shopKeep = new hNPC(game, 460,256, "oldWoman",
            [
                "Allan: Could i have some carrots and a sack of potatoes please?",
                "Shop Keep: Your mother making soup?",
                "Allan: Yes she is, carrot and potato i think.",
                "Shop Keep: That sounds very nice...",
                "Shop Keep: Why don't you take these to go with it, get some meat on your bones.",
                "Allan: Thank you very much, good bye.",
                "Shop Keep: Have a good day Allan.",
                "Allan: Thank you, you too."],
            [
                game.add.audio("shopKeep1"),
                game.add.audio("shopKeep2"),
                game.add.audio("shopKeep3"),
                game.add.audio("shopKeep4")],
            15, 15, "shopKeep");
        shopKeep.visible = false;
        shopKeep.anchor.setTo(.5,.5);

        this.loadLevel("home");

        NPCGroup.add(mother1);
        NPCGroup.add(shopKeep);


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
                shopKeep.visible = true;
            }
        },null, this);

        this.game.physics.arcade.overlap(player, homeDoor, function(){
            if(player.interactKey.isDown == true) {

                if(gotFood == true){

                }

                this.loadLevel("home");
                player.x = 407;
                player.y = 335;
            }
        }, null, this);

        this.game.physics.arcade.overlap(player, villageDoor, function(){
            if(player.interactKey.isDown == true) {

                if(map.key == "home" && canExit == true){
                    this.loadLevel("village");
                    player.x = 542;
                    player.y = 90;
                    mother1.visible = false;

                } else if(map.key == "shop") {
                    this.loadLevel("village");
                    player.x = 670;
                    player.y = 424;
                    shopKeep.visible = false;
                }
            }
        }, null, this);

        this.game.physics.arcade.overlap(player, NPCGroup, function(player, npc){
            if(player.interactKey.isDown && npc.talked == false && npc.dialogBox.visible == false){
                npc.openDialog();
                console.log("this");
            }

            if(npc.dialogBox.visible == true){
                player.canMove = false;
                villageMusic.volume = 0.03;
            } else if(player.canMove == false){
                player.canMove = true;
                villageMusic.volume = 0.1;
            }
        }, null, this);

        NPCGroup.forEach(function(npc){

            this.game.physics.arcade.collide(player, npc.collideBody, null);

            if(npc.key == "mother" && map.key != "home"){
                npc.visible = false;
            }

        });

        if(mother1.talked == true){
            canExit = true;
        }

        if(shopKeep.talked == true){
            gotFood = true;
        }

    },

    render: function(){
       /* game.debug.body(player);
        game.debug.body(player.arrow);


        NPCGroup.forEach(function(npc){
            game.debug.body(npc.collideBody);
        });

*/
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


        game.world.bringToTop(NPCGroup);
        player.bringToTop();

        if(newMap == "home" || newMap == "shop"){
            villageDoor.x = 416;
            villageDoor.y = 368;
        }
    }
};