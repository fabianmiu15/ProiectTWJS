/// - modificarea stilului unui element sau al unui grup de elemente
/// Implementam un buton in partea din dreapta jos a paginii pentru schimbarea temei

const body = document.body; 
const themeToggleButton = document.createElement("button");
const figcaptions = document.querySelectorAll("figcaption"); // Selectam descrierile imaginilor - manipularea DOM-ului
const saveLivesText = document.querySelector("#myanimation .containerheart p"); // Selectam textul imediat de deasupra inimii - manipularea DOM-ului

// Stilizam butonul in sine
themeToggleButton.textContent = "Schimbă Tema (Zi / Noapte)";
themeToggleButton.style.position = "fixed";
themeToggleButton.style.bottom = "10px";
themeToggleButton.style.right = "10px";
themeToggleButton.style.padding = "10px 20px";
themeToggleButton.style.backgroundColor = "#333"; // Negru
themeToggleButton.style.color = "#fff"; // Alb
themeToggleButton.style.border = "none";
themeToggleButton.style.borderRadius = "5px";
themeToggleButton.style.cursor = "pointer";

/// Adaugam butonul in document
document.body.appendChild(themeToggleButton);

let isNight = localStorage.getItem("theme") === "night";
function applyTheme()
{
  if (isNight) 
    {
      // Schimbam tema pentru fundal si text
      body.style.backgroundColor = "#252222"; // Culoare pentru fundal intunecat
      body.style.color = "#B09090"; // Culoare pentru text
      themeToggleButton.style.backgroundColor = "#e0e0e0"; // Culoare pentru buton 
      themeToggleButton.style.color = "#121212"; // Culoare pentru textul din buton

      // Schimbam culoarea figcaptions
      figcaptions.forEach(caption => 
      {
        caption.style.color = "#FFD700"; // Auriu
      });

      // Schimbam culoarea textului de deasupra inimii
      saveLivesText.style.color = "#FFD700"; // Auriu
    }
    else 
    {
      // Revenim la tema de zi
      body.style.backgroundColor = "#FFCDD2"; // Culoarea fundalului original
      body.style.color = "#212121"; 
      themeToggleButton.style.backgroundColor = "#333"; // Negru
      themeToggleButton.style.color = "#fff"; // Alb

      // Resetam culoarea figcaptions
      figcaptions.forEach(caption => 
      {
        caption.style.color = "#333";
      });
      // Resetam culoarea textului de deasupra inimii
      saveLivesText.style.color = "#333";
    }
};

applyTheme();
// Eveniment pentru schimbarea temei si salvarea in localStorage 
themeToggleButton.addEventListener("click", () => 
{
  isNight = !isNight;
  localStorage.setItem("theme", isNight ? "night" : "day"); // Salvam tema in localStorage 
  applyTheme(); // Aplicam tema
});

// - crearea și stergerea de elemente HTML
/// Implementam butonul din dreapta jos pentru adaugarea de informatii suplimentare
const main = document.querySelector("main");
const addInfoButton = document.createElement("button");

// Stilizam butonul in sine
addInfoButton.textContent = "Adaugă informații suplimentare";
addInfoButton.style.position = "fixed";
addInfoButton.style.bottom = "50px";
addInfoButton.style.right = "10px";
addInfoButton.style.padding = "10px 20px";
addInfoButton.style.backgroundColor = "#4CAF50";
addInfoButton.style.color = "#fff"; // Alb
addInfoButton.style.border = "none";
addInfoButton.style.borderRadius = "5px";
addInfoButton.style.cursor = "pointer";

// Adaugam butonul in document
document.body.appendChild(addInfoButton);

