require('lib/require_patch').monkeypatch(this);

var TestWindow = require('TestWindow');

var WindowModule = new TestWindow({
	backgroundColor: "black"
});
WindowModule.addEventListener("open", openedHereToo);
WindowModule.addEventListener('clickedOnInternal', setPwnage);
WindowModule.build();
WindowModule.open();


function openedHereToo(e){
	Ti.API.info("Seems like a reasonable pattern")
	WindowModule.confirmCommunication("Hi in there.")
};

function setPwnage(e){
	var subWindow = new TestWindow({
		backgroundColor: "blue"
	});
	subWindow.build();
	subWindow.open();
	WindowModule.pwnage = "Muahahahahahahahahahaha!!!!"
}
//unfortunately i think its kinda stupid to do it this way.

