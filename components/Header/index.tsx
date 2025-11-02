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
    width: 60,
    height: 60,
    right: 5,
    marginRight: 0
  },
  header: {
    marginTop: 46,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerSearch: {
    flex: 1,
    right: 5,
    flexDirection: "row",
    borderColor: "#919191",
    borderWidth: 1,
    borderRadius: 20,
    gap: 7,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
  },
  headerSearchInput: {
    color: "#B2B2B2",
    flex: 1
  },
});
