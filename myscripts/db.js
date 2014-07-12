var Database = function(name, description){
	var mydb=false;
	this.name = name;
	this.desc=description;
};
 
Database.prototype.initDB = function() {
	try {
		if (!window.openDatabase) {
			alert('not supported');
		} else {
			var shortName = this.name;
			var version = '1.0';
			var displayName = this.desc;
			var maxSize = 65536; // in bytes
			this.mydb = openDatabase(shortName, version, displayName, maxSize);
		}
	} catch(e) {}
};

Database.prototype.createTable = function() {
	try {
		this.mydb.transaction(
		  function(transaction) {
			//transaction.executeSql('DROP TABLE sample_db', [], this.nullDataHandler, this.errorHandler);
            transaction.executeSql("CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY ASC, Author STRING, Title STRING, Genre STRING)", [], this.nullDataHandler, this.errorHandler); 
          });
      } catch(e) {}
}

Database.prototype.errorHandler = function (transaction, error) { 
  // returns true to rollback the transaction
  alert("Error processing SQL: "+ error);
  return true;  
}

// null db data handler
Database.prototype.nullDataHandler = function (transaction, results) {
}

Database.prototype.saveData = function(name_field, interval) {
	try{
		this.mydb.transaction(
		  function(transaction) {
			transaction.executeSql("INSERT INTO sample_db (name_field, interval) VALUES (" + name_field + ", " + interval + ");", [], this.nullDataHandler, this.errorHandler);
		});
	} catch(e) {
		alert("Error processing SQL: "+ e.message);
		return;
	}
}

// Then we can easily make a new Database object and call the initDB method.
// load the currently selected icons
Database.prototype.loadData = function() {
	try {
		this.mydb.transaction(function(transaction) {
			transaction.executeSql("SELECT id,name_field,interval,date_added, strftime('%d', date_added) as day, strftime('%Y', date_added) as year, strftime('%w-%m-%Y', date_added) as formatted_date, strftime('%H:%M:%S', date_added) as time_added FROM sample_db ORDER BY date_added desc",[], this.resultSetHandler, this.errorHandler);
			});
	} catch(e) {
		alert(e.message);
	}
};
 
Database.prototype.resultSetHandler = function(transaction, results) {
// For now just outputting the results.
    console.log(results);
};

Database.prototype.query = function (query, params, callback) {
	this.mydb.transaction(function(transaction){transaction.executeSql(query, params, function(tx, res){callback(res);});});
};
