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

// Render photos to the gallery with description
function renderPhotos(photos, description) {
	const photoContainer = document.getElementById("photo-container");
	photoContainer.innerHTML = "";

	// Add description above the gallery
	const descriptionEl = document.createElement("p");
	descriptionEl.classList.add("photo-description");
	descriptionEl.textContent = description;
	photoContainer.appendChild(descriptionEl);

	// Create a grid for photos
	const grid = document.createElement("div");
	grid.classList.add("photo-grid");

	if (photos.length === 0) {
		grid.innerHTML = `<p>No photos available for this date.</p>`;
		photoContainer.appendChild(grid);
		return;
	}

	photos.slice(0, 3).forEach((photo) => {
		const { img_src, earth_date, rover: { name }, camera: { full_name } } = photo;

		const photoWrapper = document.createElement("div");
		photoWrapper.classList.add("photo-item");

		const img = document.createElement("img");
		img.src = img_src;
		img.alt = `Photo taken by ${name} using ${full_name} on ${earth_date}`;
		img.classList.add("rover-photo");

		const caption = document.createElement("p");
		caption.textContent = `${name} | ${full_name} | ${earth_date}`;

		photoWrapper.appendChild(img);
		photoWrapper.appendChild(caption);
		grid.appendChild(photoWrapper);
	});

	photoContainer.appendChild(grid);
}

// Display photos for a selected date
async function displayMarsPhotos(date) {
	try {
		const photos = await getMarsPhotosByDate(date);
		renderPhotos(photos, `Photos taken on ${date}`);
	} catch (error) {
		console.error("Error fetching Mars photos:", error.message);
		const photoContainer = document.getElementById("photo-container");
		photoContainer.innerHTML = `<p>Oops! Something went wrong while fetching photos.</p>`;
	}
}

// Load initial set of photos when the page loads
async function loadInitialPhotos() {
	const initialDate = "2015-05-31"; // Sol 1000
	const description = `Celebrating Sol 1000 on Mars — photos taken by Curiosity on May 31, 2015.`;
	try {
		const photos = await getMarsPhotosByDate(initialDate);
		renderPhotos(photos, description);
	} catch (error) {
		console.error("Error loading initial photos:", error.message);
	}
}

// Fetch button logic
document.getElementById("fetch-btn").addEventListener("click", () => {
	const dateInput = document.getElementById("earth-date").value;
	if (dateInput) {
		displayMarsPhotos(dateInput);
	}
});

// Special event buttons
document.querySelectorAll(".special-events button").forEach((btn) => {
	btn.addEventListener("click", () => {
		const date = btn.getAttribute("data-date");
		displayMarsPhotos(date);
	});
});

// Run on page load
window.addEventListener("DOMContentLoaded", loadInitialPhotos);



