function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
      const messageElement = document.getElementById('message');
  
  
    const gridSize = 20;
    let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    let food = { x: 15 * gridSize, y: 15 * gridSize };
    let direction = 'right';
    let score = 0;
    let gameSpeed = 100;
    let gameInterval;
    let gameActive = true;
  
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = 'green';
      snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
      });
  
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }
  
    function update() {
       if(!gameActive) return;
       const head = { ...snake[0] };
  
       switch (direction) {
           case 'up':
               head.y -= gridSize;
               break;
           case 'down':
               head.y += gridSize;
               break;
           case 'left':
               head.x -= gridSize;
               break;
           case 'right':
               head.x += gridSize;
               break;
       }
  
       snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
          score++;
          scoreElement.textContent = `Счет: ${score}`;
          generateFood();
      } else {
          snake.pop();
      }
  
      checkCollision();
   }
    function generateFood() {
      food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
      };
      while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
             food = {
                x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
                y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
              };
        }
  
    }
  
  
    function checkCollision() {
        const head = snake[0];
  
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            gameOver();
            return;
        }
       for (let i = 1; i < snake.length; i++) {
           if (head.x === snake[i].x && head.y === snake[i].y) {
              gameOver();
              return;
           }
       }
    }
  function gameOver() {
    gameActive = false;
    clearInterval(gameInterval);
    messageElement.textContent = `Игра окончена! Счет: ${score}`;
  }
  
  
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });
  
    function gameLoop() {
        update();
        draw();
    }
    gameInterval = setInterval(gameLoop, gameSpeed);
  }
  
  document.addEventListener('DOMContentLoaded', startGame);
