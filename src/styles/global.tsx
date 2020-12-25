import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: normal;
  font-size: 100%;
  list-style: none;
  line-height: 1;
  outline: 0px;
  text-rendering: optimizeLegibility;
}

body {
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

body, input, button {
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap');
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
}

h1, h2, h3, h4 ,h5 , h6, strong {
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap');
    font-family: 'Roboto Slab', serif;
    font-weight: 500;
}

div, label, span {
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap');
    font-family: 'Roboto Slab', serif;
}

div {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    margin: 10px;
    background-color: darkgreen;
    color: white;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
}

button:active {
    background-color: rgba(1, 129, 1, 0.616);
}

`;
