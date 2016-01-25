var moment = require('moment');
var _ = require('underscore');
var Chance = require('chance'),
		chance = new Chance();
		
var users = [];

function User(id, name, age, createdAt, updatedAt) {
	this.id = id;
	this.name = name;
	this.age = age;
	this.createdAt = createdAt;
	this.updatedAt = updatedAt;
}

list = function(req, res) {
	res.json(users);
}

create = function(req, res) {
	var user, now, id;
	id = chance.hash({ length: 6 });
	now = moment().format('DD MMMM YYYY, HH:mm:ss');
	if(req.body.name == undefined||req.body.age == undefined){
		res.json({'error':'valur is null'});
	}
	else{
		user = new User(id, req.body.name, req.body.age, now, now);
		users.push(user);
	
		res.json(user);
	}
	
}

update = function(req, res) {
	var user, id, newName, newAge, updateTime, userToUpdate;
	
	id = req.body.id;
	userToUpdate = _.find(users, function(user) { 
		return user.id === id;
	});
	
	console.log(userToUpdate);
	
	newName = (req.body.newName != undefined) ? req.body.newName : userToUpdate.name;
	newAge = (req.body.newAge != undefined) ? req.body.newAge : userToUpdate.age;
	updateTime = moment().format('DD MMMM YYYY, HH:mm:ss');
	
	updateIndex = users.indexOf(userToUpdate);
	
	if (updateIndex == -1) {
		res.json(new Error('User not Found!'));
	} else {
		users[updateIndex] = new User(userToUpdate.id, newName, newAge, userToUpdate.createdAt, updateTime);
		res.json({ status: 'success', message: 'UserID ' + userToUpdate.id + ' has been updated'});
	}
}

erase = function(req, res) {
	var id, oldSize;
	id = req.body.id;
		
	oldSize = users.length;
	users = _.filter(users, function(user) {
		return user.id !== id;
	});
		
	if (users.length == oldSize) {
		res.json(new Error('User not Found!'));
	} else {
		res.json({ status: 'success', message: 'UserID ' + id + ' has been deleted'});
	}
}

module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.erase = erase;