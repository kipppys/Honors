var hPreload = function(game){

};

hPreload.prototype = {
    preload: function(){

        //menu
        this.game.load.image("menuBG", "assets/images/menu/menu bg.png");
        this.game.load.image("playBtn", "assets/images/menu/play btn.PNG");
        this.game.load.image("instBtn", "assets/images/menu/inst btn.png");
        this.game.load.image("instPop", "assets/images/menu/instructionsPopup.png");
        this.game.load.image("dialog", "assets/images/menu/dialog box.PNG");

        //maps and tile set
        this.game.load.tilemap("village", "assets/maps/Village.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap("home", "assets/maps/home.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap("shop", "assets/maps/shop.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("tileset", "assets/images/tileset.png");
        this.game.load.image("door", "assets/images/door.PNG");

        //player
        this.game.load.spritesheet("playerSheet", "assets/images/player sheet.png", 35,41);
        this.game.load.spritesheet("playerArrow", "assets/images/arrow sheet.PNG", 15,15);

        //enemies
        this.game.load.image("lichSheet", "assets/images/enemies/Lich sheet.PNG");
        this.game.load.image("necroSheet", "assets/images/enemies/necromancer sheet.png");
        this.game.load.image("seletonSheet", "assets/images/enemies/skeleton sheet.PNG");
        this.game.load.image("wolfSheet", "assets/images/enemies/wolf sheet.png");
        this.game.load.image("zombieSheet", "assets/images/enemies/zombie sheet.PNG");
        this.game.load.image("zombieWolfSheet", "assets/images/enemies/zombie wolf sheet.png");

        //npcs
        this.game.load.image("boyChild", "assets/images/npcs/boy child.PNG");
        this.game.load.image("girlChild", "assets/images/npcs/girl child.PNG");
        this.game.load.image("female", "assets/images/npcs/female.PNG");
        this.game.load.image("male", "assets/images/npcs/male.PNG");
        this.game.load.image("mother", "assets/images/npcs/mother.PNG");
        this.game.load.image("oldWoman", "assets/images/npcs/old woman.PNG");
        this.game.load.image("guard", "assets/images/npcs/guard.png");

        //sounds
        this.game.load.audio("menuMusic", "assets/sounds/music/Menu.mp3");
        this.game.load.audio("villageMusic", "assets/sounds/music/area/village.mp3");

        //narrative
        this.game.load.audio("mother1", "assets/sounds/narrative/mother/good morning shop.mp3");
        this.game.load.audio("mother2", "assets/sounds/narrative/mother/good boy sack of taties.mp3");
        this.game.load.audio("mother3", "assets/sounds/narrative/mother/be carefull.mp3");
        this.game.load.audio("mother4", "assets/sounds/narrative/mother/good morning.mp3");
        this.game.load.audio("mother5", "assets/sounds/narrative/mother/east road apples.mp3");
        this.game.load.audio("mother6", "assets/sounds/narrative/mother/wont chase you off.mp3");

        this.game.load.audio("shopKeep1", "assets/sounds/narrative/old woman/mother making soup.mp3");
        this.game.load.audio("shopKeep2", "assets/sounds/narrative/old woman/very nice.mp3");
        this.game.load.audio("shopKeep3", "assets/sounds/narrative/old woman/take these.mp3");
        this.game.load.audio("shopKeep4", "assets/sounds/narrative/old woman/good day.mp3");

        //SFX
        this.game.load.audio("bowFire", "assets/sounds/SFX/player/bow fire.mp3");
        this.game.load.audio("playerDam", "assets/sounds/SFX/player/player damaged.mp3");
        this.game.load.audio("swordSwing", "assets/sounds/SFX/player/sword swing.mp3");


    },
    create: function(){
        this.game.state.start('hMenu');
    }
};