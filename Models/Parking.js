function Parking (name, description, available, capacity) {
	this.name = name;
	this.description = description;
	this.available = available;
	this.capacity = capacity;
}

Parking.prototype.toString = function toString () {
	return this.description;
};