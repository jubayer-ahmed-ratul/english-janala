// STEP-1: Load all lessons from API
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")  // promise of response
        .then(response => response.json()) // promise of JSON data
        .then(jsonData => displayLesson(jsonData.data)); // pass lesson data to display
};



const removeActive=()=>{
    const lessonButtons=document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons)
    lessonButtons.forEach(btn=> btn.classList.remove("active"));
}


// STEP-2: Load all words from a specific lesson (by id)
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`; // dynamic API endpoint
    fetch(url)
        .then(res => res.json()) // convert response to JSON
        .then(data => {
            removeActive()
            const clickbtn=document.getElementById(`lesson-btn-${id}`); 
            // console.log("btn clicked")// confirm in console that button worked

            clickbtn.classList.add("active")
            displayLevelWord(data.data); // pass words to display function
        });
};


const loadwordDetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    const response=await fetch(url);
    const details=await response.json()
    displayWordDetails(details.data);    
}

const displayWordDetails=(word)=>{
    console.log(word)
    const detailsBox=document.getElementById("details-container");
    // detailsBox.innerHTML=`hi hello`
    detailsBox.innerHTML=` <div>
      <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
    </div>

    <div>
      <h2 class="font-bold">Meaning</h2>
      <p>${word.meaning}</p>
    </div>

    <div>
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
    </div>

    <div>
      <h2 class="font-bold mb-2">Synonym</h2>
      <span class="btn">syn 1 </span>
      <span class="btn">syn 2</span>
      <span class="btn">syn 3</span>
    </div>
`
    document.getElementById("my_modal_5").showModal()

    
}

// STEP-3: Display words of a lesson
const displayLevelWord = (words) => {
    const wordcontainer = document.getElementById("word-container"); // get container
    wordcontainer.innerHTML = ""; // clear previous words

    // CASE: If no words exist in this lesson
    if (words.length === 0) {
        wordcontainer.innerHTML = `
         <div class="bg-sky-100 text-center col-span-full font-bangla rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="text-xl font-medium text-gray-400">এই lesson এ এখনো কোনো vocabulary যুক্ত করা হয় নি</p>
            <h2 class="font-bold text-3xl">নেক্সট lesson এ যান</h2>
         </div>`;
        return;
    }

    // CASE: Words exist -> loop through each word
    words.forEach(element => {
        const card = document.createElement("div"); // create new card
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <!-- Word -->
            <h2 class="font-bold text-2xl">${element.word ? element.word : "শব্দ পাওয়া যায় নি"}</h2>
            
            <!-- Subtitle -->
            <p class="font-semibold">Meaning / Pronunciation</p>
            
            <!-- Meaning + Pronunciation -->
            <p class="font-bangla text-2xl font-semibold">
                ${element.meaning ? element.meaning : "অর্থ পাওয়া যায় নি"} /
                ${element.pronunciation ? element.pronunciation : "উচ্চারণ পাওয়া যায় নি"}
            </p>

            <!-- Action buttons -->
            <div class="flex justify-between items-center">
                <!-- Info button -->
                <button onclick="loadwordDetail(${element.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <!-- Audio button -->
                <button onclick="playPronunciation('${element.pronunciation || ''}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `;
        wordcontainer.append(card); // append card into container
    });
};

// STEP-4: Function to play pronunciation (using SpeechSynthesis API)
const playPronunciation = (text) => {
    if (!text) return alert("কোনো উচ্চারণ পাওয়া যায় নি"); // case: no pronunciation available
    const utterance = new SpeechSynthesisUtterance(text); // create speech object
    utterance.lang = "en-US"; // set language (can switch to bn-BD if supported)
    speechSynthesis.speak(utterance); // speak the word
};

// STEP-5: Display lesson buttons
const displayLesson = (lessons) => {
    // get container and clear it
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // loop through every lesson
    for (let lesson of lessons) {
        // create a button for each lesson
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" 
                    onclick="loadLevelWord(${lesson.level_no})" 
                    class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
            </button>
        `;
        // STEP-6: Append button into container
        levelContainer.append(btnDiv);
    }
};

// STEP-7: Call loadLessons to initialize the page
loadLessons();
