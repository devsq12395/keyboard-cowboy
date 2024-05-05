ig.module( 
	'game.entities.database.db-sprite'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityDbSprite = ig.Entity.extend ({

        mG: null,

        /*
            FUNCTION LIST:

            GET ANIMS FROM:
                animList = object
                animStatList = object    
                
                imgList = object
        */

        animList: {
            
        },
        animStatList: {
            
        },
        imgList: {
            'puzzle-none': new ig.Image ('media/graphics/puzzles/puzzle-blank.png'),

            // Weapon Icons
            'puzzle-1-0': new ig.Image ('media/graphics/puzzles/apple.png'),
            'puzzle-1-1': new ig.Image ('media/graphics/puzzles/banana.png'),
            'puzzle-1-2': new ig.Image ('media/graphics/puzzles/cup.png'),
            'puzzle-1-3': new ig.Image ('media/graphics/puzzles/laptop.png'),
            'puzzle-1-4': new ig.Image ('media/graphics/puzzles/tree.png'),
        },

        init: function (x, y, settings){
            this.parent (x, y, settings);
        },
    });
});