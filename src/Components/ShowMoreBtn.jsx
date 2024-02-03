/* eslint-disable react/prop-types */
const ShowMoreBtn = (props) => {
	const { api, setPage, imgLength, loading } = props;
	return (
		<div className="show_more_btn">
			<button
				className={imgLength > 0 ? "show" : "hidden"}
				onClick={() => {
					setPage((prevPage) => prevPage + 1);
					api();
				}}
				disabled={loading}
			>
				{loading ? "Loading..." : "Show More"}
			</button>
		</div>
	);
};
export default ShowMoreBtn;
