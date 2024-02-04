import { RiAccountCircleFill } from "react-icons/ri";

const Header = () => {
	return (
		<div className="header">
			<h2>
				<span>S</span>EARCH
				<span>I</span>MAGE
			</h2>
			<div className="account-icon">
				<RiAccountCircleFill />
			</div>
		</div>
	);
};

export default Header;
