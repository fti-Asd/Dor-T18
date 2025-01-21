function addToList(latitude,longitude){
    if(latLangList.length < 50){
        latLangList.push({ lat:latitude, lang:longitude }); 
        console.log(latLangList);
        renderList(); 
        saveToLocalStorage()
    }else{
        Swal.fire({
            icon: "error",
            title: "not allowed!",
            text: "you can't add more than 50 items.",
        });
    }  
}