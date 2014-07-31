/**
 * Usage:
 * 0. Place this file in the root of your project
 * 1. Add the js files to your project (in the js folder)
 * 2. Install your project ( npm install )
 * 3. Run this file with node ( node create_tests_files.node.js )
 */

var walk = require( 'walk' ),
	mkpath = require('mkpath'),
	files = [],
	fs = require( 'fs' ),
	walker = walk.walk('./js', {
		followLinks: false
	});

walker.on('file', function(root, stat, next) {
	// Add this file to the list of files
	files.push({
		root: root,
		name: stat.name
	});

	next();
});

walker.on('end', function() {
	var htmlTestName,
		jsTestName,
		fileNameArray,
		folderBase,
		fileBase;
	for ( var i = 0; i < files.length; i++ ) {
		// fileNameArray = files[ i ]
		// fileNameArray = files[ i ].substring( 4, files[ i ].length - 3 );

		fileBase = files[ i ].name.substring( 0, files[ i ].name.length - 3 );
		htmlTestName = 'test.' + fileBase + '.html' ;
		jsTestName = 'test.' + fileBase + '.js' ;

		folderBase = files[ i ].root.substring( 4, files[ i ].length );


		mkpath.sync( './tests' + folderBase );

		fs.openSync( './tests' + folderBase + '/' + htmlTestName , 'a')
		fs.openSync( './tests' + folderBase + '/' + jsTestName , 'a')
	}
});