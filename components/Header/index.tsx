import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header() {
  const iconSettings = {
    size: 16,
    color: "#919191",
  };

  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/Logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.headerSearch}>
        <TouchableOpacity>
          <Ionicons
            name="search"
            color={iconSettings.color}
            size={iconSettings.size}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.headerSearchInput}
          placeholder="Buscar no FarmaExpress"
        />
        <TouchableOpacity>
          <Ionicons
            name="scan"
            color={iconSettings.color}
            size={iconSettings.size}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="mic"
            color={iconSettings.color}
            size={iconSettings.size}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    backgroundColor: '#fff',
  },
  headerSearch: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 20,
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: '#f9f9f9',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerSearchInput: {
    color: "#333",
    flex: 1,
    fontSize: 14,
  },
});
