import { ENV } from "../utils";

export class Exercise {
  baseApi = ENV.BASE_API;

  async createExercise(accessToken, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.EXERCISE}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getExercises(page = 1, limit = 10, muscle, muscleGroup) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;
      const muscleFilter = muscle ? `muscle=${muscle}` : "";
      const muscleGroupFilter = muscleGroup ? `muscleGroup=${muscleGroup}` : "";

      const url = `${this.baseApi}/${ENV.API_ROUTES.EXERCISE}?${pageFilter}&${limitFilter}&${muscleGroupFilter}&${muscleFilter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateExercise(accessToken, idExercise, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.EXERCISE}/${idExercise}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteExercise(accessToken, idExercise) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.EXERCISE}/${idExercise}`;
      const params = {
        method: "DELETE",
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

  async getExercisePath(path) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.EXERCISE}/${path}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
