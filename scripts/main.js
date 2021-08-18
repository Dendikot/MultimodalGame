var flipHorizontal = false;

var imageElement = document.getElementById('cat');

posenet.load().then(function(net) {
	const pose = net.estimateSinglePose(imageElement, {
		flipHorizontal: true
	});
	return pose;
}).then(function(pose){
	console.log(pose);
})

CallMe();
console.log(text);
