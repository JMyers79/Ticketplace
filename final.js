let bool = true;
let panel_class;
const setUp = () =>{
    concertSet();
    addText();
    $(".card").on("click", addText);
};

const concertSet = () =>{

concerts.forEach((concert)=>{
   let concertLine  = $(`<div class = "card"><div class = "cardContent"> 
    <h2> ${concert.artist}</h2>
    <img src = "${concert.image}">
    <p id= "about"> ${concert.about}</p>
     </div>
     </div>`);

   console.log('task complete')
   $(".wrapper").append(concertLine);
   $('p').hide();

});
};



const addText = () =>{
    console.log("Bool = ", bool)
    if(bool == true ){
        let crud = $(`  <div class = "showInfo"></div>
                        <div class = "crud_buttons">
                        <button class = "view">Read</button>
                        <button class = "update">Update</button>
                        <button class = "delete">Delete</button>`)
        $(".card").append(crud);
       bool = false;}

$(".crud_buttons button").on("click", (e) => {
    const target = $(e.target);
    // Examine the target object - this will give the class of the item
    console.log(target);
    console.log(target["0"]);
    handler(target["0"]);
  });
}

const handler = (element) => {
  console.log(element);
  let elementClass = element.className;
  console.log(elementClass);
  let indexOfConcert= $(`button.${elementClass}`).index(element);
  if (elementClass == "view") {
    viewHandler(indexOfConcert);
    console.log("read")
  } else if ((elementClass == "update")) {
    updateHandler(indexOfConcert);
  } else if (elementClass == "delete") {
    removeHandler(indexOfConcert);
  }
};

const viewHandler = (index) => {

    let info = $(".showInfo:eq(" + index + ")");
    console.log("INFO", info);
    info.html(`${concerts[index].about}!!<button class = "close">X</button>`);
    console.log("sucess")
  // Add the details to the display area
    info.find(".close").on("click", () => {
      setTimeout(function () {
        // !!! Use .html to reset the content
        info.html("");
      }, 1000);
    });
  };

  const updateHandler = (index) => {
    let concertUpdate = $(".showInfo").eq(index);
    console.log("update sucess")

    let updateLine = $(`
      <div class = "update">
      <input type = "text" id = "updateArtist" value= '${concerts[index].artist}' size = "25">
      <input type = "text" id = "updateAbout" value= '${concerts[index].about}' size = "40">
      <button class="saveUpdate">save</button></div>`);

      
   concertUpdate.html(updateLine);

      $(".saveUpdate").on("click", function (){
          concerts[index] = {
            artist: $("#updateArtist").val(),
            about: $("#updateAbout").val()
          };

          let updateCard = $(".card:eq(" + index + ")"); 
          updateCard.find("h2").text(concerts[index].artist); 
          updateCard.find("p.about").text(concerts[index].about);

          updateLine.remove();


      });



    $(".cardContent button").on("click", (e) => {
      const target = $(e.target);
      console.log(target);
      console.log(target["0"]);
      handler(target["0"]);
    });

  }

  const removeHandler = (index) => {
    console.log("removing")
    let itemRemove = $(".card").eq(index);
    itemRemove.remove();
    concerts.splice(index,1);
    console.log(concerts);

  };

  const createConcert = (index) => {
    $("button.add").prop("disabled", true);
    let newArtist = $(`<input type = "text" id = "newArtist" size = "30" value = "Artist" />`)

    let newAbout = $(`<input type = "text" id = "newAbout" size = "60" value = "About" />`)

    let newImage = $(`<input type = "text" id = "newImage" size = "40" value = "Image" />
      .<button class="saveNew">Save</button>`)
    $(".add").after(newImage);
    $(".add").after(newAbout);
    $(".add").after(newArtist);

    $(".saveNew").on("click", function () {
    let newConcert = {
      artist: $("input#newArtist").val(),
      about: $("input#newAbout").val(),
      image: $("input#newImage").val()
    }
    concerts.push(newConcert);
    console.log(concerts)
    let area = $(`.concerts .${panel_class}`);


    let concertLine = $(`<div class="card"> 
      <div class="cardContent">
         <h2>${newConcert.artist}</h2> 
         <p class="about">${newConcert.about}</p>
         <img src="${newConcert.image}">
         <div class = "showInfo"></div>
         <div class = "crud_buttons"><button class="view">Read</button><button class="update">Update</button><button class="delete">Delete</button></div>`);
         $(".wrapper").append(concertLine);
         $('.about').hide();

         $(".cardContent button").on("click", (e) => {
          const target = $(e.target);
          console.log(target);
          console.log(target["0"]);
          handler(target["0"]);
        });
    
    
    })
  }

  $(document).on("click", ".add" , createConcert);



$(document).ready(setUp);
