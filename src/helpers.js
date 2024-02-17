export function generateUUID() {
    let UUID = "";

    const ALPHABET = ['a','b','c','d','e','f','g','h',]

    for(let i = 0; i < 10; i++) {
        let randomSymbol = Math.floor(Math.random() * 8)
        if(randomSymbol > 7) randomSymbol = 7
        UUID+=ALPHABET[randomSymbol]
        let random = Math.round(Math.random() * 100);
        UUID+=random;
    }
    return UUID
}