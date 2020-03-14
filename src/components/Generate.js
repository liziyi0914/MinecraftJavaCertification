import react from 'react';
import {
	Card,
	Upload,
	Button,
	Row,
	Col
} from 'antd';
import {
	Picture,
	Color,
	Hash
} from '../utils';

export default class extends react.Component {

	static defaultProps = {
		originSkinURL: '',
		code: ''
	};

	canvas = null;
	ctx = null;
	originSkin = null;

	constructor() {
		super();
		this.state = { width: 100, height: 100, result: '', showCanvas: true };
		this.pid = setInterval(()=>{
			if(this.canvas!=null && this.ctx!=null && this.originSkin!=null) {
				clearInterval(this.pid);
				this.ctx.drawImage(this.originSkin,0,0);
				var data = this.ctx.getImageData(0,0,this.state.width,this.state.height);
				this.ctx.putImageData(Picture.of(data).sign(this.props.code).getPic(),0,0);
				this.setState({result:this.canvas.toDataURL("image/png"),showCanvas:false});
			}
		},500);
	}

	onLoad(e) {
		this.originSkin = e.target;
		this.setState({
			width: this.originSkin.width,
			height: this.originSkin.height
		});
	}

	render() {
		if(this.canvas!=null)this.ctx = this.canvas.getContext('2d');
		return (
		<Card style={{width:'200px',margin:'20px'}}>
			<Row>
				<Col span={10}>原始皮肤</Col>
				<Col span={14}>
					<img src={this.props.originSkinURL} onLoad={(e)=>this.onLoad(e)}/>
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