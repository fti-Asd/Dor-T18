function updateLatLangList(index,newLatitude,newLongitude){

    if(editingIndex === index){
        latlangList[index] = { lat: newLatitude, lang: newLongitude };
        console.log("updateLatLangList: ",latlangList);
        renderList();
    }
}