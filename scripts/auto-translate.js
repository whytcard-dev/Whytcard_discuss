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
]; // Français, Espagnol, Allemand, Chinois, Japonais, Russe, Portugais, Italien, Néerlandais, Arabe, Coréen, Turc, Polonais, Suédois, Vietnamien, Thaï, Indonésien, Ukrainien

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

// Fonction pour créer les répertoires cibles s'ils n'existent pas
async function createTargetDirs() {
  for (const lang of Object.keys(LANG_DIRS)) {
    await fs.mkdir(LANG_DIRS[lang], { recursive: true });
  }
}

// Fonction pour obtenir tous les fichiers markdown dans un répertoire et ses sous-répertoires
async function getMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath);
    } else if (entry.name.endsWith('.md')) {
      return [fullPath];
    } else {
      return [];
    }
  }));
  
  return files.flat();
}

// Fonction pour traduire un fichier markdown
async function translateFile(filePath) {
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
  try {
    // Créer les répertoires cibles
    await createTargetDirs();
    
    // Obtenir tous les fichiers markdown dans le répertoire source
    const markdownFiles = await getMarkdownFiles(SOURCE_DIR);
    
    console.log(`${markdownFiles.length} fichiers markdown trouvés`);
    
    // Traduire chaque fichier
    for (const file of markdownFiles) {
      await translateFile(file);
    }
    
    console.log('Traduction terminée');
  } catch (error) {
    console.error('Erreur:', error);
  }
}

main(); 