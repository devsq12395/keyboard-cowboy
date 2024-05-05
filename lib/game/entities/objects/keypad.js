ig.module('game.entities.objects.keypad')
.requires(
	'impact.entity',
	'game.entities.objects.key'
)
.defines(function () {
	EntityKeypad = ig.Entity.extend({
		zIndex: 20,
		bg: new ig.Image('media/graphics/ui/keyboard.png'),
		mG: null,

		size: {
			x: 540,
			y: 200
		},

		keys: [
			['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
			['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
			['Z', 'X', 'C', 'V', 'B', 'N', 'M']
		],

		init: function (x, y, settings) {
			this.parent(x, y, settings);
			for (var i = 0; i < 10; i++) {
				ig.game.spawnEntity(EntityKey, this.pos.x + 65 + (i % 10) * 60, this.pos.y + 40, {
					key: this.keys[0][i],
					mG: this.mG
				});
			}

			for (var i = 0; i < 9; i++) {
				ig.game.spawnEntity(EntityKey, this.pos.x + 95 + (i % 9) * 60, this.pos.y + 120, {
					key: this.keys[1][i],
					mG: this.mG
				});
			}

			for (var i = 0; i < 7; i++) {
				ig.game.spawnEntity(EntityKey, this.pos.x + 150 + (i % 7) * 60, this.pos.y + 204, {
					key: this.keys[2][i],
					mG: this.mG
				});
			}
		},

		draw: function () {
			this.parent();
			this.bg.draw(this.pos.x, this.pos.y);
		}
	});
});