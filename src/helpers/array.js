export const range = (number, from) => {
    const array = [...Array(number).keys()];

    if(from) {
        return array.map(x => x+from);
    }

    return array;
}