// Functia pentru adaugarea sectiunii de informatii suplimentare
let infoSectionAdded = false;
addInfoButton.addEventListener("click", () => 
{
  if (!infoSectionAdded) 
  {
    const infoSection = document.createElement("section");
    infoSection.id = "info-section";
    infoSection.innerHTML = `
      <h2>Știați că...</h2>
      <ul>
        <li>... în cazul unei hemoragii nazale (epistaxis), este greșit să ridicăm mâna stângă sau să dăm capul pe spate?</li>
        <li>... în cazul unei arsuri, este greșit să aplicăm peste aceasta albuș de ou sau gheață?</li>
        <li>... în cazul unei degerături, este greșit să turnăm peste aceasta apă fierbinte?</li>
        <li>... în cazul unei înțepături de insectă, nu trebuie să utilizăm o pensetă pentru a scoate acul înfipt în piele?
        <li>... nu există nicio metodă de contracepție cu rată de eficiență 100%, cu excepția abstinenței?</li>
        Participă la cursurile de prim ajutor organizate de Crucea Roșie Română pentru a afla soluțiile acestor curiozități!
      </ul>
      <button id="remove-info-button" style="margin-top: 20px; padding: 10px 20px; background-color: #f44336; color: #fff; border: none; border-radius: 5px; cursor: pointer;">
        Ascunde informațiile suplimentare
      </button>
      `;

    // Adaugam sectiunea in DOM, la sfarsitul main
    main.appendChild(infoSection);
    infoSectionAdded = true;

    // Selectam butonul de stergere si adaugam eveniment
    const removeInfoButton = document.getElementById("remove-info-button");
    removeInfoButton.addEventListener("click", () => 
    {
      infoSection.remove(); 
      infoSectionAdded = false;
    });
  }
});

// - folosirea și modificarea evenimentelor generate de mouse si tastatura
// Scroll to top pe tasta 'T'
document.addEventListener("keydown", (event) => 
{
  // Verifica daca apasarea tastei provine dintr-un camp de input sau formular
  if (event.target.tagName.toLowerCase() === "input" || event.target.tagName.toLowerCase() === "textarea" || event.target.closest("form")) // folosirea proprietatii target 
  { // Daca da, nu facem scroll
    event.stopPropagation(); // folosirea metodei stopPropagation() pentru a nu afecta alte elemente 
    return;
  }

  if (event.key.toLowerCase() === "t") 
  { // case insensitive
    event.preventDefault(); // Previne comportamentul implicit al tastei 'T'
    window.scrollTo
    ({
      top: 3, // specifica pozitia verticala la care sa deruleze pagina - 3px de la marginea superioara
      behavior: "smooth",
    });
  }
});


// Schimbare opacitate si bordura la trecerea mouse-ului peste imaginile cu tipuri de accidente
const images = document.querySelectorAll(".images4p img");
images.forEach((image) => 
{
  image.addEventListener("mouseenter", () => 
  { // - modificare de proprietati
    image.style.opacity = "0.8";
    image.style.border = "5px solid #ff4d4d"; // Bordura rosie la trecerea mouse-ului
    image.style.transition = "all 0.3s ease-in-out"; // all - toate prorpeitatile CSS ale elementului sunt modificate
  });
  image.addEventListener("mouseleave", () => 
  {
    image.style.opacity = "1"; // Revenim la opacitatea originala
    image.style.border = "none"; // Eliminam bordura
  });
});

// - inputuri funcționale (de exemplu: input de tip text/range/number/radio/checkbox, select, textarea)
// Realizăm un quiz de verificare
const startQuizButton = document.createElement("button");
startQuizButton.textContent = "Începe Quiz-ul!";
startQuizButton.style.position = "fixed";
startQuizButton.style.bottom = "90px";
startQuizButton.style.right = "10px";
startQuizButton.style.padding = "10px 20px";
startQuizButton.style.backgroundColor = "#2196F3";
startQuizButton.style.color = "#fff";
startQuizButton.style.border = "none";
startQuizButton.style.borderRadius = "5px";
startQuizButton.style.cursor = "pointer";

// Adaugam butonul
document.body.appendChild(startQuizButton);

