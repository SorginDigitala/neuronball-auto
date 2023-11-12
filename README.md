# neuronball-auto


```
javascript:(function(){
	const x=document.createElement('script');
	x.setAttribute("type","text/javascript");
	x.setAttribute("src","https://sorgindigitala.github.io/neuronball-auto/main.js");
	document.querySelector("head").appendChild(x);
})();


javascript:(function(){
	window["load_script"]=function(name){
		const x=document.createElement('script');
		x.setAttribute("type","text/javascript");
		x.setAttribute("src","https://sorgindigitala.github.io/neuronball-auto/"+name+".js");
		document.querySelector("head").appendChild(x);
	};
	window["_fetch"]=function(name){
		return fetch("https://sorgindigitala.github.io/neuronball-auto/"+name);
	};
	load_script("main");
})();


javascript:(function(){
	window["load_script"]=function(name){
		const x=document.createElement('script');
		x.setAttribute("type","text/javascript");
		x.setAttribute("src","https://localhost/_canvas/bot/"+name+".js");
		document.querySelector("head").appendChild(x);
	};
	window["_fetch"]=function(name){
		return fetch("https://localhost/_canvas/bot/"+name);
	};
	load_script("main");
})();
```
