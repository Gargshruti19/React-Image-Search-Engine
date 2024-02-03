import { RiAccountCircleFill } from "react-icons/ri";

const Header = () => {
	return (
		<div className="header">
			<h2>
				<span>S</span>earch
				<span>E</span>ngine
			</h2>
			<div className="account-icon">
				<RiAccountCircleFill />
			</div>
		</div>
	);
};

export default Header;
