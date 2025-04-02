// API Key
const API_KEY = "EmHhTKIuzk3g48AGMvUpCdKSCr11l25vwMoWs2ZJ";

// Fetch photos from NASA Mars Rover Photos API
async function getMarsPhotosByDate(date) {
	const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP Error! status: ${response.status}`);
	}

	const data = await response.json();
	return data.photos;
}

// Display up to 3 photos on the page
async function displayMarsPhotos(date) {
	try {
		const photos = await getMarsPhotosByDate(date);
		const photoContainer = document.getElementById("photo-container");
		photoContainer.innerHTML = "";

		if (photos.length === 0) {
			photoContainer.innerHTML = `<p>No photos available for ${date}.</p>`;
			return;
		}

		photos.slice(0, 3).forEach((photo) => {
			const { img_src, earth_date, rover: { name } } = photo;

			const img = document.createElement("img");
			img.src = img_src;
			img.alt = `Photo taken by ${name} on ${earth_date}`;
			img.classList.add("rover-photo");
			photoContainer.appendChild(img);
		});
	} catch (error) {
		console.error("Error fetching Mars photos:", error.message);
		const photoContainer = document.getElementById("photo-container");
		photoContainer.innerHTML = `<p>Oops! Something went wrong while fetching photos.</p>`;
	}
}

// Handle manual date input fetch
document.getElementById("fetch-btn").addEventListener("click", () => {
	const dateInput = document.getElementById("earth-date").value;
	if (dateInput) {
		displayMarsPhotos(dateInput);
	}
});

// Handle special event buttons
document.querySelectorAll(".special-events button").forEach((btn) => {
	btn.addEventListener("click", () => {
		const date = btn.getAttribute("data-date");
		displayMarsPhotos(date);
	});
});

