import react from 'react';
import { Button } from 'antd';
import router from 'umi/router';

export default class extends react.Component {
	render() {
		return (
		<div style={{textAlign:'center'}}>
			<Button onClick={()=>router.push('/generate')} style={{marginRight:'5px'}}>生成</Button>
			<Button onClick={()=>router.push('/check')}>查验</Button>
		</div>
		);
	}
}
