
class Players{
	constructor(){
		this.frame=createElement("frame",{width:1,height:1},document.body);
		this.updateData();
	}

	updateData(){
		this.frame.src="https://www.neuronball.com/es/my-team/";
		this.frame.onload=e=>{

			const f=this.frame.contentWindow;
			const my_team=f.my_team;
			
			my_team.players.forEach(p=>{
				
			})
		}
	}
}