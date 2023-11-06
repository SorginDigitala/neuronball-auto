# neuronball-auto


```
javascript:(function(){
  window["auto"]=function(name){
    const x=document.createElement('script');
    x.setAttribute("type","text/javascript");
    x.setAttribute("src","https://sorgindigitala.github.io/neuronball-auto/main.js");
    document.querySelector("head").appendChild(x);
  };
  auto("main");
})();
```
