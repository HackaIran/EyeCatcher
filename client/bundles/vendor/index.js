const axios = require('axios');
const Row = require('./Row');
const $ = query => document.querySelector(query);

const config = { speed: 1, canWrite: true }

const answers = {
    yes: `BOOM YEAH!`,
    no: `Anyway you're curious enough!`,
    sure: `GOOD!`,
    yeah: `SUPERB!`,
    yup: `WELL WELL!`,
    hello: 'HELLO!',
    hi: 'HEY THERE!'
}

class App {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
        window.onresize = this.setCanvasSize.bind(this);
        this.rows = [];
        for (let i = 0; i < 75; i++) this.rows.push(new Row());
        this.timeout = null;
        window.onkeyup = (e) => {
            if (config.canWrite) this.onType(e);
            else this.checkFormCommands(e);
        }
        $('form').onsubmit = (e) => {
            e.preventDefault();
        }
        this.render();
    }

    onType (e) {
        if (e.key.length > 1) return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            $('h2').innerHTML = ''
        }, 2000);
        $('h2').innerHTML += e.key;
        const command = $('h2').innerHTML.toLowerCase().trim();
        if (command === 'join') return setTimeout(() => this.join(), 1000);
        if (Object.keys(answers).includes(command)) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                $('h2').innerHTML = ''
            }, 3000);
            setTimeout(() => $('h2').innerHTML = answers[command], 500);
        }
    }

    join () {
        $('h2').innerHTML = '';
        $('form').classList.add('open');
        $('form input').focus();
        $('form input').value = '';
        $('form select').value = 'Tehran';
        config.canWrite = false;
        config.speed = 0.3;
    }
    
    exitJoin () {
        $('form').classList.remove('open');
        config.canWrite = true;
        config.speed = 1;
    }

    sendForm (email, city) {
        axios.post('/subscribe', { email, city });
    }

    checkFormCommands (e) {
        if (e.key === 'Enter') {
            this.sendForm($('form input').value, $('form select').value);
            $('h2').innerHTML = 'SEE YOU!';
            setTimeout(() => { $('h2').innerHTML = '' }, 1000)
        }
        if (e.key === 'Escape' || e.key === 'Enter') {
            $('form input').value = '';
            $('form select').value = 'Tehran';
            this.exitJoin();
        }
    }

    setCanvasSize () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    writeChar (char, x, y, opacity = 1) {
        this.ctx.fillStyle = `rgba(0, 180, 0, ${opacity})`;
        this.ctx.font = '18px Fira Mono';
        this.ctx.fillText(char, x * 18 + 5, (y + 1) * 18 + 3);
    }

    render () {
        setTimeout(() => this.render(), 300 / config.speed);
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let j in this.rows) {
            let row = this.rows[parseInt(j)];
            row.next();
            for (let i = 0; i < row.chars.length; i++) {
                let char = row.chars[i];
                this.writeChar(char, parseInt(j), (50 - i - 1), (i / row.chars.length))
            }
        }
    }
    
}

window.app = new App($('canvas'))