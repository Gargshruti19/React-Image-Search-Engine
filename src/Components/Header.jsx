import { RiAccountCircleFill } from "react-icons/ri";

const Header = () => {
	return (
		<div className="header">
			<h2>
				<span>I</span>MAGE
				<span>S</span>EARCH
			</h2>
			<div className="account-icon">
				<RiAccountCircleFill />
			</div>
		</div>
	);
};

export default Header;
