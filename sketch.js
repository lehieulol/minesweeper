let board = [], t_t = [];
let mode = 'de', sizeX = 10, sizeY = 25, bom = 15, size, tt = 0;
let score, flag_count;
let col = ['white', 'blue', 'green', 'red', 'purple', 'brown', '#00c8c8', 'black', 'light blue'];
function squ(xxx,yyy){
	fill('gray');
	stroke('black');
	square(xxx,yyy,size);
	stroke('white');
	strokeWeight(size*0.1);
	line(xxx+size*0.1,yyy+size*0.1,xxx+size-size*0.1,yyy+size*0.1);
	line(xxx+size*0.1,yyy+size*0.1,xxx+size*0.1,yyy+size-size*0.1);
	strokeWeight(1);
	stroke('black');
}
function p_squ(xxx,yyy){
	fill('gray');
	stroke('black');
	square(xxx,yyy,size);
	stroke('white');
	strokeWeight(size*0.1);
	line(xxx+size*0.1,yyy+size-size*0.1,xxx+size-size*0.1,yyy+size-size*0.1);
	line(xxx+size-size*0.1,yyy+size*0.1,xxx+size-size*0.1,yyy+size-size*0.1);
	strokeWeight(1);
	stroke('black');
}
function ped_squ(xxx,yyy){
	fill('gray');
	stroke('black');
	square(xxx,yyy,size);
}
function flag(xxx,yyy){
	strokeWeight(size*0.05);
	line(xxx+size*0.5,yyy+size*0.1,xxx+size*0.5,yyy+size*0.9);
	line(xxx+size*0.3,yyy+size*0.9,xxx+size*0.7,yyy+size*0.9);
	fill('red');
	triangle(xxx+size*0.2,yyy+size*0.3,xxx+size*0.5,yyy+size*0.1,xxx+size*0.5,yyy+size*0.5);
}
function digit(xxx,yyy,sc){
	let a = ['1110111','0010010','1011101','1011011','0111010','1101011','1101111','1010010','1111111','1111011'];
	let b = [[0,0,0],[0,0,1],[1,0,1],[0,1,0],[0,1,1],[1,1,1],[0,2,0]];
	for(let i = 0; i < 7; i++){
		strokeWeight(2);
		if(a[sc][i] == 1){
			stroke('red');
		}else{
			stroke('gray');
		}
		if(b[i][2] == 0){
			line(xxx+20*b[i][0],yyy+20*b[i][1],xxx+20+20*b[i][0],yyy+20*b[i][1]);
		}else{
			line(xxx+20*b[i][0],yyy+20*b[i][1],xxx+20*b[i][0],yyy+20+20*b[i][1]);
		}
	}
}
function printd(xxx,yyy,sc){
	let bc = sc.toString();
	while(bc.toString().length < 5){
		bc = '0'+bc;
    }
	let a = bc.split('').map(function(digit){return +digit});
	for(let i = 0; i < 5; i++){
		digit(xxx+i*25,yyy,a[i]);
	}
}
function spawn(xxx,yyy){
	let arr = [];
	for(let i = 0; i < sizeX; i++){
		for(let j = 0; j < sizeY; j++){
			if(Math.abs(i-xxx)<=1 && Math.abs(j-yyy)<=1) continue;
			arr.push([i,j]);
		}
	}
	shuffle(arr,true);
	for(let i = 0; i < bom; i++){
		board[arr[i][0]][arr[i][1]] = -1;
	}
}
function Open(xx,yy){
    print(xx,yy);
//	if(board[xx][yy] == -1) tt = 2;
	let dx = [0,1,1,1,0,-1,-1,-1], dy = [1,1,0,-1,-1,-1,0,1];
	board[xx][yy] = 0;
	for(let i = 0; i < 8; i++){
		if(xx+dx[i]>=0 && xx+dx[i]<sizeX && yy+dy[i]>=0 && yy+dy[i]<sizeY && board[xx+dx[i]][yy+dy[i]] == -1){
			board[xx][yy]++;
		}
	}
	t_t[xx][yy] = 'o';
//	if(board[xx][yy] == 0){
//		for(let i = 0; i < 8; i++){
//			Open(board[xx+dx[i]][yy+dy[i]]);
//		}
//	}
}
function mouseReleased(){
    if(mouseY < 120) return;
	let xxx = parseInt((mouseY-120)/size), yyy = parseInt(mouseX/size);
	if(keyIsDown(12) & tt == 1){
		if(t_t[xxx][yyy] == 'f'){
			t_t[xxx][yyy] = 0;
		}else if(t_t[xxx][yyy] != 'o'){
			t_t[xxx][yyy] = 'f';
		}
	}else{
		if(tt == 0){
			spawn(xxx,yyy);
          tt=1;
		}
		Open(xxx,yyy);
	}
}
function layer2(){
	printd(680,10,score);
	printd(680,65,flag_count);
	for(let i = 0; i < sizeX; i++){
		for(let j = 0; j < sizeY; j++){
			if(t_t[i][j] == 0){
				squ(j*size,i*size+120);
			}else if(t_t[i][j] == 'p'){
				p_squ(j*size,i*size+120);
			}else if(t_t[i][j] == 'f'){
				ped_squ(j*size,i*size+120);
				flag(j*size,i*size+120);
			}else{
				ped_squ(j*size,i*size+120);
//				fill(col[board[i][j]]);
				text((board[i][j]==0)?'':board[i][j],j*size,i*size+120,size,size);
			}
		}
	}
}

function makeboard() {
	score = 0;
	size = 540/sizeX;
	textSize(size*0.9);
	tt = 0;
	flag_count = bom;
	board = []; t_t  = [];
	for (let i = 0; i < sizeX; i++) {
		board.push([]);
		t_t.push([]);
		for (let j = 0; j < sizeY; j++) {
			board[i].push(0);
			t_t[i].push(0);
		}
	}
}
let name;
function high_score(){
	name = prompt('High score!!!\nEnter your name','player');
	if(name == null){
		name = 'player';
	}
	document.getElementById(mode+'1').innerHTML = name;
	document.getElementById(mode+'2').innerHTML = score;
}
function setup() {
	frameRate(60);
	
	textAlign(CENTER,CENTER);
	createCanvas(1348, 660);
	de = createButton('Newbie');
	de.position(240,70);
	de.size(70,20);
	de.mouseClicked(function(){mode = 'de';sizeX = 10; sizeY = 25;bom = 15; makeboard()});
	vua = createButton('Pupil');
	vua.position(320,70);
	vua.size(70,20);
	vua.mouseClicked(function(){mode = 'vua';sizeX = 20; sizeY = 50;bom = 80; makeboard()});
	kho = createButton('Expert');
	kho.position(400,70);
	kho.size(70,20);
	kho.mouseClicked(function(){mode = 'kho';sizeX = 40; sizeY = 100;bom = 350; makeboard()});
	makeboard();
}

function draw() {
	background(120);
	layer2();
	
}