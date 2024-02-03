/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ShowMoreBtn = (props) => {
	const { api, setPage, imgLength, loading } = props;
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				paddingBottom: "20px",
			}}
		>
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

const Body = () => {
	const handleMediaChange = (x) => {
		setPerPage(x.matches ? 6 : 12);
	};

	useEffect(() => {
		const x = window.matchMedia("(max-width: 400px)");
		handleMediaChange(x); // Initial check
		x.addEventListener("change", handleMediaChange); // Listen for changes

		return () => {
			x.removeEventListener("change", handleMediaChange); // Cleanup event listener
		};
	}, []); // Empty dependency array ensures the effect runs only once on mount
	const accessKey = "WCO1Nkc4C26M4kW-Oi6JOlTCYpPVQG1BTAkKrgN9tKM";
	const [keyword, setKeyword] = useState(" ");
	const [image, setImage] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(12);

	useEffect(() => {
		setImage([]);
		setPage(1);
		// imageApiData();
	}, [keyword, perPage]);
	const imageApiData = async () => {
		try {
			setLoading(true);
			const data = await fetch(
				`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=${perPage}`
			);
			const json = await data.json();
			if (page === 1) {
				// On the first load, display only the first batch of images
				setImage(json.results.slice(0, perPage));
			} else {
				// On subsequent loads (Show More), concatenate new images
				setImage((prevImages) => [...prevImages, ...json.results]);
			}
		} catch (error) {
			console.error("Error fetching images:", error);
			// Handle error here
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="body">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setPage(1);
					setImage([]);
					imageApiData();
				}}
			>
				{" "}
				<input
					type="text"
					placeholder="Search Images"
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<button onClick={imageApiData} type="submit">
					Search
				</button>
			</form>

			{image.length > 0 ? (
				<div className="image-result">
					{image.map((img, index) => (
						<a
							key={index}
							href={img.links.html}
							target="_blank"
							rel="noreferrer"
						>
							<img src={img.urls.small} alt={`Unsplash Image ${index}`} />
						</a>
					))}
				</div>
			) : (
				<p>Loading Images</p>
			)}
			<ShowMoreBtn
				imgLength={image.length}
				api={imageApiData}
				setPage={setPage}
				loading={loading}
			/>
		</div>
	);
};

export default Body;
