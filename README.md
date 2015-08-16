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
		"src" : "repertoire_sass",
		"dst" : "repertoire_css",
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

## Exécution

	grunt [task] --src=<sass_directory> --dst=<css_directory> [--site=<site_url>]

> les paramètres src, dst et site peuvent être déclarés dans `config.json`

## Tâches

### sass
Compile les fichiers sass

### watch
Surveille les modifications des fichiers sass et les recompiles automatiquement
> tâche par defaut, pas la peine de la spécifier, on peut juste taper `grunt`

### serve
Pareil que *watch*, mais démare un serveur http local.

### postcss
Postprocess des css, ainsi que leurs sourceMap respectifs
