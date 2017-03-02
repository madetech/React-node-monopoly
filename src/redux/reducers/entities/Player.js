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

        this.pay = function (amount, creditor, updateMoney) {
            amount = parseInt(amount);
            if (amount <= this.money) {
                this.money -= amount;

                //updateMoney();

                return true;
            } else {
                this.money -= amount;
                this.creditor = creditor;

                //updateMoney();

                return false;
            }
        };

	}
}

export  { Player };