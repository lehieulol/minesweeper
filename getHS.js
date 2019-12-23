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
	let tb = getHS.responseXML.getElementsByTagName('all').innerHTML;
	print(tb);
	document.getElementById('hs').innerHTML = xxx.responseText;
}
