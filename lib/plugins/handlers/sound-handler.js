ig.module( 
	'plugins.handlers.sound-handler'
)
.requires(
	'impact.entity'
)
.defines(function(){
	ig.SoundHandler = ig.Class.extend ({
		/*
			v.1.1.2 - manually muting all sounds on pause
		*/
        sounds: [
            //{name: 'click', path: 'media/audio/sfx/click.mp3', player: null},
        ],
		
		isMute: false,
		forcedMute: false,
		lastFlag_sound: false,

        /*
			FUNCTION LIST:

            play
			set_mute
			api_force_mute
		*/

        init: function (){
            var _newSound = null;

            for (var i in this.sounds) {
                _newSound = new ig.Sound (this.sounds [i].path, false);
                this.sounds [i].player = _newSound;
            }
        },

        play: function (_name){
			if (this.isMute) return;
			
            for (var i in this.sounds) {
                if (this.sounds [i].name == _name) {
                    this.sounds [i].player.play ();
                }
            }
        },
		
		set_mute: function (_set, _apiResume) {
			if (this.forcedMute || _apiResume) {
				var _set = (ig.game.storage.load_data ('sound_pause') == 'true');
				this.isMute = _set;
				this.forcedMute = false;
			} else {
				this.isMute = _set;
				ig.game.storage.store_data ('sound_pause', _set);
			}
			
			if (this.isMute) {
				for (var i in this.sounds) {
					if (this.sounds [i].name == _name) {
						this.sounds [i].player.stop ();
					}
				}
			}
		},
		
		api_force_mute: function (){
			this.lastFlag_sound = this.isMute;
			
			this.isMute = true;
			this.forcedMute = true;
		},
    });
});