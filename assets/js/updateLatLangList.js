function updateLatLangList(index,newLatitude,newLongitude){

    if(editingIndex === index){
        latLangList[index] = { lat: newLatitude, lang: newLongitude };
        console.log("updateLatLangList: ",latLangList);
        renderList();
        saveToLocalStorage();
    }
}