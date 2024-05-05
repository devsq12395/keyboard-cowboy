ig.module(
	'plugins.random'
)
.requires(
	'impact.entity'
)
.defines(function() {
	ig.Entity.prototype.random = function(_min, _max) {
		return Math.floor (Math.random () * (_max - _min + 1)) + _min;
	};

});