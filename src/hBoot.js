var hBoot = function(game){

};

hBoot.prototype = {
    preload: function(){

    },
    create: function(){
        this.game.state.start('hPreload');
    }
};