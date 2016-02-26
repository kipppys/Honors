var hMenu = function(game){

};

var menuBG;
var playBtn;
var instBtn;
var instPop;
var Music;

hMenu.prototype = {
    preload: function(){

    }
    ,
    create: function(){
        menuBG = this.game.add.image(0,0, "menuBG");


        Music = this.game.add.audio("menuMusic");
        Music.play("", 0, 1, true,true);

        playBtn = this.game.add.button(332.5,315,"playBtn", function(){
            Music.stop();
            this.game.state.start("hGame");
        });

        instBtn = this.game.add.button(195,450,"instBtn", function(){

            if(instPop.visible == false){
                instPop.visible = true;
            } else {
                instPop.visible = false;
            }

        });

        instPop = this.game.add.image(0,0, "instPop");
        instPop.anchor.setTo(.5,.5);
        instPop.x = 400;
        instPop.y = 350;
        instPop.visible = false;
    }
};