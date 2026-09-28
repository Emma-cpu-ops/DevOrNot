const QUESTION_COUNT = 10;
const QUESTIONS_PER_CATEGORY = 500;

function makeQuestions(lines, scores) {
  return lines.map((line, source) => {
    const parts = line.split('|');
    return {
      text: parts[0],
      answers: parts.slice(1).map((answer, index) => [answer, scores[index]]),
      source
    };
  });
}

function expandQuestions(baseQuestions, category) {
  const frames = category === 'chaos'
    ? [
        text => 'Défi de sprint : ' + text,
        text => 'Dans le stand-up du matin : ' + text,
        text => 'Alerte du comité anti-panique : ' + text,
        text => 'Scénario de survie numérique : ' + text,
        text => 'Question envoyée à 17 h 58 : ' + text,
        text => 'Dans un ticket très mal décrit : ' + text,
        text => 'Le tableau Kanban te regarde. ' + text,
        text => 'Après le troisième café : ' + text,
        text => 'Selon la légende de la codebase : ' + text
      ]
    : [
        text => 'Question de révision : ' + text,
        text => 'En entretien technique : ' + text,
        text => 'En revue de code : ' + text,
        text => 'Dans une application web : ' + text,
        text => 'Pour vérifier les fondamentaux : ' + text,
        text => 'Cas pratique de développement : ' + text,
        text => 'Dans une documentation technique : ' + text,
        text => 'Question d’architecture : ' + text,
        text => 'Avant la mise en production : ' + text
      ];
  const expanded = [...baseQuestions];
  let index = 0;

  while (expanded.length < QUESTIONS_PER_CATEGORY) {
    const source = baseQuestions[index % baseQuestions.length];
    const frame = frames[Math.floor(index / baseQuestions.length)];
    expanded.push({ ...source, text: frame(source.text) });
    index += 1;
  }

  return expanded;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

// 500 questions absurdes, issues de 55 scénarios et de leurs variantes de situation.
const chaosQuestions = expandQuestions(makeQuestions([
  "Ton code fonctionne du premier coup. Quelle est ta réaction ?|Je ferme l'ordinateur avant que ça change d'avis.|Je vérifie le mauvais projet.|J'écris : c'était prévu.",
  "Une erreur dit undefined is not a function. Tu…|ajoutes un console.log et regardes le vide.|accuses le cache.|renommes undefined en defined.",
  "Il est 17 h 58 et on demande un petit changement. Tu…|demandes la définition légale de petit.|crées une branche please-no.|dis bien sûr très doucement.",
  "Quel nom donner à une variable qui contient tout ?|dataFinalV2ReallyFinalOk|truc|x",
  "Tu lis ton code d'il y a six mois. Son auteur est…|un inconnu brillant mais dangereux.|toi, dans une autre timeline.|un génie que tu ne touches pas.",
  "La production est en feu. Tu lances…|git status pour mesurer le drame.|un café, dépendance officielle.|git push --force.",
  "On te dit ça marche sur ma machine. Tu réponds…|On peut vendre ta machine ?|Donc c'est la prod ?|Parfait, trois emojis tremblants.",
  "À quoi sert vraiment un TODO ?|À transmettre un problème au toi du futur.|À décorer les fichiers.|À prouver qu'on avait une idée.",
  "Quand déployer un gros refactor ?|Quand tests, QA et Mercure sont alignés.|Vendredi 18 h 59.|Après : ça ne devrait rien casser.",
  "Tu trouves la solution après 47 onglets. Tu…|fermes l'onglet par erreur et recommences.|copie-colles et promets de comprendre.|écris ne pas toucher.",
  "Tu trouves final_final_V7.js. Ta pensée ?|Il n'a jamais été final.|Enfin quelqu'un qui conclut.|Je le copie avant de lire.",
  "Un test échoue une fois sur vingt. C'est…|un test quantique.|une fonction saisonnière.|les vingt autres étaient trop confiantes.",
  "Un .env apparaît dans le dépôt public. Tu…|tournes lentement ta chaise vers l'équipe.|changes de planète.|le renommes .env-final.",
  "La réunion rapide dure une heure. Tu crées…|feat: retrouver mon après-midi.|fix: réunion trop réunion.|chore: accepter mon destin.",
  "Le bug disparaît avec les DevTools. Conclusion ?|Le bug est timide.|Chrome a des yeux.|C'est résolu, n'en parlons plus.",
  "On demande juste un bouton. Tu prépares…|onze fichiers, par respect pour l'architecture.|un seul qui importe l'univers.|aucun, le bouton est un état d'esprit.",
  "Quel commentaire inspire le plus confiance ?|// ça marche, ne demandez pas pourquoi|// TODO: faire mieux avant la retraite|// code auto-explicatif",
  "La QA renvoie 32 bugs. Tu réponds…|Merci pour cette collection organisée.|Ce sont des fonctions discrètes.|Donc 68 % de réussite ?",
  "Le build devient rouge après une dépendance. Le log est…|un roman russe sans personnage principal.|Bonne chance.|silencieux et boudeur.",
  "Nom de branche idéal ?|fix/please-just-work|feature/definitely-not-a-regression|main, pour vivre dangereusement.",
  "Une regex marche mais personne ne la comprend. Tu…|l'encadres dans un commentaire protecteur.|la regardes sans cligner.|la remplaces par une plus longue.",
  "Le PM dit priorité absolue. Tu traduis…|On en reparle après le prochain incendie.|Il faut un post-it en plus.|Je renomme tout P0.",
  "Ton CSS ne s'applique pas. Tu…|inspectes l'élément puis parles à un canard.|ajoutes !important.|montes le z-index.",
  "Une dette technique adulte…|possède intérêts composés et calendrier.|vit dans un tableur donc n'existe pas.|a sa musique dramatique.",
  "Un petit refactor contient…|un univers de 84 sous-tâches.|une phrase et deux fichiers.|une capture floue de 2019.",
  "Un quick fix dure…|entre cinq minutes et la fin des temps.|exactement un café.|moins qu'une vraie solution.",
  "Un console.log en production est…|un témoin oculaire protégé.|du monitoring artisanal.|un message dans une bouteille.",
  "Le design veut une ombre subtile. Tu proposes…|une brume de doute à 2 px.|0 38px 92px noir.|un soleil derrière chaque carte.",
  "Un endpoint répond 418. Tu dois…|respecter sa théière intérieure.|le déployer pour l'originalité.|faire semblant de savoir.",
  "Mise à jour système juste avant la démo. Tu…|dis à l'ordinateur : après la démo.|cliques maintenant.|débranches le Wi-Fi.",
  "Le meilleur test de non-régression est…|une danse autour du pipeline.|demander à la prod.|tout tester à la main en priant.",
  "Sans vouloir te mettre la pression… Tu…|mets la pression dans un tableau de bord.|cherches la sortie.|ouvres un ticket pour ce sentiment.",
  "Le review dit seulement nit:. Tu ressens…|un calme avant 42 autres nits.|une victoire totale.|l'envie d'emojis dans les noms.",
  "Une fonction a 14 paramètres. Sa qualité ?|Elle remplace une réunion de cadrage.|Elle accueille tout le monde.|Les virgules sont gratuites.",
  "Ticket : bug bizarre. Il manque…|toutes les informations, avec enthousiasme.|seulement le bug.|un GIF de chat.",
  "La documentation est à jour. Tu observes…|une éclipse de confiance.|un stagiaire avec droits d'écriture.|un bug qui écrit ses mémoires.",
  "Quel environnement fait le plus peur ?|final-v2-production-copie.|Tous, ils communiquent par télépathie.|Staging et ses données étranges.",
  "On supprime du code mort. Tu demandes…|depuis combien de temps il est mort.|s'il a une famille de dépendances.|s'il faut prévenir l'auteur.",
  "Pour finir une tâche, tu…|découvres trois sous-tâches cachées.|la marques presque faite.|ouvres finir la tâche.",
  "Le linter ajoute 400 erreurs. Il cherche à…|te faire évoluer par la douleur.|prendre le contrôle.|réparer le multivers.",
  "Le client veut pareil que le concurrent. Tu…|demandes laquelle des 84 versions.|copies leur couleur.|proposes de l'acheter.",
  "La base répond lentement parce que…|elle réfléchit très fort.|elle veut des encouragements.|elle déteste SELECT *.",
  "Une clé API est dans un commentaire. Tu…|mets le commentaire sous protection des témoins.|la remplaces par SECRET.|l'appelles clé vintage.",
  "Une demi-journée de tâche exige…|tous les cafés possibles plus deux.|zéro café, l'optimisme hydrate.|un café et un plan B.",
  "Le superpouvoir senior est…|dire ça dépend en 17 dialectes.|faire peur aux bugs.|comprendre les regex tout de suite.",
  "Le mot de passe staging123 est fort car…|il est honnête sur son danger.|il est facile pendant une fuite.|il est poétique.",
  "Pour expliquer un bug complexe, tu fais…|un canard et trois flèches.|c'est lié au cache.|un diagramme qui crée un bug.",
  "Après un déploiement sans incident, tu dis…|Personne ne bouge dix minutes.|C'était contrôlé.|Pourquoi ce silence ?",
  "Un appel de 15 minutes bloque…|une heure et quart, par réalisme.|exactement 15 minutes.|la journée entière.",
  "Le plus grand mensonge en développement ?|Je vais juste changer une ligne.|La doc est claire.|On ne touche pas au legacy.",
  "Un fichier sans extension contient du code. Tu…|l'ouvres avec prudence et respect.|le renommes main.js.|supposes que c'est un poème.",
  "Le design demande pixel perfect. Tu…|demandes : sur quel pixel, quel écran, quelle planète ?|augmentes le zoom à 800 %.|caches les différences sous une ombre.",
  "Une dépendance a 0 téléchargement hebdomadaire. Tu…|l'adoptes en pensant à sa solitude.|la mets directement en prod.|lui écris un README.",
  "Tu dois corriger une typo sur la home. Tu…|crées une issue, une branche et une cérémonie.|modifies directement la prod.|attends le prochain trimestre.",
  "Le navigateur affiche une page blanche. Tu…|ouvres la console avec un calme théâtral.|rafraîchis 27 fois.|changes de navigateur et de prénom."
], [10, 7, 3]), 'chaos');

// 500 questions de développement, issues de 55 notions et de leurs variantes de contexte.
const devQuestions = expandQuestions(makeQuestions([
  "À quoi sert principalement Git ?|Gérer les versions et l'historique d'un projet.|Compiler automatiquement JavaScript.|Héberger uniquement des images.",
  "Que fait git clone ?|Copie un dépôt distant en local.|Supprime les branches locales.|Publie le site en production.",
  "Que crée git commit ?|Un point d'historique avec les changements indexés.|Un serveur de test.|Une sauvegarde de la machine.",
  "À quoi sert git pull ?|Récupérer et intégrer les changements distants.|Envoyer une branche.|Annuler le dernier commit.",
  "Pourquoi créer une branche Git ?|Isoler un travail avant son intégration.|Rendre le code plus rapide.|Remplacer les tests.",
  "Quelle commande montre les fichiers modifiés ?|git status|git deploy|git inspect",
  "Qu'est-ce qu'un conflit de merge ?|Git ne peut pas combiner deux modifications automatiquement.|Deux serveurs répondent ensemble.|Un fichier a trop de commentaires.",
  "À quoi sert .gitignore ?|Indiquer les fichiers que Git ne doit pas suivre.|Cacher les commits publiés.|Chiffrer le code source.",
  "Que signifie HTTP 200 ?|La requête a réussi.|La ressource a été déplacée.|Le serveur est en erreur.",
  "Quel statut après la création d'une ressource ?|201|404|503",
  "Que signale HTTP 400 ?|La requête client est invalide.|Le serveur est indisponible.|L'utilisateur est authentifié.",
  "Que signifie HTTP 401 ?|L'authentification est absente ou invalide.|La ressource n'existe pas.|La réponse est en cache.",
  "Que signifie HTTP 403 ?|Le serveur refuse l'accès.|Le navigateur est trop ancien.|Le CSS est introuvable.",
  "Quel statut pour une ressource introuvable ?|404|200|302",
  "Quel statut pour une erreur interne serveur ?|500|204|301",
  "Quelle méthode HTTP lit une ressource sans la modifier ?|GET|DELETE|PATCH",
  "Quelle méthode HTTP sert souvent à créer une ressource ?|POST|HEAD|OPTIONS",
  "Qu'est-ce que JSON ?|Un format texte de données structurées.|Un langage SQL.|Un protocole de chiffrement.",
  "Qu'est-ce qu'une API web ?|Une interface de communication entre logiciels via le web.|Un éditeur mobile.|Une base locale.",
  "Pourquoi utiliser main, nav ou article en HTML ?|Pour donner du sens à la structure, notamment pour l'accessibilité.|Pour empêcher les bugs JS.|Pour accélérer toutes les pages.",
  "Quel attribut décrire une image informative ?|alt|href|method",
  "Le modèle de boîte CSS contient…|contenu, padding, bordure et marge.|URL, port, protocole et domaine.|clé primaire, index et table.",
  "Quelle déclaration active Flexbox ?|display: flex|position: flex|layout: flexible",
  "À quoi sert une media query ?|Adapter les styles aux caractéristiques de l'écran.|Enregistrer une vidéo.|Créer une requête SQL.",
  "Une règle CSS avec #id est généralement…|plus spécifique qu'une règle avec .classe.|moins spécifique qu'un élément.|ignorée par le navigateur.",
  "Qu'est-ce que le DOM ?|L'arbre du document que JavaScript peut manipuler.|Un serveur de production.|Un format d'image.",
  "Quelle différence entre === et == en JavaScript ?|=== compare aussi le type sans conversion implicite.|=== est réservé aux chaînes.|Aucune différence.",
  "Que garantit const en JavaScript ?|La liaison ne peut pas être réaffectée.|L'objet devient toujours immuable.|La variable est globale.",
  "À quoi sert await dans une fonction async ?|Attendre la résolution d'une promesse dans cette fonction.|Créer une base de données.|Accélérer une boucle infinie.",
  "Une Promise représente…|Un résultat asynchrone futur, réussi ou échoué.|Un composant React.|Une variable immuable.",
  "Quel bénéfice TypeScript apporte-t-il ?|Un système de types statiques à JavaScript.|Le remplacement des navigateurs.|Des tests end-to-end automatiques.",
  "Quelle clause SQL lit des données ?|SELECT|UPDATE|DROP",
  "Quelle clause SQL filtre des lignes ?|WHERE|ORDER|CREATE",
  "À quoi sert INNER JOIN ?|Combiner des lignes de tables selon une condition.|Supprimer une colonne.|Chiffrer une table.",
  "Quel est le rôle d'une clé primaire ?|Identifier chaque ligne de façon unique.|Trier les colonnes.|Sauvegarder la base.",
  "Pourquoi ajouter un index SQL ?|Accélérer certaines recherches, avec un coût possible en écriture.|Empêcher toutes les suppressions.|Rendre les données secrètes.",
  "Qu'est-ce qu'un test unitaire ?|Un test isolé d'une petite unité de code.|Un test uniquement en production.|Un test de tous les écrans.",
  "Que vérifie un test d'intégration ?|Que plusieurs composants fonctionnent ensemble.|La couleur d'une icône.|La syntaxe seule.",
  "Quel est le but d'un test de non-régression ?|Éviter de réintroduire un problème corrigé.|Raccourcir le code.|Supprimer des fonctions.",
  "Que signifie CI dans CI/CD ?|Intégration continue.|Code invisible.|Compilation isolée.",
  "Que signifie CD dans CI/CD ?|Livraison ou déploiement continu.|Code dynamique.|Copie de données.",
  "Pourquoi utiliser des variables d'environnement ?|Séparer configuration et secrets du code.|Accélérer le CSS.|Renommer les utilisateurs.",
  "Quel bénéfice apporte HTTPS ?|Il chiffre les échanges client-serveur.|Il remplace l'authentification.|Il empêche tous les bugs.",
  "Un hachage de mot de passe est…|Une transformation à sens unique, stockée avec un sel adapté.|Un chiffrement réversible.|Une compression d'image.",
  "Différence entre chiffrement et hachage ?|Le chiffrement est déchiffrable avec une clé, le hachage non.|Le hachage est toujours plus court.|Ce sont des synonymes.",
  "Qu'est-ce qu'une attaque XSS ?|L'injection de scripts malveillants dans une page.|Une panne réseau.|Un conflit Git.",
  "Quelle pratique évite les injections SQL ?|Utiliser des requêtes paramétrées.|Concaténer les entrées dans la requête.|Cacher la base dans du CSS.",
  "À quoi sert CORS ?|Définir les autorisations entre origines différentes.|Compresser HTTP.|Créer des utilisateurs.",
  "Quel est l'objectif d'un cache ?|Réutiliser des données pour réduire temps et charge.|Écrire les logs plus lentement.|Remplacer toujours la base.",
  "À quoi sert un load balancer ?|Distribuer le trafic entre plusieurs serveurs.|Augmenter JavaScript.|Créer des mots de passe.",
  "Docker sert principalement à…|Empaqueter une application et ses dépendances dans des conteneurs.|Écrire le CSS visuellement.|Remplacer Git.",
  "Un conteneur Docker partage généralement quoi avec l'hôte ?|Le noyau du système d'exploitation.|Les données privées de tous.|La même IP publique.",
  "Qu'est-ce que refactorer ?|Améliorer la structure sans changer le comportement attendu.|Ajouter une fonction sans tests.|Supprimer les commentaires.",
  "Quel est un intérêt de la revue de code ?|Partager les connaissances et détecter des problèmes.|Remplacer les tests.|Mesurer la frappe.",
  "Que doit contenir un README utile ?|Installation, utilisation et contribution.|Goûts musicaux de l'équipe.|Mots de passe de développement."
], [10, 1, 4]), 'dev');

const categories = {
  chaos: {
    name: 'Code & chaos',
    hint: 'Choisis avec ton cœur. Ou avec Stack Overflow.',
    questions: chaosQuestions,
    profiles: [
      { min: 0, emoji: '🧯', title: 'Stagiaire du chaos organisé', copy: "Tu n'as peut-être pas résolu le bug, mais tu as identifié son énergie. Un console.log bien placé est déjà une forme de cartographie.", tags: ['panique élégante', 'café prudent', 'branche à surveiller'] },
      { min: 46, emoji: '🧑‍💻', title: 'Développeur probablement fonctionnel', copy: "Tu reconnais un faux petit changement, un TODO historique et une réunion qui aurait dû être un message. Ton code a des secrets, mais il les assume.", tags: ['debug instinctif', 'TODO réaliste', 'survie en prod'] },
      { min: 71, emoji: '🧙', title: 'Sorcier du terminal certifié-ish', copy: "Tu as le sens du commit, l'instinct du rollback et la méfiance saine envers les déploiements du vendredi. Tes erreurs ont peur de toi.", tags: ['rebase mystique', 'merge élégant', 'humour défensif'] },
      { min: 91, emoji: '🦄', title: 'Légende du code intergalactique', copy: "Tu es soit un vrai développeur, soit trois chats dans un trench-coat qui ont lu toute la documentation. Dans les deux cas, respect.", tags: ['prod apaisée', 'regex domptée', 'branche protégée'] }
    ]
  },
  dev: {
    name: 'Vrai développement',
    hint: 'Une bonne réponse vaut 10 points. La documentation est autorisée dans la vraie vie.',
    questions: devQuestions,
    profiles: [
      { min: 0, emoji: '🌱', title: 'Curieux du clavier', copy: "Savoir où chercher compte autant que savoir répondre. Garde la documentation ouverte et avance une question à la fois.", tags: ['apprentissage actif', 'docs ouvertes', 'curiosité solide'] },
      { min: 46, emoji: '🛠️', title: 'Constructeur de features', copy: "Les fondamentaux sont là. Tu circules entre Git, HTTP, tests et navigateur sans trop perdre ton sac à dos.", tags: ['Git prêt', 'web solide', 'tests en vue'] },
      { min: 71, emoji: '🚀', title: 'Ingénieur de terrain', copy: "Très bon niveau : tu combines les concepts et sais pourquoi les détails comptent. Tes pull requests ont probablement des phrases complètes.", tags: ['API fiable', 'sécurité éveillée', 'revue utile'] },
      { min: 91, emoji: '🧠', title: 'Architecte du bug évité', copy: "Impressionnant. Tu sembles connaître le web, le code et le pouvoir apaisant d'un bon README. Évite simplement la prod le vendredi soir.", tags: ['fondamentaux maîtrisés', 'déploiement serein', 'documentation sacrée'] }
    ]
  }
};

const questionNumber = document.querySelector('#question-number');
const quizCategory = document.querySelector('#quiz-category');
const quizTitle = document.querySelector('#quiz-title');
const progressBar = document.querySelector('#progress-bar');
const questionKicker = document.querySelector('#question-kicker');
const questionText = document.querySelector('#question-text');
const answers = document.querySelector('#answers');
const currentScore = document.querySelector('#current-score');
const nextButton = document.querySelector('#next-button');
const tinyHint = document.querySelector('#tiny-hint');
const quizFrame = document.querySelector('#quiz-frame');
const resultCard = document.querySelector('#result-card');
const resultEmoji = document.querySelector('#result-emoji');
const scoreNumber = document.querySelector('#score-number');
const resultTitle = document.querySelector('#result-title');
const resultCopy = document.querySelector('#result-copy');
const resultTags = document.querySelector('#result-tags');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const categoryButtons = document.querySelectorAll('.category-option');

let selectedCategory = null;
let activeQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedScore = null;

function randomQuestions(pool) {
  const usedSources = new Set();
  const selected = [];

  for (const question of shuffle(pool)) {
    if (!usedSources.has(question.source)) {
      selected.push({ ...question, answers: shuffle(question.answers) });
      usedSources.add(question.source);
    }
    if (selected.length === QUESTION_COUNT) break;
  }

  return selected;
}

function displayQuestion() {
  const item = activeQuestions[currentQuestion];
  const category = categories[selectedCategory];
  const number = String(currentQuestion + 1).padStart(2, '0');
  questionNumber.textContent = number;
  quizCategory.textContent = category.name;
  questionKicker.textContent = category.name.toUpperCase() + ' · QUESTION N°' + number;
  quizTitle.textContent = currentQuestion === 0 ? 'C’est parti, sans pression.' : 'Tu t’en sors avec panache.';
  questionText.textContent = item.text;
  progressBar.style.width = ((currentQuestion + 1) / QUESTION_COUNT) * 100 + '%';
  nextButton.disabled = true;
  nextButton.innerHTML = currentQuestion === QUESTION_COUNT - 1 ? 'Voir mon verdict <span aria-hidden="true">→</span>' : 'Question suivante <span aria-hidden="true">→</span>';
  selectedScore = null;
  answers.innerHTML = '';

  item.answers.forEach(([label, points], index) => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.type = 'button';
    button.innerHTML = '<span class="answer-letter">' + String.fromCharCode(65 + index) + '</span><span>' + label + '</span>';
    button.addEventListener('click', () => selectAnswer(button, points));
    answers.appendChild(button);
  });
}

