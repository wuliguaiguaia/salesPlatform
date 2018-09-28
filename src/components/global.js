import Vue from "vue";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const requestComponent = require.context('.', false, /\.vue$/);
requestComponent.keys().forEach(fileName => {
  const componentConfig = requestComponent(fileName)
  const componentName = capitalize(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
  Vue.component(componentName, componentConfig.default || componentConfig);
});
