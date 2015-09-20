"use strict";

var konami = new function() {

	var ran = false, counter = 0, options = new Object;

	var merge = function(obj1, obj2) {
		for (var attr in obj2) obj1[attr] = obj2[attr];
		return obj1;
	};

	var initOptions = function() {
		return {
			repeat: 0, // 0 = infinite, must be positive or null
			pattern: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A
		};
	};

	this.watch = function(o) {

		if (!ran) {
			options = initOptions();
			if (o) merge(options, o);
			options.counter = 0;
		} else {
			console.error("[parnissolle/konami] https://github.com/parnissolle/konami\nYou already ran an instance of Konami.");
		}

		return this;
	};

	this.then = function(callback) {

		if (!ran) {
			if (Object.keys(options).length == 0) {
				console.error("[parnissolle/konami] https://github.com/parnissolle/konami\nYou must run an instance of Konami (like that : \"konami.watch();\") before to use \"konami.then();\"!");
				return this;
			}
			ran = true;
			window.addEventListener("keyup", function(e) {
				var key = e.keyCode || e.which;
				if (key === options.pattern[options.counter++]) {
					if (options.counter === options.pattern.length) {
						counter++;
						callback({
							date: new Date,
							counter: counter
						});
						options.counter = 0;
					}
				} else {
					options.counter = 0;
				}
			});
		}

		return this;

	};

};