// Structura quiz-ului
const questions = [
  {
    text: "Care sunt Principiile Fundamentale ale Mișcării Internaționale de Cruce Roșie și Semilună Roșie?",
    options: [
      "Umanitate, Neutralitate, Independență, Imparțialitate, Voluntariat, Unitate, Universalitate",
      "Solidaritate, Umanitate, Egalitate, Neutralitate, Imparțialitate, Independență, Colaborare",
      "Umanitate, Imparțialitate, Libertate, Neutralitate, Egalitate, Unitate, Universalitate",
      "Neutralitate, Umanitate, Imparțialitate, Voluntariat, Libertate, Unitate, Independență",
    ],
    correct: [0],
    type: "single", // tipul de raspuns
  },
  {
    text: "Care sunt cei patru pași în acordarea primului ajutor, în ordine?",
    options: [
      "Apelarea serviciilor de urgență, dacă este necesar; Evaluarea stării victimei / victimelor; Luarea măsurilor de siguranță; Acordarea primului ajutor",
      "Luarea măsurilor de siguranță; Evaluarea stării victimei / victimelor; Apelarea serviciilor de urgență, dacă este necesar; Acordarea primului ajutor",
      "Evaluarea stării victimei / victimelor; Luarea măsurilor de siguranță; Apelarea serviciilor de urgență, dacă este necesar; Acordarea primului ajutor",
      "Acordarea primului ajutor; Luarea măsurilor de siguranță; Evaluarea stării victimei / victimelor; Apelarea serviciilor de urgență, dacă este necesar",
    ],
    correct: [1],
    type: "single",
  },
  {
    text: "Ce informații transmiți atunci când realizezi apelul la 112?",
    options: [
      "Vârsta și numele fiecărei persoane implicate",
      "Numele tău",
      "Locul exact al incidentului",
      "Dacă ai fost martor direct sau doar ai aflat despre incident",
    ],
    correct: [1, 2],
    type: "multiple",
  },
  {
    text: "Care este cel mai afectat organ în cazul unui stop cardio-respirator?",
    options: ["Inima", "Plămânii", "Creierul", "Ficatul"],
    correct: [2],
    type: "single",
  },
  {
    text: "Cum se verifică starea de conștiență?",
    options: [
      "Scutură victima ușor, ciupind-o de obraji, apoi întreab-o dacă se simte confortabil",
      "Scutură victima ușor, lovind-o ușor peste față",
      "Prin „Metoda celor cinci semne”",
      "Scutură victima ușor, apucând-o de umeri, apoi întreab-o cu voce tare: „Sunteți bine, mă auziți?”",
    ],
    correct: [3],
    type: "single",
  },
  {
    text: "În cazul resuscitării cardio-pulmonare la adulți, câte compresii toracice se efectuează?",
    options: ["30", "20", "15", "60"],
    correct: [0],
    type: "single",
  },
  {
    text: "În cazul resuscitării cardio-pulmonare la adulți, câte respirații gură la gură se efectuează?",
    options: ["3", "15", "5", "2"],
    correct: [3],
    type: "single",
  },
  {
    text: "Care sunt aspectele de care trebuie să ținem cont atunci când suspectăm un Accident Vascular Cerebral?",
    options: [
      "Mersul",
      "Auzul",
      "Văzul",
      "Fața",
      "Mirosul",
      "Gustul",
      "Exprimarea",
    ],
    correct: [0, 2, 3, 6],
    type: "multiple",
  },
  {
    text: "Identifică afirmația adevărată:",
    options: [
      "Atunci când se poate efectua resuscitarea cu ajutorul DAE, nu este necesar să efectuăm compresii toracice și insuflații",
      "O persoană intoxicată cu monoxid de carbon poate avea tegumentele de culoare roz",
      "Chiar dacă victima începe să respire, continuăm rescusictarea cardio-pulmonară până la sosirea echipajului medical",
      "Numărul de telefon de urgență european este 911",
    ],
    correct: [1],
    type: "single",
  },
];

// Initializam punctajul
let score = 1; // 1 punct din oficiu
let currentQuestionIndex = 0; // index pentru parcurgerea intrebarilor din array-ul questions in functia showQuestion()

// Start Quiz
startQuizButton.addEventListener("click", () => 
{
  showQuestion();
  startTimer();
});

