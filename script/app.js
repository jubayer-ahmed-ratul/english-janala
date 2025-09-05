const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")  //promise of response
    .then(response =>response.json()) //promise of json data
    .then(jsonData=>displayLesson(jsonData.data))
}

const displayLesson=(lessons)=>{
    // console.log(lessons)

    //step-1 => GET THE CONTAINER AND EMPTY
    const levelContainer =document.getElementById("level-container");
    levelContainer.innerHTML=""

    console.log(lessons)



    //step-2 => GET INTO EVERY LESSON
    for(let lesson of lessons){
        //3 step-3 => CREATE ELEMENT
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
                   <button href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `



        
    4//step-4 =>APPEND INTO CONTAINER
    levelContainer.append(btnDiv)
    }


    


}

loadLessons()