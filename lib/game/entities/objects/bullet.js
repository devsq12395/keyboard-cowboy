ig.module( 
	'game.entities.objects.bullet' 
)
.requires(
	'impact.entity',
)
.defines(function () {
	EntityBullet = ig.Entity.extend ({
		
		imgBullet: new ig.Image ('media/graphics/bullet.png'),

		X_POS_START: -500, X_POS_ACTUAL: null, X_POS_END: 2000,
		
		typing: true,
		
		txt: '', txtLim: 5, // count starts at 0
		
		init: function (x, y, settings) {
			this.X_POS_ACTUAL = x;
			this.parent(x, y, settings);
		},
		
		update: function (){
			this.parent ();
		},
		
		draw: function (){
			var _ctx = ig.system.context;
			_ctx.save ();
			
			_ctx.drawImage (this.imgBullet.data, this.pos.x, this.pos.y);

			var _txt = '';
			for (var i = 0; i <= this.txtLim; i++){
				if (i >= this.txt.length) {
					_txt += '_';
				} else {
					_txt += this.txt [i];
				}
			}
			
			_ctx.font = '50px font2';
			_ctx.fillStyle = 'black';
			_ctx.textAlign = 'left';
			_ctx.fillText (_txt, this.pos.x + 50, this.pos.y + 50);
			
			_ctx.restore ();
			
			this.parent ();
		},
		
		input_key: function (_key) {
			if (!this.typing) return;
			if (this.mG.paused) return;
			
			this.txt += _key;
			if (this.txt.length >= this.txtLim + 1){
				this.shoot ();
			}
		},

		shoot: function (){
			this.typing = false;
			this.mG.shots++;

			this.tween( {pos: {x: this.X_POS_END, y: this.pos.y}}, 
				0.15, {
					easing: ig.Tween.Easing.Linear.EaseNone,
					onComplete: function (){
						this.mG.check_answer ();
						this.reload ();
					}.bind (this)
				}
			).start();
		},

		reload: function (){
			if (this.mG.gameOver) return;

			this.reset_txt ();
			this.pos.x = this.X_POS_START;

			this.tween( {pos: {x: this.X_POS_ACTUAL, y: this.pos.y}}, 
				0.15, {
					easing: ig.Tween.Easing.Linear.EaseNone,
					onComplete: function (){
						this.typing = true;
					}.bind (this)
				}
			).start();
		},

		reset_txt: function (){
			this.txt = '';
			this.txtLim = this.mG.puzzle.answer.length - 1;
		}
	});
});