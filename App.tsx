// ...existing code...
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

const Stack = createNativeStackNavigator();

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  course: string;
  ingredients: string;
  isSpecial: boolean;
}

const HomeScreen = ({ navigation }: { navigation: any }) => (
  <View style={styles.homeContainer}>
    <Text style={styles.title}>Christoffel's Private Culinary</Text>
    <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('Menu')}>
      <Text style={styles.buttonText}>View Menu</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('ChefSpecials')}>
      <Text style={styles.buttonText}>Chef Specials</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('Admin')}>
      <Text style={styles.buttonText}>Admin Login</Text>
    </TouchableOpacity>
  </View>
);

const MenuScreen = ({ navigation, route, menuItems: propMenuItems }: { navigation: any; route: any; menuItems: MenuItem[] }) => {
  // prefer lifted prop; fallback to navigation param
  const items = propMenuItems ?? route?.params?.menuItems ?? [];

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Menu</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MenuDetail', { item })}>
            <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.menuImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.menuItemTitle}>{item.name}</Text>
              {item.course ? <Text style={styles.menuItemDesc}>{item.course}</Text> : null}
              <Text style={styles.menuItemDesc}>{item.description}</Text>
              <Text style={styles.price}>R{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No dishes yet.</Text>}
      />
    </View>
  );
};

const MenuDetailScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { item } = route.params || {};
  if (!item) {
    return (
      <View style={styles.detailContainer}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>No item selected.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.detailContainer}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/300' }} style={styles.detailImage} />
      <Text style={styles.detailTitle}>{item.name}</Text>
      {item.isSpecial && <Text style={{ fontSize: 16, color: '#99582a', fontWeight: 'bold', textAlign: 'center' }}>Chef's Special</Text>}
      <Text style={styles.sectionHeader}>Description</Text>
      <Text style={styles.detailText}>{item.description}</Text>
      <Text style={styles.sectionHeader}>Ingredients</Text>
      <Text style={styles.detailText}>{item.ingredients || "Chef’s secret!"}</Text>
      <Text style={styles.sectionHeader}>Price</Text>
      <Text style={styles.price}>R{item.price}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ChefSpecialsScreen = ({ navigation, route, menuItems: propMenuItems }: { navigation: any; route: any; menuItems: MenuItem[] }) => {
  const items = propMenuItems ?? route?.params?.menuItems ?? [];
  const specials = items.filter(item => item.isSpecial);

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Chef Specials</Text>
      <FlatList
        data={specials}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MenuDetail', { item })}>
            <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.menuImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.menuItemTitle}>{item.name}</Text>
              {item.course ? <Text style={styles.menuItemDesc}>{item.course}</Text> : null}
              <Text style={styles.menuItemDesc}>{item.description}</Text>
              <Text style={styles.price}>R{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No specials available.</Text>}
      />
    </View>
  );
};

