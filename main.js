var team={}







function checkBuildings(){
	const frame=createFrame("https://www.neuronball.com/es/headquarters/");
	const buildings=frame.contentWindow.buildings;
	
	const building=buildings.find(e=>e.progress);
	if(building){
		const buildingEnd=building.progress.end_time-Math.floor(Date.now()/1000);
	}else{
		const x=buildings.find(e=>e.price<=team.credits);
		if(x){
			//mejorar edificio
		}
	
	const ca=frame.contentWindow.ca
	const plantFusion=(86400/buildings.find(e=>e.slug="power-plant").level)*(1-(ca/40));
	//	con  frame.contentWindow.get_charges() haces post a las cargas
	
	
	// cuando hacer siguiente revisión:
	 //	buildingEnd
	 //	plantFusion
}








function updateData(){
	const r=await fetch("https://www.neuronball.com/es/aj/team/",{});
	const x=await r.json()
	team=x
	// si hay notificaciones, actuar
}

function getNetifications(){ 
	const r=await fetch("https://www.neuronball.com/es/aj/team/gamenotifications/",{});
	const x=await r.json()
	unread=x.findAll(e=>!e.read)
	if(unread)
		cuack()
	//x.type=="matchplanned"
}
setInterval(updateData,15000);




quacks=[];
for(let i=6;i>0;i--)
	quacks.push(new Audio("https://sorgindigitala.github.io/stream-twitch-utils/assets/audios/cats/cat"+i+".mp3"));
function cuack(){
	quacks[Math.floor(Math.random()*(1-5)+5)].play();
}


function createFrame(url){
	return createElement("frame",{src:url,width:1,height:1},site)
}

function createElement(type,attrs={},parent=null){
	const e=document.createElement(type);
	Object.entries(attrs).forEach(([k,v])=>e[k]=v);
	parent && parent.append(e);
	return e;
}