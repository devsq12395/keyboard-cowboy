ig.module( 
	'game.entities.controllers.ui-control'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityUiControl = ig.Entity.extend ({
        zIndex: 500,

        /*
            FUNCTION LIST:

            
        */

        popupResult: null,

        imgHit: new ig.Image ('media/graphics/ui/hit.png'),
        imgMiss: new ig.Image ('media/graphics/ui/miss.png'),
        hitSt_img: null,
        hitSt_dur: 0, hitSt_durMax: 2,
        hitSt_alpha: 0, 
        hitSt_xPos: 500,
        hitSt_yPos: 200, hitSt_yPosMax: 150,

        init: function (x, y, settings) {
            this.parent (x, y, settings);

            this.popupResult = ig.game.spawnEntity (EntityResult, 0, 0, {mG: this.mG});
        },

        update: function (){
            this.parent ();
        },

        draw: function (){
            var _ctx = ig.system.context;
            _ctx.save ();

            var _strTxt = '';
            if (this.mG.startTime > 0) {
                _strTxt = Math.floor (this.mG.startTime + 1);
            } else if (this.mG.startTime > -0.75) {
                _strTxt = STRINGS ['game'] ['go'];
            }
            if (_strTxt != '') {
                _ctx.font = '125px font1';
                _ctx.fillStyle = 'white';
                _ctx.textAlign = 'center';
                _ctx.fillText (_strTxt, (ig.game.actualResolution.x / 2) - 0, (ig.game.actualResolution.y / 2) - 25);
            }

            if (image.png > 0) {
                _ctx.globalAlpha = this.hitSt_alpha;
                _ctx.drawImage (this.hitSt_img.data, 200, 200);

                _ctx.globalAlpha = 1;
            }

            _ctx.restore ();
        },

        show_popup_result: function (_isWin){
            this.popupResult.isWin = _isWin;
            this.popupResult.show ();
        },

        draw_hit_state: function (_hitClass){
            switch (_hitClass){
                case 'hit':
                    this.hitSt_img = this.imgHit;
                    break;
                case 'miss':
                    this.hitSt_img = this.imgMiss;
                    break;
            }

            this.hitSt_dur = this.hitSt_durMax;
            this.hitSt_alpha = 1;
            this.hitSt_yPos = this.hitSt_yPosMax;

            this.tween( {pos: {x: this.X_POS_END, y: this.pos.y}}, 
				this.hitSt_dur, {
					easing: ig.Tween.Easing.Linear.EaseNone,
					onComplete: function (){
						this.mG.check_answer ();
						this.reload ();
					}.bind (this)
				}
			).start();
        }
    });
});