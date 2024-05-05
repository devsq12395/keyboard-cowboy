ig.module( 
	'game.entities.objects.bg'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityBg = ig.Entity.extend ({

        mG: null,

        bg: null,
        bgGame: new ig.Image ('media/graphics/bg2.png'),
        bgHome: new ig.Image ('media/graphics/bg.png'),

        set: 'game',

        imgClouds: [
            new ig.Image ('media/graphics/cloud-01.png'),
            new ig.Image ('media/graphics/cloud-02.png'),
            new ig.Image ('media/graphics/cloud-03.png'),
            new ig.Image ('media/graphics/cloud-04.png'),
            new ig.Image ('media/graphics/cloud-05.png'),
        ],
        maxCld: 7, minCld: 3, cldSpd: 2,
        maxY: 0,

        clouds: [],

        init: function (x, y, settings){
            this.parent (x, y, settings);

            switch (this.set){
                case 'game': this.bg = this.bgGame; break;
                case 'home': this.bg = this.bgHome; break;
            }

            if (ig.ua.mobile) {
                this.pos = {x: -500, y: -200};
                this.maxY = 650;
            } else {
                this.pos = {x: 0, y: -500};
                this.maxY = 350;
            }

            this.create_first_clouds ();
        },

        update: function (){
            this.parent ();

            this.move_clouds ();
        },

        draw: function (){
            var _ctx = ig.system.context;
            _ctx.save ();

            _ctx.drawImage (this.bg.data, this.pos.x, this.pos.y);

            this.draw_clouds (_ctx); 

            _ctx.restore ();
        },

        create_first_clouds: function (){
            for (var i = 1; i < this.random (this.minCld, this.maxCld); i++) {
                this.create_cloud (0);
                this.create_cloud (1);
            }
        },

        create_cloud: function (_isStart) {
            var _posXStrt = 0;
            switch (_isStart) {
                case 0: _posXStrt = 0; break;
                case 1: _posXStrt = ig.game.actualResolution.x; break;
            }
            var _new = {
                pos: {x: this.random (_posXStrt, ig.game.actualResolution.x * 2),
                     y: this.random (0, this.maxY)},
                type: this.random (0, this.imgClouds.length - 1)
            };
            this.clouds.push (_new);
        },

        move_clouds: function (){
            for (var i = this.clouds.length - 1; i >= 0; i--) {
                this.clouds [i].pos.x -= this.cldSpd;

                if (this.clouds [i].pos.x < -ig.game.actualResolution.x / 2) {
                    this.clouds.splice (i, 1);
                    this.create_cloud (1);
                }
            }
        },

        draw_clouds: function (_ctx){
            var _cld = null;
            for (var i in this.clouds) { 
                _cld = this.clouds [i]; 
                _ctx.drawImage (this.imgClouds [_cld.type].data, _cld.pos.x, _cld.pos.y);
            }
        }
    });
});
