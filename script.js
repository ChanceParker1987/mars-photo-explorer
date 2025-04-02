const API_KEY = "EmHhTKIuzk3g48AGMvUpCdKSCr11l25vwMoWs2ZJ";

async function getMarsPhotosByDate(date) {
	const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP Error! status: ${response.status}`);
	}

	const data = await response.json();
	return data.photos;
}

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

document.getElementById("fetch-btn").addEventListener("click", () => {
	const dateInput = document.getElementById("earth-date").value;
	if (dateInput) {
		displayMarsPhotos(dateInput);
	}
});

document.querySelectorAll(".special-events button").forEach((btn) => {
	btn.addEventListener("click", () => {
		const date = btn.getAttribute("data-date");
		displayMarsPhotos(date);
	});
});
