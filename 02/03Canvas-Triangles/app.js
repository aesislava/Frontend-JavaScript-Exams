$("document").ready(function() {
    var canvas = document.getElementById('triangles');
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var offset = $('canvas').offset();
    var mouse = {
        x: 0,
        y: 0
    };
    var Point = function(x, y) {
        var x = this.x;
        var y = this.y;
    };
    var points = [];
    var regex = /^\s*$/;
    var len = points.length;
    var name = "";
    var options = "";
    if (localStorage.getItem('options') !== null) {
        options = localStorage.getItem('options');
    }
    var html = '<label>Name: <select>' + options + '</select></label>';
    var save = {
        state0: {
            title: 'Save canvas',
            html: '<label>Name: <input type="text" name="fname" id="name" value=""></label>',
            buttons: {
                OK: 1
            },
            focus: "input[name='fname']",
            submit: function(e, v, m, f) {
                if ($("#name").val().match(regex)) {
                    alert('Please enter canvas name!');
                } else {
                    name = f.fname;
                    console.log(name);
                    localStorage.setItem(name, canvas.toDataURL());
                    options += '<option>' + name + '</option>';
                    localStorage.setItem('options', options);
                    load.state0.html = '<label>Name: <select>' + localStorage.getItem('options') + '</select></label>';
                    e.preventDefault();
                    $.prompt.close();
                }
            }
        }
    };
    var load = {
        state0: {
            title: 'Load canvas:',
            html: html,
            buttons: {
                OK: 1
            },
            focus: "input[name='fname']",
            submit: function(e, v, m, f) {

                context.clearRect(0, 0, width, height);
                var img = new Image();
                img.onload = function() {
                    context.drawImage(img, 0, 0);
                }
                img.src = localStorage.getItem($('select').val());
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
    $('#help').click(function() {
    	var help = "<h5>Instructions:</h5><p>To draw a triangle choose it's 3 points by clicking on the canvas.<br><ul class='prompted' id='controls'><li title='Clear canvas'><img src='img/x.png' id='clear'>   reset canvas</li><li title='Save drawing'><img src='img/save.png' id='save'>    save drawing</li><li title='Load drawing'><img src='img/load.png' id='load'>    load drawing</li><li title='Pick a color'><input id='colorPick' type='color' name='color'>   choose color</li></ul></p>";
        $.prompt(help);
    });
    $('#save').click(function() {
        $.prompt(save);
    });
    $('#load').click(function() {
        $.prompt(load);

    })
});
