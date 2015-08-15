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
		"dst" : "repertoire_css"
	},
	"sass" : {
		"options" : {
			"outputStyle" : "nested",
			"sourceMap": true
		}
	},
	"express" : {
		"options" : {
			"port" : 8888,
			"args" : ["http://www.foo.bar"]
		}
	}
}
```

## Exécution

	grunt [task] --src=<sass_directory> --dst=<css_directory>

> les paramètres src et dst peuvent être déclarés dans `config.json`

## Tâches

### sass
Compile les fichiers sass

### default
Surveille les modifications des fichiers sass et les recompiles automatiquement
> tâche par defaut, pas la peine de la spécifier, on peut juste taper `grunt`

### serve
Pareil que *default*, mais démare un serveur http local.

### cssmin
Minifie les css du répertoire de destination, ainsi que leurs sourceMap respectifs
