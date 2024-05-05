ig.module( 
	'plugins.input.pointer' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPointer = ig.Entity.extend ({
		gravityFactor:0,
		
		pos: {x: 0, y: 0},
		size: {x: 1, y: 1},

		firstClick: false,
		firstClickDone: false,
		
		init: function (x, y, settings) {
			this.parent (x, y, settings);
		},
		
		update: function () {
			this.parent ();
			
			this.pos.x = ig.input.mouse.x;
			this.pos.y = ig.input.mouse.y;

			if (ig.input.state ('click')) {
				if (!this.firstClick && !this.firstClickDone) {
					this.firstClick = true;
				} else {
					this.firstClick = false;
					this.firstClickDone = true;
				}
			} else {
				this.firstClickDone = false;
			}
		}
	});
	
});