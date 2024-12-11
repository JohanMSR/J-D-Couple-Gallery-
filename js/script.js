document.addEventListener('DOMContentLoaded', function() {
    // Render initial gallery
    renderGallery();
    
    // Initialize AOS with simpler settings
    AOS.init({
        // Disable on all mobile devices
        disable: window.innerWidth < 768,
        // Animation only happens once
        once: true,
        // Shorter duration
        duration: 600,
        // Remove mirror effect which can cause scroll issues
        mirror: false,
        // Use a simpler easing
        easing: 'ease-out',
        // Reduce the offset to trigger animations
        offset: 50
    });

    // Refresh AOS only when needed
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            AOS.refresh();
        }, 250);
    });

    // Add search functionality
    const searchInput = document.querySelector('.nav-search input');
    
    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalDescription = document.querySelector('.modal-description');
    const closeModal = document.querySelector('.close-modal');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
    let currentPhotoIndex = 0;
    let isZoomed = false;
    
    // Function to open modal
    function openModal(photoIndex) {
        currentPhotoIndex = photoIndex;
        const photo = galleryPhotos[photoIndex];
        modal.style.display = 'flex';
        modalImg.src = photo.url;
        modalDescription.textContent = photo.photographer;
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
        isZoomed = false;
        modalImg.classList.remove('zoomed');
        setTimeout(() => modal.classList.add('active'), 10);
    }
    
    // Function to handle image zoom
    function toggleZoom(e) {
        if (e.target === modalImg) {
            // Check if device is mobile
            const isMobile = window.innerWidth <= 768;
            if (isMobile && isZoomed) {
                // On mobile, reset transform origin when zooming out
                modalImg.style.transformOrigin = 'center';
            }
            isZoomed = !isZoomed;
            modalImg.classList.toggle('zoomed');
        }
    }
    
    // Add zoom click handler
    modalImg.addEventListener('click', toggleZoom);
    
    // Handle mouse move for panning when zoomed
    modalImg.addEventListener('mousemove', function(e) {
        const isMobile = window.innerWidth <= 768;
        if (isZoomed && !isMobile) {
            const rect = modalImg.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 100;
            const y = (e.clientY - rect.top) / rect.height * 100;
            modalImg.style.transformOrigin = `${x}% ${y}%`;
        }
    });
    
    // Function to close modal
    function closeModalFunction() {
        modal.classList.remove('active');
        setTimeout(() => {
            // Restore scrolling
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            modal.style.display = 'none';
        }, 300);
    }
    
    // Function to navigate photos
    function navigatePhoto(direction) {
        currentPhotoIndex = (currentPhotoIndex + direction + galleryPhotos.length) % galleryPhotos.length;
        const photo = galleryPhotos[currentPhotoIndex];
        modalImg.style.opacity = '0';
        isZoomed = false;
        modalImg.classList.remove('zoomed');
        setTimeout(() => {
            modalImg.src = photo.url;
            modalDescription.textContent = photo.photographer;
            modalImg.style.opacity = '1';
        }, 200);
    }
    
    // Event listeners for modal
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const index = Array.from(galleryItem.parentNode.children).indexOf(galleryItem);
            openModal(index);
        }
    });
    
    closeModal.addEventListener('click', closeModalFunction);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModalFunction();
    });
    
    prevButton.addEventListener('click', () => navigatePhoto(-1));
    nextButton.addEventListener('click', () => navigatePhoto(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                navigatePhoto(-1);
                break;
            case 'ArrowRight':
                navigatePhoto(1);
                break;
            case 'Escape':
                closeModalFunction();
                break;
        }
    });

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredPhotos = galleryPhotos.filter(photo => 
            photo.alt.toLowerCase().includes(searchTerm) ||
            photo.category.toLowerCase().includes(searchTerm)
        );
        
        renderFilteredGallery(filteredPhotos);
    });

    // Prevent scrolling when modal is open on mobile
    modal.addEventListener('touchmove', function(e) {
        if (isZoomed) {
            e.preventDefault();
        }
    }, { passive: false });

    // Touch interaction handling
    let touchStartX = 0;
    let touchEndX = 0;
    let currentTranslateX = 0;
    let isDragging = false;
    const SWIPE_THRESHOLD = 100; // minimum distance for a swipe

    const modalImageContainer = document.getElementById('modalImageContainer');
    const modalImage = document.getElementById('modalImage');

    // Add touch event listeners
    modalImageContainer.addEventListener('touchstart', handleTouchStart, false);
    modalImageContainer.addEventListener('touchmove', handleTouchMove, false);
    modalImageContainer.addEventListener('touchend', handleTouchEnd, false);

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        isDragging = true;
        currentTranslateX = 0;
        modalImage.style.transition = 'none';
    }

    function handleTouchMove(event) {
        if (!isDragging) return;
        
        const currentX = event.touches[0].clientX;
        currentTranslateX = currentX - touchStartX;
        
        // Limit the drag distance
        if (Math.abs(currentTranslateX) > window.innerWidth / 3) {
            currentTranslateX = (currentTranslateX > 0 ? 1 : -1) * window.innerWidth / 3;
        }
        
        modalImage.style.transform = `translateX(${currentTranslateX}px)`;
        
        // Show swipe indicator
        updateSwipeIndicator(currentTranslateX);
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        modalImage.style.transition = 'transform 0.3s ease-out';
        
        if (Math.abs(currentTranslateX) > SWIPE_THRESHOLD) {
            // Swipe was long enough - change image
            if (currentTranslateX > 0) {
                showPreviousImage();
            } else {
                showNextImage();
            }
        } else {
            // Reset image position
            modalImage.style.transform = 'translateX(0)';
        }
        
        // Hide swipe indicator
        hideSwipeIndicators();
    }

    function updateSwipeIndicator(translateX) {
        const leftIndicator = document.querySelector('.swipe-indicator.left');
        const rightIndicator = document.querySelector('.swipe-indicator.right');
        
        if (translateX > 50) {
            leftIndicator.classList.add('visible');
            rightIndicator.classList.remove('visible');
        } else if (translateX < -50) {
            rightIndicator.classList.add('visible');
            leftIndicator.classList.remove('visible');
        } else {
            hideSwipeIndicators();
        }
    }

    function hideSwipeIndicators() {
        document.querySelectorAll('.swipe-indicator').forEach(indicator => {
            indicator.classList.remove('visible');
        });
    }

    // Add these functions to your existing modal code
    function showPreviousImage() {
        // Your existing previous image logic
        modalImage.style.transform = 'translateX(0)';
    }

    function showNextImage() {
        // Your existing next image logic
        modalImage.style.transform = 'translateX(0)';
    }
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