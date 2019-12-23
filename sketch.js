let board = [],
  t_t = [];
let mode = 'de',
  sizeX = 10,
  sizeY = 25,
  bom = 25,
  size, tt = 0;
let tim, flag_count, s_tim, op_count;
let dx = [0, 1, 1, 1, 0, -1, -1, -1],
  dy = [1, 1, 0, -1, -1, -1, 0, 1];
let col = ['white', 'blue', 'green', 'red', 'purple', 'brown', '#00c8c8', 'black', 'light blue'];

function win() {
  alert('You win');
  if (tim < document.getElementById(mode + '2').innerHTML) {
    high_score();
  }
}

function mine(xxx, yyy) {
  push();
  fill('black');
  stroke('black');
  circle(xxx + size / 2, yyy + size / 2, size * 0.5);
  translate(xxx + size / 2, yyy + size / 2);
  for (let i = 0; i < 8; i++) {
    line(-0.4 * size, 0, 0.4 * size, 0);
    rotate(PI / 4);
  }
  pop();
}

function tged_mine(xxx, yyy) {
  push();
  fill('red');
  stroke('red');
  circle(xxx + size / 2, yyy + size / 2, size * 0.5);
  translate(xxx + size / 2, yyy + size / 2);
  for (let i = 0; i < 8; i++) {
    line(-0.4 * size, 0, 0.4 * size, 0);
    rotate(PI / 4);
  }
  pop();
}

function squ(xxx, yyy) {
  push();
  fill('gray');
  stroke('black');
  square(xxx, yyy, size);
  stroke('white');
  strokeWeight(size * 0.1);
  line(xxx + size * 0.1, yyy + size * 0.1, xxx + size - size * 0.1, yyy + size * 0.1);
  line(xxx + size * 0.1, yyy + size * 0.1, xxx + size * 0.1, yyy + size - size * 0.1);
  pop();
}

function p_squ(xxx, yyy) {
  push();
  fill('gray');
  stroke('black');
  square(xxx, yyy, size);
  stroke('white');
  strokeWeight(size * 0.1);
  line(xxx + size * 0.1, yyy + size - size * 0.1, xxx + size - size * 0.1, yyy + size - size * 0.1);
  line(xxx + size - size * 0.1, yyy + size * 0.1, xxx + size - size * 0.1, yyy + size - size * 0.1);
  pop();
}

function ped_squ(xxx, yyy) {
  push();
  fill('gray');
  stroke('black');
  square(xxx, yyy, size);
  pop();
}

function flag(xxx, yyy) {
  push();
  strokeWeight(size * 0.05);
  line(xxx + size * 0.5, yyy + size * 0.1, xxx + size * 0.5, yyy + size * 0.9);
  line(xxx + size * 0.3, yyy + size * 0.9, xxx + size * 0.7, yyy + size * 0.9);
  fill('red');
  triangle(xxx + size * 0.2, yyy + size * 0.3, xxx + size * 0.5, yyy + size * 0.1, xxx + size * 0.5, yyy + size * 0.5);
  pop();
}

function w_flag(xxx, yyy) {
  push();
  fill('red');
  stroke('black');
  strokeWeight(size * 0.05);
  line(xxx + size * 0.5, yyy + size * 0.1, xxx + size * 0.5, yyy + size * 0.9);
  line(xxx + size * 0.3, yyy + size * 0.9, xxx + size * 0.7, yyy + size * 0.9);
  triangle(xxx + size * 0.2, yyy + size * 0.3, xxx + size * 0.5, yyy + size * 0.1, xxx + size * 0.5, yyy + size * 0.5);
  stroke('yellow');
  line(xxx + 0.2 * size, yyy + 0.2 * size, xxx + 0.8 * size, yyy + 0.8 * size);
  line(xxx + 0.2 * size, yyy + 0.8 * size, xxx + 0.8 * size, yyy + 0.2 * size);
  pop();
}

function digit(xxx, yyy, sc) {
  push();
  let a = ['1110111', '0010010', '1011101', '1011011', '0111010', '1101011', '1101111', '1010010', '1111111', '1111011'];
  let b = [
    [0, 0, 0],
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 1],
    [1, 1, 1],
    [0, 2, 0]
  ];
  for (let i = 0; i < 7; i++) {
    strokeWeight(5);
    strokeCap(SQUARE);
    if (a[sc][i] == 1) {
      stroke('red');
    } else {
      stroke('gray');
    }
    if (b[i][2] == 0) {
      line(xxx + 20 * b[i][0] + 2.5, yyy + 20 * b[i][1], xxx + 20 + 20 * b[i][0] - 2.5, yyy + 20 * b[i][1]);
    } else {
      line(xxx + 20 * b[i][0], yyy + 20 * b[i][1] + 2.5, xxx + 20 * b[i][0], yyy + 20 + 20 * b[i][1] - 2.5);
    }
  }
  pop();
}

