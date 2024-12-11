document.addEventListener('DOMContentLoaded', function() {
    // Render initial gallery
    renderGallery();
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic',
        delay: 50,
        mirror: true,
        anchorPlacement: 'center-bottom'
    });

    // Add search functionality
    const searchInput = document.querySelector('.nav-search input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredPhotos = galleryPhotos.filter(photo => 
            photo.alt.toLowerCase().includes(searchTerm) ||
            photo.category.toLowerCase().includes(searchTerm)
        );
        
        renderFilteredGallery(filteredPhotos);
    });
});

// Function to render filtered gallery
function renderFilteredGallery(filteredPhotos) {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    if (filteredPhotos.length === 0) {
        galleryGrid.innerHTML = `
            <div class="no-results">
                <p>No photos found</p>
            </div>
        `;
        return;
    }

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

    // Refresh AOS for new elements
    AOS.refresh();
} 