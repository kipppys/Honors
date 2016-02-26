var hMenu = function(game){

};

var menuBG;
var playBtn;
var instBtn;

hMenu.prototype = {
    preload: function(){

    }
    ,
    create: function(){
        menuBG = this.game.add.image(0,0, "menuBG");

        playBtn = this.game.add.button(332.5,315,"playBtn", function(){
            console.log("this");
        });

        instBtn = this.game.add.button(195,450,"instBtn", function(){

        });
    }
};