function printd(xxx, yyy, sc) {
  let bc = sc.toString();
  while (bc.toString().length < 5) {
    bc = '0' + bc;
  }
  let a = bc.split('').map(function(digit) {
    return +digit
  });
  for (let i = 0; i < 5; i++) {
    digit(xxx + i * 30, yyy, a[i]);
  }
}

function spawn(xxx, yyy) {
  s_tim = Date.now();
  let arr = [];
  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      if (Math.abs(i - xxx) <= 1 && Math.abs(j - yyy) <= 1) continue;
      arr.push([i, j]);
    }
  }
  shuffle(arr, true);
  for (let i = 0; i < bom; i++) {
    board[arr[i][0]][arr[i][1]] = -1;
  }
  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      if (board[i][j] == -1) continue;
      for (let k = 0; k < 8; k++) {
        if (i + dx[k] >= 0 && i + dx[k] < sizeX && j + dy[k] >= 0 && j + dy[k] < sizeY && board[i + dx[k]][j + dy[k]] == -1) {
          board[i][j]++;
        }
      }
    }
  }
}

function showMine() {
  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      if (board[i][j] == -1) {
        if (t_t[i][j] == 'o') {
          ped_squ(j * size, i * size + 120);
          tged_mine(j * size, i * size + 120);
        } else if (t_t[i][j] != 'f') {
          ped_squ(j * size, i * size + 120);
          mine(j * size, i * size + 120);
        }
      } else if (t_t[i][j] == 'f') {
        ped_squ(j * size, i * size + 120);
        w_flag(j * size, i * size + 120);
      }
    }
  }
  for(let i = 0; i < 20; i++){
    textSize(Math.random()*40+10);
    let sx = Math.random()*1348, sy = Math.random()*660;
    translate(sx,sy);
    rotate(Math.random()*2*PI);
    text('You lose',-200,-40,400,80);
}

function Open(xx, yy) {
  if (t_t[xx][yy] == 'o' || t_t[xx][yy] == 'f') return;
  t_t[xx][yy] = 'o';

  if (board[xx][yy] == -1) {
    tt = 2;
    showMine();
    return;
  }

  push();
  ped_squ(yy * size, xx * size + 120);
  fill(col[board[xx][yy]]);
  textFont('monospace');
  text((board[xx][yy] == 0) ? '' : board[xx][yy], yy * size, xx * size + 120, size * 1.45, size * 1.15);
  pop();
  if (board[xx][yy] == 0) {
    for (let i = 0; i < 8; i++) {
      //          print(xx+dx[i],yy+dy[i]);
      if (xx + dx[i] >= 0 && xx + dx[i] < sizeX && yy + dy[i] >= 0 && yy + dy[i] < sizeY) Open(xx + dx[i], yy + dy[i]);
    }
  }
  op_count++;
  if (op_count + bom == sizeX * sizeY) {
    tt = 2;
    win();
  }
}
let lx = -1,
  ly = -1;

function mousePressed() {
  if(tt!= 1) return;
  let xxx = parseInt((mouseY - 120) / size),
    yyy = parseInt(mouseX / size);
  if (xxx == lx && yyy == ly) return;
  if (lx != -1) {
    if (t_t[lx][ly] == 'o') {
      for (let i = 0; i < 8; i++) {
        if (lx + dx[i] >= 0 && lx + dx[i] < sizeX && ly + dy[i] >= 0 && ly + dy[i] < sizeY && t_t[lx + dx[i]][ly + dy[i]] == 'p') {
          t_t[lx + dx[i]][ly + dy[i]] = 0;
          squ((ly + dy[i]) * size, (lx + dx[i]) * size + 120);
        }
      }
    } else if (t_t[lx][ly] == 'p') {
      t_t[lx][ly] = 0;
      squ(ly * size, lx * size + 120);
    }
  }
  if (t_t[xxx][yyy] == 'o') {
    for (let i = 0; i < 8; i++) {
      if (xxx + dx[i] >= 0 && xxx + dx[i] < sizeX && yyy + dy[i] >= 0 && yyy + dy[i] < sizeY && t_t[xxx + dx[i]][yyy + dy[i]] == 0) {
        t_t[xxx + dx[i]][yyy + dy[i]] = 'p';
        p_squ((yyy + dy[i]) * size, (xxx + dx[i]) * size + 120);
      }
    }
  } else if (t_t[xxx][yyy] == 0) {
    t_t[xxx][yyy] = 'p';
    p_squ(yyy * size, xxx * size + 120);
  }
  lx = xxx;
  ly = yyy;
}

