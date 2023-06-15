import { ENV } from "../utils";

export class Like {
  baseApi = ENV.BASE_API;

  async getLikedExercises(
    accessToken,
    userId,
    page = 1,
    limit = 10,
    muscleGroup = ""
  ) {
    const pageFilter = `page=${page}`;
    const limitFilter = `limit=${limit}`;
    const muscleGroupFilter = `muscleGroup=${muscleGroup}`;

    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LIKE}/${userId}?${pageFilter}&${limitFilter}&${muscleGroupFilter}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async likeExercise(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LIKE}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async unlikeExercise(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LIKE}`;

      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
