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
	let re = new XMLHttpRequest();
	re.onreadystatechange = function(){
		if(this.readyState = 4 && this.status = 200){
			document.getElementById('hs').innerHTML = this.responseXML.getElementsByTagName('all').innerXML;
		}
	}
	re.open('GET','HS.xml',true);
	re.send();
	getHS.responseXML.getElementsByTagName('all').innerHTML;
	
}