// Functia pentru afisarea intrebarilor
function showQuestion() 
{
  const question = questions[currentQuestionIndex];
  const quizContainer = document.createElement("div");
  quizContainer.id = "quiz-container";
  quizContainer.style.margin = "20px auto";
  quizContainer.style.padding = "20px";
  quizContainer.style.backgroundColor = "#fff";
  quizContainer.style.borderRadius = "8px";

  // Titlul intrebarii
  const questionTitle = document.createElement("h3");
  questionTitle.textContent = question.text;
  quizContainer.appendChild(questionTitle);

  // Generam optiunile pentru intrebare
  question.options.forEach((option, index) => 
  {
    const optionContainer = document.createElement("div");
    optionContainer.style.margin = "10px 0";

    const input = document.createElement("input");
    const label = document.createElement("label");

    input.type = question.type === "single" ? "radio" : "checkbox";
    input.name = "question";
    input.id = `option-${currentQuestionIndex}-${index}`;
    input.value = index;

    label.htmlFor = input.id; // asociaza elemenetul <label> cu un element <input> in HTML
    label.textContent = option;
    label.style.marginLeft = "10px";

    // Stilizam input-urile si etichetele
    input.style.cursor = "pointer";
    label.style.cursor = "pointer";

    optionContainer.appendChild(input);
    optionContainer.appendChild(label);
    quizContainer.appendChild(optionContainer);
  });

  // Bara de progres
  const progressBarContainer = document.createElement("div");
  progressBarContainer.style.width = "100%";
  progressBarContainer.style.height = "20px";
  progressBarContainer.style.backgroundColor = "#e0e0e0";
  progressBarContainer.style.borderRadius = "5px";
  progressBarContainer.style.marginTop = "20px";

  const progressBar = document.createElement("div");
  progressBar.style.width = "100%";
  progressBar.style.height = "100%";
  progressBar.style.backgroundColor = "#4caf50"; // Verde
  progressBar.style.transition = "width 1s linear";

  progressBarContainer.appendChild(progressBar);
  quizContainer.appendChild(progressBarContainer);

  // Adaugam butonul de validare
  const validateButton = document.createElement("button");
  validateButton.textContent = "Validează";
  validateButton.style.marginTop = "20px";
  validateButton.style.padding = "10px 20px";
  validateButton.style.backgroundColor = "#4CAF50";
  validateButton.style.color = "#fff";
  validateButton.style.border = "none";
  validateButton.style.borderRadius = "5px";
  validateButton.style.cursor = "pointer";

  quizContainer.appendChild(validateButton);
  document.body.appendChild(quizContainer);

  // Gestionam timpul ramas
  let timeRemaining = 10; // 10 secunde pentru fiecare intrebare
  const interval = setInterval(() => 
  { // - folosirea setTimeout sau setInterval
    timeRemaining--;
    const progressWidth = (timeRemaining / 10) * 100; // Progresul scade proportional cu timpul ramas
    progressBar.style.width = `${progressWidth}%`;

    if (timeRemaining <= 0) // Cand timpul a expirat
    {
      clearInterval(interval); // Oprim intervalul
      // Asteptam finalizarea animatiei barii inainte de a trece la urmatoarea intrebare
      setTimeout(() => // Dupa ce timpul pentru raspuns expira, validateQuestion([]) este apelata pentru a trece la urmatoarea intrebare 
      { // setTimeout executa o functie o singura data dupa un interval de timp specificat
        validateQuestion([]); 
      }, 1000); // 1000ms = 1 secunda pentru sincronizarea cu animatia CSS
    }
  }, 1000); // Actualizare, repetare la fiecare secunda


  // Validam raspunsurile utilizatorului
  validateButton.addEventListener("click", () => 
  {
    clearInterval(interval); // Oprim intervalul la validare
    const selectedOptions = Array.from( // pentru map
    quizContainer.querySelectorAll("input:checked") // Selecteaza toate elementele <input> care sunt bifate in containerul quizContainer
  ).map((input) => parseInt(input.value)); // Parcurge fiecare element din lista de <input> bifate si extrage valoarea acestora
    validateQuestion(selectedOptions); // Validam raspunsurile
  });

  // Functia pentru validarea intrebarii
  function validateQuestion(selectedOptions) 
  {
    if (
      JSON.stringify(selectedOptions.sort()) ===
      JSON.stringify(question.correct.sort()) // sort() pentru a ordona elementele inainte de comparare, raspunsurile selectate si raspunsurile
      // corecte ar putea avea aceleasi valori, dar in ordine diferita
      )   
      {
        score++;
      }
      quizContainer.remove();
      currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) 
    {
      showQuestion();
    } 
    else 
    {
      showResults();
    }
  }
}
  

// Functia pentru afisarea rezultatelor
function showResults() 
{
  const resultsContainer = document.createElement("div");
  resultsContainer.style.margin = "20px auto";
  resultsContainer.style.padding = "20px";
  resultsContainer.style.backgroundColor = "#fff";
  resultsContainer.style.borderRadius = "8px";
  resultsContainer.innerHTML = `
      <h3>Quiz completat!</h3>
      <p>Ai obținut ${score}/10 puncte!</p>`;
  document.body.appendChild(resultsContainer);
}


