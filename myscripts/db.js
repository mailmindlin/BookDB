var Database = function(){
	var mydb=false;
};
 
Database.prototype.initDB = function() {
	try {
		if (!window.openDatabase) {
			alert('not supported');
		} else {
			var shortName = 'sampledatabase';
			var version = '1.0';
			var displayName = 'Sample Database';
			var maxSize = 65536; // in bytes
			this.mydb = openDatabase(shortName, version, displayName, maxSize);
		}
	} catch(e) {}
};

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

Database.prototype.query = function (str, callback) {
	this.mydb.transaction(function(transaction){callback(transaction.executeSql(str));});
};
