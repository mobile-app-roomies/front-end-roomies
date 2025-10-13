# Configuration des Secrets GitHub

Ce document liste tous les secrets nécessaires pour faire fonctionner les workflows GitHub Actions.

## Secrets Requis

### 1. **SONARCLOUD_KEY** (Obligatoire pour SonarCloud)
- **Utilisation** : Authentification avec SonarCloud pour l'analyse de code
- **Où l'obtenir** : 
  1. Connectez-vous à [SonarCloud](https://sonarcloud.io)
  2. Allez dans **My Account** > **Security**
  3. Générez un nouveau token
- **Workflows concernés** : `sonarcloud.yml`

### 2. **OPENAI_API_KEY** (Obligatoire pour AI Code Review)
- **Utilisation** : Permet l'analyse automatique du code par OpenAI
- **Où l'obtenir** : 
  1. Créez un compte sur [OpenAI Platform](https://platform.openai.com)
  2. Allez dans **API Keys**
  3. Créez une nouvelle clé API
- **Workflows concernés** : `ai-code-review.yml`

### 3. **PAT_TOKEN** (Personal Access Token)
- **Utilisation** : Token GitHub avec permissions étendues pour créer des PRs et gérer les labels
- **Où l'obtenir** : 
  1. Allez dans **GitHub Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**
  2. Cliquez sur **Generate new token (classic)**
  3. Donnez un nom au token (ex: "Roomies Workflows")
  4. Sélectionnez les scopes suivants :
     - `repo` (Full control of private repositories)
     - `workflow` (Update GitHub Action workflows)
  5. Générez et copiez le token
- **Workflows concernés** : 
  - `ai-code-review.yml`
  - `auto-pr-to-staging.yml`
  - `auto-pr-staging-to-main.yml`
  - `sonarcloud.yml`

### 4. **TOKEN_GITHUB** (Optionnel - Backup)
- **Utilisation** : Token GitHub alternatif (actuellement non utilisé)
- **Note** : Ce secret existe dans votre repository mais n'est plus utilisé par les workflows

## Comment Ajouter les Secrets

1. Allez dans votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** > **Actions**
4. Cliquez sur **New repository secret**
5. Ajoutez chaque secret avec le nom exact indiqué ci-dessus

## État Actuel des Secrets

✅ **Secrets configurés dans le repository :**
- `OPENAI_API_KEY` - Configuré
- `PAT_TOKEN` - Configuré
- `SONARCLOUD_KEY` - Configuré
- `TOKEN_GITHUB` - Configuré (non utilisé)

## Vérification

Pour vérifier que vos secrets sont correctement configurés :

1. **SonarCloud** : Le workflow `sonarcloud.yml` devrait s'exécuter sans erreur sur les branches `main` et `staging`
2. **AI Code Review** : Le workflow `ai-code-review.yml` devrait analyser automatiquement les pull requests vers `main`
3. **Auto PR** : Les workflows `auto-pr-to-staging.yml` et `auto-pr-staging-to-main.yml` devraient créer automatiquement des PR

## Troubleshooting

### Erreur "Bad credentials"
- Vérifiez que le nom du secret est exactement celui attendu (sensible à la casse)
- Pour SONARCLOUD_KEY, vérifiez que le token n'a pas expiré sur SonarCloud
- Pour PAT_TOKEN, vérifiez que le token a les bonnes permissions (`repo` et `workflow`)

### Erreur "Resource not accessible by integration"
- Vérifiez les permissions du workflow dans le fichier YAML
- Assurez-vous que les permissions sont correctement définies :
  ```yaml
  permissions:
    contents: read
    pull-requests: write
  ```

### Le workflow ne se déclenche pas
- Vérifiez les conditions de déclenchement (`on:`) dans le fichier workflow
- Assurez-vous que vous poussez sur la bonne branche

## Notes Importantes

- **Ne jamais** commiter les valeurs des secrets dans le code
- Les secrets sont masqués dans les logs GitHub Actions
- Renouvelez régulièrement vos tokens pour des raisons de sécurité
- Utilisez des secrets différents pour chaque environnement (dev, staging, production)
