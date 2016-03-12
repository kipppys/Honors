/**
 * Created by William on 27/02/2016.
 */
var hVillageDay2 = function(game){

};

var map;
var layers = [];

var player;

var villageDoor;

var NPCGroup;

var canExit = false;

var mother;

var eastRoadMusic;
var villageMusic;

hVillageDay2.prototype = {
    preload: function(){

    },
    create: function(){

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;

        villageDoor = this.game.add.sprite(0,0, "door");
        game.physics.enable(villageDoor, Phaser.Physics.ARCADE);
        villageDoor.visible = true;

        player = new hPlayer(this.game, 373, 320, "playerSheet");
        this.game.add.existing(player);

        NPCGroup = this.game.add.group();

        villageMusic = this.game.add.audio("villageMusic");
        villageMusic.play("", 0, 0.1, true,true);

        mother = new hNPC(game, 416,256, "mother",
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
        mother.anchor.setTo(.5,.5);
        mother.x = 416;
        mother.y = 256;

        loadLevel("home");

        NPCGroup.add(mother);

        //make the camera follow the player
        this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

    },
    update: function(){
        this.game.physics.arcade.collide(player, layers[1], null);
        this.game.physics.arcade.collide(player, layers[2], null);

        this.game.physics.arcade.overlap(player, villageDoor, function(){
            if(player.interactKey.isDown == true) {

                loadLevel("village");
                player.x = 542;
                player.y = 90;
                mother.visible = false;

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

        if(mother.talked == true){
            canExit = true;
        }

        if(player.x > 800 && map.key == "village"){
            loadLevel("east road");
            player.x = 10;
            player.y = 200;

            villageMusic.stop();
            eastRoadMusic = this.game.add.audio("eastRoad");
            eastRoadMusic.play("", 0, 0.1, true,true);

        }

    },

    render: function(){
       /* game.debug.body(player);
        game.debug.body(player.arrow);


        NPCGroup.forEach(function(npc){
            game.debug.body(npc.collideBody);
        });

*/
    }
};