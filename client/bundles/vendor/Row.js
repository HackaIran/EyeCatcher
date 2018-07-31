class Row {

    constructor () {
        this.chars = [];
        for (let i = 0; i < 50; i++) this.addChar();
    }

    addChar () {
        this.chars.push(String.fromCharCode(Math.floor(Math.random() * 73) + 49));
    }

    next () {
        this.chars.shift();
        this.addChar();
    }
    
}

module.exports = Row;