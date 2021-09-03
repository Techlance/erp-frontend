const config = {
  // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "",
  defaultPath: "/select-company",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  outlinedFilled: true,
  theme: "light",
  presetColor: "theme4", // default, theme1, theme2, theme3, theme4, theme5, theme6
  // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  i18n: "en",
  rtlLayout: false,
  api_uri: "https://erp-software-test.herokuapp.com/api",
  // media_uri: "https://roofingstorage.s3.amazonaws.com/",
  media_uri: "https://erp-project.s3.ap-south-1.amazonaws.com/",
  // api_uri: "http://localhost:8000/api",
  // api_uri: "https://erp-software.herokuapp.com/api",
  jwt: {
    secret: "SECRET-KEY",
    timeout: "1 days",
  },
  firebase: {
    apiKey: "AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM",
    authDomain: "berry-material-react.firebaseapp.com",
    projectId: "berry-material-react",
    storageBucket: "berry-material-react.appspot.com",
    messagingSenderId: "901111229354",
    appId: "1:901111229354:web:a5ae5aa95486297d69d9d3",
    measurementId: "G-MGJHSL8XW3",
  },
  auth0: {
    client_id: "HvYn25WaEHb7v5PBT7cTYe98XATStX3r",
    domain: "demo-localhost.us.auth0.com",
  },
};

export default config;
