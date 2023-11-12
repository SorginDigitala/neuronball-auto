
class Market{
	constructor(){
		this.updateData()
		setInterval(this.updateData,20*1000);
	}

	async updateData(){
		const r=await fetch(
			"https://www.neuronball.com/es/aj/market/players/?start=0&num=15&price_min=100&price_max="+options.market.maxPrice+"&lvl_min="+options.market.minLevel
		).then(r=>r.json());
		if(r.length>0){
			console.log(r);
			cuack();
		}
	}
}