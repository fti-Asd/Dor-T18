function loadFromLocalStorage() {
    const savedData = localStorage.getItem('latLangList');
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        return [];
    }
}