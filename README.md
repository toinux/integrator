# Integrator

## Installation

	npm init
	This utility will walk you through creating a package.json file.
	It only covers the most common items, and tries to guess sensible defaults.

	See `npm help json` for definitive documentation on these fields
	and exactly what they do.

	Use `npm install <pkg> --save` afterwards to install a package and
	save it as a dependency in the package.json file.

	Press ^C at any time to quit.
	name: (sass) integrator
	Sorry, name can only contain URL-friendly characters.
	name: (sass) integrator
	version: (1.0.0)
	description: Workflow sympa pour faire des CSS avec SWG
	entry point: (GruntFile.js)
	test command:
	git repository:
	keywords:
	author: Antoine Martin
	license: (ISC)
	About to write to C:\Users\toine\Desktop\sass\package.json:

	{
	  "name": "integrator",
	  "version": "1.0.0",
	  "description": "Workflow sympa pour faire des CSS avec SWG",
	  "main": "GruntFile.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "Antoine Martin",
	  "license": "ISC"
	}


	Is this ok? (yes) yes

ensuite, on rajoute le flag "private" au fichier `package.json` pour éviter de le publier par erreur avec les modules publics npm

	{
	  "name": "integrator",
	  "version": "1.0.0",
	  "description": "Workflow sympa pour faire des CSS avec SWG",
	  "main": "GruntFile.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "Antoine Martin",
	  "license": "ISC",
	  "private": true
	}

et on installe les dépendances

	npm install grunt --save-dev
	npm install grunt-sass --save-dev
	npm install grunt-contrib-watch --save-dev
	npm install grunt-sync --save-dev
	npm install grunt-contrib-cssmin --save-dev

