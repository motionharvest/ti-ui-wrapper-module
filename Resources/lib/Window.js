exports.Window = function( options ){
	//private variables
	var _module = {},
		_evts = {},
		_MasterWindow = Ti.UI.createWindow( options );
	
	var _privateVariable,
		_simpleView;
		
	//private methods
	function dispatchEvent(evt, out){
		if(_evts.hasOwnProperty(evt)){
			for(var i in _evts[evt]){
				_evts[evt][i]({'target':_module, 'data': out});
			}
		}
	}
	//build
	function init(){
		_simpleView = Ti.UI.createView({
			width: 150, height: 50,
			backgroundColor: "orange"
		});
		_simpleView.addEventListener("click", goDeeper);
		_MasterWindow.add(_simpleView);
	}
	
	//respond to click on _simpleView 
	function goDeeper(e){
		Ti.API.info("Internal communication.");
		dispatchEvent("action");
	}
	
	//badass shit right here
	//http://ejohn.org/blog/ecmascript-5-objects-and-properties/
	Object.defineProperties(_module, {
		'addEventListener': {
			value: function(evt, callback){
				if(!_evts.hasOwnProperty(evt)){
					_evts[evt] = [];
				};
				_evts[evt].push(callback);
			}
		},
		'open': {
			value: function(){
				_MasterWindow.addEventListener('open', function(){
					dispatchEvent('open');
				});
				_MasterWindow.open();
			}
		},
		'customProperty': {
			get: function(){
				return _privateVariable;
			},
			set: function(val){
				Ti.API.info("_privateVariable has been set to:" + val);
				_privateVariable = val;
			}
		}
	});

	//init, if you have some building to do
	init();
	
	return _module;
};

