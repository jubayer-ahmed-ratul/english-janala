const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")  //promise of response
    .then(response =>response.json()) //promise of json data
    .then(jsonData=>displayLesson(jsonData.data))
}


const loadLevelWord=(id)=>{
    
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    // .then(data=>console.log(data))
    .then(data=>displayLevelWord(data.data))

}


displayLevelWord=(words)=>{
    // console.log(words)
    const wordcontainer =document.getElementById("word-container")
    wordcontainer.innerHTML=""

    words.forEach(element => {
        console.log(element)
        const card=document.createElement("div");
        card.innerHTML=`
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 ">
            <h2 class="font-bold text-2xl">${element.word}</h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <p class="font-bangla text-2xl font-semiboldbold">"${element.meaning}/${element.pronunciation}"</p>

            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

            </div>

        </div>
        `

        wordcontainer.append(card)
        
    });


}

const displayLesson=(lessons)=>{
    // console.log(lessons)

    //step-1 => GET THE CONTAINER AND EMPTY
    const levelContainer =document.getElementById("level-container");
    levelContainer.innerHTML=""

    



    //step-2 => GET INTO EVERY LESSON
    for(let lesson of lessons){
        //3 step-3 => CREATE ELEMENT
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
                   <button onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `



        
    4//step-4 =>APPEND INTO CONTAINER
    levelContainer.append(btnDiv)
    }


    


}

loadLessons()