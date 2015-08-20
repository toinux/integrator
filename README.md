# Integrator

## Pré-requis
- [nodejs](https://nodejs.org/)
- [git](https://git-scm.com) (bower s'en sert pour télécharder les paquets).

## Installation
```Shell
# Avant de lancer l'installation, paraméter la variable d'environnement si besoin
set HTTP_PROXY=http://host:port

npm install -g grunt-cli
npm install -g bower
npm install
bower install
```
## Customisation

Il suffit de créer un fichier `config.json` (on peut utiliser `config.json.sample`) et de le compléter avec les valeurs qui prendront le dessus par rapport à celles définies dans `Gruntfile.js`, par exemple :
```json
{
	"cfg" : {
		"sass" : "repertoire_sass",
		"css" : "repertoire_css",
		"site" : "http://www.foo.bar"
	},
	"sass" : {
		"options" : {
			"outputStyle" : "nested",
			"sourceMap": true
		}
	},
	"express" : {
		"options" : {
			"port" : 8888
		}
	}
}
```

Les paramètres de la catégorie `cfg` sont un peu plus spécifiques :
- sass : répertoire des fichiers sass source
- css : répertoire où seront compilés les fichiers css (et source maps)
- site : url du site à tester avec [browser sync](http://www.browsersync.io/)

## Exécution

	grunt [task] --sass=<sass_directory> --css=<css_directory> [--site=<site_url>]

> les paramètres sass, css et site peuvent être déclarés dans `config.json`

## Tâches

### sass
Compile les fichiers sass

### watch
Surveille les modifications des fichiers sass et les recompiles automatiquement
> tâche par defaut, pas la peine de la spécifier, on peut juste taper `grunt`

### serve
Pareil que *watch*, mais démare un serveur http local.

### postcss
[Postprocess](https://github.com/nDmitry/grunt-postcss) des css, ainsi que leurs sourceMap respectifs.
On peut paramétrer la version des navigateurs utilisé par l'[autoprefixer](https://github.com/postcss/autoprefixer) en créant un fichier `browserslist` (on peut utiliser `browserlist.sample`).
Pour la syntaxe du fichier `browserslist`, voir la [liste des browsers supportés](https://github.com/ai/browserslist).
