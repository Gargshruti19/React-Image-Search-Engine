/* eslint-disable react/prop-types */
// Image is an array that's why we can map over it
const ImageComponent = ({ image }) => {
	return (
		<div className="image-result">
			{image.map((img, index) => (
				<a key={index} href={img.links.html} target="_blank" rel="noreferrer">
					<img src={img.urls.small} alt={`Unsplash Image ${index}`} />
				</a>
			))}
		</div>
	);
};

export default ImageComponent;
