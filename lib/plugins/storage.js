ig.module(
	'plugins.storage'
)
.requires(
	'impact.entity'
)
.defines(function() {
	/*
		v.1.1
	*/
	ig.Storage = ig.Class.extend ({
		
		storName: '',
		
		init: function (_storName){
			this.storName = _storName;
		},
		
		store_data: function(_key, _stor) {
			localStorage.setItem (this.storName + '_' + _key, _stor);
		},
		
		load_data: function(_key, _stor) {
			return localStorage.getItem (this.storName + '_' + _key);
		}
	});
	
	ig.Entity.prototype.store_data = function(_key, _stor) {
		localStorage.setItem (ig.game.storage.storName + '_' + _key, _stor);
	};
	
	ig.Entity.prototype.load_data = function(_key, _stor) {
		return localStorage.getItem (ig.game.storage.storName + '_' + _key);
	};

});