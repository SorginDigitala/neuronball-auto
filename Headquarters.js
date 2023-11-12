
class Headquarters{
	constructor(){
		this.options=options.buildings;
		this.frame=createElement("frame",{width:1,height:1},document.body);
		this.frame.onload=e=>{
			if(this.frame.src=="about:blank")
				return;

			const f=this.frame.contentWindow;
			const buildings=f.buildings;

			if(this.options.autoCollect && f.document.querySelector(".btn.btn-charges")){
				f.document.querySelector(".btn.btn-charges").click()
				//f.get_charges()
				Log("[Headquarters] Cargas rápidas recibidas.");
			}

			//	buildings
			const building=buildings.find(e=>e.progress);
			if(!building){
				this.options.priority.find(e=>{
					const x=buildings.find(i=>e==i.slug)
					if(x && x.price<=team.credits){
					f.document.querySelector("[data-url=\"/es/aj/build/building/"+x.slug+"/\"]").click()
						const days=parseInt(x.time/86400);
						Log("[Headquarters] Mejorando "+x.slug+" con "+days+" cargas.")
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
				this.options.nPriority.find(e=>{
					const x=neuronlist.find(i=>e==i.id)
					if(x && x.price<=team.credits){
						f.neuron_selector.value=e;
						neuron.click();
						for(;e-->0;)
							setTimeout(()=>{
								f.document.querySelector(".speedup-neuron").click()
							},e*2000);
						Log("[Headquarters] Creando "+x.name+".")
					}
				})
			}
			const next=Math.min(12*3600,this.getTime(f.p),this.getTime(f.np));
			Log("[Headquarters] Próxima comprobación: "+parseInt(next/3600)+":"+parseInt((next%3600)/60).toString().padStart(2,"0")+":"+(next%60).toString().padStart(2,"0")+".");
			setTimeout(()=>{this.updateData()},(next+2)*1000);
			this.frame.src="about:blank";
		}
		this.updateData();
	}

	updateData(){
		this.frame.src="https://www.neuronball.com/es/headquarters/";
	}

	getTime(x){
		return x.end_time-Math.floor(Date.now()/1000)
	}
}