const AdminScreen = ({ navigation, menuItems = [], setMenuItems }: { navigation: any; menuItems: MenuItem[]; setMenuItems: (items: MenuItem[]) => void }) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [course, setCourse] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isSpecial, setIsSpecial] = useState(false);
  const [editingDishId, setEditingDishId] = useState<number | null>(null);

  const addDish = () => {
    if (!dishName.trim() || !price.trim()) {
      Alert.alert('Validation', 'Please fill in all required fields.');
      return;
    }
    const newDish = {
      id: editingDishId || Date.now(),
      name: dishName.trim(),
      description: description.trim(),
      price: price.trim(),
      image: image.trim() || 'https://via.placeholder.com/150',
      course: course.trim(),
      ingredients: ingredients.trim(),
      isSpecial,
    };
    if (typeof setMenuItems === 'function') {
      if (editingDishId) {
        setMenuItems(menuItems.map(item => item.id === editingDishId ? newDish : item));
        Alert.alert('Success', 'Dish updated successfully!');
      } else {
        setMenuItems([...menuItems, newDish]);
        Alert.alert('Success', 'Dish added successfully!');
      }
    } else {
      // fallback local storage if not lifted (shouldn't happen in this app)
      Alert.alert('Warning', 'Cannot save: setMenuItems not provided.');
      return;
    }

    setDishName('');
    setDescription('');
    setPrice('');
    setImage('https://via.placeholder.com/150');
    setCourse('');
    setIngredients('');
    setIsSpecial(false);
    setEditingDishId(null);
  };

  const clearMenu = () => {
    if (typeof setMenuItems === 'function') {
      Alert.alert('Confirm', 'Clear all menu items?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => setMenuItems([]) },
      ]);
    }
  };

  const removeDish = (id: number) => {
    Alert.alert('Confirm', 'Remove this dish?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => {
        if (typeof setMenuItems === 'function') {
          setMenuItems(menuItems.filter((d) => d.id !== id));
        }
      }},
    ]);
  };

  const editDish = (dish: MenuItem) => {
    setDishName(dish.name);
    setDescription(dish.description);
    setPrice(dish.price);
    setImage(dish.image);
    setCourse(dish.course);
    setIngredients(dish.ingredients);
    setIsSpecial(dish.isSpecial);
    setEditingDishId(dish.id);
  };

  return (
    <ScrollView style={styles.adminContainer} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.adminTitle}>Admin Panel</Text>
      <TextInput style={styles.input} placeholder="Dish Name" value={dishName} onChangeText={setDishName} />
      <TextInput style={[styles.input, { height: 90 }]} placeholder="Description" multiline value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Image URL" value={image} onChangeText={setImage} />
      <TextInput style={styles.input} placeholder="Course (e.g., Main, Appetizer)" value={course} onChangeText={setCourse} />
      <TextInput style={[styles.input, { height: 90 }]} placeholder="Ingredients" multiline value={ingredients} onChangeText={setIngredients} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <Text style={{ marginRight: 10, color: '#432818' }}>Chef's Special</Text>
        <TouchableOpacity onPress={() => setIsSpecial(!isSpecial)} style={{ padding: 10, backgroundColor: isSpecial ? '#99582a' : '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#99582a' }}>
          <Text style={{ color: isSpecial ? '#fff' : '#99582a' }}>{isSpecial ? 'Yes' : 'No'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addDish}>
        <Text style={styles.buttonText}>{editingDishId ? 'Update Dish' : 'Save'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={clearMenu}>
        <Text style={styles.buttonText}>Clear Menu</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#432818' }}>Current Dishes ({menuItems.length})</Text>
        {menuItems.length === 0 ? (
          <Text style={{ marginTop: 6 }}>No dishes added yet.</Text>
        ) : (
          menuItems.map((item) => (
            <View key={item.id?.toString() ?? Math.random().toString()} style={styles.adminListItem}>
              <Image source={{ uri: item.image || 'https://via.placeholder.com/50' }} style={{ width: 50, height: 50, borderRadius: 6, marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: '#6c584c' }}>{(item.course ? item.course + ' • ' : '')}R{item.price}</Text>
                {item.isSpecial && <Text style={{ color: '#99582a', fontWeight: 'bold' }}>Special</Text>}
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => editDish(item)}>
                <Text style={{ color: '#fff' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallDelete} onPress={() => removeDish(item.id)}>
                <Text style={{ color: '#fff' }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <Button title="View Menu" onPress={() => navigation.navigate('Menu')} />
    </ScrollView>
  );
};

export default function App() {
  // lift state so Admin and Menu share same data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Buffalo Wings',
      description: 'Spicy chicken wings tossed in buffalo sauce, served with celery and blue cheese dip.',
      price: '50',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=150',
      course: 'Appetizer',
      ingredients: 'Chicken Wings, Buffalo Sauce, Celery, Blue Cheese',
      isSpecial: false,
    },
    {
      id: 2,
      name: 'Nachos',
      description: 'Tortilla chips topped with melted cheese, jalapeños, tomatoes, and sour cream.',
      price: '40',
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=150',
      course: 'Appetizer',
      ingredients: 'Tortilla Chips, Cheese, Jalapeños, Tomatoes, Sour Cream',
      isSpecial: false,
    },
    {
      id: 3,
      name: 'Cheeseburger',
      description: 'Juicy beef patty with melted cheese, lettuce, tomato, and pickles on a bun.',
      price: '60',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150',
      course: 'Main',
      ingredients: 'Beef Patty, Cheese, Lettuce, Tomato, Pickles, Bun',
      isSpecial: true,
    },
    {
      id: 4,
      name: 'BBQ Ribs',
      description: 'Tender pork ribs slow-cooked and glazed with smoky BBQ sauce.',
      price: '70',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150',
      course: 'Main',
      ingredients: 'Pork Ribs, BBQ Sauce, Spices',
      isSpecial: true,
    },
    {
      id: 5,
      name: 'Apple Pie',
      description: 'Classic American pie filled with cinnamon-spiced apples and a flaky crust.',
      price: '25',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=150',
      course: 'Dessert',
      ingredients: 'Apples, Cinnamon, Sugar, Pie Crust',
      isSpecial: false,
    },
    {
      id: 6,
      name: 'Cheesecake',
      description: 'Creamy cheesecake with a graham cracker crust, topped with strawberry sauce.',
      price: '30',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=150',
      course: 'Dessert',
      ingredients: 'Cream Cheese, Sugar, Graham Crackers, Strawberries',
      isSpecial: false,
    },
    {
      id: 7,
      name: 'Chocolate Chip Cookies',
      description: 'Soft and chewy cookies loaded with chocolate chips.',
      price: '20',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=150',
      course: 'Dessert',
      ingredients: 'Flour, Butter, Chocolate Chips, Sugar',
      isSpecial: false,
    },
    {
      id: 8,
      name: 'Ice Cream Sundae',
      description: 'Vanilla ice cream topped with chocolate syrup, whipped cream, and a cherry.',
      price: '35',
      image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=150',
      course: 'Dessert',
      ingredients: 'Vanilla Ice Cream, Chocolate Syrup, Whipped Cream, Cherry',
      isSpecial: false,
    },
  ]);

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu">
          {(props: any) => <MenuScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="ChefSpecials">
          {(props: any) => <ChefSpecialsScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
        <Stack.Screen name="Admin">
          {(props: any) => <AdminScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5ebe0',
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 30, color: '#432818' },
  mainButton: {
    backgroundColor: '#99582a',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  menuContainer: { flex: 1, backgroundColor: '#fff8f0', padding: 15 },
  menuTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#6f1d1b' },
  menuItem: { flexDirection: 'row', backgroundColor: '#ffe6cc', marginVertical: 6, padding: 10, borderRadius: 10 },
  menuImage: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  menuItemTitle: { fontSize: 18, fontWeight: '600', color: '#432818' },
  menuItemDesc: { color: '#6c584c' },
  detailContainer: { flex: 1, backgroundColor: '#fefae0', padding: 15 },
  detailImage: { width: '100%', height: 200, borderRadius: 10 },
  detailTitle: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: '#7f5539' },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginTop: 10, color: '#432818' },
  detailText: { fontSize: 16, color: '#6c584c' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9c6644', marginBottom: 20 },
  backButton: { backgroundColor: '#6f1d1b', padding: 12, borderRadius: 8, alignSelf: 'center', width: '50%' },
  adminContainer: { flex: 1, backgroundColor: '#fff3e0', padding: 20 },
  adminTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#432818', textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    borderColor: '#99582a',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  addButton: { backgroundColor: '#432818', padding: 15, borderRadius: 8, marginVertical: 8, alignItems: 'center' },
  deleteButton: { backgroundColor: '#b23a48', padding: 15, borderRadius: 8, marginVertical: 8, alignItems: 'center' },

  adminListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7f0',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  smallDelete: {
    backgroundColor: '#b23a48',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#432818',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },
});
// ...existing code...