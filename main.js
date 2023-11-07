gping=null;//cancelamos las notificaciones.
const path= document.querySelector("script[src]:last-of-type")?.src.split("/").slice(0,-1).join("/")+"/";

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
	height:30px;
	line-height:30px;
	font-size:25px;
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
		<div>locked: <span id="locked"></span></div>
	</div>

	<div id="match"></div>

	<details class="details">
		<summary>Config</summary>
		<div id="config">
		
		
		<a href="https://neuronball.freeforums.net/thread/140/hq-prices-construction-times" target=_blank>Construction info</a>
		</div>
	</details>


	<details class="details" open>
		<summary>Team</summary>
		<div id="team"></div>
	</details>


	<details class="details">
		<summary>Headquarters</summary>
		<div id="headquarters"></div>
	</details>


	<details class="details">
		<summary>Log</summary>
		<div id="log"></div>
	</details>
</div>
`;


var team={};
const buildingOrder=["bleachers","research-center","playfield","factory","power-plant","Maintenance Center","locker-room"];
const neuronOrder=[0]; // 0=standar, 1=flex...



async function Start(){
	if(!location.hostname.endsWith("neuronball.com")){
		location="//www.neuronball.com"
		return
	}
	// get html
	document.body.innerHTML=html;
	await updateData();
	setInterval(updateData,15000);
	checkBuildings();
}
Start();



function checkBuildings(){
	const frame=createFrame("https://www.neuronball.com/es/headquarters/");
	frame.onload=e=>{
		const f=frame.contentWindow;
		buildings=f.buildings;
		let buildingEnd=0;

		// fusion charges
		//const plantFusion=(86400/buildings.find(e=>e.slug="power-plant").level)*(1-(f.ca/40));
		if(f.document.querySelector(".btn.btn-charges"))
			f.get_charges()

		//	buildings
		const building=buildings.find(e=>e.progress);
		if(building){
			buildingEnd=building.progress.end_time-Math.floor(Date.now()/1000);
		}else{
			buildingOrder.find(e=>{
				const x=buildings.find(i=>e==i.slug)
				if(x & x.price<=team.credits){
				f.document.querySelector("[data-url=\"/es/aj/build/building/"+x.slug+"/\"]").click()
				// buildingEnd=x.time;
					const days=x.time/86400;
					for(;days-->0;)
						setTimeout(()=>{
							f.document.querySelector(".speedup-building").click()
						},days*2000);
				 return true;
				}
				return false;
			})
		}

		//	neurons
		const neuronlist=f.neuronlist;
		const neuron=f.document.querySelector("#neuroninfo button.buildneuron-btn");
		if(neuron){
			neuronOrder.find(e=>{
				const x=neuronlist.find(i=>e==i.id)
				if(x.price<=team.credits){
					neuron_selector.value=e;
					neuron.click();
					for(;e-->0;)
						setTimeout(()=>{
							f.document.querySelector(".speedup-neuron").click()
						},e*2000);
				 return true;
				}
				return false;
			})
		}
		
		setTimeout(checkBuildings,Math.min(5*3600,buildingEnd)*1000)
	}
}







async function updateData(){
	const r=await fetch("https://www.neuronball.com/es/aj/team/",{});
	const x=await r.json()
	team=x
	elo.innerText		=team.elo
	credits.innerText	=team.credits
	locked.innerText	=team.locked
	container.classList.toggle("locked",team.locked)
	if(team.notifications){
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


function createFrame(url){
	return createElement("frame",{src:url,width:1,height:1},site)
}

function createElement(type,attrs={},parent=null){
	const e=document.createElement(type);
	Object.entries(attrs).forEach(([k,v])=>e[k]=v);
	parent && parent.append(e);
	return e;
}