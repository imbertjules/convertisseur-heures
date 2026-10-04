export const FAQ = [
  {
    q: 'À quoi correspondent 30 minutes en centièmes ?',
    a: '30 minutes font 0,50 heure. Le calcul est 30 ÷ 60, pas 30 ÷ 100. Écrire 7,30 pour 7 h 30 sous-estime la durée de 0,20 heure, soit 12 minutes.',
  },
  {
    q: 'Pourquoi 45 minutes valent 0,75 et non 0,45 ?',
    a: 'Une heure compte 60 minutes. 45 ÷ 60 = 0,75. Le nombre 0,45 serait 45 centièmes d’heure, c’est-à-dire 27 minutes (0,45 × 60), pas trois quarts d’heure.',
  },
  {
    q: 'Comment convertir dans l’autre sens, des centièmes vers des minutes ?',
    a: 'On garde les heures entières, puis on multiplie la partie décimale par 60. Pour 7,75 : la partie décimale 0,75 × 60 = 45 minutes. Le résultat se lit 7 h 45.',
  },
  {
    q: 'Que vaut une seule minute ?',
    a: '1 ÷ 60 = 0,01666…, arrondi au centième le plus proche : 0,02 heure. Deux minutes donnent 0,03, et trois minutes tombent juste sur 0,05.',
  },
  {
    q: 'Faut-il arrondir chaque jour ou seulement le total du mois ?',
    a: 'Les deux pratiques existent. Arrondir chaque journée puis additionner peut écarter le total d’un centième par rapport à une conversion unique des minutes du mois. Trois journées de 7 h 20 donnent 22,00 heures en une fois, et 21,99 si l’on additionne trois fois 7,33. La page Cumul montre les deux résultats.',
  },
  {
    q: 'Le convertisseur calcule-t-il la paie ou les heures supplémentaires ?',
    a: 'Non. Il convertit une durée. Il n’applique ni taux horaire, ni majoration, ni convention collective. Savoir qu’une semaine de 38 h 30 représente 3,50 heures au-dessus de 35,00 heures ne dit pas si ces heures sont payées, récupérées ou incluses dans un accord.',
  },
  {
    q: 'Quelle est la durée légale utilisée comme repère ?',
    a: 'Pour un salarié à temps complet, la durée légale de travail effectif est de 35 heures par semaine (Code du travail, article L3121-27). Toute heure accomplie au-delà est en principe une heure supplémentaire (article L3121-28). À défaut d’accord, les huit premières sont majorées de 25 % et les suivantes de 50 % (article L3121-36). Un accord peut prévoir d’autres taux, sans descendre sous 10 %.',
  },
  {
    q: 'Puis-je m’en servir pour une note de frais ou un relevé d’heures ?',
    a: 'Oui pour transformer une durée déjà retenue en heures décimales. La décision de compter ou non un trajet, une pause ou un temps d’habillage ne se tranche pas ici : elle dépend du contrat, de la convention et de la situation de travail.',
  },
  {
    q: 'Les heures saisies sont-elles envoyées quelque part ?',
    a: 'Non. Le calcul se fait dans le navigateur. Aucun compte n’est créé et les durées ne sont pas enregistrées par le site. La politique de confidentialité détaille les cookies publicitaires et la mesure d’audience.',
  },
  {
    q: 'Quelle écriture faut-il copier dans un tableur ?',
    a: 'En français, la virgule est le séparateur décimal : 7,75. Certains logiciels attendent un point : 7.75. Le bouton Copier reprend l’écriture avec virgule, et l’équivalence affiche aussi l’écriture avec point.',
  },
]
