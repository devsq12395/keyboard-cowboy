ig.module( 
	'plugins-sq.popup.popup'
)
.requires(
	'impact.entity',
	'plugins.btn'
)
.defines(function(){
	/*
		v.1.0
	*/
	EntityPopup = ig.Entity.extend ({
		zIndex: 1000,
		
		imgBg: new ig.Image ('lib/plugins-sq/popup/popup.png'),
		
		pos_Targ: {x: 410, y: 80},
		
		btns: [],
		
		isShow: false,
		
		init: function (x, y, settings){
			this.parent (x, y, settings);
			
			this.pos = {x: this.pos_Targ.x, y: this.pos_Targ.y};
			
			this.hide ();
		},
		
		draw: function (){
			if (!this.isShow) return;
			
			var _ctx = ig.system.context;
			_ctx.save ();

			_ctx.globalAlpha = 0.75;
			_ctx.fillStyle = '#000000';
			_ctx.fillRect (0, 0, ig.game.actualResolution.x, ig.game.actualResolution.y);
			_ctx.globalAlpha = 1;

			this.imgBg.draw (this.pos.x, this.pos.y);
			
			_ctx.restore ();

            this.parent ();
		},
		
		show: function (){
			this.isShow = true;
			
			for (var i = this.btns.length - 1; i >= 0; i--){
				this.btns [i].isHidden = false;
			}
		},
		
		hide: function (){
			this.isShow = false;
			
			for (var i = this.btns.length - 1; i >= 0; i--){
				this.btns [i].isHidden = true;
			}
		},

		draw_assets: function (){},
		
		kill: function (){
			for (var i = this.btns.length - 1; i >= 0; i--){
				this.btns [i].kill ();
			}
			
			this.parent ();
		}
	});
});
