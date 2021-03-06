import React, { useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { useFocusEffect } from "@react-navigation/native";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  async function loadFavorites() {
    const response = await AsyncStorage.getItem("@favorites");

    if (response) {
      const favoritedTeachers = JSON.parse(response);

      setFavorites(favoritedTeachers);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;
