function imageUtil(imageName, quantity = 1) {
	var images = '<div class="' + imageName + ' coins">' +
					'<span>'+ quantity + ' ' + imageName + ':</span>'
	var source = require('./img/' + imageName + '.gif');
	for (var i = 0; i < quantity; i++) {
		images += '<img src="' + source + '"/>'
	}
	return images + '</div>';
}

export default imageUtil;