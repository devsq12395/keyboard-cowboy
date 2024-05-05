ig.module( 
	'game.entities.popups.result'
)
.requires(
	'impact.entity',
    'plugins-sq.popup.popup',
    'plugins.btn'
)
.defines(function () {
	EntityResult = EntityPopup.extend ({
        zIndex: 1000,

        pos_Targ: {x: 410, y: 80},

		isWin: false,

        init: function (x,y,settings){
            this.parent (x,y,settings);

			this.pos = {x: this.pos_Targ.x, y: this.pos_Targ.y};
			
			var _home = ig.game.spawnEntity (EntityBtnHome, 510, 550, {main: this});
            var _restart = ig.game.spawnEntity (EntityBtnRestart, 610, 550, {main: this});
            var _next = ig.game.spawnEntity (EntityBtnNext, 710, 550, {main: this});
			
            this.btns.push (_home);
			this.btns.push (_restart);
			this.btns.push (_next);

			this.hide ();
        },

        draw: function (_ctx){
			if(!this.isShow) return;

            this.parent ();

            var _ctx = ig.system.context;
			_ctx.save ();

            _ctx.font = '80px font2';
			_ctx.fillStyle = 'black';
			_ctx.textAlign = 'center';
			
			var _winTxt = ((this.isWin) ? STRINGS ['game'] ['win'] : STRINGS ['game'] ['lose'])
			_ctx.fillText (_winTxt, 650, 200);

			_ctx.font = '40px font1';
			_ctx.fillStyle = 'black';
			_ctx.textAlign = 'right';
			_ctx.fillText (STRINGS ['game'] ['accuracy'] + ': ', 675, 300);
			_ctx.fillText (STRINGS ['game'] ['time-left'] + ': ', 675, 350);
			_ctx.fillText (STRINGS ['game'] ['score'] + ': ', 675, 400);
			_ctx.fillText (STRINGS ['game'] ['rating'] + ': ', 675, 450);

			_ctx.textAlign = 'left';
			_ctx.fillText (this.mG.accuracy + '%', 675, 300);
			_ctx.fillText (Math.floor (this.mG.time), 675, 350);
			_ctx.fillText (this.mG.score + '/' + this.mG.goal, 675, 400);
			_ctx.fillText (STRINGS ['game'] ['ratings'] [this.mG.rating], 675, 450);
            
            _ctx.restore ();
        },
    });

    EntityBtnHome = EntityBtn.extend ({
        logoImg: new ig.Image ('media/graphics/ui/btn-home.png'),

		zIndex: 1001,
		main: null,
		
		interact: function (){
			
		}
	});

    EntityBtnRestart = EntityBtn.extend ({
        logoImg: new ig.Image ('media/graphics/ui/btn-restart.png'),

		zIndex: 1001,
		main: null,
		
		interact: function (){
			
		}
	});

    EntityBtnNext = EntityBtn.extend ({
        logoImg: new ig.Image ('media/graphics/ui/btn-next.png'),

		zIndex: 1001,
		main: null,
		
		interact: function (){
			
		}
	});
});