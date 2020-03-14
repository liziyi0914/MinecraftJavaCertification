import react from 'react';
import { Upload, Button } from 'antd';

export default class extends react.Component {

	static defaultProps = {
		onUpload: function(dataURL){}
	};

	reader = new FileReader();

	constructor() {
		super();
		this.state = { dataURL: '' };
		this.reader.onload = ()=>{
			this.setState({dataURL:this.reader.result});
			this.props.onUpload(this.reader.result);
		};
	}

	onUpload(f) {
		this.reader.readAsDataURL(f);
	}

	render() {
		return (
		<div>
			<Upload beforeUpload={(f)=>this.onUpload(f)}>
				<Button>上传皮肤</Button>
			</Upload>
			<img src={this.state.dataURL}/>
		</div>
		);
	}

}
