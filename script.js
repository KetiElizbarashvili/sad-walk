import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { RGBELoader  } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/AfterimagePass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FBXLoader.js';

// DECLARE COMPOSER, MIXER, AND THETA
let composer;
let body_01_mixer, eyes_01_mixer;
var theta1 = 0;

// SET RENDERER
var renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('canvas'), antialias: true});

// SET UP CLOCK FOR THE ANIMATION LATER
const clock = new THREE.Clock();

// SET BACKGROUND COLOUR
renderer.setClearColor(0x11151c);

// USE THE DEVICE'S ASPECT RATIO
renderer.setPixelRatio(window.devicePixelRatio);

// SET THE RENDERER SIZE TO THE SIZE OF THE INNER WINDOW
renderer.setSize(window.innerWidth, window.innerHeight);

// CREATE NEW SCENE
var scene = new THREE.Scene();

// ADD ENVIRONMENT LIGHT
const hdrEquirect = new RGBELoader()
	.load( 'https://miroleon.github.io/daily-assets/gradient.hdr', function () {
  
  // TRY OTHER HDRs
  //.load( 'https://miroleon.github.io/daily-assets/GRADIENT_01_01_comp.hdr', function () {
  //.load( 'https://miroleon.github.io/daily-assets/gradient_13.hdr', function () {
  //.load( 'https://miroleon.github.io/daily-assets/gradient_4_comp.hdr', function () {
  //.load( 'https://miroleon.github.io/daily-assets/gradient_5_comp.hdr', function () {
    
  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
});
