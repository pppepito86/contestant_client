import React from 'react';
import axios from 'axios';

class AuthProvider extends React.Component {

  componentWillMount() {
    axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token1');
      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (401 === error.response.status) {
        localStorage.removeItem('token1');
        window.location.href = '/login'
      } else {
        return Promise.reject(error);
      }
    });
  }

  render() {
    return this.props.children
  }
}

export default AuthProvider;