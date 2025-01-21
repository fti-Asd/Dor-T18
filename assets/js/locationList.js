const locationListDiv = document.querySelector(".location-list");
const listUl = document.querySelector(".list");
const deleteAllButton = document.getElementById("delete-all");

let latlangList = [];
let editingIndex = null; 

listUl.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    const targetId = button.getAttribute("id");
    const targetItem = latlangList[targetId.split("-")[1]];

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
                latlangList = latlangList.filter((item,index)=>latlangList[index] !== latlangList[targetId.split("-")[1]])
                renderList();

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
    if(latlangList.length > 0){
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
                latlangList=[];
    
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
});
