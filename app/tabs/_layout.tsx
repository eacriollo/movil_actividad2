import { Tabs } from "expo-router";

// Este layout se aplica a todas las rutas dentro de /taps

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Películas",
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Agregar",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}