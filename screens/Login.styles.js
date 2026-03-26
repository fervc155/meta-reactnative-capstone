import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },
  header: {
    backgroundColor: "#EDEFEE",
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 200,
    height: 60,
  },
  content: {
    flex: 1,
    backgroundColor: "#AFAFAF",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
    color: "#333333",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333333",
  },
  input: {
    borderWidth: 2,
    borderColor: "#495E57",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  footer: {
    padding: 20,
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
});
