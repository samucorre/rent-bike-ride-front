import { environment } from '../../environments/environment';

export const API_CONFIG = {
  authUrl: environment.authBaseUrl,
  login: environment.authBaseUrl + '/oauth/token',
  logout: environment.authBaseUrl + '/logout',
  getAllProfiles: environment.adminBaseUrl + '/getAllProfiles',
  getAllSections: environment.adminBaseUrl + '/getAllSections',
  // Contacts API
  getContacts: environment.contactsBaseUrl + '/getContacts',
  getContact: environment.contactsBaseUrl + '/getContact',
  createContact: environment.contactsBaseUrl + '/createContact',
  editContact: environment.contactsBaseUrl + '/editContact',
  deleteContact: environment.contactsBaseUrl + '/deleteContact',
  // Bikes API
  getBikes: environment.bikesBaseUrl + '/getBikes',
  getBike: environment.bikesBaseUrl + '/getBike',
  createBikes: environment.bikesBaseUrl + '/createBike',
  editBikes: environment.bikesBaseUrl + '/editBike',
  deleteBikes: environment.bikesBaseUrl + '/deleteBike',
  // Brands API
  getBrands: environment.brandsBaseUrl + '/getBrands',
  getBrand: environment.brandsBaseUrl + '/getBrand',
  createBrands: environment.brandsBaseUrl + '/createBrand',
  editBrands: environment.brandsBaseUrl + '/editBrand',
  deleteBrands: environment.brandsBaseUrl + '/deleteBrand',
  //Models API
  getModels: environment.modelsBaseUrl + '/getModels',
  getModel: environment.modelsBaseUrl + '/getModel',
  createModels: environment.modelsBaseUrl + '/createModel',
  editModels: environment.modelsBaseUrl + '/editModel',
  deleteModels: environment.modelsBaseUrl + '/deleteModel',
  //Size API
  
getSizes: environment.sizesBaseUrl + '/getSizes',
getSize: environment.sizesBaseUrl + '/getSize',
createSizes: environment.sizesBaseUrl + '/createSize',
editSizes: environment.sizesBaseUrl + '/editSize',
deleteSizes: environment.sizesBaseUrl + '/deleteSize',
};
