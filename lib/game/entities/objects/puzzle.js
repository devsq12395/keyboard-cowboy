ig.module( 
	'game.entities.objects.puzzle'
)
.requires(
	'impact.entity',
)
.defines(function () {
	EntityPuzzle = ig.Entity.extend ({
        zIndex: 2,
        img: new ig.Image ('media/graphics/puzzles/puzzle-blank.png'),
        imgBoard: new ig.Image ('media/graphics/ui/bg-puzzle.png'),

        answer: '',

        init: function (x, y, settings) {
			this.parent(x, y, settings);
		},

        update: function (){
            this.parent ();
        },

        set_puzzle: function (_img, _ans){
            this.img = this.mG.dbSprite.imgList [_img];
            this.answer = _ans;
        },

        draw: function (){
            var _ctx = ig.system.context;
			_ctx.save ();

            if (ig.ua.mobile){
                _ctx.drawImage (this.imgBoard.data, this.pos.x - 75, this.pos.y - 625);
            }else {
                _ctx.drawImage (this.imgBoard.data, this.pos.x - 75, this.pos.y - 625);
            }
            _ctx.drawImage (this.img.data, this.pos.x, this.pos.y, 421, 324);

            _ctx.restore ();

            this.parent ();
        }
    });
});