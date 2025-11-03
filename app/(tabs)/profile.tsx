import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Button from "@/components/Button";

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Dados do usuário (mockados)
  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    avatar: null, // Pode adicionar uma imagem de avatar
  };

  const handleEditProfile = () => {
    Alert.alert("Editar Perfil", "Funcionalidade em desenvolvimento");
  };

  const handleAddresses = () => {
    Alert.alert("Endereços", "Funcionalidade em desenvolvimento");
  };

  const handlePaymentMethods = () => {
    Alert.alert("Formas de Pagamento", "Funcionalidade em desenvolvimento");
  };

  const handleFavorites = () => {
    Alert.alert("Favoritos", "Funcionalidade em desenvolvimento");
  };

  const handleSupport = () => {
    Alert.alert("Suporte", "Entre em contato: suporte@marketplace.com");
  };

  const handlePrivacy = () => {
    Alert.alert("Privacidade", "Funcionalidade em desenvolvimento");
  };

  const handleTerms = () => {
    Alert.alert("Termos de Uso", "Funcionalidade em desenvolvimento");
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => Alert.alert("Logout", "Você saiu da conta"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/image.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Image source={user.avatar} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <FontAwesome name="user" size={40} color="#fff" />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarBtn}>
              <FontAwesome name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          <TouchableOpacity style={styles.editProfileBtn} onPress={handleEditProfile}>
            <FontAwesome name="edit" size={16} color="#ff2b59" />
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Conta</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="map-marker" size={20} color="#666" />
              <Text style={styles.menuItemText}>Meus Endereços</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethods}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="credit-card" size={20} color="#666" />
              <Text style={styles.menuItemText}>Formas de Pagamento</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleFavorites}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="heart" size={20} color="#666" />
              <Text style={styles.menuItemText}>Produtos Favoritos</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/history")}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="shopping-bag" size={20} color="#666" />
              <Text style={styles.menuItemText}>Histórico de Pedidos</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferências</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="bell" size={20} color="#666" />
              <Text style={styles.menuItemText}>Notificações</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#ddd", true: "#ff2b59" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="moon-o" size={20} color="#666" />
              <Text style={styles.menuItemText}>Modo Escuro</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#ddd", true: "#ff2b59" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Support & Legal */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Suporte e Legal</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="question-circle" size={20} color="#666" />
              <Text style={styles.menuItemText}>Central de Ajuda</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="shield" size={20} color="#666" />
              <Text style={styles.menuItemText}>Privacidade</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleTerms}>
            <View style={styles.menuItemLeft}>
              <FontAwesome name="file-text-o" size={20} color="#666" />
              <Text style={styles.menuItemText}>Termos de Uso</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 20 }}>
          <Button 
            title="Sair da Conta"
            onPress={handleLogout}
            variant="outline"
            size="medium"
            fullWidth
            style={{ borderColor: '#ef4444' }}
            textStyle={{ color: '#ef4444' }}
          />
        </View>

        {/* App Version */}
        <Text style={styles.version}>Versão 1.0.0</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logo: {
    width: 150,
    height: 60,
  },
  userSection: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: "#fafafa",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ff2b59",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#333",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  editProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff2b59",
    gap: 8,
  },
  editProfileText: {
    color: "#ff2b59",
    fontSize: 14,
    fontWeight: "600",
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 24,
  },
});