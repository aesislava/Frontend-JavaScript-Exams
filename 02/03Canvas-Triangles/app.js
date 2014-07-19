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
	var name;
	var test = {
		state0: {
			title: 'Save canvas',
			html:'<label>Name: <input type="text" name="fname" value=""></label>',
			buttons: { OK: 1 },
			//focus: "input[name='fname']",
			submit:function(e,v,m,f){ 
				name = f.fname;
				console.log(name);
				e.preventDefault();
				$.prompt.close();
				
			}
		}
	};
	
	context.lineWidth = 4;
	context.lineJoin = 'round';
	context.lineCap = 'round';
	
	 
	canvas.addEventListener('mousemove', function(e) {
	  mouse.x = e.pageX - offset.left;
	  mouse.y = e.pageY - offset.top;
	}, false);
		
	canvas.addEventListener('mousedown', function(e) {
	    context.moveTo(mouse.x, mouse.y);
	    if (points.length === 1) {
	    	context.beginPath();
	    }
	    if (points.length < 3) {
	    	var point = new Point();
		    point.x = mouse.x;
		    point.y = mouse.y;
	    	points.push(point);
	    	console.log(points);
		}
		if (points.length === 3) {
		    console.log(points[0].x + " " + points[0].y);
		    console.log(points[1].x + " " + points[1].y);
		    console.log(points[2].x + " " + points[2].y);

		    context.lineTo(points[0].x, points[0].y);
		    context.lineTo(points[1].x, points[1].y);
		    context.lineTo(points[2].x, points[2].y);
		    context.fillStyle = $("#colorPick").val();
	
		    context.fill();
			points = [];
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
	$('#save').click(function() {
		$.prompt(test);
		localStorage.setItem("imgCanvas",canvas.toDataURL());
	});  
	$('#load').click(function() {
		var img=new Image();
		img.onload=function(){
		    context.drawImage(img,0,0);
		}
		img.src=localStorage.getItem("imgCanvas");
	})
});