#!/usr/bin/env node

/**
 * Script pour mettre à jour le repo WhytCard Discuss
 * Ce script effectue les actions suivantes :
 * 1. Met à jour les répertoires de langues
 * 2. Traduit tous les fichiers Markdown
 * 3. Optimise les fichiers pour GitHub
 * 4. Prépare les commits
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');

// Fonction pour exécuter une commande shell
function runCommand(command, options = {}) {
  console.log(`\n> ${command}\n`);
  return execSync(command, { 
    stdio: 'inherit', 
    cwd: options.cwd || ROOT_DIR,
    ...options 
  });
}

// Fonction pour demander confirmation
async function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(`${question} (y/n): `, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Fonction pour vérifier les dépendances
async function checkDependencies() {
  console.log('📋 Vérification des dépendances...');
  try {
    runCommand('npm --version', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ Node.js et npm doivent être installés. Veuillez les installer avant de continuer.');
    process.exit(1);
  }

  try {
    // Vérifier si les dépendances sont installées
    await fs.access(path.join(ROOT_DIR, 'node_modules'));
  } catch (error) {
    console.log('📦 Installation des dépendances...');
    runCommand('npm install');
  }
}

// Fonction pour configurer les répertoires de langues
async function setupLanguageDirectories() {
  console.log('🌐 Configuration des répertoires de langues...');
  runCommand('node scripts/setup-languages.js');
}

// Fonction pour traduire les fichiers
async function translateFiles() {
  console.log('🔄 Traduction des fichiers...');
  
  // Vérifier si la variable d'environnement GOOGLE_APPLICATION_CREDENTIALS est définie
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn('⚠️  La variable d\'environnement GOOGLE_APPLICATION_CREDENTIALS n\'est pas définie.');
    console.warn('⚠️  La traduction automatique ne fonctionnera pas sans les identifiants Google Cloud.');
    
    const proceed = await askConfirmation('Voulez-vous continuer sans traduction?');
    if (!proceed) {
      console.log('❌ Opération annulée.');
      process.exit(1);
    }
    return;
  }
  
  try {
    runCommand('npm run translate');
  } catch (error) {
    console.error('❌ Erreur lors de la traduction:', error);
  }
}

// Fonction pour optimiser les fichiers pour GitHub
async function optimizeForGitHub() {
  console.log('🔧 Optimisation des fichiers pour GitHub...');
  
  // Vérifier si le fichier README.md existe à la racine
  try {
    await fs.access(path.join(ROOT_DIR, 'README.md'));
  } catch (error) {
    console.log('📄 Création d\'un lien symbolique pour README.md...');
    // Copier le README.md de EN/ vers la racine s'il existe
    try {
      const enReadme = await fs.readFile(path.join(ROOT_DIR, 'EN', 'README.md'), 'utf8');
      await fs.writeFile(path.join(ROOT_DIR, 'README.md'), enReadme);
    } catch (error) {
      console.warn('⚠️  Impossible de copier le README.md depuis EN/');
    }
  }
  
  // Vérifier et créer le fichier .gitattributes s'il n'existe pas
  try {
    await fs.access(path.join(ROOT_DIR, '.gitattributes'));
  } catch (error) {
    console.log('📄 Création du fichier .gitattributes...');
    const gitattributes = `# Auto detect text files and perform LF normalization
* text=auto

# Documentation
*.md diff=markdown

# Linguist language overrides
*.js linguist-language=JavaScript
*.jsx linguist-language=JavaScript
*.ts linguist-language=TypeScript
*.tsx linguist-language=TypeScript
`;
    await fs.writeFile(path.join(ROOT_DIR, '.gitattributes'), gitattributes);
  }
}

// Fonction pour préparer les commits
async function prepareCommits() {
  console.log('📊 Préparation des commits...');
  
  try {
    // Vérifier s'il y a des modifications à committer
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim()) {
      console.log('📝 Modifications détectées:');
      console.log(status);
      
      const commit = await askConfirmation('Voulez-vous committer ces modifications?');
      if (commit) {
        const commitMessage = 'Update: Mise à jour automatique du repo';
        runCommand(`git add .`);
        runCommand(`git commit -m "${commitMessage}"`);
        
        const push = await askConfirmation('Voulez-vous pousser ces modifications vers GitHub?');
        if (push) {
          runCommand('git push');
          console.log('✅ Modifications poussées vers GitHub avec succès!');
        }
      }
    } else {
      console.log('✅ Aucune modification à committer.');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la préparation des commits:', error);
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Mise à jour du repo WhytCard Discuss...');
  
  try {
    await checkDependencies();
    await setupLanguageDirectories();
    await translateFiles();
    await optimizeForGitHub();
    await prepareCommits();
    
    console.log('\n✅ Mise à jour terminée avec succès!');
  } catch (error) {
    console.error('\n❌ Erreur lors de la mise à jour:', error);
    process.exit(1);
  }
}

// Exécuter la fonction principale
main(); 