/// - folosirea a cel puțin unei metode din clasele: Math, Array, String, Date 
// Generam aleatoriu un exercitiu de prim ajutor folosind Math.random()
const exercises = [
  { type: "Stopul cardio-respirator", description: "Vă aflați într-un parc, iar un bărbat de aproximativ 50 de ani care alerga pe pistă se prăbușește brusc la pământ. Nu răspunde la strigătele celor din jur și pare să nu respire. Un alt trecător vă strigă să interveniți, dar nimeni nu știe exact ce să facă. Descrieți cum ați evalua situația și ce pași ați urma pentru a începe resuscitarea cardio-pulmonară." },
  { type: "Intoxicația cu monoxid de carbon", description: "Este iarnă și vă aflați într-o cabană de munte alături de prieteni. În timpul dimineții, unul dintre ei se trezește acuzând o durere de cap severă, amețeli și greață. La scurt timp, începe să devină confuz, iar alt prieten se plânge de simptome similare. Observați că soba din cameră are o flacără galbenă. Descrieți ce s-ar putea întâmpla și cum ați acționa pentru a vă proteja și pentru a ajuta persoanele afectate." },
  { type: "Defibrilator", description: "Simulați utilizarea unui DAE." },
  { type: "Accidentul Vascular Cerebral (AVC)", description: "La o petrecere de familie, bunica dvs. începe să vorbească incoerent, are o asimetrie vizibilă a feței și nu își poate ridica brațul drept. Observați simptomele și vă dați seama că timpul este esențial. Descrieți cum ați recunoaște semnele unui AVC și ce măsuri ați lua pentru a interveni rapid și eficient." },
  { type: "Apel de urgență", description: "Simulați un apel la 112." },
  ];
  
// Functie pentru generarea unui exercitiu aleatoriu
function generateRandomExercise() 
{
  // Alegem un exercitiu aleatoriu
  const randomIndex = Math.floor(Math.random() * exercises.length);
  const selectedExercise = exercises[randomIndex];

  // Transformam textul folosind metode String
  const title = selectedExercise.type.toUpperCase(); // Tipul exercitiului cu litere mari
  const description = selectedExercise.description;

  // Returnam exercitiul formatat
  return { title, description };
}

function displayExercise() 
{
  const exercise = generateRandomExercise();
    
  // Cream un container pentru afisare
  const exerciseContainer = document.getElementById("exercise-container") || document.createElement("div");
  exerciseContainer.id = "exercise-container";
  exerciseContainer.style.textAlign = "center";
  exerciseContainer.style.marginTop = "20px";
  exerciseContainer.style.padding = "20px";
  exerciseContainer.style.backgroundColor = "#e8f5e9";
  exerciseContainer.style.border = "2px solid #4caf50";
  exerciseContainer.style.borderRadius = "8px";
  exerciseContainer.style.fontSize = "1.2rem";
  exerciseContainer.style.color = "#333";

  // Afisam exercitiul
  exerciseContainer.innerHTML = `
    <h2>${exercise.title}</h2>
    <p>${exercise.description}</p>
  `;

  // Adaugam containerul in pagina
  if (!document.getElementById("exercise-container")) 
  {
    document.body.appendChild(exerciseContainer);
  }
}
  
// Cream un buton pentru generarea exercitiilor
const generateButton = document.createElement("button");
generateButton.textContent = "Generează Exercițiu";
generateButton.style.display = "block";
generateButton.style.margin = "20px auto";
generateButton.style.padding = "10px 20px";
generateButton.style.backgroundColor = "#4caf50";
generateButton.style.color = "#fff";
generateButton.style.border = "none";
generateButton.style.borderRadius = "5px";
generateButton.style.cursor = "pointer";
  

document.body.appendChild(generateButton);
// Adaugam eveniment pentru generarea exercitiilor
generateButton.addEventListener("click", displayExercise);
  

document.body.appendChild(generateButton);


// - folosirea canvas
// - schimbarea aleatoare a valorilor unei proprietăți (de exemplu: culoare, dimensiuni, poziție)
// Desenam o cruce rosie care isi schimba culoarea la fiecare secunda
// Selectam sectiunea "Apel de urgenta" din HTML
const emergencyCallSection = document.querySelector(".emergency-call");

// Cream elementul canvas si il adaugam in sectiunea "Apel de urgenta"
const canvas = document.createElement("canvas");
canvas.width = 100; // Dimensiuni mai mici pentru cruce
canvas.height = 100;
canvas.style.display = "block"; // Ocupa toata latimea disponibila si incepe pe o linie noua
canvas.style.margin = "10px auto"; // Centrare in interiorul sectiunii
emergencyCallSection.prepend(canvas); // Adaugam canvas-ul la inceputul sectiunii

