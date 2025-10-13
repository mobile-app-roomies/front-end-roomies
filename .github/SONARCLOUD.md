# Configuration SonarCloud

## Prérequis

Pour que l'analyse SonarCloud fonctionne, vous devez configurer le secret GitHub suivant :

### Secret GitHub à ajouter

1. Allez dans **Settings** → **Secrets and variables** → **Actions**
2. Cliquez sur **New repository secret**
3. Ajoutez le secret suivant :

   - **Nom** : `SONARCLOUD_KEY`
   - **Valeur** : Votre token SonarCloud

## Configuration du projet

- **Project Key** : `mobile-app-roomies_front-end-roomies`
- **Organization** : `mobile-app-roomies`
- **Project Name** : Front-End Roomies

## Fichiers de configuration

### `sonar-project.properties`

Ce fichier contient la configuration de base pour SonarCloud :
- Sources à analyser
- Tests à exclure
- Chemin vers le rapport de couverture

### `.github/workflows/sonarcloud.yml`

Workflow GitHub Actions qui :
1. Installe les dépendances
2. Exécute les tests avec couverture
3. Envoie les résultats à SonarCloud

## Exécution locale

Pour générer un rapport de couverture localement :

```bash
npm run test:coverage
```

Le rapport sera généré dans le dossier `coverage/`.

## Déclenchement de l'analyse

L'analyse SonarCloud se déclenche automatiquement :
- Sur chaque push vers la branche `main`
- Sur chaque pull request

## Visualisation des résultats

Les résultats sont disponibles sur :
https://sonarcloud.io/project/overview?id=mobile-app-roomies_front-end-roomies
