const galleryPhotos = [
    {
        id: 1,
        url: "images/Suki uwu.png",
        alt: "Love Photo",
        photographer: "A moment of pure love",
        category: "love"
    },
    {
        id: 2,
        url: "images/Suki uwu.png",
        alt: "Couple Photo",
        photographer: "Together forever",
        category: "couple"
    },
    {
        id: 3,
        url: "images/Suki uwu.png",
        alt: "Romantic Moment",
        photographer: "Romance in the sunset",
        category: "romantic"
    },
    {
        id: 4,
        url: "images/Suki uwu.png",
        alt: "Sunset Photo",
        photographer: "Golden hour beauty",
        category: "nature"
    },
    {
        id: 5,
        url: "images/Suki uwu.png",
        alt: "Beach Photo",
        photographer: "Waves of serenity",
        category: "nature"
    },
    {
        id: 6,
        url: "images/Suki uwu.png",
        alt: "Flowers Photo",
        photographer: "Blooming happiness",
        category: "nature"
    }
];

// Function to render gallery items
function renderGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = ''; // Clear existing content

    galleryPhotos.forEach((photo, index) => {
        // Calculate animation delay based on column position
        const columnPosition = index % 3; // Assuming 3 columns
        const rowPosition = Math.floor(index / 3);
        const delay = (columnPosition + rowPosition) * 100;

        const galleryItem = `
            <div class="gallery-item" 
                data-aos="fade-up" 
                data-aos-delay="${50 * (index % 3)}"
                data-aos-duration="600"
                data-aos-anchor-placement="top-bottom"
                data-aos-easing="ease-out-cubic">
                <img src="${photo.url}" alt="${photo.alt}">
                <div class="overlay">
                    <div class="photographer">
                        <span>${photo.photographer}</span>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.innerHTML += galleryItem;
    });
}

// Function to filter photos by category
function filterPhotosByCategory(category) {
    const filteredPhotos = category === 'all' 
        ? galleryPhotos 
        : galleryPhotos.filter(photo => photo.category === category);
    
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    filteredPhotos.forEach((photo, index) => {
        const galleryItem = `
            <div class="gallery-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                <img src="${photo.url}" alt="${photo.alt}">
                <div class="overlay">
                    <div class="photographer">
                        <span>${photo.photographer}</span>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.innerHTML += galleryItem;
    });
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        galleryPhotos,
        renderGallery,
        filterPhotosByCategory
    };
} 