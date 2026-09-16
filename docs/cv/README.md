# Le CV

`cv.html` est la source du fichier servi à `/cv.pdf`. Une seule colonne, aucune
image, texte sélectionnable : un robot de tri (ATS) lit le document dans
l'ordre du flux, ce que deux colonnes rendent imprévisible. Deux réglages
tiennent à l'extraction et ne doivent pas être « embellis » :

- **Ligatures désactivées.** Extraites telles quelles, elles empêchent de
  retrouver « affirmer » ou « efficace » dans une recherche par mot-clé.
- **Aucun `letter-spacing` sur les titres.** `pdfminer`, utilisé par beaucoup
  de chaînes ATS, restitue « P R O F I L » dès qu'un espacement écarte les
  glyphes. `pypdf` ne le voit pas : vérifier avec **les deux**.

Les liens (email, portfolio, GitHub, LinkedIn, adresses des projets) sont de
vraies annotations PDF, pas du texte. Contrôle : `len(page['/Annots'])` doit
valoir 9.

Les chiffres doivent rester identiques à ceux de `data/projects.ts` : c'est
leur concordance entre le site et le CV qui les rend vérifiables.

## Régénérer le PDF

```
chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="public/cv.pdf" docs/cv/cv.html
```

Vérifier ensuite que le résultat tient sur **une** page, et que le texte
s'extrait dans le bon ordre.
