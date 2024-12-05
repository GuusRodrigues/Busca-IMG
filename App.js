import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './styles';

const UNSPLASH_API_KEY = 'Ay9zHhKa_vtAohlrMMjshc465-kWVQoLDSYqZ9mPYqU';  

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async (query = 'nature') => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, per_page: 20 },
        headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` },
      });
      setPhotos(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      fetchPhotos(text);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.urls.small }} style={styles.image} />
      <Text style={styles.title}>{item.alt_description || 'Sem descrição'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar fotos"
        value={search}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default App;
