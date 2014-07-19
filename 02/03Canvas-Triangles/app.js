$("document").ready(function() {
	var canvas = document.getElementById('triangles');
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
	var offset = $('canvas').offset();
	var mouse = {x: 0, y: 0};
	var Point = function(x, y) {
		var x = this.x;
		var y = this.y;
	};
    var points = [];
    var len = points.length;
	var point = new Point();
	
	context.lineWidth = 4;
	context.lineJoin = 'round';
	context.lineCap = 'round';
	context.strokeStyle = $("#colorPick").val();
	 
	canvas.addEventListener('mousemove', function(e) {
	  mouse.x = e.pageX - offset.left;
	  mouse.y = e.pageY - offset.top;
	}, false);
		
	canvas.addEventListener('mousedown', function(e) {
	    context.moveTo(mouse.x, mouse.y);
	    point.x = mouse.x;
	    point.y = mouse.y;
	    if (points.length < 3) {
	    	points.push(point);
	    	console.log(points);
		}
		else {
			points = [];
			points.push(point);
	    	console.log(points);
		}
	}, false);
	 
	var onPaint = function() {
		context.strokeStyle = 'red';
		context.lineWidth = 4;
		context.lineTo(mouse.x, mouse.y);
	    context.stroke();				
	};

	$('#clear').click(function() {
		 context.clearRect(0, 0, width, height);
	});    
});