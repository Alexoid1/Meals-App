import {useContext, useLayoutEffect } from 'react';
import {View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import IconButton from '../components/IconButton';
import List from '../components/List';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/Subtitle';
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from '../store/context/favorites-context';

const MealDetailScreen = ({ route, navigation }) => {
  const favoriteMeals = useContext(FavoritesContext);
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id===mealId);
  const mealIsFavorie = favoriteMeals.ids.includes(mealId)

  function headerPressHandler(){
    if (mealIsFavorie) {
      favoriteMeals.revomeFavorite(mealId);
    }else{
      favoriteMeals.addFavorite(mealId);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
        <IconButton 
          icon={mealIsFavorie ? 'star' : 'star-outline'} 
          color='white' 
          onPress={headerPressHandler}
        />)
      }
    })
  }, [navigation, headerPressHandler])

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{uri: selectedMeal.imageUrl}}/>
      <Text style={styles.title}>{ selectedMeal.title }</Text>
      <MealDetails 
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients}/>
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps}/>
        </View>
      </View>
    </ScrollView>
  )
}

export default MealDetailScreen

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32
  },
  image: {
    width: '100%',
    height: 350
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white'
  },
  detailText : {
    color: 'white'
  },
  listOuterContainer: {
    alignItems: 'center'
  },
  listContainer: {
    width: '80%'
  }
  
})