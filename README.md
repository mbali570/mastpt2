# mastpt2 and pt3

🍽️ Christoffel's Private Culinary App

A beautifully designed, interactive React Native application that allows chefs to manage menu items, showcase specials, and display a digital restaurant menu.
Built using React Native, TypeScript, and React Navigation, this app includes admin controls, chef specials, and a visually appealing user interface.

📱 Features
👨‍🍳 Home Screen

Simple and elegant landing page.

Three main navigation buttons:

View Menu — Browse all dishes.

Chef Specials — View highlighted dishes.

Admin Login — Access the management panel.

🧾 Menu Screen

Displays all dishes added by the chef.

Shows dish image, name, course, description, and price.

Click a dish to open the Menu Detail screen.

Beautiful warm, earthy UI with soft backgrounds and rich brown tones.

🍛 Menu Detail Screen

Displays:

Full dish image

Description

Ingredients

Price

A “Chef’s Special” badge (if marked special)

Includes a “Back” button to return to the menu.

🧑‍💼 Admin Screen

Allows the chef to:

Add or update dishes.

Enter details such as Name, Description, Course, Price, Ingredients, and Image URL.

Mark dishes as Chef’s Specials.

View, Edit, and Delete existing dishes.

Clear the entire menu list.

Uses local in-memory state (no backend or database required).

⭐ Chef Specials Screen

Displays only dishes marked as “Chef’s Specials”.

Uses the same layout as the Menu screen but filters items accordingly.

🛠️ Technologies Used

React Native (via Expo)

TypeScript

React Navigation v6

Hooks (useState) for state management

StyleSheet API for consistent theming

🎨 UI Theme

A warm, culinary-inspired palette:

Element	Color	Description
Background	#f5ebe0	Soft cream base
Buttons	#99582a	Rich brown tone
Text	#432818	Deep espresso accent
Highlights	#ffe6cc / #fff3e0	Light caramel for cards
⚙️ Installation and Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/christoffel-culinary.git
cd christoffel-culinary

2️⃣ Install Dependencies

Ensure you have Node.js, npm, and Expo CLI installed, then run:

npm install


Or if you use Yarn:

yarn install

3️⃣ Install Navigation Dependencies
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

4️⃣ Run the App
npx expo start


Then scan the QR code with your Expo Go app on your phone, or press:

i to open in iOS Simulator

a to open in Android Emulator

📁 Project Structure
christoffel-culinary/
│
├── App.tsx               # Main app file containing all screens and logic
├── package.json          # Dependencies and scripts
├── README.md             # Documentation
└── assets/               # (Optional) Store local images or icons

🧩 Screens Overview
Screen	Purpose
HomeScreen	Entry point with navigation buttons
MenuScreen	Displays all menu items
MenuDetailScreen	Detailed dish info
ChefSpecialsScreen	Filters for chef’s special dishes
AdminScreen	Add, edit, or delete menu items
🧠 State Management

All data (menu items) is stored in React useState in the root App component and passed down as props to other screens.
Changes made in the Admin Screen are instantly reflected in the Menu and Chef Specials screens.

🚀 Future Enhancements

Persistent storage using AsyncStorage or Firebase.

Image picker integration instead of manual URL input.

User authentication for the admin.

Category-based menu filtering.

Search and sort functionality.

📸 Preview (Wireframe Reference)

The app is inspired by these wireframe screens:

Home Screen

Menu Screen

Menu Detail Screen

Admin Screen

👨‍💻 Author

Christoffel’s Private Culinary App
Developed by: [Mbali mvambo]
Version: 1.0.0 


