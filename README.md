# AngryProgWeb
Bon en gros on a toute les fonctionnalités de base
Faut ajouter un système de dégats au moment des colissions avec la cible et certains éléments du décors (fonctionnalité avancée pour éléments friable + fonctionnalité avancée pour dégat en fonction de la puissance du coup).
Le canvas en arrière plan pour les éléments du décor n'est pas encore utilisé.

Les éléments du décors devrait être donc écrit comme ça dans le json :
...
"decor": [{
    "x": 50,
    "y": 50,
    "width": 150,
    "height": 150,
    "texture": "ressource.png",
    "description": "Jolie arbre"
  },{
    "x": 150,
    "y": 150,
    "width": 150,
    "height": 150,
    "texture": "ressource.png",
    "description": "Buisson dégueulasse"
  }];
...

et donc ensuite dans la fonction readData de Loader lire ces données et les ajoutés au canvasDecor (de la classe Game).
J'ai pas implémenté le bordel qui gère le remplissage du canvas de décorations.



Faudrait voir ce qu'on va faire comme last fonctionnalité avancée aussi. (Il en faut mini 3 parmis les 6 proposées pour avoir le max de points)
