ig.module(
	'plugins.word-wrapper'
)
.requires(
	'impact.entity'
)
.defines(function() {
	ig.Entity.prototype.word_wrapper = function(_text, _ctx, _font, _fillStyle, _textAlign, _x, _y, _h, _xCharLim) {
		var texts = [], _newTxt = '';
			
		for (var i = 0; i < _text.length; i++) {
			_newTxt += _text [i];
			
			if (_newTxt.length > _xCharLim) {
				texts.push (_newTxt);
				_newTxt = '';
			}
		}
		texts.push (_newTxt);
		
		return texts;
	};
});