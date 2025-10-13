# 🤖 GitHub Actions Workflows

Ce dossier contient tous les workflows automatisés du projet.

## 📋 Vue d'ensemble

| Workflow | Fichier | Déclencheur | Description |
|----------|---------|-------------|-------------|
| 🔵 **AI Review Light** | `ai-review-light.yml` | PRs → `staging` | Review IA légère (GPT-4o-mini) |
| 🔴 **AI Review Deep** | `ai-review-deep.yml` | PRs → `main` | Review IA approfondie (GPT-4o) |
| ✅ **Code Quality** | `code-quality.yml` | PRs + Push | ESLint, Prettier, TypeScript, Tests |
| 📊 **SonarCloud** | `sonarcloud.yml` | Push → `main`/`staging` | Analyse de qualité + couverture |
| 🔄 **Auto PR to Staging** | `auto-pr-to-staging.yml` | Push branches | PR automatique vers staging |
| 🚀 **Auto PR Staging → Main** | `auto-pr-staging-to-main.yml` | Push → `staging` | PR automatique vers main |

---

## 🔵 AI Review Light (Staging)

**Fichier:** `ai-review-light.yml`

### Déclenchement
- Pull Requests vers `staging`
- Types: opened, synchronize, reopened

### Fonctionnalités
- ✅ Analyse ESLint
- ✅ Vérification TypeScript
- ✅ Review IA légère (GPT-4o-mini)
- ✅ Historique des 25 derniers commits
- ✅ Labels automatiques

### Coût
~$0.001-0.01 par review

### Secret requis
- `OPENAI_API_KEY`
- `TOKEN_GITHUB`

---

## 🔴 AI Review Deep (Main)

**Fichier:** `ai-review-deep.yml`

### Déclenchement
- Pull Requests vers `main`
- Seulement sur fichiers importants (app, components, contexts, hooks, lib, constants)

### Fonctionnalités
- ✅ Review IA approfondie (GPT-4o)
- ✅ Analyse des commits de la PR
- ✅ Suivi détaillé des coûts
- ✅ Filtrage intelligent par fichiers
- ✅ Labels basés sur l'analyse

### Coût
~$0.01-0.30 par review

### Secret requis
- `OPENAI_API_KEY`
- `TOKEN_GITHUB`

---

## ✅ Code Quality

**Fichier:** `code-quality.yml`

### Déclenchement
- Pull Requests (toutes branches)
- Push (sauf `main` et `staging`)

### Vérifications
- ESLint
- Prettier formatting
- TypeScript compilation
- Tests unitaires

### Installation dépendances
Utilise `npm ci --legacy-peer-deps`

---

## 📊 SonarCloud Scan

**Fichier:** `sonarcloud.yml`

### Déclenchement
- Push vers `main`
- Push vers `staging`

### Analyses
- Qualité du code
- Bugs potentiels
- Vulnérabilités de sécurité
- Code smells
- Couverture de tests

### Secrets requis
- `SONARCLOUD_KEY`
- `TOKEN_GITHUB`

### Configuration
- Project Key: `mobile-app-roomies_front-end-roomies`
- Organization: `mobile-app-roomies`

---

## 🔄 Auto PR to Staging

**Fichier:** `auto-pr-to-staging.yml`

### Déclenchement
Push sur branches (sauf `main`, `staging`, branches système)

### Comportement
Crée automatiquement une PR vers `staging` pour faciliter le workflow.

---

## 🚀 Auto PR Staging → Main

**Fichier:** `auto-pr-staging-to-main.yml`

### Déclenchement
Push vers `staging`

### Comportement
Crée automatiquement une PR de `staging` vers `main` après validation.

---

## 🔐 Secrets GitHub requis

Configurez ces secrets dans **Settings** → **Secrets and variables** → **Actions** :

| Secret | Description | Utilisé par |
|--------|-------------|-------------|
| `OPENAI_API_KEY` | Clé API OpenAI | AI Review Light, AI Review Deep |
| `TOKEN_GITHUB` | Personal Access Token | AI Reviews, Auto PRs |
| `SONARCLOUD_KEY` | Token SonarCloud | SonarCloud Scan |

---

## 💰 Gestion des coûts

### Stratégie d'optimisation

1. **Review légère sur staging** (GPT-4o-mini)
   - Coût faible
   - Feedback rapide
   - Toutes les PRs

2. **Review approfondie sur main** (GPT-4o)
   - Coût plus élevé
   - Analyse détaillée
   - Seulement fichiers importants

3. **Filtrage par fichiers**
   - Ignore assets, docs, config
   - Focus sur le code métier

### Estimation mensuelle

Avec ~50 PRs/mois :
- Staging (40 PRs) : ~$0.20
- Main (10 PRs) : ~$1.50
- **Total : ~$1.70/mois**

---

## 🎯 Flux de travail recommandé

```
Feature branch
    ↓
    ├─→ Push
    │   └─→ Auto PR to Staging
    │
    ↓ PR créée automatiquement
    │
staging (🔵 AI Review Light)
    ↓
    ├─→ Merge
    │   └─→ Auto PR Staging → Main
    │
    ↓ PR créée automatiquement
    │
main (🔴 AI Review Deep + 📊 SonarCloud)
    ↓
Production
```

---

## 🛠️ Maintenance

### Désactiver temporairement un workflow

Commentez la section `on:` ou ajoutez :
```yaml
if: false
```

### Tester localement

```bash
# ESLint
npm run lint

# Prettier
npm run format:check

# TypeScript
npm run typecheck

# Tests
npm test

# Tests avec couverture
npm run test:coverage
```

---

## 📚 Documentation

- [AI Review Light](./../OPENAI-REVIEW.md)
- [SonarCloud](./../SONARCLOUD.md)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## 🆘 Support

En cas de problème :
1. Vérifiez les secrets GitHub
2. Consultez les logs du workflow
3. Vérifiez les quotas API (OpenAI, GitHub)
4. Contactez l'équipe DevOps
