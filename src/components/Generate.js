import react from 'react';
import {
	Card,
	Row,
	Col
} from 'antd';
import {
	Picture,
} from '../utils';

export default class extends react.Component {

	static defaultProps = {
		originSkinURL: '',
		code: ''
	};

	canvas = null;
	ctx = null;
	originSkin = null;
	originSkinLoaded = false;

	constructor() {
		super();
		this.state = { width: 100, height: 100, result: '', showCanvas: true };
		this.pid = setInterval(()=>{
			if(this.canvas!=null && this.ctx!=null && this.originSkinLoaded) {
				clearInterval(this.pid);
				this.ctx.drawImage(this.originSkin,0,0);
				var data = this.ctx.getImageData(0,0,this.state.width,this.state.height);
				this.ctx.putImageData(Picture.of(data).sign(this.props.code).getPic(),0,0);
				this.setState({result:this.canvas.toDataURL("image/png"),showCanvas:false});
			}
		},500);
	}

	onLoad(e) {
		this.originSkinLoaded = true;
		this.setState({
			width: this.originSkin.width,
			height: this.originSkin.height
		});
	}

	componentDidMount() {
		this.originSkin.crossOrigin = '';
		this.originSkin.src = this.props.originSkinURL;
	}

	render() {
		if(this.canvas!=null)this.ctx = this.canvas.getContext('2d');
		return (
		<Card style={{width:'200px',margin:'20px'}}>
			<Row>
				<Col span={10}>原始皮肤</Col>
				<Col span={14}>
					<img onLoad={(e)=>this.onLoad(e)} ref={img=>this.originSkin=img}/>
				</Col>
			</Row>
			<Row>
				<Col span={10}>验证信息</Col>
				<Col span={14}>{this.props.code}</Col>
			</Row>
			<Row>
				<Col span={10}>证书皮肤</Col>
				<Col span={14}>
				{this.state.showCanvas?(<canvas ref={(c)=>this.canvas=c} width={this.state.width} height={this.state.height}/>):(<img src={this.state.result}/>)}
				</Col>
			</Row>
		</Card>
		);
	}

}
