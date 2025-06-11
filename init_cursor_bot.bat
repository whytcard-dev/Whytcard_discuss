@echo off
echo === Initialisation du Bot Cursor pour la traduction ===
echo.
echo Ce script va préparer l'environnement pour utiliser un bot de traduction avec Cursor.
echo.

REM Création du dossier pour les fichiers traduits
if not exist "Publique\Documentation\Translations" (
    echo Création du dossier pour les traductions...
    mkdir "Publique\Documentation\Translations"
    mkdir "Publique\Documentation\Translations\fr"
    mkdir "Publique\Documentation\Translations\en"
    mkdir "Publique\Documentation\Translations\es"
    mkdir "Publique\Documentation\Translations\de"
) else (
    echo Le dossier des traductions existe déjà.
)

REM Création d'un fichier README pour le bot
echo Création du fichier d'instructions pour le bot...
(
    echo # Instructions pour le Bot de Traduction
    echo.
    echo ## Objectif
    echo.
    echo Ce bot est conçu pour traduire la documentation du projet WhytCard-AI-Manager en plusieurs langues.
    echo.
    echo ## Langues cibles
    echo.
    echo - Français (fr)
    echo - Anglais (en)
    echo - Espagnol (es)
    echo - Allemand (de)
    echo.
    echo ## Instructions d'utilisation
    echo.
    echo 1. Sélectionnez un fichier Markdown à traduire
    echo 2. Utilisez la commande "Traduire ce fichier en [langue]" dans Cursor
    echo 3. Le bot générera une traduction en préservant le formatage Markdown
    echo 4. Vérifiez et ajustez la traduction si nécessaire
    echo 5. Enregistrez le fichier traduit dans le dossier approprié
    echo.
    echo ## Conventions de nommage
    echo.
    echo - Utilisez le même nom de fichier que l'original
    echo - Ajoutez le code de langue comme suffixe (exemple: README_en.md)
    echo.
    echo ## Notes importantes
    echo.
    echo - Préservez tous les liens et références
    echo - Maintenez le formatage et la structure du document
    echo - Adaptez les expressions idiomatiques plutôt que de les traduire littéralement
) > "Publique\Documentation\Translations\README.md"

echo.
echo Configuration terminée!
echo.
echo Pour utiliser le bot de traduction avec Cursor:
echo 1. Ouvrez Cursor et accédez à votre projet
echo 2. Ouvrez un fichier à traduire
echo 3. Utilisez le bot de Cursor pour demander une traduction
echo 4. Exemple: "Traduis ce fichier en anglais tout en préservant le formatage Markdown"
echo. 