function selectAnswer(button, points) {
  document.querySelectorAll('.answer').forEach(answer => answer.classList.remove('selected'));
  button.classList.add('selected');
  selectedScore = points;
  nextButton.disabled = false;
  tinyHint.textContent = 'Réponse enregistrée dans un endroit très peu sécurisé.';
}

function showResults() {
  const finalScore = Math.round((score / (QUESTION_COUNT * 10)) * 100);
  const profile = [...categories[selectedCategory].profiles].reverse().find(item => finalScore >= item.min);
  quizFrame.hidden = true;
  resultCard.hidden = false;
  resultEmoji.textContent = profile.emoji;
  scoreNumber.textContent = finalScore;
  resultTitle.textContent = profile.title;
  resultCopy.textContent = profile.copy;
  resultTags.innerHTML = profile.tags.map(tag => '<span>' + tag + '</span>').join('');
  restartButton.innerHTML = 'Nouveau tirage <span aria-hidden="true">↻</span>';
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function advanceQuiz() {
  if (selectedScore === null) return;
  score += selectedScore;
  currentScore.textContent = score;
  if (currentQuestion === QUESTION_COUNT - 1) {
    showResults();
    return;
  }
  currentQuestion += 1;
  tinyHint.textContent = categories[selectedCategory].hint;
  displayQuestion();
}

function startQuiz() {
  if (!selectedCategory) return;
  activeQuestions = randomQuestions(categories[selectedCategory].questions);
  currentQuestion = 0;
  score = 0;
  currentScore.textContent = score;
  resultCard.hidden = true;
  quizFrame.hidden = false;
  tinyHint.textContent = categories[selectedCategory].hint;
  displayQuestion();
  document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function chooseCategory(categoryName) {
  selectedCategory = categoryName;
  categoryButtons.forEach(button => {
    const selected = button.dataset.category === categoryName;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  startButton.disabled = false;
  startButton.innerHTML = 'Commencer : ' + categories[categoryName].name + ' <span aria-hidden="true">→</span>';
}

categoryButtons.forEach(button => button.addEventListener('click', () => chooseCategory(button.dataset.category)));
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', advanceQuiz);
restartButton.addEventListener('click', startQuiz);
