// export const API_URL = "http://localhost:8000/";
// export const API_URL = "http://192.168.0.110:8000/";
export const API_URL = "https://affection-printing-server.vercel.app/";

export const imageUploadApiKey = "c104a310afcf00dd9cf4d3119c8e359c";

export const IMAGE_UPLOAD = "https://api.imgbb.com/1/upload";

// USERS @get - retrieve data, @post - create data @put - update data @delete - delete data (CRUD operations)
export const USERS = `${API_URL}api/user`;

// ADMIN @get - retrieve data, @post - create data @put - update data @delete - delete data (CRUD operations)
export const ADMIN = `${API_URL}api/admin`;
// login route to authenication
export const LOGIN = `${API_URL}api/login`;

// Challan @get - retrieve data, @post - create data @put - update data @delete - delete data (CRUD operations)
export const CHALLAN = `${API_URL}api/challan`;

// Bill @get - retrieve data, @post - create data @put - update data @delete - delete data (CRUD operations)
export const BILL = `${API_URL}api/bill`;

// Bill @get - retrieve data, @post - create data @put - update data @delete - delete data (CRUD operations)
export const TRANSACTION = `${API_URL}api/transaction`;

// Quotation @get - retrieve data, @post - create data @put - update data @delete - delete data (CRUD operations)
export const QUOTATION = `${API_URL}api/quotation`;

// Quotation @get - retrieve data where we get dues off all
export const DUES = `${API_URL}api/bill/dues`;

export const MAKE_PAYMENT = `${API_URL}api/transaction`;
export const GET_DASHBOARD = `${API_URL}api/dashboard`;
