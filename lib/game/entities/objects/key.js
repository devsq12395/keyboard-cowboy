ig.module('game.entities.objects.key')
.requires(
	'plugins.btn'
)
.defines(function () {
	EntityKey = EntityBtn.extend({
		zIndex: 301,
		animSheet: new ig.AnimationSheet('media/graphics/ui/keys.png', 48, 59),

		key: '',
		mG: null,

		size: {
			x: 48,
			y: 59
		},

		isEnabled: true,

		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('up', 1, [0]);
			this.addAnim('down', 1, [1]);
			this.state = 'idle';
			this.keyPos = {};
			this.keyPos.x =  x + this.size.x / 2;
			this.keyPos.y = (y + this.size.y / 2) + 13;
		},

		draw: function () {
			this.parent();
			// draw text key
			if(this.state != 'clicked') 		ig.system.context.fillStyle = '#000000';
			else 								ig.system.context.fillStyle = '#ffffff';
			ig.system.context.textAlign = 'center';
			ig.system.context.font = "20pt word";
			ig.system.context.fillText(this.key, this.keyPos.x, this.keyPos.y);
		},

		clicked: function () {
			if (this.isEnabled) {
				this.state = 'clicked';
				this.currentAnim = this.anims.down;
			}
		},

		clicking: function () {this.parent ();},

		interact: function () {
			if (this.state == 'clicked') {
				this.currentAnim = this.anims.up;
				this.state = 'idle';
				this.mG.keydown_mobile(this.key);
				this.mG.typeTotal++;
			}
		},

	});
});