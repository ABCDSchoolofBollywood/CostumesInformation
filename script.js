// Declare a variable to store the costumes data in an array
let costumesArray = [];

// Fetch the costumes data from the costumes.json file
fetch('costumes.json')
    .then(response => response.json())
    .then(costumes => {
        // Store the fetched data into the costumesArray
        costumesArray = costumes;

        // Dynamically create costume cards
        const container = document.querySelector(".container");

        costumesArray.forEach(costume => {
            let currentIndex = 0;
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="image-container">
                    <img src="${costume.photos[currentIndex]}" class="costume-image" id="image-${costume.id}">
                    <div>
                        <button class="toggle-btn" onclick="toggleImage('${costume.id}', -1)">Prev</button>
                        <button class="toggle-btn" onclick="toggleImage('${costume.id}', 1)">Next</button>
                    </div>
                </div>
                <p>${costume.category}</p>
                <p class="bold-text">${costume.name}</p>
                <div class="details">
                    <div>
                        <p><b>Gender:</b> ${costume.gender}</p>
                        <p><b>Size:</b> ${costume.size}</p>
                    </div>
                    <div>
                        <p><b>Count:</b> ${costume.count}</p>
                    </div>
                </div>
                <p><b>Cost, Availability:</b> Contact Us</p>
                <p>ID: ${costume.id}</p>
            `;
            container.appendChild(card);
            
            // Store the currentIndex inside the card element
            card.dataset.currentIndex = currentIndex;
            card.dataset.costumeId = costume.id;
            card.dataset.photos = JSON.stringify(costume.photos);
        });
    })
    .catch(error => console.error("Error loading the costume data:", error));

// Function to toggle images when clicking on the buttons
function toggleImage(id, direction) {
    const card = document.querySelector(`[data-costume-id='${id}']`);
    if (!card) return;

    let currentIndex = parseInt(card.dataset.currentIndex, 10);
    const photos = JSON.parse(card.dataset.photos);

    // Calculate the new index
    currentIndex = (currentIndex + direction + photos.length) % photos.length;

    // Update the image source
    const imgElement = card.querySelector('.costume-image');
    imgElement.src = photos[currentIndex];

    // Update the current index in the dataset
    card.dataset.currentIndex = currentIndex;
}
