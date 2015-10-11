var _ = require('underscore');
var fs = require('fs');

module.exports = {

	makeLoaderFileByArray: function( path, infoArr ) {

		// id and modulePath keys must be included in obj in infoArr

		var contents = '// For maintenance as one source this file is made automatically when webpack is run, do not modify it directly!\n\n';
		contents += 'module.exports = {\n'; 

		_.each( infoArr, function( info, i ) {
			contents += ('\t'+info.id + ': require("'+info.modulePath+'")');
			if( i+1 < infoArr.length ) contents += ",\n";
			else contents += '\n';
		});

		contents += '};';

		fs.writeFileSync( path, contents );
	}
};
