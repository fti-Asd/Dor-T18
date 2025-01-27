const locationListDiv = document.querySelector(".location-list");
const listUl = document.querySelector(".list");
const deleteAllButton = document.getElementById("delete-all");
const selectAll = document.getElementById('select-all');
const checkboxes = document.querySelectorAll('.item-checkbox');

let latLangList = [];
let editingIndex = null; 

window.addEventListener('load', () => {
  latLangList = loadFromLocalStorage();
  
  if(latLangList.length > 0){
    // console.log(latLangList.length);
    deleteAllButton.classList.remove("d-none");
  }else{
    deleteAllButton.classList.add("d-none");
    listUl.innerHTML="";
    listUl.innerHTML = `
                  <div class="w-75 mx-auto">
                      <img src="public/icons/svg/EmptyState.svg"/>
                  </div>
                  <p class="mx-auto">no data is found!</p>`;
  }

  renderList();
});

listUl.addEventListener("click", (e) => {
    const selectedElement = e.target.closest("button") ? e.target.closest("button") : e.target.closest("input");
    const targetId = selectedElement?.getAttribute("id");
    
    const targetItem = latLangList[targetId?.split("-")[1]];

      latitudeInput.value = targetItem?.lat;
      longitudeInput.value = targetItem?.lang;   

    if (targetId?.includes("delete-")) {           
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
              
              if(latLangList.length == 0 ){
                listUl.innerHTML="";
                listUl.innerHTML = `
                <div class="w-75 mx-auto">
                    <img src="public/icons/svg/EmptyState.svg"/>
                </div>
                <p class="mx-auto">no data is found!</p>`;
                
                deleteAllButton.classList.add("d-none");
              }
              
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
        editingIndex = targetId?.split("-")[1]
        GeoFormHandler(targetId)
    }
});


deleteAllButton.addEventListener("click", () => {
  if(latLangList.length > 0){
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const selectedIndexes = [];
    
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
          selectedIndexes.push(index);
      }
    });

    if(selectedIndexes.length > 0){
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
          latLangList = latLangList.filter((item, i) => {
            if(selectedIndexes.includes(i)){
              return;
            }else{
              return item;
            }
          });
          
          selectAll.checked = false;
          selectAll.indeterminate = false;
          renderList();
          saveToLocalStorage();
          
          Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
          });
          
          if(latLangList.length == 0 ){
            listUl.innerHTML = `
            <div class="w-75 mx-auto">
                <img src="public/icons/svg/EmptyState.svg"/>
            </div>
            <p class="mx-auto">no data is found!</p>`;

            deleteAllButton.classList.add("d-none");
          }
        }
      });
    }else{
      Swal.fire({
        title: "not allowed!",
        text: "you selected nothing",
        icon: "error"
      });
    }
  }
});


selectAll.addEventListener('change', function () {
  const allCheckboxes = Array.from(document.querySelectorAll('.item-checkbox'));
  allCheckboxes.forEach(checkbox => {
      checkbox.checked = this.checked;
  });
});


document.addEventListener('change', function (event) {
  if (event.target.classList.contains('item-checkbox')) {
    const allCheckboxes = Array.from(document.querySelectorAll('.item-checkbox'));
    const selectedCheckboxes = allCheckboxes.filter(cb => cb.checked);

    console.log('Selected checkboxes:', selectedCheckboxes);

    if (selectedCheckboxes.length === allCheckboxes.length) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
    } else if (selectedCheckboxes.length > 0) {
        selectAll.checked = false;
        selectAll.indeterminate = true;
    } else {
        selectAll.checked = false;
        selectAll.indeterminate = false;
    }
  }
});


