// Mock Data
const categories = [
    { id: 'all', name: 'الكل', icon: '🌍' },
    { id: 'university', name: 'جامعية', icon: '🎓' },
    { id: 'novels', name: 'روايات', icon: '📖' },
    { id: 'religion', name: 'دين', icon: '🕌' },
    { id: 'kids', name: 'أطفال', icon: '🧸' },
    { id: 'languages', name: 'لغات', icon: '🌐' }
];

const libraries = [
    {
        id: 'A1B2C3D4',
        name: 'مكتبة اقرأ',
        distance: '1.2 كم',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 'X9Y8Z7K6',
        name: 'مكتبة الجامعة',
        distance: '2.5 كم',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 'M5N6P7Q8',
        name: 'عالم المعرفة',
        distance: '3.0 كم',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400&auto=format&fit=crop',
    }
];

const books = [
    {
        id: 1,
        title: 'مقدمة في الذكاء الاصطناعي',
        author: 'د. طارق',
        price: '1500',
        category: 'university',
        cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&auto=format&fit=crop',
        desc: 'كتاب شامل يغطي أساسيات الذكاء الاصطناعي وتطبيقاته الحديثة بأسلوب مبسط للطلاب.',
        availableAt: [
            { libId: 'A1B2C3D4', name: 'مكتبة اقرأ', price: '1500', distance: '1.2 كم' },
            { libId: 'X9Y8Z7K6', name: 'مكتبة الجامعة', price: '1450', distance: '2.5 كم' }
        ]
    },
    {
        id: 2,
        title: 'الخيميائي',
        author: 'باولو كويلو',
        price: '800',
        category: 'novels',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop',
        desc: 'رواية عالمية تحكي قصة الراعي المتجول بحثاً عن كنزه المنشود.',
        availableAt: [
            { libId: 'A1B2C3D4', name: 'مكتبة اقرأ', price: '800', distance: '1.2 كم' },
            { libId: 'M5N6P7Q8', name: 'عالم المعرفة', price: '850', distance: '3.0 كم' }
        ]
    },
    {
        id: 3,
        title: 'الرحيق المختوم',
        author: 'صفي الرحمن',
        price: '1200',
        category: 'religion',
        cover: 'https://images.unsplash.com/photo-1601123498453-623bb65bc674?q=80&w=200&auto=format&fit=crop',
        desc: 'بحث متخصص في السيرة النبوية حاز على الجائزة الأولى في مسابقة رابطة العالم الإسلامي.',
        availableAt: [
            { libId: 'M5N6P7Q8', name: 'عالم المعرفة', price: '1200', distance: '3.0 كم' }
        ]
    },
    {
        id: 4,
        title: 'تعلم الفرنسية',
        author: 'مجهول',
        price: '600',
        category: 'languages',
        cover: 'https://images.unsplash.com/photo-1546422401-68b415cbf822?q=80&w=200&auto=format&fit=crop',
        desc: 'دليل مبسط لتعلم اللغة الفرنسية من الصفر حتى الاحتراف.',
        availableAt: [
            { libId: 'A1B2C3D4', name: 'مكتبة اقرأ', price: '600', distance: '1.2 كم' },
            { libId: 'X9Y8Z7K6', name: 'مكتبة الجامعة', price: '500', distance: '2.5 كم' }
        ]
    }
];

let cartCount = 0;

// DOM Elements
const categoriesList = document.getElementById('categoriesList');
const librariesList = document.getElementById('librariesList');
const booksList = document.getElementById('booksList');
const searchInput = document.getElementById('searchInput');
const cartBadge = document.querySelector('.cart-badge');
const bookModal = document.getElementById('bookModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalBody = document.getElementById('modalBody');

// Initialize App
function init() {
    renderCategories();
    renderLibraries();
    renderBooks(books);

    // Search Feature
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = books.filter(b => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query));
        renderBooks(filtered);
    });

    closeModalBtn.addEventListener('click', closeModal);
    bookModal.addEventListener('click', (e) => {
        if (e.target === bookModal) closeModal();
    });

    initCheckoutForm();
}

function renderCategories() {
    categoriesList.innerHTML = '';
    categories.forEach((cat, index) => {
        const div = document.createElement('div');
        div.className = `category-item ${index === 0 ? 'active' : ''}`;
        div.innerHTML = `
            <span class="category-icon">${cat.icon}</span>
            <span class="category-name">${cat.name}</span>
        `;
        div.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
            div.classList.add('active');

            if (cat.id === 'all') {
                renderBooks(books);
            } else {
                renderBooks(books.filter(b => b.category === cat.id));
            }
        });
        categoriesList.appendChild(div);
    });
}

function renderLibraries() {
    librariesList.innerHTML = '';
    libraries.forEach(lib => {
        const div = document.createElement('div');
        div.className = 'library-card';
        div.innerHTML = `
            <div class="library-img-wrapper">
                <img src="${lib.image}" alt="${lib.name}" class="library-img">
                <div class="library-overlay"></div>
                <div class="library-rating"><i class="fas fa-star"></i> ${lib.rating}</div>
            </div>
            <div class="library-info">
                <div class="library-name">${lib.name}</div>
                <div class="library-distance">
                    <i class="fas fa-map-marker-alt"></i> يبعد ${lib.distance}
                </div>
            </div>
        `;
        librariesList.appendChild(div);
    });
}

