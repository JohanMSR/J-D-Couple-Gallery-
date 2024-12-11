const galleryPhotos = [
    {
        id: 1,
        url: "images/love/love1.jpg",
        alt: "Love Photo",
        photographer: "A moment of pure love",
        category: "love"
    },
    {
        id: 2,
        url: "images/couple/couple1.jpg",
        alt: "Couple Photo",
        photographer: "Together forever",
        category: "couple"
    },
    {
        id: 3,
        url: "images/romantic/romantic1.jpg",
        alt: "Romantic Moment",
        photographer: "Romance in the sunset",
        category: "romantic"
    },
    {
        id: 4,
        url: "images/nature/nature1.jpg",
        alt: "Sunset Photo",
        photographer: "Golden hour beauty",
        category: "nature"
    },
    {
        id: 5,
        url: "images/nature/nature2.jpg",
        alt: "Beach Photo",
        photographer: "Waves of serenity",
        category: "nature"
    },
    {
        id: 6,
        url: "images/nature/nature3.jpg",
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
        const animations = [
            'fade-up',
            'fade-down',
            'fade-right',
            'fade-left',
            'zoom-in',
            'zoom-in-up'
        ];
        const randomAnimation = animations[index % animations.length];

        const galleryItem = `
            <div class="gallery-item" 
                data-aos="${randomAnimation}" 
                data-aos-delay="${index * 150}"
                data-aos-duration="${800 + (index * 100)}"
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