async function displayMarsPhotos(date) {
	try {
		const photos = await getMarsPhotosByDate(date);
		const photoContainer = document.getElementById("photo-container");
		photoContainer.innerHTML = "";

		if (photos.length === 0) {
			photoContainer.innerHTML = `<p>No photos available for ${date}.</p>`;
			return;
		}

		photos.forEach((photo) => {
			const img = document.createElement("img");
			img.src = photo.img_src;
			img.alt = `Photo taken by ${photo.rover.name} on ${photo.earth_date}`;
			img.classList.add("rover-photo");
			photoContainer.appendChild(img);
		});
	} catch (error) {
		console.error("Error fetching Mars photos:", error.message);
	}
}
