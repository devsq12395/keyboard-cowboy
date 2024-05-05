ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	// PLUGINS
	'plugins.input.pointer',
	'plugins.tween',
	'plugins.random',
	'plugins.scale',
	'plugins.word-wrapper',
	'plugins.storage',
	'plugins.calc',
	'plugins.btn',
	'plugins.entity-plus',

	'plugins-sq.popup.popup',
	
	// HANDLERS
	'plugins.handlers.music-handler',
	'plugins.handlers.sound-handler',
	'plugins.handlers.window-handler',

	// OBJECTS
	'game.entities.objects.game-object',

	'game.entities.controllers.game-control',
	'game.entities.controllers.ui-control',
	
	'game.entities.objects.keypad',
	'game.entities.objects.bullet',
	'game.entities.objects.scoreboard',
	'game.entities.objects.puzzle',
	'game.entities.objects.bg',

	'game.entities.popups.result',

	'game.entities.database.db-sprite',
	
	// LEVELS
	'game.levels.game'
)
.defines(function(){
	
	var GAME_CODE_NAME = "projNinja";
	var SQ_FRAMEWORK_VERSION = "v.1.9";
	
	var SCREEN_RESOLUTION = {w: 1280, h: 720};
	var SCREEN_SCALE = 1;
	var FPS = 60;

	MyGame = ig.Game.extend({
		
		storage: null,
		
		init: function() {

			ig.windowHandler.game_start (SCREEN_RESOLUTION);
			
			ig.game.storage = new ig.Storage (GAME_CODE_NAME);

			ig.game.storage.store_data ('answer-set', '1');
			
			this.load_level (0);
			this.load_controls ();
			
			var _music = ig.game.storage.load_data ('music_pause'),
				_sound = ig.game.storage.load_data ('sound_pause');
			if (_music === null) {
				ig.game.storage.store_data ('music_pause', false);
			}else if (_music == 'true'){
				ig.musicHandler.isPause = true;
			}
			if (_sound === null) {
				ig.game.storage.store_data ('sound_pause', false);
			}else  if (_sound == 'true'){
				ig.soundHandler.isMute = true;
			}
		},
		
		update: function() {
			ig.windowHandler.update ();
			
			if (ig.game.paused) {
				
			}else {
				this.parent();
			}
		},
		
		draw: function() {
			this.parent();
		},
		
		load_level: function (_lvlNum) {
			var _lvlName = '', _lvl = null;
			
			switch (_lvlNum) {
				case 0: _lvlName = 'gameScreen'; _lvl = LevelGame; break;
			}
			
			ig.global.currentLevel = _lvlName;
			this.loadLevel( _lvl );
			
			// Pointer
			if (!ig.game.pointer)
				ig.game.pointer = ig.game.spawnEntity (EntityPointer, 0, 0);
		},
		
		load_controls: function () {
			ig.input.initMouse();
			ig.input.bind(ig.KEY.MOUSE1, 'click');
			
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			ig.input.bind(ig.KEY.Z, 'weapon-1');
			ig.input.bind(ig.KEY.X, 'weapon-2');
			ig.input.bind(ig.KEY.C, 'weapon-3');
		},
		
		pause_game: function (){
			ig.system.stopRunLoop.call(ig.system);
			ig.soundHandler.api_force_mute ();
			ig.musicHandler.api_force_pause ();
			
			ig.game.paused = true;
		},

		resume_game: function (_skipSound){
			ig.system.startRunLoop.call(ig.system);
			
			if (!_skipSound) {
				ig.soundHandler.set_mute (false);
				ig.musicHandler.set_pause (false);
			}
			
			ig.game.paused = false;
		}
	});

	if (ig.ua.mobile) {
		SCREEN_RESOLUTION = {w: 720, h: 1280};
	}
	ig.windowHandler = new ig.WindowHandler (SCREEN_RESOLUTION);
	ig.main( '#canvas', MyGame, FPS, SCREEN_RESOLUTION.w, SCREEN_RESOLUTION.h, SCREEN_SCALE );
	ig.musicHandler = new ig.MusicHandler ();
	ig.soundHandler = new ig.SoundHandler ();

});
