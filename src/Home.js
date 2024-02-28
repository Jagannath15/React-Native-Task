import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Dimensions, Modal, ActivityIndicator } from 'react-native';
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
      setIsLoading(false); // Once data is fetched, set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading to false in case of error too
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dateString = `${day}/${month}/${year}`;

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;

  const dynamicStyle = { backgroundColor: ucolor };
  const combinestyle=StyleSheet.compose(styles.item, dynamicStyle);

  const customcolor={color:fcolor};
  const title=StyleSheet.compose(styles.title,customcolor)
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
      <View style={combinestyle}>
      <Image source={require('../assets/video-marketing.png')} style={styles.movielogo} />

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

  const backtologin=()=>{
          navigation.replace('Login')
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ea6dfc" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datettimecontainer}>
        <Text style={styles.datetime}>{dateString}</Text>
        <Text style={styles.datetime}>{timeString}</Text>
      </View>
      <Text style={styles.username}>Welcome {name}</Text>

      <View style={styles.flatListContainer}>
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id}
        />

        <Modal
       // style={styles.modalcontainer}
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalcontainer}>

            <View style={styles.moviecontainer} >
                  <Text style={styles.modaltext}>Movie Detail</Text>

                  <View style={styles.movieblock}>
                  <View>
                    <Text style={styles.modaltext}>Movie Name:  </Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.modaltext}>Release Year:  </Text>
                  </View>


                  <View>
                    <Text style={styles.moviename}>{selectedMovie?.title}</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.moviename}>{selectedMovie?.releaseYear}</Text>
                  </View>

                  </View>
                
                
                  <TouchableOpacity style={styles.backbutton} onPress={closeModal}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                
            </View>
            
          </View>
       
        </Modal>
      </View>

      <TouchableOpacity style={styles.buttonBox}  onPress={backtologin}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#231246",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  datettimecontainer: {
    marginTop:25,
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
    marginBottom:50,
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

  modalcontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  moviecontainer:{
    height:Dimensions.get('window').height *0.55 ,
    width:Dimensions.get('window').width * 0.85,
    backgroundColor:"#90f29d",
    borderRadius:40,
    padding:10,
    alignItems:'center',
    justifyContent:'space-evenly'
  },

  modaltext:{
    color: "black",
    fontSize: 20,
    fontWeight: 'bold',
  },

  backbutton:{
    height:45,
    width:120,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#013a03",
    borderRadius:23
  },

  moviename:{
    overflow:"scroll",
    color: "red",
    fontSize: 20,
    fontWeight: 'bold',
  },

  movieblock:{
    overflow:'scroll',
    flexDirection:"row",
  },

  spacer:{
    height:10
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#231246',
  },
});
