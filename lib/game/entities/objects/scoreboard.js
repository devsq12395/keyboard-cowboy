ig.module( 
	'game.entities.objects.scoreboard' 
)
.requires(
	'impact.entity',
)
.defines(function () {
	EntityScoreboard = ig.Entity.extend ({
        zIndex: 3,
        img: new ig.Image('media/graphics/ui/scoreboard.png'),
        imgStar: new ig.Image('media/graphics/ui/star.png'),

        init: function (x, y, settings) {
			this.parent(x, y, settings);
		},

        update: function (){
            this.parent ();
        },

        draw: function (){
            var _ctx = ig.system.context;
			_ctx.save ();

            _ctx.drawImage (this.img.data, this.pos.x, this.pos.y);
            _ctx.drawImage (this.imgStar.data, this.pos.x + 200, this.pos.y + 32);

            // Time
            _ctx.font = '30px font1';
			_ctx.fillStyle = 'white';
			_ctx.textAlign = 'center';
			_ctx.fillText (Math.floor (this.mG.time), this.pos.x + 35, this.pos.y + 60);

            // Images Left
            _ctx.font = '30px font1';
			_ctx.fillStyle = 'white';
			_ctx.textAlign = 'left';
			_ctx.fillText (STRINGS ['game'] ['score'] + ': ' + this.mG.score + '/' + this.mG.goal, this.pos.x + 240, this.pos.y + 60);

            _ctx.restore ();

            this.parent ();
        }
    });
});