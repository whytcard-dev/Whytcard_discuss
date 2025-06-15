# Guide de Contribution pour WhytCard Discuss

Nous sommes ravis que vous souhaitiez contribuer à WhytCard Discuss ! Votre aide est précieuse pour améliorer la documentation et enrichir la communauté autour du projet WhytCard.

Ce guide vous aidera à comprendre comment vous pouvez participer.

## 👋 Comment Contribuer ?

Il existe de nombreuses façons de contribuer, notamment :

*   Signaler des erreurs ou des imprécisions dans la documentation.
*   Proposer des améliorations pour le contenu existant.
*   Suggérer de nouveaux sujets de documentation ou de nouveaux standards.
*   Participer aux discussions et aider les autres membres de la communauté.
*   Améliorer les scripts de traduction ou les workflows.

### 🐛 Signaler des Bugs ou des Erreurs

Si vous trouvez une erreur dans la documentation, une traduction incorrecte, un lien brisé, ou tout autre problème :

1.  **Recherchez d'abord** dans les [issues existantes](https://github.com/whytcard-dev/discuss/issues) pour voir si le problème n'a pas déjà été signalé.
2.  Si ce n'est pas le cas, ouvrez une **nouvelle issue** en utilisant le template [Rapport de bug](/.github/ISSUE_TEMPLATE/bug_report.md).
3.  Fournissez un maximum de détails :
    *   URL de la page concernée ou chemin du fichier.
    *   Description claire du problème.
    *   Suggestions de correction si vous en avez.

### ✨ Proposer des Améliorations ou des Nouvelles Fonctionnalités

Pour suggérer une amélioration du contenu existant, un nouveau standard à documenter, ou toute autre idée :

1.  **Recherchez** dans les [issues existantes](https://github.com/whytcard-dev/discuss/issues) et les [Discussions](https://github.com/whytcard-dev/discuss/discussions) pour voir si votre idée n'a pas déjà été proposée.
2.  Si ce n'est pas le cas, ouvrez une **nouvelle issue** en utilisant le template [Demande de fonctionnalité](/.github/ISSUE_TEMPLATE/feature_request.md) ou démarrez une [Discussion](https://github.com/whytcard-dev/discuss/discussions) pour en débattre.
3.  Expliquez clairement votre suggestion et les bénéfices attendus.

### 📝 Contribuer directement à la Documentation

Les contributions directes à la documentation se font principalement sur les fichiers sources en **anglais**, situés dans le répertoire `/EN/`.

**Important concernant les traductions :**

*   **Les traductions vers les autres langues sont générées automatiquement** à partir des fichiers du répertoire `/EN/`.
*   **Ne modifiez PAS directement les fichiers dans les dossiers des langues traduites** (ex: `/FR/`, `/ES/`), car vos modifications seraient écrasées lors de la prochaine exécution du script de traduction.
*   Si vous constatez une erreur de traduction, signalez-la via une issue ou proposez une amélioration du texte source en anglais qui pourrait mener à une meilleure traduction automatique.

#### Processus de modification de la documentation :

1.  **Forkez** le dépôt `whytcard-dev/discuss` sur votre propre compte GitHub.
2.  **Clonez** votre fork localement :
    ```bash
    git clone https://github.com/VOTRE_NOM_UTILISATEUR/discuss.git
    cd discuss
    ```
3.  **Créez une nouvelle branche** pour vos modifications. Choisissez un nom descriptif (ex: `feature/amelioration-doc-accessibilite` ou `fix/correction-typo-readme-en`).
    ```bash
    git checkout -b NOM_DE_VOTRE_BRANCHE
    ```
4.  **Effectuez vos modifications** dans les fichiers du répertoire `/EN/`.
    *   Assurez-vous de respecter le style et la structure existants.
    *   Si vous ajoutez de nouveaux fichiers, pensez à la manière dont ils s'intègrent dans la structure globale.
5.  **Committez vos changements.** Rédigez des messages de commit clairs et descriptifs (voir la section "Messages de Commit").
    ```bash
    git add CHEMIN_DU_FICHIER_MODIFIE
    git commit -m "Décrivez clairement votre modification"
    ```
6.  **Poussez vos modifications** vers votre fork sur GitHub :
    ```bash
    git push origin NOM_DE_VOTRE_BRANCHE
    ```
7.  **Ouvrez une Pull Request (PR)** depuis votre branche sur votre fork vers la branche `main` du dépôt `whytcard-dev/discuss`.
    *   Utilisez le template de Pull Request fourni.
    *   Décrivez clairement les changements que vous proposez et pourquoi.
    *   Liez votre PR à toute issue pertinente.

### ✍️ Messages de Commit

Nous suivons les [Conventional Commits](https://www.conventionalcommits.org/) pour nos messages de commit. Cela nous aide à maintenir un historique clair et facilite la génération de changelogs.

Un message de commit typique ressemble à :

```
feat: Ajout d'une section sur les WebSockets dans la doc architecture

Description plus détaillée du changement si nécessaire.
Explique le problème que ce commit résout.
```

*   **Types courants :** `feat` (nouvelle fonctionnalité), `fix` (correction de bug), `docs` (changements dans la documentation), `style` (formatage, etc.), `refactor`, `test`, `chore` (maintenance).
*   Le résumé (première ligne) doit être concis (idéalement 50 caractères max).
*   Utilisez l'impératif ("Ajout", "Correction" plutôt que "Ajouté", "Corrigé").

## 🛠️ Standards de Code et de Style

*   **Markdown :** Suivez le style Markdown existant dans les fichiers. Utilisez des linters Markdown si vous en avez pour assurer la cohérence.
*   **Langue (pour les sources) :** La documentation source doit être rédigée en anglais clair et concis (dans le dossier `/EN/`).
*   **Scripts (Node.js) :** Si vous contribuez aux scripts dans le dossier `/scripts/`, suivez les conventions JavaScript/Node.js établies dans ces fichiers.

## 👁️ Processus de Révision des Pull Requests

1.  Une fois votre Pull Request ouverte, un ou plusieurs mainteneurs du projet la réviseront.
2.  Les workflows GitHub Actions (comme les linters ou les tests de build) doivent passer.
3.  Des commentaires ou des demandes de modification pourront vous être faits. Nous encourageons une discussion constructive.
4.  Une fois la PR approuvée et tous les tests passés, elle sera fusionnée dans la branche `main`.
5.  Après la fusion dans `main`, le workflow d'autotraduction devrait se déclencher pour propager vos modifications (faites sur les fichiers anglais) aux autres langues.

## 💬 Rejoindre la Communauté

*   **Discussions GitHub :** [whytcard-dev/discuss/discussions](https://github.com/whytcard-dev/discuss/discussions)
*   **(Optionnel : Ajoutez ici d'autres liens communautaires si vous en avez : Discord, Forum, etc.)**

## ⚖️ Code de Conduite

N'oubliez pas que toutes les interactions sur ce projet sont soumises à notre [Code de Conduite](/.github/CODE_OF_CONDUCT.md).

---

Merci encore pour votre volonté de contribuer à WhytCard Discuss ! 