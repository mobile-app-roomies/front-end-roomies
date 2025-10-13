# 🤖 OpenAI Code Review

## Vue d'ensemble

Ce workflow utilise **GPT-4o** d'OpenAI pour effectuer des reviews de code automatiques approfondies sur les Pull Requests vers `staging`.

## Déclenchement

Le workflow se déclenche automatiquement sur :
- ✅ Pull Requests vers `staging` (opened, synchronize)
- ❌ Pas sur les autres branches (pour économiser les coûts)

## Configuration requise

### Secret GitHub nécessaire

Ajoutez le secret suivant dans **Settings** → **Secrets and variables** → **Actions** :

- **`OPENAI_API_KEY`** : Votre clé API OpenAI

### Obtenir une clé API OpenAI

1. Allez sur [platform.openai.com](https://platform.openai.com)
2. Créez un compte ou connectez-vous
3. Allez dans **API Keys**
4. Créez une nouvelle clé API
5. Ajoutez-la comme secret GitHub

## Fonctionnalités

### 🔍 Analyse complète

Le workflow analyse :
- 🐛 **Bugs potentiels** et edge cases
- 🔒 **Problèmes de sécurité**
- ⚡ **Optimisations de performance** React Native
- 📱 **Best practices** Expo et React Native
- ♿ **Accessibilité** mobile
- 🧪 **Suggestions de tests**
- 🎨 **Qualité du code** et maintenabilité
- 🔄 **Gestion d'état** et side effects

### 📊 Informations analysées

- Diff complet du code (limité à 8000 caractères)
- Liste des fichiers modifiés
- Messages de commits
- Statistiques (lignes ajoutées/supprimées)
- Métadonnées de la PR

### 💰 Suivi des coûts

Chaque review inclut :
- Nombre de tokens utilisés (input/output)
- Coût estimé en USD
- Modèle utilisé (GPT-4o)

## Tarification GPT-4o

**Prix au 2024** :
- Input : $2.50 par 1M tokens
- Output : $10.00 par 1M tokens

**Estimation par review** :
- Petite PR (~500 lignes) : ~$0.01 - $0.05
- Moyenne PR (~1500 lignes) : ~$0.05 - $0.15
- Grande PR (~3000 lignes) : ~$0.15 - $0.30

## Optimisations de coûts

### 1. Limitation par branche
```yaml
branches:
  - staging  # Seulement staging, pas toutes les branches
```

### 2. Filtrage par fichiers (optionnel)
```yaml
paths:
  - "app/**/*.ts"
  - "app/**/*.tsx"
  - "components/**/*.ts"
  - "components/**/*.tsx"
```

### 3. Filtrage par auteur (optionnel)
```yaml
if: |
  github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'
```

### 4. Timeout
```yaml
timeout-minutes: 30  # Empêche les coûts excessifs
```

### 5. Troncature du diff
Le diff est limité à 8000 caractères pour éviter les coûts excessifs.

## Labels automatiques

Le workflow ajoute automatiquement des labels basés sur l'analyse :
- `ai-review` : Toujours ajouté
- `openai` : Toujours ajouté
- `potential-bug` : Si des bugs sont détectés
- `security` : Si des problèmes de sécurité sont trouvés
- `performance` : Si des optimisations sont suggérées
- `needs-tests` : Si plus de tests sont recommandés

## Exemple de review

La review générée inclut :

```markdown
# 🤖 OpenAI Code Review (GPT-4o)

## 🐛 Bugs potentiels
- [Description du bug]
- [Suggestion de correction]

## ⚡ Performance
- [Optimisation suggérée]

## 🔒 Sécurité
- [Problème de sécurité identifié]

---

## 💰 Coût de la Review
| Métrique | Valeur |
|----------|--------|
| Tokens d'entrée | 1,234 |
| Tokens de sortie | 567 |
| Total tokens | 1,801 |
| Coût estimé | $0.0089 USD |
```

## Désactivation temporaire

Pour désactiver temporairement le workflow sans le supprimer :

```yaml
on:
  pull_request:
    types: [opened, synchronize]
    branches:
      - staging
  workflow_dispatch:  # Permet l'exécution manuelle uniquement
```

Ou commentez simplement la section `on:` pour le désactiver complètement.

## Comparaison avec Claude

| Critère | OpenAI GPT-4o | Claude (Anthropic) |
|---------|---------------|-------------------|
| **Coût** | $2.50/$10 par 1M tokens | $3/$15 par 1M tokens |
| **Contexte** | 128K tokens | 200K tokens |
| **Spécialité** | Général, très polyvalent | Code, raisonnement |
| **Vitesse** | Rapide | Très rapide |
| **Qualité code** | Excellente | Excellente |

## Support

Pour toute question ou problème :
1. Vérifiez que `OPENAI_API_KEY` est configuré
2. Consultez les logs du workflow
3. Vérifiez votre quota OpenAI
4. Contactez l'équipe DevOps

## Ressources

- [Documentation OpenAI](https://platform.openai.com/docs)
- [Tarification OpenAI](https://openai.com/pricing)
- [GitHub Actions](https://docs.github.com/en/actions)
