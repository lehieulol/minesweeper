function getHS(){
	let re = new XMLHttpRequest();
	re.onreadystatechange = function(){
		if(this.readyState = 4 && this.status = 200){
			return this;
		}
	}
	re.open('GET','HS.xml',true);
	re.send();
}
function changeTB(xxx){
	document.getElementById('hs').innerHTML = xxx.responseText;
}
