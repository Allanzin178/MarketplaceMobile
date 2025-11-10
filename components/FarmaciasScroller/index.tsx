import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FarmaciasScroller() {
  return (
    <View>
        <View>
            <Text style={styles.farmaciasText}>Farmacias</Text>
        </View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageContainer}
        >
            <Image source={require('../../assets/images/LOGO-DROGASIL 1.png')}/>
            <Image source={require('../../assets/images/LOGO-FROGAFUJI 1.png')}/>
            <Image source={require('../../assets/images/LOGO-PAGUEMENOS 1.png')}/>
            <Image source={require('../../assets/images/LOGO-ULTA 1.png')}/>

        </ScrollView>
        
    </View>
  );
}

const styles = StyleSheet.create({
  farmaciasText: {
    fontWeight: 'bold',
    paddingBottom: 10
  },
  imageContainer:{
    gap: 14,
    width: '10%',
  }
});
