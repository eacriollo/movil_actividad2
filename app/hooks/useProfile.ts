import { useEffect, useState } from "react";
import database from "../database/movieDataBase";

export interface Profile {
  id?: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  favoriteGenre: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const getProfile = async () => {
    try {
      const result = await database.getFirstAsync<Profile>(
        "SELECT * FROM profile LIMIT 1"
      );

      setProfile(result ?? null);
      return result;
    } catch (error) {
      console.log("Error obteniendo perfil", error);
      return null;
    }
  };

  const saveProfile = async (data: Profile) => {
    try {
      if (profile?.id) {
        await database.runAsync(
          `UPDATE profile
           SET fullName = ?, email = ?, avatarUrl = ?, favoriteGenre = ?
           WHERE id = ?`,
          [
            data.fullName,
            data.email,
            data.avatarUrl,
            data.favoriteGenre,
            profile.id,
          ]
        );
      } else {
        await database.runAsync(
          `INSERT INTO profile
           (fullName, email, avatarUrl, favoriteGenre)
           VALUES (?, ?, ?, ?)`,
          [
            data.fullName,
            data.email,
            data.avatarUrl,
            data.favoriteGenre,
          ]
        );
      }

      await getProfile();
    } catch (error) {
      console.log("Error guardando perfil", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return {
    profile,
    getProfile,
    saveProfile,
  };
};