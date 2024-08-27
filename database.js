const dataStore = {};

const addToDatabase = (id, value) => {
	dataStore[id] = value;
};

const getFromDatabase = (id) => {
	return dataStore[id];
};

module.exports = { addToDatabase, getFromDatabase, dataStore };
