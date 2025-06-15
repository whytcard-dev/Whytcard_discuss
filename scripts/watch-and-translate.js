const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { spawn } = require('child_process');

// Configuration
const SOURCE_DIR = path.join(__dirname, '..', 'EN');
const IGNORE_PATTERNS = [
  '**/.git/**',
  '**/node_modules/**'
];

// Fonction pour exécuter le script de traduction pour un fichier spécifique
function translateFile(filePath) {
  console.log(`Fichier modifié détecté: ${filePath}`);
  
  // Ne traiter que les fichiers markdown
  if (!filePath.endsWith('.md')) {
    console.log('Pas un fichier markdown, ignoré.');
    return;
  }
  
  console.log(`Lancement de la traduction pour: ${filePath}`);
  
  // Exécuter le script de traduction avec le chemin du fichier comme argument
  const translateProcess = spawn('node', [path.join(__dirname, 'translate-file.js'), filePath], {
    stdio: 'inherit'
  });
  
  translateProcess.on('close', (code) => {
    if (code === 0) {
      console.log(`Traduction terminée pour: ${filePath}`);
    } else {
      console.error(`Erreur lors de la traduction pour: ${filePath} (code: ${code})`);
    }
  });
}

// Initialiser le watcher
console.log(`Surveillance du répertoire: ${SOURCE_DIR}`);
const watcher = chokidar.watch(SOURCE_DIR, {
  ignored: IGNORE_PATTERNS,
  persistent: true,
  ignoreInitial: true
});

// Événements à surveiller
watcher
  .on('add', filePath => translateFile(filePath))
  .on('change', filePath => translateFile(filePath))
  .on('ready', () => console.log('Surveillance initiale terminée. En attente de modifications...'))
  .on('error', error => console.error(`Erreur de surveillance: ${error}`));

console.log('Surveillance des fichiers démarrée. Appuyez sur Ctrl+C pour quitter.'); 