class Square {
	constructor({name, pricetext, color, price, groupNumber, baserent, rent1, rent2, rent3, rent4, rent5, owner, group}) {
<<<<<<< HEAD:src/redux/reducers/entities/Square.js
=======
		console.log('owner',owner)
>>>>>>> 0d6c6226f9b058493cde3ec406db9949e1d3de76:react/src/redux/reducers/entities/Square.js
		groupNumber = parseInt(groupNumber);
		this.name = name;
		this.pricetext = pricetext;
		this.color = color;
<<<<<<< HEAD:src/redux/reducers/entities/Square.js
		this.owner = owner > -1 ? owner : -1;
=======
		this.owner = owner || -1;
>>>>>>> 0d6c6226f9b058493cde3ec406db9949e1d3de76:react/src/redux/reducers/entities/Square.js
		this.mortgage = false;
		this.house = 0;
		this.hotel = 0;
		this.groupNumber = groupNumber || 0;
		this.price = (price || 0);
		this.baserent = (baserent || 0);
		this.rent1 = (rent1 || 0);
		this.rent2 = (rent2 || 0);
		this.rent3 = (rent3 || 0);
		this.rent4 = (rent4 || 0);
		this.rent5 = (rent5 || 0);
		this.landcount = 0;
		this.group = group || 0;

		if (groupNumber === 3 || groupNumber === 4) {
			this.houseprice = 50;
		} else if (groupNumber === 5 || groupNumber === 6) {
			this.houseprice = 100;
		} else if (groupNumber === 7 || groupNumber === 8) {
			this.houseprice = 150;
		} else if (groupNumber === 9 || groupNumber === 10) {
			this.houseprice = 200;
		} else {
			this.houseprice = 0;
		}
	}
}

export  { Square };