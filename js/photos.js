const galleryPhotos = [
    {
        id: 1,
        url: "images/Suki uwu.png",
        alt: "Love Photo",
        photographer: "A moment of pure love",
        category: "love",
        size: "large"
    },
    {
        id: 2,
        url: "images/Suki uwu.png",
        alt: "Couple Photo",
        photographer: "Together forever",
        category: "couple",
        size: "small"
    },
    {
        id: 3,
        url: "images/Suki uwu.png",
        alt: "Romantic Moment",
        photographer: "Romance in the sunset",
        category: "romantic",
        size: "small"
    },
    {
        id: 4,
        url: "images/Suki uwu.png",
        alt: "Sunset Photo",
        photographer: "Golden hour beauty",
        category: "nature",
        size: "small"
    },
    {
        id: 5,
        url: "images/Suki uwu.png",
        alt: "Beach Photo",
        photographer: "Waves of serenity",
        category: "nature",
        size: "large"
    },
    {
        id: 6,
        url: "images/Suki uwu.png",
        alt: "Flowers Photo",
        photographer: "Blooming happiness",
        category: "nature",
        size: "small"
    },
    {
        id: 7,
        url: "images/Suki uwu.png",
        alt: "Nature Beauty",
        photographer: "Natural wonders",
        category: "nature",
        size: "small"
    },
    {
        id: 9,
        url: "images/Suki uwu.png",
        alt: "Sunset Dreams",
        photographer: "Evening magic",
        category: "nature",
        size: "large"
    },
    {
        id: 10,
        url: "images/Suki uwu.png",
        alt: "Mountain View",
        photographer: "Peak perfection",
        category: "nature",
        size: "small"
    },
    {
        id: 11,
        url: "images/Suki uwu.png",
        alt: "Ocean Waves",
        photographer: "Coastal beauty",
        category: "nature",
        size: "small"
    },
    {
        id: 12,
        url: "images/Suki uwu.png",
        alt: "Forest Path",
        photographer: "Woodland journey",
        category: "nature",
        size: "large"
    },
    {
        id: 13,
        url: "images/Suki uwu.png",
        alt: "Desert Sands",
        photographer: "Golden dunes",
        category: "nature",
        size: "small"
    },
    {
        id: 14,
        url: "images/Suki uwu.png",
        alt: "Starry Night",
        photographer: "Night sky wonders",
        category: "nature",
        size: "small"
    },
    {
        id: 15,
        url: "images/Suki uwu.png",
        alt: "Morning Mist",
        photographer: "Dawn's embrace",
        category: "nature",
        size: "large"
    }
];

// Function to render gallery items
function renderGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = ''; // Clear existing content

    // Calculate total columns needed (3 columns per row)
    const totalColumns = 3;
    let currentRow = [];
    let allRows = [];

    // Group photos into rows
    galleryPhotos.forEach((photo, index) => {
        currentRow.push(photo);
        
        // When row is complete or it's the last item
        if (currentRow.length === totalColumns || index === galleryPhotos.length - 1) {
            allRows.push([...currentRow]);
            currentRow = [];
        }
    });

    // Render each row
    allRows.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'gallery-row';
        
        // Render items in the row
        row.forEach((photo, colIndex) => {
            const delay = (rowIndex * totalColumns + colIndex) * 50;
            
            const galleryItem = `
                <div class="gallery-item gallery-item-${photo.size}" 
                    data-aos="fade-up" 
                    data-aos-delay="${delay}"
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
            rowDiv.innerHTML += galleryItem;
        });

        galleryGrid.appendChild(rowDiv);
    });
}

// Function to filter photos by category
function filterPhotosByCategory(category) {
    const filteredPhotos = category === 'all' 
        ? galleryPhotos 
        : galleryPhotos.filter(photo => photo.category === category);
    
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    // Group filtered photos into rows
    const totalColumns = 3;
    let currentRow = [];
    let allRows = [];

    filteredPhotos.forEach((photo, index) => {
        currentRow.push(photo);
        
        if (currentRow.length === totalColumns || index === filteredPhotos.length - 1) {
            allRows.push([...currentRow]);
            currentRow = [];
        }
    });

    // Render filtered rows
    allRows.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'gallery-row';
        
        row.forEach((photo, colIndex) => {
            const delay = (rowIndex * totalColumns + colIndex) * 100;
            
            const galleryItem = `
                <div class="gallery-item gallery-item-${photo.size}" 
                    data-aos="fade-up" 
                    data-aos-delay="${delay}">
                    <img src="${photo.url}" alt="${photo.alt}">
                    <div class="overlay">
                        <div class="photographer">
                            <span>${photo.photographer}</span>
                        </div>
                    </div>
                </div>
            `;
            rowDiv.innerHTML += galleryItem;
        });

        galleryGrid.appendChild(rowDiv);
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