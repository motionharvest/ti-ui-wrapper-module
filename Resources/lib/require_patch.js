/*
 * This monkeypatch method is from one of the Forging Titanium Videos
 * It makes is so that an exports property with the same name as the file name
 * is treated like the file's constructor
 * https://gist.github.com/1207520
 */
exports.monkeypatch = function(object) {
	var scriptRegistry = {},
		old_require = object.require;
	object.require = function(moduleName) {
		if (!scriptRegistry[moduleName]) {
			var mod = old_require(moduleName),
				moduleRoot = moduleName.split(/[\/ ]+/).pop();
			if (typeof(mod[moduleRoot]) === 'function') {
				scriptRegistry[moduleName] = mod[moduleRoot];
			}
			else {
				scriptRegistry[moduleName] = mod;
			}	
		}
		return scriptRegistry[moduleName];
	};
};