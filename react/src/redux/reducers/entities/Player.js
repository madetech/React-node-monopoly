class Player {
	constructor(name, color, type){
		this.name = name;
		this.color = color;
		this.position = 0;
		this.money = 1500;
		this.creditor = -1;
		this.jail = false;
		this.jailroll = 0;
		this.communityChestJailCard = false;
		this.chanceJailCard = false;
		this.bidding = true;
		this.human = true;
	}
}

export  { Player };