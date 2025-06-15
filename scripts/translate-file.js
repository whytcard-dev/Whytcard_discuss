const fs = require('fs').promises;
const path = require('path');
const { Translate } = require('@google-cloud/translate').v2;

// Configuration
const SOURCE_LANG = 'en';
const SOURCE_DIR = path.join(__dirname, '..', 'EN');
const TARGET_LANGS = [
  'fr', 'es', 'de', 'zh', 'ja', 'ru', 
  'pt', 'it', 'nl', 'ar', 'ko', 'tr', 
  'pl', 'sv', 'vi', 'th', 'id', 'uk'
];

const LANG_DIRS = {
  'fr': path.join(__dirname, '..', 'FR'),
  'es': path.join(__dirname, '..', 'ES'),
  'de': path.join(__dirname, '..', 'DE'),
  'zh': path.join(__dirname, '..', 'ZH'),
  'ja': path.join(__dirname, '..', 'JA'),
  'ru': path.join(__dirname, '..', 'RU'),
  'pt': path.join(__dirname, '..', 'PT'),
  'it': path.join(__dirname, '..', 'IT'),
  'nl': path.join(__dirname, '..', 'NL'),
  'ar': path.join(__dirname, '..', 'AR'),
  'ko': path.join(__dirname, '..', 'KO'),
  'tr': path.join(__dirname, '..', 'TR'),
  'pl': path.join(__dirname, '..', 'PL'),
  'sv': path.join(__dirname, '..', 'SV'),
  'vi': path.join(__dirname, '..', 'VI'),
  'th': path.join(__dirname, '..', 'TH'),
  'id': path.join(__dirname, '..', 'ID'),
  'uk': path.join(__dirname, '..', 'UK')
};

// Initialiser le client de traduction avec la clé API
const translate = new Translate({
  key: process.env.GOOGLE_API_KEY || 'AIzaSyCqo3BInTa0wxBfPM4wn5lvRaJGKglJOHo',
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'lucid-timing-462919'
});

// Fonction pour traduire un fichier spécifique
async function translateFile(filePath) {
  // Vérifier si le fichier existe
  try {
    await fs.access(filePath);
  } catch (error) {
    console.error(`Le fichier ${filePath} n'existe pas.`);
    return;
  }

  // Vérifier si le fichier est dans le répertoire source
  if (!filePath.startsWith(SOURCE_DIR)) {
    console.error(`Le fichier ${filePath} n'est pas dans le répertoire source ${SOURCE_DIR}.`);
    return;
  }

  console.log(`Traduction du fichier: ${filePath}`);
  
  // Lire le contenu du fichier
  const content = await fs.readFile(filePath, 'utf8');
  
  // Extraire le chemin relatif par rapport au répertoire source
  const relativePath = path.relative(SOURCE_DIR, filePath);
  
  // Traduire le contenu pour chaque langue cible
  for (const targetLang of TARGET_LANGS) {
    try {
      console.log(`  -> Traduction en ${targetLang}...`);
      
      // Traduire le contenu
      const [translation] = await translate.translate(content, {
        from: SOURCE_LANG,
        to: targetLang
      });
      
      // Créer le répertoire cible si nécessaire
      const targetDir = path.dirname(path.join(LANG_DIRS[targetLang], relativePath));
      await fs.mkdir(targetDir, { recursive: true });
      
      // Écrire le fichier traduit
      await fs.writeFile(path.join(LANG_DIRS[targetLang], relativePath), translation);
      
      console.log(`  -> Traduction en ${targetLang} terminée`);
    } catch (error) {
      console.error(`Erreur lors de la traduction en ${targetLang}:`, error);
    }
  }
}

// Fonction principale
async function main() {
  // Récupérer le chemin du fichier à partir des arguments
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('Veuillez spécifier un fichier à traduire.');
    console.error('Usage: node translate-file.js <chemin_du_fichier>');
    return;
  }
  
  // Résoudre le chemin absolu
  const absolutePath = path.resolve(filePath);
  
  try {
    await translateFile(absolutePath);
    console.log('Traduction terminée');
  } catch (error) {
    console.error('Erreur:', error);
  }
}

main(); 