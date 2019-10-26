import { connect } from "react-redux";

function Index({ user }) {
	return (
		<div>
			Index
			<br />
			{user && <span>欢迎你: {user.name}</span>}
		</div>
	);
}
const mapStateToProps = (state) => {
	return { user: state.user };
};
export default connect(mapStateToProps)(Index);
