const locationListDiv = document.querySelector(".location-list");
const listUl = document.querySelector(".list");
const deleteAllButton = document.getElementById("delete-all");

let latLangList = [];
let editingIndex = null; 

window.addEventListener('load', () => {
  latLangList = loadFromLocalStorage();
  renderList();
});

listUl.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    const targetId = button.getAttribute("id");
    const targetItem = latLangList[targetId.split("-")[1]];

    latitudeInput.value = targetItem.lat;
    longitudeInput.value = targetItem.lang;


    if (targetId.includes("delete-")) {            
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(targetId);
                latLangList = latLangList.filter((item,index)=>latLangList[index] !== latLangList[targetId.split("-")[1]])
                renderList();
                saveToLocalStorage();

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }else{
        editingIndex = targetId.split("-")[1]
        GeoFormHandler(targetId)
    }
});


deleteAllButton.addEventListener("click", () => {
    if(latLangList.length > 0){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                listUl.innerHTML = "";
                latLangList=[];
                saveToLocalStorage();
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
});
