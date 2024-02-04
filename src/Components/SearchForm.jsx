/* eslint-disable react/prop-types */

const SearchForm = ({ handleSubmit, setKeyword, api }) => {
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search Images..........."
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<button onClick={api} type="submit">
				Search
			</button>
		</form>
	);
};

export default SearchForm;
