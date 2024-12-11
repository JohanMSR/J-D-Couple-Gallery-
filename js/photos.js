const galleryPhotos = [
    {
        id: 1,
        url: "images/10 dic.png",
        alt: "Love Photo",
        photographer: "A moment of pure love",
        category: "love",
        size: "small"
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
        size: "small"
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
        size: "small"
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
        size: "small"
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
        size: "small"
    }
];

// Function to randomize sizes while maintaining grid layout
function randomizeGallerySizes() {
    let currentRowWidth = 0;
    let currentRow = [];
    const rows = [];
    
    // First pass: group photos into potential rows
    galleryPhotos.forEach((photo, index) => {
        if (currentRowWidth + 1 <= 3) {
            currentRow.push(photo);
            currentRowWidth += 1;
        }
        
        if (currentRowWidth === 3 || index === galleryPhotos.length - 1) {
            rows.push([...currentRow]);
            currentRow = [];
            currentRowWidth = 0;
        }
    });

    // Second pass: randomize sizes within each row
    rows.forEach(row => {
        if (row.length === 3) {
            // Add new pattern options including wide: [W,S] or [S,W] or [L,S,S] or [S,L,S] or [S,S,L]
            const pattern = Math.floor(Math.random() * 5);
            switch (pattern) {
                case 0:
                    row[0].size = "wide";
                    row[1].size = "small";
                    row[2] && (row[2].size = "hidden"); // Hide third item if wide is used
                    break;
                case 1:
                    row[0].size = "small";
                    row[1].size = "wide";
                    row[2] && (row[2].size = "hidden"); // Hide third item if wide is used
                    break;
                case 2:
                    row[0].size = "large";
                    row[1].size = "small";
                    row[2].size = "small";
                    break;
                case 3:
                    row[0].size = "small";
                    row[1].size = "large";
                    row[2].size = "small";
                    break;
                case 4:
                    row[0].size = "small";
                    row[1].size = "small";
                    row[2].size = "large";
                    break;
            }
        } else if (row.length === 2) {
            // For incomplete rows, randomly choose between [L,S], [S,L], or [W]
            const pattern = Math.floor(Math.random() * 3);
            if (pattern === 2) {
                row[0].size = "wide";
                row[1].size = "hidden";
            } else {
                row[0].size = pattern === 0 ? "large" : "small";
                row[1].size = pattern === 0 ? "small" : "large";
            }
        }
    });
}

// Function to render gallery items
function renderGallery() {
    // Randomize sizes before rendering
    randomizeGallerySizes();
    
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    const totalColumns = 3;
    let currentRow = [];
    let allRows = [];

    galleryPhotos.forEach((photo, index) => {
        currentRow.push(photo);
        
        if (currentRow.length === totalColumns || index === galleryPhotos.length - 1) {
            allRows.push([...currentRow]);
            currentRow = [];
        }
    });

    allRows.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'gallery-row';
        
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
    
    // Randomize sizes for filtered photos
    randomizeGallerySizes();
    
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

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