ig.module( 
	'game.entities.controllers.game-control'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityGameControl = ig.Entity.extend ({


		/*
            FUNCTION LIST:

        */

		keyboard: null,
		bullet: null,
		scoreboard: null,

		gameOver: false,
		paused: true,
		started: false,

		score: 0, goal: 10,
		time: 20, timeGameStart: 20, startTime: 3,
		shots: 0, 

		// calc on game over
		accuracy: 0,
		rating: '', ratingNum: 0,
		isWin: false,

		answerSetID: 0,
		answerSet: [],
		puzzle: null, puzzleID: 0,
		
		init: function(x, y, settings){
			this.dbSprite = ig.game.spawnEntity(EntityDbSprite, -100, -100, {mG:this});

			this.contUI = ig.game.spawnEntity(EntityUiControl, -100, -100, {mG:this});

			this.bg = ig.game.spawnEntity(EntityBg, -100, -100, {mG:this, set: 'game'});

			this.answerSetID = this.load_data ('answer-set');
			this.answerSet = STRINGS ['puzzle'] [this.answerSetID];

			if (ig.ua.mobile) {
				this.keyboard = ig.game.spawnEntity(EntityKeypad, 0, 1000, {mG:this});
				this.bullet = ig.game.spawnEntity(EntityBullet, 195, 700, {mG:this});
				this.scoreboard = ig.game.spawnEntity(EntityScoreboard, 69, 200, {mG:this});

				this.puzzle = ig.game.spawnEntity(EntityPuzzle, 150, 300, {mG:this});
			} else {
				this.bullet = ig.game.spawnEntity(EntityBullet, 475, 500, {mG:this});
				this.scoreboard = ig.game.spawnEntity(EntityScoreboard, 349, 56, {mG:this});

				this.puzzle = ig.game.spawnEntity(EntityPuzzle, 430, 150, {mG:this});
			}

			// Keyboard input
			window.addEventListener("keydown", this.keydown.bind(this));

			this.parent(x,y,settings);
		},

		update: function (){
			if (this.startTime > -1) {
				this.startTime -= ig.system.tick;

				if (this.startTime <= 0 && !this.started){
					this.start_game ();
				}
			}

			if (!this.paused) {
				this.time -= ig.system.tick;

				if (this.time <= 0) {
					this.lose ();
				}
			}

			this.parent ();
		},

		start_game: function (){
			this.started = true;
			this.paused = false;
			this.set_puzzle ();
			this.bullet.reset_txt ();
		},

		set_puzzle: function (){
			this.puzzleID = this.random (0, this.answerSet.length - 1);
			var _img = 'puzzle-' + this.answerSetID + '-' + this.puzzleID,
				_ans = STRINGS ['puzzle'] [this.answerSetID] [this.puzzleID];

			this.puzzle.set_puzzle (_img, _ans);
		},

		check_answer: function (){
			if (this.bullet.txt == this.puzzle.answer) {
				this.set_puzzle ();

				this.score++;
				if (this.score >= this.goal) {
					this.win ();
				}
			} else {

			}
		},

		win: function (){
			this.isWin = true;

			this.set_game_over ();
			this.contUI.show_popup_result (true);
		},

		lose: function (){
			this.isWin = false;

			this.set_game_over ();
			this.contUI.show_popup_result (false);
		},

		set_game_over: function (){
			this.accuracy = Math.floor((this.score / this.shots) * 100);
			this.ratingNum = this.calc_rating ();

			if (this.ratingNum > 80) 			this.rating = 0;
			else if (this.ratingNum > 60)		this.rating = 1;
			else if (this.ratingNum > 40)		this.rating = 2;
			else if (this.isWin)				this.rating = 3;
			else this.rating = 4;

			this.gameOver = true;
			this.paused = true;
			this.puzzle.set_puzzle ('puzzle-none', '_ans');
		},

		calc_rating: function (){
			if (!this.isWin) return 0;
			
			var _rating = 0;

			var _time = 0;
			_time = Math.floor ((this.time / (this.timeGameStart - this.timeGameStart * 0.1)) * 100);
			
			_rating = Math.floor (((_time + this.accuracy) / 200) * 100);
			return _rating;
		},

		pause_game: function (){
			this.paused = true;
		},
		
		keydown: function (ev) {
			var c = ev.which;
			
			if ((c >= 64 && c <= 90) || c == 8 || c== 37 || c == 38 || c == 39 || c == 40) {
				//this.table.keyDown(ev.key);
				this.bullet.input_key (ev.key.toUpperCase ());
			}else{
				return;
			}

			// REQUIRED - important!!!
			ev.stopPropagation();
			ev.preventDefault();
		},
		
		keydown_mobile: function(letter){
			this.bullet.input_key (letter);
		},
	});
});
