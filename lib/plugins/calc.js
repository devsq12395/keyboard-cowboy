ig.module(
	'plugins.calc'
)
.requires(
	'impact.entity'
)
.defines(function() {
	ig.Entity.prototype.calc_angle_from_2_points = function(_p1, _p2) {
		var dy = _p2.y - _p1.y;
        var dx = _p2.x - _p1.x;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        return theta;
	};

    ig.Entity.prototype.calc_point_from_ang_and_point = function(_ang, _dist, _pointStrt, _degInput) {
		// Needs rad
		if (_degInput) {
			_ang *= Math.PI / 180;
		}

		return {x: _pointStrt.x + _dist * Math.cos (_ang),
                y: _pointStrt.y + _dist * Math.sin (_ang)};
	};

	ig.Entity.prototype.calc_dist_from_2_points = function(_p1, _p2) {
		var dy = _p2.y - _p1.y;
        var dx = _p2.x - _p1.x;

		var ret = Math.sqrt (dx*dx+dy*dy);
        
        return ret;
	};

	ig.Entity.prototype.calc_obj_is_inside_obj = function(_obj1, _obj2) {
		if(_obj1.pos.x + _obj1.size.x > _obj2.pos.x &&
			_obj1.pos.x < _obj2.pos.x + _obj2.size.x &&
			_obj1.pos.y + _obj1.size.y > _obj2.pos.y &&
			_obj1.pos.y < _obj2.pos.y + _obj2.size.y ) {
			 return true;
		 }
		 return false;
	}
});