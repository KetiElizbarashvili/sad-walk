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

// USE THE HDR AS THE SCENE'S ENVIRONMENT
scene.environment = hdrEquirect;

// CREATE CAMERA AND SET POSITION
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

// CAMERA POSITION ONLY WORKS IF IT ISN'T OVERWRITTEN BY THE ANIMATION (RIGHT NOW IT DOESN'T HAVE AN EFFECT)
camera.position.z = 20;
camera.position.y = 40;

// MATERIAL FOR THE BLOB WHICH USES THE HDR TO GET IT'S COLOUR THROUGH REFLECTIONS
var blob_mat = new THREE.MeshPhysicalMaterial({
  
  // WHITE COLOUR TO GET MORE REFLECTIONS
  color: 0xffffff,
  
  // ROUGHNESS TO GIVE THE MATERIAL A SOFT PLASTIC LOOK
  roughness: 0.3,
  
  // NO MATELNESS IN ORDER NOT TO MAKE THE MATERIAL TO SHINY
  metalness: 0,
  
  // USE THE HDR AS THE ENVIRONMENT MAP
  envMap: hdrEquirect,
  
  // DECLARE HOW MUCH OF AN EFFECT THE HDR HAS ON THE MATERIAL
  envMapIntensity: 0.5
});

// UNI MATERIAL FOR THE EYES - THE EMISSIVENESS MAKES THAT THE MATERIAL DOESN'T REACT TO OTHER LIGHTS
var uni_mat = new THREE.MeshPhysicalMaterial({
// USE THE HDR AS THE ENVIRONMENT MAP
envMap: hdrEquirect,
  
// BUT MAKE IT HAVE NO IMPACT ON THE MATERIAL
envMapIntensity: 0,

// SET THE EMSSIVE COLOUR TO THE BACKGROUND COLOUR SO THAT IT BLENDS IN
emissive: 0x11151c
});