function renderBooks(booksToRender) {
    booksList.innerHTML = '';
    if (booksToRender.length === 0) {
        booksList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">لا توجد نتائج مطابقة</p>';
        return;
    }

    booksToRender.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-card';
        div.innerHTML = `
            <div style="position: relative;">
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
                <div class="book-actions-overlay">
                    <button class="action-btn" title="أضف للمفضلة" onclick="event.stopPropagation()"><i class="far fa-heart"></i></button>
                    <button class="action-btn" title="مشاركة" onclick="event.stopPropagation()"><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-price-row">
                    <div class="book-price">${book.price} <span class="currency">د.ج</span></div>
                    <button class="action-btn" style="background: var(--primary); color: white;" onclick="event.stopPropagation(); window.openBookModal(${book.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        div.addEventListener('click', () => openBookModal(book.id));
        booksList.appendChild(div);
    });
}

window.openBookModal = function (bookId) {
    window.currentSelectedBook = bookId;
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    let libListHtml = '';
    book.availableAt.forEach(lib => {
        libListHtml += `
            <div class="modal-library-item">
                <div class="modal-lib-details">
                    <h4>${lib.name}</h4>
                    <div class="modal-lib-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${lib.distance}</span>
                        <span><i class="fas fa-check-circle" style="color:var(--secondary)"></i> متوفر</span>
                    </div>
                </div>
                <div style="text-align: left;">
                    <div class="modal-lib-price">${lib.price} <span class="currency">د.ج</span></div>
                    <button class="action-btn" style="background: var(--bg-main); width: auto; padding: 4px 12px; border-radius: 12px; font-size:0.8rem; margin-top:8px;" onclick="window.addToCart()">
                        أضف للسلة
                    </button>
                </div>
            </div>
        `;
    });

    modalBody.innerHTML = `
        <div class="modal-book-header">
            <img src="${book.cover}" alt="${book.title}" class="modal-book-cover">
            <div class="modal-book-info">
                <h3 class="modal-book-title">${book.title}</h3>
                <span class="modal-book-author">${book.author}</span>
                <p class="modal-book-desc">${book.desc}</p>
            </div>
        </div>
        <h3 style="margin-bottom: 12px; font-size: 1.1rem; border-top: 1px solid var(--border); padding-top: 16px;">متوفر في المكتبات التالية:</h3>
        <div class="modal-libraries-list">
            ${libListHtml}
        </div>
        <button class="order-btn" onclick="window.addToCart(true)">طلب التوصيل الآن</button>
    `;

    bookModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    bookModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.addToCart = function (isFullOrder = false) {
    if (isFullOrder) {
        // إذا ضغط المستخدم "طلب التوصيل الآن" تفتح نافذة إدخال المعلومات
        const checkoutModal = document.getElementById('checkoutModal');
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        // إضافة عادية للسلة
        cartCount++;
        cartBadge.textContent = cartCount;
        cartBadge.style.transform = 'scale(1.5)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
    }
}

// Checkout Form Logic
function initCheckoutForm() {
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const nameInput = document.getElementById('nameInput');
    const wilayaSelect = document.getElementById('wilayaSelect');
    const baladiyaSelect = document.getElementById('baladiyaSelect');
    const phoneInput = document.getElementById('phoneInput');

    // ملء الولايات عند بدء التطبيق
    algeriaWilayas.forEach(w => {
        const option = document.createElement('option');
        option.value = w.id;
        option.textContent = `${w.id} - ${w.name}`;
        wilayaSelect.appendChild(option);
    });

    // تغيير البلديات عند تغيير الولاية
    wilayaSelect.addEventListener('change', (e) => {
        const wilayaId = e.target.value;
        baladiyaSelect.innerHTML = '<option value="">اختر البلدية...</option>'; // إعادة التعيين

        if (wilayaId) {
            baladiyaSelect.disabled = false;
            const wilayaObj = algeriaWilayas.find(w => w.id == wilayaId);
            wilayaObj.communes.forEach(c => {
                const option = document.createElement('option');
                option.value = c;
                option.textContent = c;
                baladiyaSelect.appendChild(option);
            });
        } else {
            baladiyaSelect.disabled = true;
        }
    });

    // إغلاق المودال
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // إذا كان مودال الكتاب مغلقاً
    });

    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) checkoutModal.classList.remove('active');
    });

    // إرسال الطلب
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const selectedWilaya = wilayaSelect.options[wilayaSelect.selectedIndex].text;
        const selectedBaladiya = baladiyaSelect.value;
        const phone = phoneInput.value;

        // الحصول على معلومات الكتاب المحدد والحفظ في LocalStorage للتجربة
        const book = books.find(b => b.id === window.currentSelectedBook);
        const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

        const newOrder = {
            id: orderId,
            time: 'الآن',
            customer: name,
            wilaya: selectedWilaya,
            baladiya: selectedBaladiya,
            phone: phone,
            deliveryCorp: 'قيد التحديد',
            bookTitle: book ? book.title : 'كتاب غير معروف',
            price: book ? book.price : '0',
            qty: 1,
            status: 'pending'
        };

        // حفظ في LocalStorage ليتمكن التاجر من رؤيتها
        let existingOrders = JSON.parse(localStorage.getItem('maktbaOrders')) || [];
        existingOrders.unshift(newOrder); // إضافة للأعلى
        localStorage.setItem('maktbaOrders', JSON.stringify(existingOrders));

        // إشعار نجاح
        alert(`تم إرسال طلبك بنجاح! 🎉\nالطلب رقم: #${orderId}\nسيتواصل المتجر معك قريباً لتأكيد شركة التوصيل والموعد.`);

        // إعادة تهيئة الواجهة
        checkoutModal.classList.remove('active');
        closeModal();
        checkoutForm.reset();
        baladiyaSelect.disabled = true;
        // زيادة عداد السلة كدليل على معالجة شيء
        cartCount++;
        cartBadge.textContent = cartCount;
    });
}

// Run app
document.addEventListener('DOMContentLoaded', init);
