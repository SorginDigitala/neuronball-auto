const options={
	market:{
		on:false,
		minLevel:17,
		maxPrice:4000,
		autobuy:false
	},
	buildings:{
		autoCollect:true,
		priority:["research-center","playfield","locker-room","bleachers"],//,"factory","power-plant","Maintenance Center"
		nPriority:[1,0], // 0=standar, 1=flex...
	}
	
}



var team={};

gping=null;//cancelamos las notificaciones.
set_progress=set_neuron_progress=null// cancelamos recarga de página en /headquarters/

const path=document.querySelector("script[src]:last-of-type")?.src.split("/").slice(0,-1).join("/");



// [{"id":112085,"x":0.9,"y":0.7142857142857143},{"id":1381787,"x":0,"y":1},{"id":1380815,"x":1,"y":0.5},{"id":1382468,"x":0,"y":0},{"id":1380958,"x":0.9,"y":0.285714285714}]

var html=`
<style>
#container{
	display:flex;
	flex-direction:column;
	gap:10px;
	height:100%;
	width:100%;
	max-width:1200px;
	min-height:100vh;
	background:#fff;
	margin:auto;
}

#top_panel{
	display:flex;
	width:100%;
	text-align:center;
	height:40px;
	line-height:40px;
	font-size:20px;
	font-weight: bold;
	background:#000;
	color: white;
}

.locked #top_panel{background:red}

#top_panel>div{
	width: 100%;
}

.details{
	width:100%;
}
.details>div{
	min-height:300px;
	width:100%;
}


</style>

<div id="container">
	<div id="top_panel">
		<div>elo: <span id="elo"></span></div>
		<div>credits: <span id="credits"></span></div>
		<div id="building">
			<div>Edificio gordo</div>
			<div style="width:90%;background:blue;height:20px">14:17:44</div>
		</div>
		<div id="neuron">
			<div>Flex</div>
			<div style="width:90%;background:blue;height:20px">14:17:44</div>
		</div>
	</div>

	<div id="match"></div>

	<details class="details">
		<summary>Config</summary>
		<div id="config">
			<label><input type=checkbox data-autocollect> Auto-collect charges.</label>
		
		
		<a href="https://neuronball.freeforums.net/thread/140/hq-prices-construction-times" target=_blank>Construction info</a>
		</div>
	</details>


	<details class="details" open>
		<summary>Team</summary>
		<div id="team"></div>
	</details>


	<details class="details">
		<summary>Log</summary>
		<div id="log"></div>
	</details>
</div>
`;

Start();


async function Start(){
	if(!location.hostname.endsWith("neuronball.com")){
		location="//www.neuronball.com"
		return
	}
	load_script("Headquarters");
	load_script("Players");
	load_script("Market");
	
	document.body.innerHTML=html;
	//document.body.innerHTML=await _fetch("template.html").then((response)=>{return response.text()})
	await updateData();
	setInterval(updateData,15000);
	new Headquarters();
	new Market();
}





function Log(msg){
	// pintar en el panel
	console.log(msg)
}

async function updateData(){
	const r=await fetch("https://www.neuronball.com/es/aj/team/",{});
	const x=await r.json()
	team=x
	elo.innerText		=team.elo
	credits.innerText	=team.credits
	container.classList.toggle("locked",team.locked)
	if(team.notifications){
		Log("Notificaciones: "+team.notifications)
		// si hay notificaciones, getNotifications()
	}
}

async function getNotifications(){ 
	const r=await fetch("https://www.neuronball.com/es/aj/team/gamenotifications/",{});
	const x=await r.json()
	unread=x.findAll(e=>!e.read)
	if(unread)
		cuack()
	//x.type=="matchplanned"
}




quacks=[];
for(let i=6;i>0;i--)
	quacks.push(new Audio("https://sorgindigitala.github.io/stream-twitch-utils/assets/audios/cats/cat"+i+".mp3"));
function cuack(){
	quacks[Math.floor(Math.random()*(1-5)+5)].play();
}


function createElement(type,attrs={},parent=null){
	const e=document.createElement(type);
	Object.entries(attrs).forEach(([k,v])=>e[k]=v);
	parent && parent.append(e);
	return e;
}