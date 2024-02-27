import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Dimensions, Modal, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Fetch data when component mounts
    getData();
  }, []);

  const route = useRoute();
  const { name, ucolor, fcolor } = route.params;

  const getData = async () => {
    try {
      const response = await axios.get('https://reactnative.dev/movies.json');
      setMovies(response.data.movies);
      setIsLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading to false even if there's an error
    }
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dateString = `${day}/${month}/${year}`;

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;

  const dynamicStyle = { backgroundColor: ucolor };
  const combinestyle = StyleSheet.compose(styles.item, dynamicStyle);

  const customcolor = { color: fcolor };
  const title = StyleSheet.compose(styles.title, customcolor);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
      <View style={combinestyle}>
        <Image source={require('../AwesomeProject1/assets/video-marketing.png')} style={styles.movielogo} />
        <View>
          <Text style={title}>{item.title}</Text>
          <Text style={title}>{item.releaseYear}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
  };

  const backtologin = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datettimecontainer}>
        <Text style={styles.datetime}>{dateString}</Text>
        <Text style={styles.datetime}>{timeString}</Text>
      </View>
      <Text style={styles.username}>Welcome {name}</Text>
      {isLoading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#ea6dfc" />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id}
          style={styles.flatListContainer}
        />
      )}
      <TouchableOpacity style={styles.buttonBox} onPress={backtologin}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#231246",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datettimecontainer: {
    marginTop: 25,
    flexDirection: 'row',
    gap: 20
  },
  datetime: {
    color: "white",
    fontSize: 22,
    fontWeight: 'bold'
  },
  username: {
    marginTop: 25,
    marginBottom: 30,
    color: "white",
    fontSize: 22,
    fontWeight: 'bold'
  },
  item: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: Dimensions.get('window').width * 0.9,
    height: 100,
    borderRadius: 20
  },
  title: {
    marginLeft: 25,
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
  },
  movielogo: {
    height: 60,
    width: 60
  },
  buttonBox: {
    height: 50,
    width: 120,
    backgroundColor: "#ea6dfc",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: '700'
  },
  flatListContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
