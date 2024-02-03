import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";
import ImageComponent from "./ImageComponent";
import SearchForm from "./SearchForm";

const Body = () => {
	//State Variables defined
	const accessKey = "WCO1Nkc4C26M4kW-Oi6JOlTCYpPVQG1BTAkKrgN9tKM";
	const [keyword, setKeyword] = useState(" ");
	const [image, setImage] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(12);

	//On submit of form , this function is called
	const handleSubmit = (e) => {
		e.preventDefault();
		setPage(1);
		setImage([]);
		imageApiData();
	};

	//This function is called when media chnages for small devices load 6 images otherwise 12 images
	const handleMediaChange = (x) => {
		setPerPage(x.matches ? 6 : 12);
	};

	//This useEffect hook is used to see the change of media
	useEffect(() => {
		const x = window.matchMedia("(max-width: 400px)");
		handleMediaChange(x);
		x.addEventListener("change", handleMediaChange);

		return () => {
			x.removeEventListener("change", handleMediaChange);
		};
	}, []);

	//This useEffect hook is used to setImage as empty array and setPage as 1 whenever keyword and perPage value changes
	useEffect(() => {
		setImage([]);
		setPage(1);
	}, [keyword, perPage]);

	//Async function fetching data from API server
	const imageApiData = async () => {
		try {
			setLoading(true);
			const data = await fetch(
				`https://api.unsplash.com/search/photos?page=${page}&query=${keyword.trim()}&client_id=${accessKey}&per_page=${perPage}`
			);
			const json = await data.json();
			if (page === 1) {
				setImage(json.results.slice(0, perPage)); //perPage = 12
			} else {
				setImage((prevImages) => [...prevImages, ...json.results]); // add previous images with the new loaded images
			}
		} catch (error) {
			console.error("Error fetching images:", error);
			// Handle error here
		} finally {
			setLoading(false);
		}
	};

	return (
		//Main body div
		<div className="body">
			{/* SearchForm component  */}
			<SearchForm
				handleSubmit={handleSubmit}
				setKeyword={setKeyword}
				api={imageApiData}
			/>
			{/* 
			for no image load show text Loading Images..... but as soon as image loads put this into this ImageComponent as give this image array as props  */}
			{image.length > 0 ? (
				<ImageComponent image={image} />
			) : (
				<p>Loading Images..........</p>
			)}

			{/* show more button is used to show another 12 images below the existing ones on click of this button  */}
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
