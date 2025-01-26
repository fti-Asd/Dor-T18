function addToList(latitude,longitude){
    if(latLangList.length < 50){

        let isExist = latLangList.find((item,index)=> {
            if(item.lat === latitude && item.lang === longitude){
                return true;
            }
        });
        // console.log(isExist);

        if(!isExist){
            latLangList.push({ lat:latitude, lang:longitude }); 
            renderList(); 
            saveToLocalStorage();
        }else{
            Swal.fire({
                icon: "error",
                title: "not allowed!",
                text: "you can't add repeated items.",
            });
        }
    }else{
        Swal.fire({
            icon: "error",
            title: "not allowed!",
            text: "you can't add more than 50 items.",
        });
    }  
}