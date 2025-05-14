const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;

let snake;
let direction;
let food;
let score;
let gameOver;
let gameInterval;

// Funzione per inizializzare il gioco
function initializeGame() {
    snake = [{ x: 160, y: 160 }];
    direction = { x: gridSize, y: 0 };
    food = { x: 100, y: 100 };
    score = 0;
    gameOver = false;
    
    document.getElementById('replayBtn').style.display = 'none'; // Nascondi il bottone Replay all'inizio
    gameInterval = setInterval(gameLoop, 100); // Aggiorna il gioco ogni 100 ms
}

// Funzione per gestire il loop del gioco
function gameLoop() {
    if (gameOver) return;

    updateSnake();
    drawGame();
}

// Funzione per aggiornare la posizione del serpente
function updateSnake() {
    if (gameOver) return;

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Collisione con il muro o con se stesso
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        clearInterval(gameInterval);
        alert("Game Over! Punteggio: " + score);
        document.getElementById('replayBtn').style.display = 'block'; // Mostra il bottone Replay
        return;
    }

    snake.unshift(head);

    // Mangia il cibo
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

// Funzione per disegnare il gioco
function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Pulisce il canvas

    // Disegna il serpente
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Disegna il cibo
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Disegna il punteggio
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Punteggio: ' + score, 10, 30);
}

// Funzione per generare una nuova posizione del cibo
function placeFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Funzione per resettare il gioco
function replayGame() {
    clearInterval(gameInterval); // Ferma il gioco corrente
    initializeGame(); // Reinizializza il gioco
}

// Gestione delle frecce direzionali
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -gridSize };
    if (e.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: gridSize };
    if (e.key === 'ArrowLeft' && direction.x === 0) direction = { x: -gridSize, y: 0 };
    if (e.key === 'ArrowRight' && direction.x === 0) direction = { x: gridSize, y: 0 };
});

// Avvia il gioco
initializeGame();