function mouseReleased() {
  if(tt!= 1) return;
  if (t_t[lx][ly] == 'o') {
    for (let i = 0; i < 8; i++) {
      if (lx + dx[i] >= 0 && lx + dx[i] < sizeX && ly + dy[i] >= 0 && ly + dy[i] < sizeY && t_t[lx + dx[i]][ly + dy[i]] == 'p') {
        t_t[lx + dx[i]][ly + dy[i]] = 0;
        squ((ly + dy[i]) * size, (lx + dx[i]) * size + 120);
      }
    }
  } else if (t_t[lx][ly] == 'p') {
    t_t[lx][ly] = 0;
    squ(ly * size, lx * size + 120);
  }
  lx = -1;
  ly = -1;
}

  function mouseClicked() {
    if (mouseY < 120 || tt == 2) return;
    let xxx = parseInt((mouseY - 120) / size),
      yyy = parseInt(mouseX / size);
    if (keyIsDown(16) & tt == 1) {
      if (t_t[xxx][yyy] == 'f') {
        flag_count++;
        t_t[xxx][yyy] = 0;
        squ(yyy * size, xxx * size + 120);
      } else if (t_t[xxx][yyy] != 'o') {
        if (flag_count == 0) return;
        t_t[xxx][yyy] = 'f';
        ped_squ(yyy * size, xxx * size + 120);
        flag(yyy * size, xxx * size + 120);
        flag_count--;
      }
    } else {
      if (tt == 0) {
        spawn(xxx, yyy);
        tt = 1;
      }
      if (t_t[xxx][yyy] == 'o') {
        let coun = 0;
        for (i = 0; i < 8; i++) {
          if (xxx + dx[i] >= 0 && xxx + dx[i] < sizeX && yyy + dy[i] >= 0 && yyy + dy[i] < sizeY && t_t[xxx + dx[i]][yyy + dy[i]] == 'f') coun++;
        }
        if (coun == board[xxx][yyy]) {
          for (i = 0; i < 8; i++) {
            if (xxx + dx[i] >= 0 && xxx + dx[i] < sizeX && yyy + dy[i] >= 0 && yyy + dy[i] < sizeY) Open(xxx + dx[i], yyy + dy[i]);
          }
        }
        print(coun);
      } else if (t_t[xxx][yyy] != 'f') {
        Open(xxx, yyy);
      }

    }
  }

  function makeboard() {
    score = 0;
    size = 540 / sizeX;
    textSize(size * 0.9);
    tt = 0;
    lx = -1;
    ly = -1;
    flag_count = bom;
    op_count = 0;
    board = [];
    t_t = [];
    for (let i = 0; i < sizeX; i++) {
      board.push([]);
      t_t.push([]);
      for (let j = 0; j < sizeY; j++) {
        board[i].push(0);
        t_t[i].push(0);
        squ(j * size, i * size + 120);
      }
    }
  }
  let name;

  function high_score() {
    name = prompt('High score!!!\nEnter your name', 'player');
    if (name == null) {
      name = 'player';
    }
    document.getElementById(mode + '1').innerHTML = name;
    document.getElementById(mode + '2').innerHTML = score;
  }

  function setup() {
    frameRate(60);
    textAlign(CENTER, CENTER);
    createCanvas(1348, 660);
    background(100);
    de = createButton('Newbie');
    de.position(240, 70);
    de.size(70, 20);
    de.mouseClicked(function() {
      mode = 'de';
      sizeX = 10;
      sizeY = 25;
      bom = 25;
      makeboard()
    });
    vua = createButton('Pupil');
    vua.position(320, 70);
    vua.size(70, 20);
    vua.mouseClicked(function() {
      mode = 'vua';
      sizeX = 20;
      sizeY = 50;
      bom = 120;
      makeboard()
    });
    kho = createButton('Expert');
    kho.position(400, 70);
    kho.size(70, 20);
    kho.mouseClicked(function() {
      mode = 'kho';
      sizeX = 40;
      sizeY = 100;
      bom = 500;
      makeboard()
    });
    makeboard();
  }

  function draw() {
    if (tt == 0) tim = 0;
    else if (tt == 1) tim = parseInt((Date.now() - s_tim) / 1000);
    printd(680, 10, tim);
    printd(680, 65, flag_count);
  }
