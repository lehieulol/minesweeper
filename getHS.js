function changeTB(){
	let ctb = new XMLHttpRequest();
	ctb.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			let temp = this.responseText;
			let table = '<caption>HIGH SCORE</caption><tr><th>Mode</th><th>Player</th><th id = \'hsc\'>High score</th></tr>'
			let a = [[0,0],[0,0],[0,0]], f = 0, l = 0, mode = ['Newbie','Pupil','Expert'];
			for(let i = 0; i < 3; i++){
				table += '<tr><td>'+mode[i]+'</td>';
				for(let j = 0; j < 2; j++){
					while(temp[l] != '\n'){
						l++;
					}
					a[i][j] = temp.slice(f,l);
					l++;
					table += '<td>'+a[i][j]+'</td>;
				}
				table += '</tr>';
			}
			document.getElementById('hs').innerHTML = table;
		}
	}
	ctb.open('GET','HS.txt',true);
	ctb.send();
}
function test(){
	let re = new XMLHttpRequest();
	re.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			console.log(this.responseText);
		}
	}
	re.open('GET','test.txt',true);
	re.send();
}
