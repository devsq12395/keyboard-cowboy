ig.module( 
	'plugins.handlers.music-handler'
)
.requires(
	'impact.entity'
)
.defines(function(){
	ig.MusicHandler = ig.Class.extend ({
		/*
			v.1.1
		*/
        tracks: [
            //{name: 'menu', path: 'media/audio/bgm/menu.mp3', player: null}
        ],
        tracksToPlay: [],

        curTrack: 0,
		
		isPause: false,
		forcedPause: false,

        /*
			FUNCTION LIST:
			
            stop_tracks

            play
            play_tracks

            play_next_track
			
			set_pause
			api_force_pause
		*/

        init: function (){
            var _newMusic = null;

            var on_music_end = function (){
                this.play_next_track ();
            };

            for (var i in this.tracks) {
                _newMusic = new ig.Music ();
                _newMusic.add (this.tracks [i].path);
                _newMusic.tracks [0].addEventListener( 'ended', on_music_end.bind (this), false );
                this.tracks [i].player = _newMusic;
            }
        },

        stop_tracks: function (_clearTracks){
            for (var i in this.tracksToPlay) {
                this.tracksToPlay [i].player.stop ();
            }

            if (_clearTracks) this.tracksToPlay = [];
        },

        play_tracks: function (_trackList, _randomize){
            this.stop_tracks (true);

            for (var i in _trackList) {
                for (var x in this.tracks) {
                    if (this.tracks [x].name == _trackList [i]) {
                        this.tracksToPlay.push (this.tracks [x]);
                        break;
                    }
                }
            }

            if (_randomize) {
                var _curInd = this.tracksToPlay.length, _randInd;
			
                while (_curInd != 0) {
                    _randInd = Math.floor(Math.random() * _curInd);
                    _curInd--;
                    
                    [this.tracksToPlay[_curInd], this.tracksToPlay[_randInd]] = [this.tracksToPlay[_randInd], this.tracksToPlay[_curInd]];
                }
            }

            this.curTrack = -1;
            this.play_next_track ();
        },
        
        play_next_track: function (){
            this.curTrack++;
            if (this.curTrack >= this.tracksToPlay.length) this.curTrack = 0;

            this.stop_tracks (false);
			
            if (!this.isPause) this.tracksToPlay [this.curTrack].player.play ();
        },
		
		set_pause: function (_set, _apiResume){
			if (this.forcedPause || _apiResume) {
				_set = (ig.game.storage.load_data ('music_pause') == 'true');
				this.forcedPause = false;
			} else {
				ig.game.storage.store_data ('music_pause', _set);
			}
			
            if (this.tracksToPlay.length > 0) {
                if (_set) {
                    this.tracksToPlay [this.curTrack].player.pause ();
                } else {
                    this.tracksToPlay [this.curTrack].player.play ();
                }
            }
			
			this.isPause = _set;
		},
		
		api_force_pause: function (){
			this.isPause = true;
			this.forcedPause = true;
			if (this.tracksToPlay [this.curTrack]) this.tracksToPlay [this.curTrack].player.pause ();
		}
    });
});