document.addEventListener('load',function() {
	window['RemoteGetter'] = function(url, callback) {
		var self = Object.create(null);
		
	};

	
	function parseDB(file) {
		var lines = file.split('\n');
		for(var i=0;i<lines.length;i++) {
			
		}
	}
	new RemoteGetter("https://rawgit.com/mailmindlin/BookDB/master/files.ref", function(result) {
		//parse file
		var urls = result.split('\n');
		window['bookDB']={};
		for(var url in urls) {
			
		}
	};);
	
},false);
