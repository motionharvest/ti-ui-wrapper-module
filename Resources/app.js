require('lib/require_patch').monkeypatch(this);

var Window = require('lib/Window');

/*
 * 
 */
var mainWindow = new Window({
	backgroundColor: 'black'
});
mainWindow.addEventListener('open', openedHereToo);
mainWindow.addEventListener('action', respondToAction);
mainWindow.open();


function openedHereToo(e){
	Ti.API.info('Seems like a reasonable pattern')
};

function respondToAction(e){
	var subWindow = new Window({
		backgroundColor: 'blue'
	});
	subWindow.open();
	subWindow.customProperty = 'Muahahahahahahahahahaha!!!!';

}

