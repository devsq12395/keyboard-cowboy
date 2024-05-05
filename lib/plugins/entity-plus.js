ig.module(
	'plugins.entity-plus'
)
.requires(
	'impact.entity'
)
.defines(function() {
	/*
		0.1 functions list:
	*/
	ig.Entity.prototype.get_pos_center = function() {
		
        return {x: this.pos.x + (this.pos.x / 2), y: this.pos.y + (this.pos.y / 2)};
	};
});