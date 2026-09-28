const questions = [
  {
    text: "Ton code fonctionne du premier coup. Quelle est ta réaction ?",
    answers: [
      ["Je ferme l'ordinateur avant que ça change d'avis.", 10],
      ["Je vérifie qu'il ne s'agit pas du mauvais projet.", 8],
      ["J'envoie un message : ‘c'était prévu’. ", 6]
    ]
  },
  {
    text: "Une erreur dit simplement : ‘undefined is not a function’. Tu…",
    answers: [
      ["ajoutes un console.log et regardes fixement le vide.", 10],
      ["accuses le cache, même sans preuve.", 6],
      ["renommes undefined en defined pour voir.", 2]
    ]
  },
  {
    text: "Il est 17 h 58 et on te demande un ‘petit changement rapide’. Tu…",
    answers: [
      ["demande la définition légale de ‘petit’.", 10],
      ["crées une branche nommée please-no.", 8],
      ["dis ‘bien sûr’ avec le regard d'un naufragé.", 5]
    ]
  },
  {
    text: "Quel est le meilleur nom pour une variable qui contient tout et n'importe quoi ?",
    answers: [
      ["dataFinalV2ReallyFinalOk", 8],
      ["truc", 7],
      ["x, parce que la lisibilité est une aventure.", 10]
    ]
  },
  {
    text: "Tu lis du code écrit par toi il y a six mois. Qui est l'auteur ?",
    answers: [
      ["Un inconnu brillant mais manifestement dangereux.", 10],
      ["Moi, mais dans une autre timeline.", 8],
      ["Un génie incompris. Je ne touche à rien.", 4]
    ]
  },
  {
    text: "La production est en feu. Quelle commande lances-tu d'abord ?",
    answers: [
      ["git status, pour connaître le degré exact du drame.", 10],
      ["un café. Techniquement, c'est une dépendance.", 7],
      ["git push --force, afin de rétablir l'équilibre.", 1]
    ]
  },
  {
    text: "Ton collègue dit ‘ça marche sur ma machine’. Tu réponds :",
    answers: [
      ["‘Super, on peut vendre ta machine ?’", 10],
      ["‘Ta machine est donc notre environnement de prod ?’", 8],
      ["‘Parfait’, puis tu ajoutes trois emojis qui tremblent.", 5]
    ]
  },
  {
    text: "À quoi sert vraiment un TODO dans le code ?",
    answers: [
      ["À transmettre poliment un problème au toi du futur.", 10],
      ["À décorer les fichiers anciens.", 5],
      ["À signaler qu'on avait une excellente idée, autrefois.", 7]
    ]
  },
  {
    text: "Quelle est la meilleure heure pour déployer un gros refactor ?",
    answers: [
      ["Vendredi, 18 h 59 : l'adrénaline aide à apprendre.", 3],
      ["Juste après avoir annoncé ‘ça ne devrait rien casser’.", 8],
      ["Quand les tests, la QA et Mercure sont alignés.", 10]
    ]
  },
  {
    text: "Après 47 onglets de documentation ouverts, tu trouves la solution. Tu…",
    answers: [
      ["copie-colles, puis promets de comprendre plus tard.", 8],
      ["la fermes accidentellement et recommences la quête.", 10],
      ["écris un commentaire mystérieux : ‘ne pas toucher’. ", 7]
    ]
  }
];

const resultProfiles = [
  { min: 0, emoji: "🧯", title: "Apprenti dompteur de bugs", copy: "Tu n'es peut-être pas encore développeur, mais tu as déjà la qualité essentielle : savoir que quelque chose va casser. Commence par respirer, puis sauvegarde souvent.", tags: ["console.log en herbe", "café prudent", "git à découvrir"] },
  { min: 46, emoji: "🧑‍💻", title: "Développeur probablement fonctionnel", copy: "Tu sais reconnaître un bug, un faux ‘petit changement’ et une réunion qui aurait pu être un message. Ton code a parfois des secrets, mais au moins il les assume.", tags: ["debug instinctif", "TODO réaliste", "survie en prod"] },
  { min: 71, emoji: "🧙", title: "Sorcier du terminal certifié-ish", copy: "Tu as le sens du commit, l'instinct du rollback et la méfiance saine envers les déploiements du vendredi. Tes erreurs ont peur de toi. Ou elles se cachent très bien.", tags: ["rebase mystique", "merge élégant", "Stack Overflow bilingue"] },
  { min: 91, emoji: "🦄", title: "Légende du code intergalactique", copy: "Score inquiétant : tu es soit un vrai développeur, soit trois chats dans un trench-coat qui ont lu toute la documentation. Dans les deux cas, nous te respectons profondément.", tags: ["prod apaisée", "regex domptée", "branche principale protégée"] }
];

const questionNumber = document.querySelector('#question-number');
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

let currentQuestion = 0;
let score = 0;
let selectedScore = null;

function displayQuestion() {
  const item = questions[currentQuestion];
  const number = String(currentQuestion + 1).padStart(2, '0');
  questionNumber.textContent = number;
  questionKicker.textContent = `SITUATION CRITIQUE N°${number}`;
  quizTitle.textContent = currentQuestion === 0 ? 'On va être très scientifique.' : 'Tu t’en sors avec panache.';
  questionText.textContent = item.text;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  nextButton.disabled = true;
  nextButton.innerHTML = currentQuestion === questions.length - 1 ? 'Voir mon verdict <span aria-hidden="true">→</span>' : 'Question suivante <span aria-hidden="true">→</span>';
  selectedScore = null;

  answers.innerHTML = '';
  item.answers.forEach(([label, points], index) => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.type = 'button';
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${label}</span>`;
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
  const finalScore = Math.round((score / 100) * 100);
  const profile = [...resultProfiles].reverse().find(item => finalScore >= item.min);
  quizFrame.hidden = true;
  resultCard.hidden = false;
  resultEmoji.textContent = profile.emoji;
  scoreNumber.textContent = finalScore;
  resultTitle.textContent = profile.title;
  resultCopy.textContent = profile.copy;
  resultTags.innerHTML = profile.tags.map(tag => `<span>${tag}</span>`).join('');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function advanceQuiz() {
  if (selectedScore === null) return;
  score += selectedScore;
  currentScore.textContent = score;
  if (currentQuestion === questions.length - 1) {
    showResults();
    return;
  }
  currentQuestion += 1;
  tinyHint.textContent = 'Choisis avec ton cœur. Ou avec Stack Overflow.';
  displayQuestion();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  currentScore.textContent = score;
  resultCard.hidden = true;
  quizFrame.hidden = false;
  tinyHint.textContent = 'Choisis avec ton cœur. Ou avec Stack Overflow.';
  displayQuestion();
  document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

startButton.addEventListener('click', () => document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' }));
nextButton.addEventListener('click', advanceQuiz);
restartButton.addEventListener('click', restartQuiz);

displayQuestion();
