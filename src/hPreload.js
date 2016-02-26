var hPreload = function(game){

};

hPreload.prototype = {
    preload: function(){

        //menu
        this.game.load.image("menuBG", "assets/images/menu/menu bg.png");
        this.game.load.image("playBtn", "assets/images/menu/play btn.PNG");
        this.game.load.image("instBtn", "assets/images/menu/inst btn.png");

        //maps and tile set
        this.game.load.tilemap("village", "assets/maps/Village.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("tileset", "assets/images/tileset.png");

        //player
        this.game.load.image("playerSheet", "assets/images/player sheet.png");

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

    },
    create: function(){
        this.game.state.start('hMenu');
    }
};