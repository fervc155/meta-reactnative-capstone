import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Screen,
  SectionScroll,
  Label,
  Input,
  InputPhone,
  Button,
  COLORS,
} from "../components/AppUI";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation

export default function ProfileScreen() {
  const { checkLogin, saveUser, logout } = useContext(AuthContext);

  // Datos del usuario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  // Imagen de perfil
  const [imageUri, setImageUri] = useState(null);

  // Notificaciones
  const [notifications, setNotifications] = useState({
    orders: true,
    password: true,
    offers: true,
    newsletter: true,
  });

  // Obtener iniciales
  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  const onLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  // Cargar datos al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const userData = await checkLogin();
      if (userData) {
        const user = JSON.parse(userData);
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setImageUri(user.imageUri || null);
        setNotifications(user.notifications || notifications);
      }
    };
    loadUser();
  }, []);

  // Guardar cambios
  const saveProfile = async () => {
    const user = {
      firstName,
      lastName,
      email,
      phone,
      notifications,
      imageUri,
    };
    try {
      await saveUser(user);
      Alert.alert("Success", "Profile saved!");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  // Alternar notificaciones
  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Seleccionar imagen
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Access to media library is required!",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <Screen>
      <Header />
      <SectionScroll style={styles.container}>
        <Text style={styles.header}>Personal information</Text>

        {/* Avatar */}
        <View style={styles.avatarRow}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar size={70} uri={imageUri} initials={initials} />
          </TouchableOpacity>
          <View style={styles.avatarButtons}>
            <TouchableOpacity style={styles.changeBtn} onPress={pickImage}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => setImageUri(null)}
            >
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inputs */}
        <Label>First name</Label>
        <Input value={firstName} onChangeText={setFirstName} />

        <Label>Last name</Label>
        <Input value={lastName} onChangeText={setLastName} />

        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Label>Phone number</Label>
        <InputPhone
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Notificaciones */}
        <Text style={styles.subHeader}>Email notifications</Text>
        {[
          { key: "orders", label: "Order statuses" },
          { key: "password", label: "Password changes" },
          { key: "offers", label: "Special offers" },
          { key: "newsletter", label: "Newsletter" },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.checkboxRow}
            onPress={() => toggleNotification(item.key)}
          >
            <View
              style={[
                styles.checkbox,
                notifications[item.key] && styles.checkboxChecked,
              ]}
            />
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.discardBtn}
            onPress={() => loadUser()}
          >
            <Text>Discard changes</Text>
          </TouchableOpacity>
          <Button title="Save changes" onPress={saveProfile} />
        </View>
      </SectionScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeader: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarButtons: {
    marginLeft: 16,
    flexDirection: "row",
    gap: 10,
  },
  changeBtn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
  },
  changeText: {
    color: "white",
  },
  removeBtn: {
    borderWidth: 1,
    borderColor: COLORS.muted,
    padding: 10,
    borderRadius: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  logoutBtn: {
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  discardBtn: {
    borderWidth: 1,
    borderColor: COLORS.muted,
    padding: 12,
    borderRadius: 8,
  },
});
