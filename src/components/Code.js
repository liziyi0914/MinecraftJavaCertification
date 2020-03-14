import react from 'react';
import { Input } from 'antd';

export default class extends react.Component {

	static defaultProps = {
		callback: function(value){}
	};

	render() {
		return (
		<div>
			请输入验证信息
			<Input onChange={(e)=>this.props.callback(e.target.value)}/>
		</div>
		);
	}

}
