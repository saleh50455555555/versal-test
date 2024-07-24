const express = require('express');
const db = require('./src/db');
const path = require('path'); // إضافة مكتبة path
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const placeRoutes = require('./src/routes/placeRoutes');


const TouristPlace = require('./src/models/touristplaceModel');


app.use(express.json());
const port = process.env.PORT || 5000;

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();
    console.log(`${method} ${url} ${time}`);
    next();
};

app.use(logger);

// إعداد تقديم الملفات الثابتة من مجلد public
app.use('/public', express.static(path.join(__dirname, 'public')));



const baseUrl = 'https://node-saleh.onrender.com'; // تحديث مع الدومين الفعلي بعد النشر







const places = [
    // Umayyad Mosque
    {
        placeID: 1,
        placeName: 'Umayyad Mosque',
        description: 'The Umayyad Mosque, also known as the Great Mosque of Damascus, is one of the largest and oldest mosques in the world. It is a significant religious and historical site, featuring stunning architecture and intricate mosaics.',
        location: { lat: 33.5119, lng: 36.3064 },
        images: [
            'https://node-saleh.onrender.com/public/images/umayyad_mosque_1.jpg',
            'https://node-saleh.onrender.com/public/images/umayyad_mosque_2.jpg',
            'https://node-saleh.onrender.com/public/images/umayyad_mosque_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 3,
        provinceID: 2
    },
    // Souq Al-Hamidiyah
    {
        placeID: 2,
        placeName: 'Souq Al-Hamidiyah',
        description: 'Souq Al-Hamidiyah is a bustling market located in the heart of Damascus. It is famous for its wide variety of goods, including spices, textiles, and traditional Syrian crafts. The market is an excellent place to experience the local culture.',
        location: { lat: 33.5102, lng: 36.3058 },
        images: [
            'https://node-saleh.onrender.com/public/images/souq_al_hamidiyah_1.jpg',
            'https://node-saleh.onrender.com/public/images/souq_al_hamidiyah_2.jpg',
            'https://node-saleh.onrender.com/public/images/souq_al_hamidiyah_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 3,
        provinceID: 2
    },
    // Azm Palace
    {
        placeID: 3,
        placeName: 'Azm Palace',
        description: 'Azm Palace is a beautifully preserved example of Ottoman-era architecture. It was built in the 18th century and now serves as a museum showcasing traditional Syrian art, culture, and history.',
        location: { lat: 33.5098, lng: 36.3052 },
        images: [
            'https://node-saleh.onrender.com/public/images/azm_palace_1.jpg',
            'https://node-saleh.onrender.com/public/images/azm_palace_2.jpg',
            'https://node-saleh.onrender.com/public/images/azm_palace_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 3,
        provinceID: 2
    },
    // Mount Qasioun
    {
        placeID: 4,
        placeName: 'Mount Qasioun',
        description: 'Mount Qasioun offers breathtaking panoramic views of Damascus. It is a popular spot for locals and tourists alike to enjoy the scenery, especially during sunset. The mountain has historical and cultural significance as well.',
        location: { lat: 33.5415, lng: 36.2688 },
        images: [
            'https://node-saleh.onrender.com/public/images/mount_qasioun_1.jpg',
            'https://node-saleh.onrender.com/public/images/mount_qasioun_2.jpg',
            'https://node-saleh.onrender.com/public/images/mount_qasioun_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 3,
        provinceID: 2
    },
    // Al-Takiyya Al-Suleimaniyya
    {
        placeID: 5,
        placeName: 'Al-Takiyya Al-Suleimaniyya',
        description: 'Al-Takiyya Al-Suleimaniyya is a stunning Ottoman complex built in the 16th century. It includes a mosque, a courtyard, and a bazaar. The architecture and design are exemplary of Ottoman aesthetics and the site is rich in history.',
        location: { lat: 33.5141, lng: 36.2905 },
        images: [
            'https://node-saleh.onrender.com/public/images/al_takiyya_al_suleimaniyya_1.jpg',
            'https://node-saleh.onrender.com/public/images/al_takiyya_al_suleimaniyya_2.jpg',
            'https://node-saleh.onrender.com/public/images/al_takiyya_al_suleimaniyya_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 3,
        provinceID: 2
    },
    // Naranj Restaurant
    {
        placeID: 6,
        placeName: 'Naranj Restaurant',
        description: 'Naranj is one of the most famous restaurants in Damascus, offering a blend of traditional Syrian cuisine and modern dishes. The atmosphere is elegant, and the service is top-notch.',
        location: { lat: 33.5100, lng: 36.3070 },
        images: [
            'https://node-saleh.onrender.com/public/images/naranj_restaurant_1.jpg',
            'https://node-saleh.onrender.com/public/images/naranj_restaurant_2.jpg',
            'https://node-saleh.onrender.com/public/images/naranj_restaurant_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 2,
        provinceID: 2
    },
    // Beit Jabri Restaurant
    {
        placeID: 7,
        placeName: 'Beit Jabri Restaurant',
        description: 'Beit Jabri is a cozy, family-owned restaurant set in a beautifully restored Damascene house. It offers a wide variety of traditional Syrian dishes and is known for its charming courtyard.',
        location: { lat: 33.5115, lng: 36.3055 },
        images: [
            'https://node-saleh.onrender.com/public/images/beit_jabri_1.jpg',
            'https://node-saleh.onrender.com/public/images/beit_jabri_2.jpg',
            'https://node-saleh.onrender.com/public/images/beit_jabri_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 2,
        provinceID: 2
    },
    // Al-Khawali Restaurant
    {
        placeID: 8,
        placeName: 'Al-Khawali Restaurant',
        description: 'Located in the old city of Damascus, Al-Khawali offers a rich menu of traditional Syrian food in an authentic setting. The decor and ambiance reflect the historical charm of Damascus.',
        location: { lat: 33.5128, lng: 36.3050 },
        images: [
            'https://node-saleh.onrender.com/public/images/al_khawali_1.jpg',
            'https://node-saleh.onrender.com/public/images/al_khawali_2.jpg',
            'https://node-saleh.onrender.com/public/images/al_khawali_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 2,
        provinceID: 2
    },
    // Abu Kamal Restaurant
    {
        placeID: 9,
        placeName: 'Abu Kamal Restaurant',
        description: 'Abu Kamal is a popular spot for those seeking delicious and authentic Syrian cuisine at reasonable prices. The restaurant has a casual and friendly atmosphere, perfect for family dining.',
        location: { lat: 33.5135, lng: 36.3080 },
        images: [
            'https://node-saleh.onrender.com/public/images/abu_kamal_1.jpg',
            'https://node-saleh.onrender.com/public/images/abu_kamal_2.jpg',
            'https://node-saleh.onrender.com/public/images/abu_kamal_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 2,
        provinceID: 2
    },
    // Al Halabi Restaurant
    {
        placeID: 10,
        placeName: 'Al Halabi Restaurant',
        description: 'Al Halabi offers a mix of Syrian and Lebanese dishes in a vibrant and welcoming setting. It is known for its excellent service and a wide variety of flavorful dishes.',
        location: { lat: 33.5140, lng: 36.3095 },
        images: [
            'https://node-saleh.onrender.com/public/images/al_halabi_1.jpg',
            'https://node-saleh.onrender.com/public/images/al_halabi_2.jpg',
            'https://node-saleh.onrender.com/public/images/al_halabi_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 2,
        provinceID: 2
    },
    // Four Seasons Hotel Damascus
    {
        placeID: 11,
        placeName: 'Four Seasons Hotel Damascus',
        description: 'Located in the heart of Damascus, the Four Seasons Hotel offers luxury accommodations with exceptional service. It features elegant rooms, a spa, and multiple dining options.',
        location: { lat: 33.5123, lng: 36.2912 },
        images: [
            'https://node-saleh.onrender.com/public/images/four_seasons_damascus_1.jpg',
            'https://node-saleh.onrender.com/public/images/four_seasons_damascus_2.jpg',
            'https://node-saleh.onrender.com/public/images/four_seasons_damascus_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 1,
        provinceID: 2
    },
    // Beit Al Mamlouka Hotel
    {
        placeID: 12,
        placeName: 'Beit Al Mamlouka Hotel',
        description: 'A boutique hotel set in a 17th-century Damascene house, Beit Al Mamlouka offers a unique blend of history and luxury. The rooms are decorated in traditional Syrian style, and the hotel provides a tranquil courtyard and traditional dining experiences.',
        location: { lat: 33.5128, lng: 36.3067 },
        images: [
            'https://node-saleh.onrender.com/public/images/beit_al_mamlouka_1.jpg',
            'https://node-saleh.onrender.com/public/images/beit_al_mamlouka_2.jpg',
            'https://node-saleh.onrender.com/public/images/beit_al_mamlouka_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 1,
        provinceID: 2
    },
    // Cham Palace Damascus
    {
        placeID: 13,
        placeName: 'Cham Palace Damascus',
        description: 'Cham Palace is a well-known hotel in Damascus that offers a mix of modern amenities and traditional Syrian hospitality. It has spacious rooms, a swimming pool, and several restaurants.',
        location: { lat: 33.5175, lng: 36.2905 },
        images: [
            'https://node-saleh.onrender.com/public/images/cham_palace_1.jpg',
            'https://node-saleh.onrender.com/public/images/cham_palace_2.jpg',
            'https://node-saleh.onrender.com/public/images/cham_palace_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 1,
        provinceID: 2
    },
    // Sheraton Damascus Hotel
    {
        placeID: 14,
        placeName: 'Sheraton Damascus Hotel',
        description: 'Sheraton Damascus Hotel is a part of the renowned Sheraton chain, offering comfortable rooms, a fitness center, and various dining options. It\'s known for its excellent service and convenient location.',
        location: { lat: 33.5101, lng: 36.2906 },
        images: [
            'https://node-saleh.onrender.com/public/images/sheraton_damascus_1.jpg',
            'https://node-saleh.onrender.com/public/images/sheraton_damascus_2.jpg',
            'https://node-saleh.onrender.com/public/images/sheraton_damascus_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 1,
        provinceID: 2
    },
    // Talisman Hotel
    {
        placeID: 15,
        placeName: 'Talisman Hotel',
        description: 'Talisman Hotel is a charming boutique hotel with a cozy atmosphere. It features traditional Syrian decor, an outdoor pool, and a restaurant serving local cuisine. It\'s perfect for travelers looking for a unique and intimate experience.',
        location: { lat: 33.5119, lng: 36.3065 },
        images: [
            'https://node-saleh.onrender.com/public/images/talisman_hotel_1.jpg',
            'https://node-saleh.onrender.com/public/images/talisman_hotel_2.jpg',
            'https://node-saleh.onrender.com/public/images/talisman_hotel_3.jpg'
        ],
        averageRating: (Math.random() * (5 - 3) + 3).toFixed(1),
        numberOfRatings: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
        type: 1,
        provinceID: 2
    }
];

TouristPlace.insertMany(places)
    .then(() => {
        console.log('Data inserted successfully');

    })
    .catch(error => {
        console.error('Error inserting data: ', error);
        mongoose.connection.close();
    });




// إضافة مسارات المصادقة
app.use('/api/auth', authRoutes);

// إضافة مسارات الأماكن
app.use('/api/place', placeRoutes);

// تعريف المسار الأساسي للتطبيق
//const baseUrl = process.env.BASE_URL || `http://localhost:${port}`; // تحديث مع الدومين الفعلي بعد النشر

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});