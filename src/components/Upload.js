import react from 'react';
import { Input, Button, Form } from 'antd';

export default class extends react.Component {

	static defaultProps = {
		onUpload: function(dataURL){}
	};

	constructor() {
		super();
		this.state = { dataURL: '' };
	}

	onSubmit(id) {
		this.setState({dataURL: 'https://mineskin.de/skin/'+id});
		this.props.onUpload(this.state.dataURL);
	}

	render() {
		return (
		<div>
			<Form
				onFinish={values=>this.onSubmit(values.id)}
			>
				<Form.Item
					label='正版ID'
					name='id'
					rules={[{
						required: true,
						message: '请输入正版ID',
					}]}
				><Input/></Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">拉取皮肤</Button>
				</Form.Item>
			</Form>
			<img src={this.state.dataURL}/>
		</div>
		);
	}

}
