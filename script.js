// Global State
const state = {
    currentPage: 'home',
    servers: [
        {
            id: 1,
            name: 'Pokemon Uniters',
            members: 42256,
            description: 'Pokemon Unite Discord community server with active LFG, Tournaments, game discussion, events and more! Join the action today!',
            icon: 'https://cdn.discordapp.com/icons/123456789/a_bunch_of_random_characters.png',
            category: 'Gaming'
        },
        {
            id: 2,
            name: 'New Halls Who Dis',
            members: 4732,
            description: 'Laid back community server. Skyrim Fallout Gaming',
            icon: 'https://cdn.discordapp.com/icons/987654321/a_bunch_of_random_characters.png',
            category: 'Gaming'
        },
        {
            id: 3,
            name: '/rackswyd',
            members: 5,
            description: '~~events + social~~ ㅤㅤ',
            icon: 'https://cdn.discordapp.com/icons/555555555/a_bunch_of_random_characters.png',
            category: 'Social'
        },
        {
            id: 4,
            name: 'Build Battle Co.',
            members: 8,
            description: 'Welcome to Build Battle Co! Here, we do both types of build battles: building time (google if you don\'t know) and 1v1. We play these on a range of different games. Please feel free to join the server.',
            icon: 'https://cdn.discordapp.com/icons/777777777/a_bunch_of_random_characters.png',
            category: 'Gaming'
        },
        {
            id: 5,
            name: 'Alpha Nimish',
            members: 6,
            description: 'A very interesting server',
            icon: 'https://cdn.discordapp.com/icons/888888888/a_bunch_of_random_characters.png',
            category: 'Social'
        },
        {
            id: 6,
            name: 'Haunted Lantern Studios',
            members: 5,
            description: 'This is a game development server for a horror game called, "The Other Father", other father is a game about your dad is a creature you need to escape from',
            icon: 'https://cdn.discordapp.com/icons/999999999/a_bunch_of_random_characters.png',
            category: 'Development'
        },
        {
            id: 7,
            name: 'Lil Tjay\'s Nation',
            members: 20,
            description: 'A very interesting server especially for all you Lil Tjay fans',
            icon: 'https://cdn.discordapp.com/icons/111111111/a_bunch_of_random_characters.png',
            category: 'Music'
        },
        {
            id: 8,
            name: 'Vibe Corner | Social • Gaming',
            members: 703,
            description: 'hanging out, gaming potential to find your soulmate',
            icon: 'https://cdn.discordapp.com/icons/222222222/a_bunch_of_random_characters.png',
            category: 'Social'
        },
        {
            id: 9,
            name: 'The Vasehh Empire 👑',
            members: 1007,
            description: 'Welcome to the best community on Discord! 💜 We offer a variety of streams, events, and more! 👌 Join for free cookies! 🍪🍪🍪',
            icon: 'https://cdn.discordapp.com/icons/333333333/a_bunch_of_random_characters.png',
            category: 'Social'
        },
        {
            id: 10,
            name: 'The Mouldycabbage3 Community',
            members: 328,
            description: 'A Halo Community server where you can find friends, custom games across most Halo titles every saturday at 8PM British time (MCC/Infinite), places to share your creations, content, servers and more!',
            icon: 'https://cdn.discordapp.com/icons/444444444/a_bunch_of_random_characters.png',
            category: 'Gaming'
        },
        {
            id: 11,
            name: 'Starlight ✦ Voyagers',
            members: 383,
            description: 'Unofficial Wuthering Waves Community Discord — A Community-Driven Gathering Hub for all things WuWa related and more!',
            icon: 'https://cdn.discordapp.com/icons/666666666/a_bunch_of_random_characters.png',
            category: 'Gaming'
        },
        {
            id: 12,
            name: 'JIGREE SANSAR',
            members: 58,
            description: 'DISCORD Guild for JIGREES. Enjoy, Chill, Learn and Grow.',
            icon: 'https://cdn.discordapp.com/icons/121212121/a_bunch_of_random_characters.png',
            category: 'Community'
        }
    ],
    displayedServers: 6
};

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const serverGrid = document.getElementById('serverGrid');
const toastContainer = document.getElementById('toastContainer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadServers();
});

// Event Listeners
function initializeEventListeners() {
    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Filter functionality
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', handleFilters);
    });

    // Load more servers button
    const loadMoreBtn = document.querySelector('button');
    if (loadMoreBtn && loadMoreBtn.textContent.includes('Load More Servers')) {
        loadMoreBtn.addEventListener('click', loadMoreServers);
    }
}

// Mobile Menu
function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Server Management
function loadServers() {
    if (!serverGrid) return;
    
    const serversToShow = state.servers.slice(0, state.displayedServers);
    serverGrid.innerHTML = serversToShow.map(server => createServerCard(server)).join('');
}

