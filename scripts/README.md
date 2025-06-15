# Scripts d'Autotraduction

Ce répertoire contient les scripts utilisés pour le système d'autotraduction du projet Whytcard Discuss.

## Liste des scripts

- **auto-translate.js** : Script principal pour traduire tous les fichiers Markdown du répertoire EN vers toutes les langues cibles.
- **translate-file.js** : Script pour traduire un fichier spécifique vers toutes les langues cibles.
- **watch-and-translate.js** : Script pour surveiller les modifications de fichiers et déclencher automatiquement la traduction.
- **setup-languages.js** : Script pour configurer les répertoires de langues et mettre à jour le fichier Langues.md.

## Utilisation

### Traduire tous les fichiers

```bash
node auto-translate.js
```

### Traduire un fichier spécifique

```bash
node translate-file.js chemin/vers/fichier.md
```

### Surveiller les modifications et traduire automatiquement

```bash
node watch-and-translate.js
```

### Configurer les répertoires de langues

```bash
node setup-languages.js
```

## Configuration

Les scripts utilisent l'API Google Cloud Translation pour la traduction automatique. Vous devez configurer une clé d'API Google Cloud et définir la variable d'environnement `GOOGLE_APPLICATION_CREDENTIALS` pointant vers votre fichier de clé JSON.

## Dépendances

- **@google-cloud/translate** : Client pour l'API Google Cloud Translation.
- **chokidar** : Bibliothèque pour surveiller les modifications de fichiers.
- **fs** : Module Node.js pour les opérations de fichiers.
- **path** : Module Node.js pour la manipulation des chemins de fichiers. 