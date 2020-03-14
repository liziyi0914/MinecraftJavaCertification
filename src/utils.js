import sha3 from 'crypto-js/sha3';
import CryptoJS from 'crypto-js';;

class Color {

	constructor(r,g,b,a=255) {
		this.alpha = a;
		this.R = r;
		this.G = g;
		this.B = b;
	}

	mix(c) {
		this.R = ((this.R*(255-c.alpha)+c.R*c.alpha)/255)%256;
		this.G = ((this.G*(255-c.alpha)+c.G*c.alpha)/255)%256;
		this.B = ((this.B*(255-c.alpha)+c.B*c.alpha)/255)%256;
		this.alpha = c.alpha;
		return this;
	}

	equals(c) {
		return this.R==c.R&&this.G==c.G&&this.B==c.B&&this.alpha==c.alpha;
	}

	static RED = new Color(255,0,0);

}

class Picture {

	data = null;
	originData = null;
	width = 0;
	height = 0;

	constructor(data,w,h) {
		this.data = Uint8ClampedArray.from(data);
		this.originData = Uint8ClampedArray.from(data);
		this.width = w;
		this.height = h;
	}

	static of(img) {
		return new Picture(img.data,img.width,img.height);
	}

	getPic() {
		return new ImageData(this.data,this.width,this.height);
	}

	setARGB(x,y,color) {
		var index = (x+y*this.width)*4;
		this.data[index] = color.R;
		this.data[index+1] = color.G;
		this.data[index+2] = color.B;
		this.data[index+3] = color.alpha;
	}

	getARGB(x,y) {
		var index = (x+y*this.width)*4;
		return new Color(this.data[index],this.data[index+1],this.data[index+2],this.data[index+3]);
	}

	getColorByChannel(x,y,ch) {
		return this.data[(x+y*this.width)*4+ch];
	}

	setColorByChannel(x,y,ch,color) {
		this.data[(x+y*this.width)*4+ch] = color;
	}

	copy() {
		return new Picture(Uint8ClampedArray.from(this.data),this.width,this.height);
	}

	fill(x,y,w,h,color) {
		for(var i=0;i<w;i++) {
			for(var j=0;j<h;j++) {
				this.setARGB(x+i,y+j,color);
			}
		}
		return this;
	}

	convert(x,y,w,h) {
		var data = new Uint8ClampedArray(w*h*4);
		data.fill(255);
		for(var i=0;i<w&&x+i<this.width;i++) {
			for(var j=0;j<h&&y+j<this.height;j++) {
				var color = this.getARGB(i+x,j+y);
				var index = (i+j*w)*4;
				data[index] = color.R;
				data[index+1] = color.G;
				data[index+2] = color.B;
				data[index+3] = color.alpha;
			}
		}
		return new Picture(data,w,h);
	}

	drawImage(img,x,y) {
		for(var i=0;i<img.width&&x+i<this.width;i++) {
			for(var j=0;j<img.height&&y+j<this.height;j++) {
				this.setARGB(x+i,y+j,this.getARGB(x+i,y+j).mix(img.getARGB(i,j)));
			}
		}
		return this;
	}

	sign(code) {
		var hashA = rgb2rgba(Hash(code));
		var hashB = rgb2rgba(Hash(sha3(code,{ outputLength: 384 }).toString(CryptoJS.enc.Hex)));
		var imgA = new Picture(hashA,4,4);
		var imgB = new Picture(hashB,4,4);
		return this
			.drawImage(imgA,0,0)
			.drawImage(imgB,4,0)
			.drawImage(imgA,4,4)
			.drawImage(imgB,0,4);
	}

	checkSign(code) {
		for(var i=0;i<4;i++) {
			for(var j=0;j<4;j++) {
				if(!(this.getARGB(i,j).equals(this.getARGB(i+4,j+4))&&this.getARGB(i+4,j).equals(this.getARGB(i,j+4)))) {
					return false;
				}
			}
		}
		var hashA = rgb2rgba(Hash(code));
		var hashB = rgb2rgba(Hash(sha3(code,{ outputLength: 384 }).toString(CryptoJS.enc.Hex)));
		var imgA = new Picture(hashA,4,4);
		var imgB = new Picture(hashB,4,4);
		for(var i=0;i<4;i++) {
			for(var j=0;j<4;j++) {
				if(!(this.getARGB(i,j).equals(imgA.getARGB(i,j))&&this.getARGB(i+4,j).equals(imgB.getARGB(i,j)))) {
					return false;
				}
			}
		}
		return true;
	}

}

function Hash(data) {
	var hash = sha3(data,{ outputLength: 384 }).toString(CryptoJS.enc.Hex);
	var arr = [];
	for(var i=0;i<hash.length;i+=2) {
		arr.push(hash[i]+hash[i+1]);
	}
	arr = arr.map(it=>parseInt(it,16));
	return arr;
}

function rgb2rgba(arr) {
	var result = [];
	for(var i=0;i<arr.length;i++) {
		result.push(arr[i]);
		if(i%3==2) {
			result.push(255);
		}
	}
	return result;
}

export {
	Picture,
	Color,
	Hash
};
