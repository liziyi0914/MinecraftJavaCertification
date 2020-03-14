
function BasicLayout(props) {
  return (
    <div>
	  <h1 style={{textAlign:'center'}}>Minecraft Java版账号所有权认证</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
