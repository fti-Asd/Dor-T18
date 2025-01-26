function limitDecimalPlaces(event, places) {
    const value = event.target.value;
    if (value.includes('.')) {
        const [integer, decimals] = value.split('.');
        if (decimals && decimals.length > places) {
            event.target.value = `${integer}.${decimals.slice(0, places)}`;
        }
    }
}