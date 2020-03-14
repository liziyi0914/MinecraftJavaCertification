import react from 'react';
import { Steps, Button } from 'antd';
import Upload from '../components/Upload';
import Code from '../components/Code';
import Generate from '../components/Generate';
import router from 'umi/router';

const { Step } = Steps;

class GeneratePage extends react.Component {

	constructor() {
		super();
		this.state = {
			current: 0,
			originSkinURL: '',
			code: '',
			unlock: [false,false]
		};
	}

	onUpload(url) {
		this.setState({originSkinURL: url, unlock: [true,false]});
	}

	prev() {
		if(this.state.current!=0) {
			this.setState({current:this.state.current-1});
		}
	}

	next() {
		if(this.state.current!=2) {
			this.setState({current:this.state.current+1});
		}
	}

	render() {
		var { current } = this.state;
		return (
		<div>
			<Steps current={current} direction="horizontal">
				<Step title="提交原皮肤"/>
				<Step title="签名"/>
				<Step title="下载皮肤"/>
			</Steps>
			<div style={{width:'250px',textAlign:'center',margin:'10px auto'}}>
			{ current==0 && (<Upload onUpload={(url)=>this.onUpload(url)}/>) }
			{ current==1 && (
				<Code callback={(code)=>this.setState({code:code,unlock:[true,true]})}/>
			) }
			{ current==2 && (
				<Generate originSkinURL={this.state.originSkinURL} code={this.state.code}/>
			) }
			<div style={{marginTop:'10px'}}>
			<Button onClick={()=>router.push('/')} style={{marginRight:'5px'}}>返回</Button>
			{current!=0 && <Button onClick={()=>this.prev()} style={{marginRight:'5px'}}>上一步</Button>}
			{current!=2 && this.state.unlock[current] && <Button onClick={()=>this.next()}>下一步</Button>}
			</div>
			</div>
		</div>
		);
	}
}

export default GeneratePage;
