const customMenu = document.getElementById("custom-menu");
const TabContent = document.querySelector("#map-tabContent");

let currentLocation = null;

TabContent.addEventListener("click",(event)=>{

    // console.log("Target Element:", event.target);
    // console.log("OffsetParent ID:", event.target.offsetParent?.id);

    getLocation((location) => {
        currentLocation = location;
    });

    // console.log("clicked",event.clientX,event.clientY);
    
    customMenu.style.top = `${event.clientY}px`;
    customMenu.style.left = `${event.clientX}px`;
    customMenu.style.display = "block";

})

customMenu.addEventListener("click", (e) => {
    const closestLi = e.target.closest("li");

    if (closestLi) {
        if (closestLi.textContent === "Close") {
            customMenu.style.display = "none";
        } else if (closestLi.textContent === "Get Location") {
            if (currentLocation) {
                addToList(currentLocation.latitude, currentLocation.longitude);
                customMenu.style.display = "none";
                if(latLangList.length > 0){
                    // console.log(latLangList.length);
                    deleteAllButton.classList.remove("d-none");
                }else{
                    deleteAllButton.classList.add("d-none");
                }
            } else {
                console.error("Location is not available.");
            }
        }
    }
});

customMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});



