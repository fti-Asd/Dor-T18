function GeoFormHandler(targetId){
    LatLangForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        let latitude = latitudeInput.value;
        let longitude = longitudeInput.value;       
    
        if (latitude < -90 || latitude > 90) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'Latitude must be between -90 and 90.'
              });
            return;
        }
    
        if (longitude < -180 || longitude > 180) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'Longitude must be between -180 and 180.'
              });
            return;
        }
    
        console.log(targetId);
        
        updateLatLangList(targetId.split("-")[1], Number(latitude), Number(longitude));
    }, { once: true });
}