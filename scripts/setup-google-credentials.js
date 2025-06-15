#!/usr/bin/env node

/**
 * Script pour configurer les identifiants Google Cloud pour l'API de traduction
 * 
 * Ce script permet de configurer facilement les identifiants Google Cloud
 * pour l'utilisation de l'API de traduction dans le projet WhytCard.
 */

// Configuration des variables d'environnement
process.env.GOOGLE_APPLICATION_CREDENTIALS = "lucid-timing-462919-d9";
process.env.GOOGLE_CLOUD_PROJECT = "lucid-timing-462919";
process.env.GOOGLE_API_KEY = "AIzaSyCqo3BInTa0wxBfPM4wn5lvRaJGKglJOHo";

console.log("Configuration des identifiants Google Cloud réussie :");
console.log(`- Projet: ${process.env.GOOGLE_CLOUD_PROJECT}`);
console.log("- Clé API configurée");
console.log("- Identifiants d'application configurés");

// Vérification de la configuration
const { Translate } = require('@google-cloud/translate').v2;

try {
  // Initialisation du client de traduction avec la clé API
  const translate = new Translate({
    key: process.env.GOOGLE_API_KEY,
    projectId: process.env.GOOGLE_CLOUD_PROJECT
  });

  console.log("\nTest de l'API de traduction...");
  
  // Test de traduction simple
  translate.translate("Hello, world!", "fr")
    .then(([translation]) => {
      console.log(`Traduction de test: "Hello, world!" => "${translation}"`);
      console.log("\nConfiguration réussie! L'API de traduction est prête à être utilisée.");
    })
    .catch(error => {
      console.error("Erreur lors du test de traduction:", error);
      console.error("\nVeuillez vérifier vos identifiants et votre connexion Internet.");
    });
} catch (error) {
  console.error("Erreur lors de l'initialisation du client de traduction:", error);
  console.error("\nVeuillez vérifier que le package @google-cloud/translate est installé.");
} 