ig.module( 
	'game.entities.objects.game-object'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityGameObject = ig.Entity.extend ({

        /*
            FUNCTION LIST:

            
        */
		mG: null,

		objType: '',
		playerOwner: 1,

        // Stats
		hp: 3,
		speed: 300,

        isAlive: true,

        init: function (x, y, settings){
            this.parent (x, y, settings);
        },

        update: function (){
            
			if (!this.isAlive) {
                this.kill ();
                return;
            }

            if (this.objType != 'player') {
                this.pos.y += this.mG.player.speedRun;
            }

			this.parent ();
        },
		
    });
});