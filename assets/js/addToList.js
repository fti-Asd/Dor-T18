function addToList(latitude,longitude){
    if(latlangList.length < 50){
        latlangList.push({ lat:latitude, lang:longitude }); 
        console.log(latlangList);
        renderList(); 
    }else{
        Swal.fire({
            icon: "error",
            title: "not allowed!",
            text: "you can't add more than 50 items.",
        });
    }  
}