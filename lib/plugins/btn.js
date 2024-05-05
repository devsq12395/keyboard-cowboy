ig.module('plugins.btn')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityBtn = ig.Entity.extend({
		/*
			v.1.1
		*/
		//type:ig.Entity.TYPE.A,
		gravityFactor:0,
		
		logoImg_multiple: false,
		logoImg_list: [],
		logoImg: null,
		zIndex:101,

		isClicking: false,
		isEnabled: true,
		isHidden: false,
		isHover: false,
		btnDelay: 0,

		interactable: true,
		hasPressAnim: false,
		
		size: {x: 0, y: 0},
		
		toDraw: [],
		// Sample toDraw object:
		// Image - {type: 'img', idName: '', img: >ig.Image<, offset: {x: 0, y: 0}}
		// Text - {type: 'txt', idName: '', font: >[]<, fillStyle: >color<, textAlign: >textAlign<, txt: '', offset: {x: 0, y: 0}}

		dataStor: [],

		init:function(x,y,settings){
			ig.game.sortEntitiesDeferred();
			this.parent(x,y,settings);
			
			if (this.logoImg_multiple) {
				this.logoImg = this.logoImg_list [0];
			}
		},

		update:function(){
			this.parent();
			
			if(!this.isEnabled || this.isHidden) return;
			
			this.isHover = this.checkMousePos();
			
			if(ig.input.state('click')){
				if(this.isHover){
					if(!this.isFirstPressed){
						this.clicked();
						this.isFirstPressed = true;
					}
					
					this.clicking();
				}else{
					this.isClicking = false;
					this.isFirstPressed = false;
				}
			}else {
				if(this.isClicking){
					this.released();
				}
			}

			if(this.btnDelay > 0)		this.btnDelay--;
		},
		
		scale_tween: function(isScaleDown){
			var end2 = (isScaleDown) ? this.scaleTarg_down : this.scaleTarg_up;
			this.isScale_clicked = isScaleDown;
			
			this.isScale_moving = true;
			
			this.tween({scaleCur: end2}, 0.05, {
				easing: ig.Tween.Easing.Cubic.EaseIn,
				onComplete: function(){
					this.isScale_moving = false;
				}.bind(this)
			}).start();
		},

		draw:function() {
			if(this.isHidden)	return;

			if (this.logoImg){
				this.logoImg.draw (this.pos.x, this.pos.y);
			}

			var _ctx = ig.system.context;
			_ctx.save ();
			
			var _drawObj = null;
			for (var i = 0; i < this.toDraw.length; i++) {
				_drawObj = this.toDraw [i];
				
				switch (_drawObj.type) {
					case 'img':
						_drawObj.img.draw (this.pos.x + _drawObj.offset.x, this.pos.y + _drawObj.offset.y);
						break;
					
					case 'txt':
						_ctx.font = _drawObj.font;
						_ctx.fillStyle = _drawObj.fillStyle;
						_ctx.textAlign = _drawObj.textAlign;
						_ctx.fillText (
							_drawObj.txt, 
							this.pos.x + _drawObj.offset.x,
							this.pos.y + _drawObj.offset.y
						);
						break;
				}
			}
			
			_ctx.restore ();

			this.parent ();
	  	},
		
		change_image: function (newLogo){
			this.logoImg = this.logoImg_list [newLogo];
		},

		checkMousePos:function(){
			var _retVal = (	(ig.game.pointer.pos.x - ig.game.screen.x) >= this.pos.x &&
						(ig.game.pointer.pos.x - ig.game.screen.x) <= this.pos.x + this.size.x &&
						(ig.game.pointer.pos.y - ig.game.screen.y) >= this.pos.y &&
						(ig.game.pointer.pos.y - ig.game.screen.y) <= this.pos.y + this.size.y );
			
			return _retVal;
		},

		clicked:function() {
			
		},

		clicking:function() {
			if(!this.isClicking && this.isEnabled && this.btnDelay <= 0){
				this.isClicking = true;
			}
		},

		released:function() {
			if(this.isClicking && this.isEnabled){
				this.isClicking = false;
				this.isFirstPressed = false;

				this.interact();
				this.btnDelay = 3;
			}
		},

		interact:function(){

		}
	});
});
