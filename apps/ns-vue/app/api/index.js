import axios from 'axios';

const hostname = process.env.VUE_APP_API_HOSTNAME;
const port = process.env.VUE_APP_API_PORT;
// const baseURL = 'https://${hostname}:${port}/transport_manager/api/';
const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

export default {
  methods: {
    fetchData() {
      return axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151');
    },
    inputPassword (password) {
      axios.post(baseURL, password)
        .then(response => {
          // Xử lý dữ liệu nhận được từ API
          console.log(response.data);
          is_admin = true;
        })
        .catch(error => {
          // Xử lý lỗi
          console.error(error);
        });
    },

    async getData(param) {
      try {
        const response = await axios.get(`${baseURL}${param}`);
        return response.data;
      } catch (error) {
        console.error(error)
        return null;
      }
    },

    async postData(paramUrl ,data) {
      try {
        const response = await axios.post(`${baseURL}${paramUrl}`, data);
        return 'success';
      } catch (error) {
        console.error(error);
        return 'fail';
      }
    },

    async putData(paramUrl, data) {
      try {
        const response = await axios.put(`${baseURL}${paramUrl}`, data);
        return 'success';
      } catch (error) {
        console.error(error);
        return 'fail';
      }
    },

    async deleteData(paramUrl) {
      try {
        const response = await axios.delete(`${baseURL}${paramUrl}`);
        return 'success';
      } catch (error) {
        console.error(error);
        return 'fail';
      }
    }

  }
}