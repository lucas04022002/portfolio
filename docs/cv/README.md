# Le CV

`cv.html` est la source du fichier servi à `/cv.pdf`. Une seule colonne, aucune
image, texte sélectionnable : un robot de tri (ATS) lit le document dans
l'ordre du flux, ce que deux colonnes rendent imprévisible. Les ligatures sont
désactivées — extraites telles quelles, elles empêchent de retrouver
« affirmer » ou « efficace » dans une recherche par mot-clé.

Les chiffres doivent rester identiques à ceux de `data/projects.ts` : c'est
leur concordance entre le site et le CV qui les rend vérifiables.

## Régénérer le PDF

```
chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="public/cv.pdf" docs/cv/cv.html
```

Vérifier ensuite que le résultat tient sur **une** page, et que le texte
s'extrait dans le bon ordre.
