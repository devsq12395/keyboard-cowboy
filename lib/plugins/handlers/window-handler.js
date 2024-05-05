ig.module( 
	'plugins.handlers.window-handler'
)
.requires(
	'impact.entity'
)
.defines(function(){
	ig.WindowHandler = ig.Class.extend ({
		/*
			v.1.1
		*/

		portrait: false,
		
		divs: [
			'canvas'
		],
		
        init: function (){
            
			
			//this.calc_size ();
        },
		
		game_start: function (_reso){
			/* document.addEventListener("visibilitychange", function (){
                if (document.hidden) {
                    ig.game.pause_game ();
                }else {
                    ig.game.resume_game ();
                }
            }); */
			window.onfocus = function(){
				ig.game.resume_game ();
			}
			window.onblur = function(){
				ig.game.pause_game ();
			}

			ig.game.resolution = {x: _reso.w, y: _reso.h};
			ig.game.actualResolution = {x: _reso.w, y: _reso.h};

			this.portrait = (ig.game.resolution.x < ig.game.resolution.y);
		},
		
		update: function (){
			this.calc_size ();
			//this.resize_layers ();
		},
		
		calc_size: function (){
			if (ig.ua.mobile) {
				this.windowSize = {x: window.innerWidth, y: window.innerHeight};
			} else {
				this.windowSize = {x: window.innerWidth, y: window.innerHeight};
			}
			
			this.windowScale = {
				x: this.windowSize.x / ig.game.actualResolution.x,
				y: this.windowSize.y / ig.game.actualResolution.y
			};
			
			var _multiplier = Math.min (this.windowScale.x, this.windowScale.y);
			
			
			
			if (ig.ua.mobile) {
				ig.game.resolution = {
					x: ig.game.actualResolution.x * _multiplier,
					y: ig.game.actualResolution.y * _multiplier,
				}
				
				this.portrait = (ig.game.resolution.x < ig.game.resolution.y);

				var _canvas = document.getElementById ("game");
				var _style = "width:" + ig.game.resolution.x + "px; ";
				_style += "height:" + ig.game.resolution.y + "px; ";
				
				var _left = window.innerWidth / 2 - ig.game.resolution.x / 2;
				if (_left < 0) _left = 0;
				_style += "margin-left:" + _left + "px;";
				var _top = window.innerHeight / 2 - ig.game.resolution.y / 2;
				if (_top < 0) _top = 0;
				_style += "margin-top:" + _top + "px;";
			} else {
				ig.game.resolution = {
					x: ig.game.actualResolution.x * _multiplier,
					y: ig.game.actualResolution.y * _multiplier,
				}
				
				this.portrait = (ig.game.resolution.x < ig.game.resolution.y);
				
				var _canvas = document.getElementById ("game");
				var _style = "width:" + ig.game.resolution.x + "px; ";
				_style += "height:" + ig.game.resolution.y + "px; ";
				
				if (this.portrait) {
					var _left = window.innerWidth / 2 - ig.game.resolution.x / 2;
					if (_left < 0) _left = 0;
					_style += "margin-left:" + _left + "px;";
				} else {
					var _top = window.innerHeight / 2 - ig.game.resolution.y / 2;
					if (_top < 0) _top = 0;
					_style += "margin-top:" + _top + "px;";
				}

			}

			_canvas.setAttribute ("style", _style);
		},
		
		resize_layers: function (){
			for (var _divIn in this.divs) {


				var _elem = ig.$(this.divs [_divIn])[0];
				
				var w = ig.game.resolution.x * this.multiplier;
				var h = ig.game.resolution.y * this.multiplier;
				
				var _l = Math.floor((this.windowSize.x/2) - (w/2));
				var _t = Math.floor((this.windowSize.y/2) - (h/2));
				if (_l < 0) _l = 0; if (_t < 0) _t = 0;
				
				_elem.width = Math.floor (ig.game.resolution.x);
				_elem.height = Math.floor (ig.game.resolution.y);
			}
		}
    });
});