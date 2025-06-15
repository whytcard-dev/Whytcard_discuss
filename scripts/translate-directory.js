const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Configuration
const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyBj4z4bLx9bYZJjVRcI3S9OSzFnd7HWzmk';
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

// Fonction pour traduire un texte avec l'API Google Translate
async function translateText(text, targetLang) {
  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    const response = await axios.post(url, {
      q: text,
      source: SOURCE_LANG,
      target: targetLang,
      format: 'text'
    });
    
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Erreur de traduction:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
    throw error;
  }
}

// Fonction pour traduire un fichier
async function translateFile(filePath) {
  console.log(`Traduction du fichier: ${filePath}`);
  
  try {
    // Lire le contenu du fichier source
    const content = await fs.readFile(filePath, 'utf8');
    
    // Obtenir le chemin relatif par rapport au dossier source
    const relativePath = path.relative(SOURCE_DIR, filePath);
    
    // Traduire le contenu pour chaque langue cible
    for (const lang of TARGET_LANGS) {
      console.log(`  -> Traduction en ${lang}...`);
      
      try {
        // Traduire le contenu
        const translatedContent = await translateText(content, lang);
        
        // Créer le chemin du fichier cible
        const targetDir = path.dirname(path.join(LANG_DIRS[lang], relativePath));
        const targetPath = path.join(LANG_DIRS[lang], relativePath);
        
        // Créer le dossier cible s'il n'existe pas
        await fs.mkdir(targetDir, { recursive: true });
        
        // Écrire le contenu traduit dans le fichier cible
        await fs.writeFile(targetPath, translatedContent, 'utf8');
        
        console.log(`  -> Traduction en ${lang} terminée`);
        
        // Attendre un peu entre chaque traduction pour éviter les limites de l'API
        await sleep(500);
      } catch (error) {
        console.error(`  -> Erreur lors de la traduction en ${lang}: ${error.message}`);
      }
    }
    
    console.log('Traduction terminée');
  } catch (error) {
    console.error(`Erreur lors de la traduction du fichier ${filePath}: ${error.message}`);
  }
}

// Fonction pour traduire tous les fichiers d'un répertoire
async function translateDirectory(dirPath) {
  console.log(`Traduction du répertoire: ${dirPath}`);
  
  try {
    // Lire le contenu du répertoire
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    // Traiter chaque entrée
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Récursion pour les sous-répertoires
        await translateDirectory(entryPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Traduire les fichiers Markdown
        await translateFile(entryPath);
        
        // Attendre un peu entre chaque fichier pour éviter les limites de l'API
        await sleep(1000);
      }
    }
    
    console.log(`Traduction du répertoire ${dirPath} terminée`);
  } catch (error) {
    console.error(`Erreur lors de la traduction du répertoire ${dirPath}: ${error.message}`);
  }
}

// Fonction principale
async function main() {
  // Vérifier si un répertoire spécifique est fourni en argument
  const dirArg = process.argv[2];
  
  if (dirArg) {
    // Traduire un répertoire spécifique
    await translateDirectory(path.resolve(dirArg));
  } else {
    // Traduire tout le répertoire source par défaut
    await translateDirectory(SOURCE_DIR);
  }
}

// Exécuter la fonction principale
main().catch(error => {
  console.error('Erreur:', error);
  process.exit(1);
}); 