// Obtinem contextul de desenare
const ctx = canvas.getContext("2d");

// Functie pentru generarea unei nuante aleatorii de rosu
function getRandomRedShade() 
{
  const r = 200 + Math.floor(Math.random() * 56); // Valori intre 200 si 255 pentru rosu
  const g = Math.floor(Math.random() * 50); // Valori mici pentru verde (0-50)
  const b = Math.floor(Math.random() * 50); // Valori mici pentru albastru (0-50)
  return `rgb(${r}, ${g}, ${b})`;
}

// Functie pentru desenarea crucii rosii
function drawRedCross() 
{
  // Setam fundalul alb
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenam bara verticala a crucii
  ctx.fillStyle = getRandomRedShade(); // Generam o culoare aleatorie
  ctx.fillRect(35, 10, 30, 80); // x, y, latime, inaltime

  // Desenam bara orizontala a crucii
  ctx.fillRect(10, 35, 80, 30); // x, y, latime, inaltime
}

// Functie pentru schimbarea culorii crucii la intervale regulate
function startColorChange() 
{
  setInterval(drawRedCross, 1000); // Actualizam crucea la fiecare secundă
}

// Initializam crucea si incepem schimbarea culorii
drawRedCross();
startColorChange();

// - validarea datelor dintr-un formular folosind expresii regulate
// Selectam formularul
const registrationForm = document.getElementById("registration-form");

// Adaugam evenimentul pentru validare la trimiterea formularului
registrationForm.addEventListener("submit", (event) => 
{
  event.preventDefault(); // Prevenim trimiterea formularului
  // Obtinem valorile din formular
  const nume = document.getElementById("nume").value.trim();
  const data = document.getElementById("data").value.trim();
  const varsta = document.getElementById("varsta").value.trim();
  const cnp = document.getElementById("cnp").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const adresa = document.getElementById("adresa").value.trim();

  // Definim expresiile regulate
  const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/; // Prenume Nume
  const cnpRegex = /^[1-8]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{6}$/; // Format CNP
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format email valid
  const phoneRegex = /^07\d{8}$/; // Format romanesc pentru telefon (07 urmat de 8 cifre)
  const ageRegex = /^[1-9][0-9]$/;

  // Verificam fiecare camp
  if (!nameRegex.test(nume)) 
  {
    alert("Numele trebuie să fie în formatul: Prenume Nume (ex: Ion Popescu).");
    return;
  }
  if (!ageRegex.test(varsta)) 
  {
    alert("Vârsta este invalidă.");
    return;
  }
  if (!cnpRegex.test(cnp)) 
  {
    alert("CNP-ul este invalid. Verificați formatul.");
    return;
  }
  if (!emailRegex.test(email)) 
  {
    alert("Adresa de email este invalidă.");
    return;
  }
  if (!phoneRegex.test(telefon)) 
  {
    alert("Numărul de telefon trebuie să fie în format românesc (ex: 0712345678).");
    return;
  }
  if (!adresa || adresa.length < 10) 
  {
    alert("Adresa trebuie să aibă minim 10 caractere.");
    return;
  }
  // Daca toate caampurile sunt valide
  alert("Formular trimis cu succes!");
  registrationForm.reset();
});


// - cereri Ajax cu preluare date dintr-un fișier json
// Cream un buton pentru a incarca cursurile
const loadCoursesButton = document.createElement("button");
loadCoursesButton.textContent = "Afișează cursurile disponibile";
loadCoursesButton.style.display = "block";
loadCoursesButton.style.margin = "20px auto";
loadCoursesButton.style.padding = "10px 20px";
loadCoursesButton.style.backgroundColor = "#2196F3";
loadCoursesButton.style.color = "#fff";
loadCoursesButton.style.border = "none";
loadCoursesButton.style.borderRadius = "5px";
loadCoursesButton.style.cursor = "pointer";

document.body.appendChild(loadCoursesButton);
const coursesContainer = document.createElement("div");
coursesContainer.id = "courses-container";
coursesContainer.style.margin = "20px auto";
coursesContainer.style.padding = "20px";
coursesContainer.style.backgroundColor = "#f9f9f9";
coursesContainer.style.border = "1px solid #ccc";
coursesContainer.style.borderRadius = "8px";
coursesContainer.style.maxWidth = "600px";
coursesContainer.style.display = "none"; // Initial, ascundem containerul
document.body.appendChild(coursesContainer);

