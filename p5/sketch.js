var socket
let x = 0
let y = 0
let r = 0
let cont = 0
let figuras = []
let figura
let color = '#000000'
function setup() {
	createCanvas(windowWidth, windowHeight);
	socket = io.connect('http://192.168.1.68:8080')
	socket.on('mouse', nuevasFiguras)
}

function nuevasFiguras(data){
	figuras.push({tipo: data.tipo,x1: data.x1, y1: data.y1, x2: data.x2, y2: data.y2, rad : data.rad,col: data.col})
}

function draw() {
	background(244, 248, 252);
	noFill()
	
	if (mouseIsPressed) {
		if(x==0&&y==0){
			x = mouseX
			y = mouseY
			
		}
		switch(figura){
  			case 1:
  				puntopendiente(x, y, pmouseX, pmouseY)
  			break
  			case 2:
  				if(mouseX>x){
  					r = mouseX-x
  				} else {
  					r = x-mouseX
  				}
  				PyM(x,y,r)
  			break
  			case 3:
  				rect(x, y, pmouseX-x, pmouseY-y)
  			break

  		} 
    	
  	} else {
  		if (x!=0){

  			var data = {
  				tipo: figura,
  				x1: x,
  				y1: y,
  				x2: mouseX,
  				y2: mouseY,
  				rad: r,
  				col: color
  			}
  			socket.emit('mouse',data)
  			figuras= []
  		}
  		x=0
  		y=0
  		r=0
  		cont++ 
  	}

  	if (figuras.length>0) {
	  	for (var i = 0; i < figuras.length; i++) {
	  		switch(figuras[i].tipo){
	  			case 1:
	  				stroke(figuras[i].col)
	  				puntopendiente(figuras[i].x1,figuras[i].y1,figuras[i].x2,figuras[i].y2)
	  			break
	  			case 2:
	  				stroke(figuras[i].col)
	  				PyM(figuras[i].x1,figuras[i].y1,figuras[i].rad)
	  			break
	  			case 3:
	  				stroke(figuras[i].col)
	  				rect(figuras[i].x1,figuras[i].y1,figuras[i].x2-figuras[i].x1,figuras[i].y2-figuras[i].y1)
	  			break
	  		}
	  	}
  	}
}

function selecccion_color(t){
	color = t
}

function tipo_figura(t){
	figura = t
}

function mouseClicked() {
  
}

function PyM (xc, yc, r) {
	let x = 0
	let y = r
	let p = Math.floor((5/4)-r)

	//point(xc,yc)

	do {
		if(p < 0)
		{
			x++
			p += (2*x) + 1 
		}
		else
		{
			x++
			y--
			p += ((2*x)+1)-(2*y)
		}
			
		point(xc+x,yc+y)
		point(xc+y,yc+x)
		point(xc+y,yc-x)
		point(xc+x,yc-y)
		point(xc-x,yc-y)
		point(xc-y,yc-x)
		point(xc-y,yc+x)
		point(xc-x,yc+y)
			
	}while(x < y)

}

function puntopendiente (x1, y1, x2, y2) {
	let y = y1
	let x = x1
	let dx = x2-x1
	let dy = y2-y1
	let m
	let b
	let xs = Math.abs(dx)
	let ys = Math.abs(dy)
	let xi
	let yi
	
	m = (dy) / (dx)
	b = y1 - m * x1

	if(xs > ys){
		xi = (x2 - x1) / xs
		yi = (y2 - y1) / xs

		for(let i=0;i<xs;i++){
			if(x1==x2){
				y+=yi
			}
			else{
				y = m*x+b
			}
			point(x+=xi,y)
		}
	}
	else{
		xi = (x2 - x1) / ys
		yi = (y2 - y1) / ys

		for(let i=0;i<ys;i++){
			if(x1==x2){
				y+=yi
			}
			else{
				y = m*x+b
			}
			point(x+=xi,y)
		}
	}
}