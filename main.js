var team={credits:0}
const buildingOrder=["bleachers","research-center","playfield","factory","power-plant","Maintenance Center","locker-room"]
const neuronOrder=[0] // 0=standar, 1=flex...

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
checkBuildings()







async function updateData(){
	const r=await fetch("https://www.neuronball.com/es/aj/team/",{});
	const x=await r.json()
	team=x
	// si hay notificaciones, actuar
}

async function getNetifications(){ 
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