// Functia pentru preluarea datelor din JSON
async function loadCourses() // async - functia returneaza o promisiune; vom folosi await
{
  try 
  {
    const response = await fetch("cursuri.json"); // Cerere HTTP catre fisierul JSON; await - asteptam raspunsul de la server inainte de a continua executia codului
    if (!response.ok) // Verificam daca cererea a avut succes
    {
      throw new Error("Eroare la încărcarea cursurilor.");
    }
    const courses = await response.json(); // Dupa ce raspunsul a fost verificat, il convertim in obiect JSON utilizabil
    displayCourses(courses); // Afisam cursurile pe pagina
  } 
  catch (error) // Daca apare o eroare in orice punct din blocul try 
  {
    alert(error.message); // Afisam o eroare in caz de esec
  }
}

// Functia pentru afisarea cursurilor
function displayCourses(courses) 
{
  coursesContainer.innerHTML = "<h3>Cursuri disponibile:</h3>";
  courses.forEach((course) => 
  {
    const courseElement = document.createElement("div");
    courseElement.style.marginBottom = "15px";
    courseElement.style.padding = "10px";
    courseElement.style.borderBottom = "1px solid #ccc";
    courseElement.innerHTML = `
      <h4>${course.titlu}</h4>
      <p><strong>Durata:</strong> ${course.durata}</p>
      <p>${course.descriere}</p>
    `;
    coursesContainer.appendChild(courseElement);
  });
  coursesContainer.style.display = "block"; // Afisam containerul
}

loadCoursesButton.addEventListener("click", loadCourses);

// - sesiuni: e.g. login/logout (folosind Storage / fisier json)
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const logoutSection = document.getElementById("logout-section");
const welcomeMessage = document.getElementById("welcome-message");
const logoutButton = document.getElementById("logout-button");

// Incarcam utilizatorii din fisierul JSON
async function fetchUsers() 
{
  try 
  {
      const response = await fetch("users.json");
      if (!response.ok) 
      {
        throw new Error("Eroare la încărcarea utilizatorilor");
      }
      return await response.json();
  } 
  catch (error) 
  {
    console.error("Eroare:", error.message);
    return [];
  }
}

// Functie pentru autentificare
async function login(event) 
{
  event.preventDefault(); // Previne refresh-ul paginii (comportamentul default al formularului)
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim(); // .trim() elimina spatiile albe de la inceputul si sfarsitul unui sir de caractere
  const users = await fetchUsers();
  // Verifica utilizator si parola
  const user = users.find((u) => u.username === username && u.password === password); // Cautam in lista de utilizatori un obiect care are un username si un password care coincid cu datele introduse de utilizator; Daca exista, este salvat, daca nu, user va fi undefined
  if (user) 
  {
    // Salveaza sesiunea in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    updateUI(user);
  }
  else 
  {
    alert("Utilizator sau parolă incorectă!");
  }
}

// Functie pentru logout
function logout() 
{
  localStorage.removeItem("loggedInUser"); // Sterge sesiunea
  updateUI(null);
}

// Actualizam UI-ul in functie de sesiune
function updateUI(user) 
{
  if (user) 
  {
    // Utilizator autentificat
    loginForm.style.display = "none"; // loginForm va fi ascuns
    logoutSection.style.display = "block"; // logoutSection va fi afisat
    welcomeMessage.textContent = `Bine ai venit, ${user.username}!`;
  } 
  else 
  {
    // Utilizator delogat
    loginForm.style.display = "block"; // Se revine la starea initiala, in care formularul de login este vizibil pentru utilizator
    logoutSection.style.display = "none"; // Se ascunde sectiunea de logout, deoarece utilizatorul nu este conectat
    usernameInput.value = "";
    passwordInput.value = ""; // Campurile de input pentru utilizator si parola sunt resetate la siruri goale
  }
}


function init() // Initializeaza comportamentul atunci cand pagina este incarcata; Verifica daca exista un utilizator autentificat si ataseaza evenimentele la butoanele de login si logout 
{
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // Conversia JSON salvat in localStorage inapoi intr-un obiect JavaScript pentru a putea fi utilizat 
  updateUI(loggedInUser);
  loginForm.addEventListener("submit", login);
  logoutButton.addEventListener("click", logout);
}

init();