function loadMoreServers() {
    state.displayedServers = Math.min(state.displayedServers + 3, state.servers.length);
    loadServers();
    
    if (state.displayedServers >= state.servers.length) {
        const loadMoreBtn = document.querySelector('button');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'All Servers Loaded';
            loadMoreBtn.disabled = true;
            loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
}

function createServerCard(server) {
    return `
        <div class="server-card group">
            <div class="flex items-start gap-4 mb-4">
                <img src="${server.icon}" alt="${server.name}" class="w-16 h-16 rounded-xl group-hover:scale-110 transition-transform">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold mb-1 group-hover:text-void-purple-light transition-colors">${server.name}</h3>
                    <div class="flex items-center gap-2 text-sm text-void-gray-light">
                        <span class="inline-flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a2 2 0 01-2-2v-6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            ${server.members.toLocaleString()} members
                        </span>
                        <span class="px-2 py-1 bg-void-purple/20 text-void-purple-light text-xs rounded-full">
                            ${server.category}
                        </span>
                    </div>
                </div>
            </div>
            <p class="text-void-gray-light text-sm leading-relaxed mb-4">
                ${server.description}
            </p>
            <button class="w-full px-4 py-2 bg-void-purple hover:bg-void-purple-dark text-white font-medium rounded-lg transition-colors group-hover:shadow-lg">
                Join Server
            </button>
        </div>
    `;
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredServers = state.servers.filter(server => 
        server.name.toLowerCase().includes(searchTerm) ||
        server.description.toLowerCase().includes(searchTerm) ||
        server.category.toLowerCase().includes(searchTerm)
    );
    
    if (serverGrid) {
        serverGrid.innerHTML = filteredServers.map(server => createServerCard(server)).join('');
    }
}

function handleFilters() {
    const sortBySelect = document.querySelector('select');
    const categorySelect = document.querySelectorAll('select')[1];
    
    if (!sortBySelect || !categorySelect) return;
    
    const sortBy = sortBySelect.value;
    const category = categorySelect.value;
    
    let filteredServers = [...state.servers];
    
    // Filter by category
    if (category !== 'All Categories') {
        filteredServers = filteredServers.filter(server => server.category === category);
    }
    
    // Sort servers
    switch(sortBy) {
        case 'Most Members':
            filteredServers.sort((a, b) => b.members - a.members);
            break;
        case 'Newest':
            filteredServers.sort((a, b) => b.id - a.id);
            break;
        case 'Most Active':
            filteredServers.sort((a, b) => b.members - a.members);
            break;
    }
    
    if (serverGrid) {
        serverGrid.innerHTML = filteredServers.map(server => createServerCard(server)).join('');
    }
}

// Utility Functions
function showToast(message, type = 'info', duration = 3000) {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type} transform translate-x-full transition-transform duration-300`;
    
    const icons = {
        success: '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        error: '<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l-2-2m0 0l-2-2m2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        info: '<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    };
    
    toast.innerHTML = `
        <div class="flex items-center gap-3 p-4 bg-void-dark border border-void-gray/20 rounded-lg min-w-[300px] max-w-md">
            ${icons[type]}
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="text-void-gray-light hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('translate-x-0');
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Button Actions
document.addEventListener('click', (e) => {
    if (e.target.textContent === 'Add to Discord') {
        showToast('Redirecting to Discord authorization...', 'info');
        setTimeout(() => {
            showToast('Bot added successfully to your server!', 'success');
        }, 2000);
    }
    
    if (e.target.textContent === 'View Dashboard') {
        showToast('Opening dashboard...', 'info');
        setTimeout(() => {
            showToast('Welcome to Void Bot Dashboard!', 'success');
        }, 1500);
    }
    
    if (e.target.textContent === 'Join Server') {
        const serverCard = e.target.closest('.group');
        if (serverCard) {
            const serverName = serverCard.querySelector('h3').textContent;
            showToast(`Joining ${serverName}...`, 'info');
            setTimeout(() => {
                showToast(`Successfully joined ${serverName}!`, 'success');
            }, 1500);
        }
    }
    
    if (e.target.textContent === 'Join Our Discord') {
        showToast('Opening Discord invite...', 'info');
    }
    
    if (e.target.textContent === 'Add Void Bot to Your Server') {
        showToast('Preparing server setup...', 'info');
        setTimeout(() => {
            showToast('Choose your server to add Void Bot!', 'success');
        }, 1500);
    }
});

// Smooth reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

// Observe feature cards and server cards
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.group').forEach(el => observer.observe(el));
        document.querySelectorAll('.feature-card').forEach(el => observer.observe(el));
    }, 100);
});
