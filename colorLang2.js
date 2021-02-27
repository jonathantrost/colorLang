

function textNodesUnder(node){
	var all = [];
	for (node=node.firstChild;node;node=node.nextSibling){
		if (node.nodeType==3) all.push(node);
		else all = all.concat(textNodesUnder(node));
	}
	return all;
}

function colorizeString(string, intelligence) {
	var colorizedString = '';
	var span;
	var character;
	var value;
	
	//colorizedString += '<u>';
	
	for (var i = 0, length = string.length; i < length; i++) {
		span = false;
		
		character = string.charAt(i);
		value = character.toLowerCase().charCodeAt(0);
		if ((value > 0x20) && (value < 0xff)) {
			span = true;
		}
		else if (value == 0x20) {
		}
		
		if (span === true) {
			colorizedString += '<span class="color-';
			colorizedString += character.toLowerCase();
			if (intelligence){
				colorizedString += '-only';
			}
			colorizedString += '">' + character + '</span>';
		}
		else {
			colorizedString += character;
		}
	}
	
	//colorizedString += '</u>';
	return colorizedString;
}

var nodes = textNodesUnder(document.body);
for (var i in nodes) {
	replacementNode = document.createElement('span');
	replacementNode.innerHTML = colorizeString(nodes[i].textContent, false);
	nodes[i].replaceWith(replacementNode);
}

//Document.write('<link rel="stylesheet" href="colorLang.css">');
