import react from 'react';
import {
	Card,
	Button,
	Input,
	Form,
	message
} from 'antd';
import router from 'umi/router';
import { Picture } from '../utils';

export default class extends react.Component {

	form = null;
	canvas = null;
	ctx = null;
	skinImg = null;
	skinImgLoaded = false;
	worker = null;

	constructor() {
		super();
		this.form = react.createRef();
		this.state = {
			loading: false,
			uuid: '',
			width: 10,
			height: 10
		};
		this.worker = ()=>{
			if(this.canvas!=null && this.ctx!=null && this.skinImgLoaded) {
				clearInterval(this.pid);
				this.ctx.drawImage(this.skinImg,0,0);
				var data = this.ctx.getImageData(0,0,this.state.width,this.state.height);
				if(Picture.of(data).checkSign(this.state.code)) {
					message.success('签名验证成功',10);
					this.onFail();
				} else {
					message.error('签名验证失败',10);
					this.onFail();
				}
			}
		};
		this.pid = setInterval(()=>this.worker(),500);
	}

	reset() {
		this.form.current.resetFields();
	}

	onSubmit(values) {
		this.setState({loading:true,code:values.code, skinURL: 'https://mineskin.de/skin/'+values.id});
		this.skinImg.crossOrigin = '';
		this.skinImg.src = this.state.skinURL;
	}

	onSkinLoad() {
		this.skinImgLoaded = true;
		this.setState({
			width: this.skinImg.width,
			height: this.skinImg.height
		});
	}

	onFail() {
		this.ctx.clearRect(0,0,this.state.width,this.state.height);
		this.setState({loading: false});
		this.skinImgLoaded = false;
		this.pid = setInterval(()=>this.worker(),500);
	}

	render() {
		if(this.canvas!=null)this.ctx = this.canvas.getContext('2d');
		return (
		<Card style={{width:'300px',textAlign:'center',margin:'10px auto'}}>
			<Form ref={this.form} onFinish={vals=>this.onSubmit(vals)}>
				<Form.Item
					label="游戏ID"
					name="id"
					rules={[
						{
							required: true,
							message: '请输入游戏ID',
						},
					]}
				><Input /></Form.Item>
				<Form.Item
					label="验证信息"
					name="code"
					rules={[
						{
							required: true,
							message: '请输入验证信息',
						},
					]}
				><Input /></Form.Item>
				<Form.Item>
					<Button onClick={()=>router.push('/')} style={{marginRight:'10px'}}>返回</Button>
					<Button onClick={()=>this.reset()} style={{marginRight:'10px'}}>重置</Button>
					<Button type="primary" htmlType="submit" loading={this.state.loading}>查询</Button>
				</Form.Item>
			</Form>
			<img ref={i=>this.skinImg=i} onLoad={()=>this.onSkinLoad()} alt=''/>
			<canvas ref={c=>this.canvas=c} width={this.state.width} height={this.state.height}/>
		</Card>
		);
	}

}
