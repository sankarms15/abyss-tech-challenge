<template>
  <div id="app">
    <div>
      <textarea id="input" name="input" rows="4" cols="50" v-model="inputModel"></textarea>
      <div v-if="error" class="app-error">{{ error }}</div>
    </div>

    <div class="svg-container">
      <svg width="250" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <polygon v-if="isPolygon" :points="polygonPoints" :fill="generator()"/>
        <rect v-if="isRectangle" :x="rect.x" :y="rect.y" :width="rect.w" :height="rect.h" :fill="generator()" />
        <circle v-if="isCircle" :cx="circle.cx" :cy="circle.cy" :r="circle.r" :fill="generator()"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {
  getFirsChar,
  hasCircleCoordinates,
  circleCoordinates,
  rectangleCoordinates,
  isRect,
  hasPolygon
} from './util';
import {
  EMPTY_STRING,
  APP_ERROR
} from './constant';
export default {
  name: 'App',
  data() {
    return {
      inputModel: '',
      circle: null,
      rect: null,
      polygonPoints: null,
      error: "",
      isRectangle: false,
      isCircle: false,
      isPolygon: false
    }
  },
  watch: {
    inputModel(newValue) {
      this.reset();  
      if(newValue) {
        this.generateShapes(newValue)
      }
    },
  },
  methods: {
    generator(){
      return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    },
    generateShapes(inputModel) {
      const input_text = inputModel.trim().split('\n');        
      input_text.forEach(input => {
        if(getFirsChar(input) === 'p' || getFirsChar(input) === 'r' || getFirsChar(input) === 'c') {
          if(getFirsChar(input) === 'p') {
            const polygonCoordinates = input.substr(2).trim();
            const split_coord = polygonCoordinates.split(' ');
            this.isPolygon = hasPolygon(split_coord).isValid;
            this.error = hasPolygon(split_coord).error;
            if(this.isPolygon) {
              this.polygonPoints = polygonCoordinates;
            }
          }
          if(getFirsChar(input) === 'c') {
            const splitCoordinates = input.substr(2).split(' ');
            this.isCircle = hasCircleCoordinates(splitCoordinates) === EMPTY_STRING;
            this.error = hasCircleCoordinates(splitCoordinates);
            if(this.isCircle) {
              this.circle = circleCoordinates(splitCoordinates);
            }          
          }
          if(getFirsChar(input) === 'r') {
            const splitCoordinates = input.substr(2).split(' ');
            this.isRectangle = isRect(splitCoordinates) === EMPTY_STRING;
            this.error = isRect(splitCoordinates);
            if(this.isRectangle) {
              this.rect = rectangleCoordinates(splitCoordinates);
            }
          }
        } else {
          this.error = APP_ERROR;
        }          
      });
    },
    reset() {
      this.polygonPoints = null;
      this.circle = null;
      this.rect = null;
      this.isRectangle = false;
      this.isCircle = false;
      this.isPolygon = false;
      this.error = EMPTY_STRING;
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .app-error {
    color: red;
  }

  .svg-container {
    margin-top: 40px;
  }
</style>
