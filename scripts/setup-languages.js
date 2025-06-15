const fs = require('fs').promises;
const path = require('path');

// Configuration des langues
const LANGUAGES = {
  'FR': 'Français',
  'ES': 'Español',
  'DE': 'Deutsch',
  'ZH': '中文',
  'JA': '日本語',
  'RU': 'Русский',
  'PT': 'Português',
  'IT': 'Italiano',
  'NL': 'Nederlands',
  'AR': 'العربية',
  'KO': '한국어',
  'TR': 'Türkçe',
  'PL': 'Polski',
  'SV': 'Svenska',
  'VI': 'Tiếng Việt',
  'TH': 'ไทย',
  'ID': 'Bahasa Indonesia',
  'UK': 'Українська'
};

// Fonction pour créer les répertoires de langues
async function setupLanguageDirectories() {
  try {
    console.log('Création des répertoires de langues...');
    
    // Créer chaque répertoire de langue
    for (const [langCode, langName] of Object.entries(LANGUAGES)) {
      const langDir = path.join(__dirname, '..', langCode);
      
      try {
        // Vérifier si le répertoire existe déjà
        await fs.access(langDir);
        console.log(`Le répertoire ${langCode} existe déjà.`);
      } catch (error) {
        // Créer le répertoire s'il n'existe pas
        await fs.mkdir(langDir, { recursive: true });
        console.log(`Répertoire ${langCode} créé.`);
        
        // Créer un fichier README.md dans le répertoire
        const readmeContent = `# ${langName}\n\nCe répertoire contient les fichiers traduits en ${langName}.\n`;
        await fs.writeFile(path.join(langDir, 'README.md'), readmeContent);
        console.log(`Fichier README.md créé pour ${langCode}.`);
      }
    }
    
    // Mettre à jour le fichier Langues.md
    const languesContent = `# Langues disponibles\n\nCe projet est disponible dans les langues suivantes :\n\n${
      Object.entries(LANGUAGES)
        .map(([code, name]) => `- [${name}](/${code}/)`)
        .join('\n')
    }\n\nLes traductions sont générées automatiquement à partir des fichiers sources en anglais.\n`;
    
    await fs.writeFile(path.join(__dirname, '..', 'Langues.md'), languesContent);
    console.log('Fichier Langues.md mis à jour.');
    
    console.log('Configuration des langues terminée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la configuration des langues:', error);
  }
}

// Exécuter la fonction
setupLanguageDirectories(); 