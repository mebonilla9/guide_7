import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";

let that;
let index = {
  container: undefined,
  sceneWidth: undefined,
  sceneHeight: undefined,
  scene: undefined,
  renderer: undefined,
  camera: undefined,
  controls: undefined,
  cube:undefined,
  init: function () {
    that = this;
    that.createScene();
    that.update();
  },
  createScene: function () {
    // inicializar las variables globales
    that.sceneWidth = window.innerWidth;
    that.sceneHeight = window.innerHeight;
    that.scene = new THREE.Scene();
    that.scene.background = new THREE.Color(0x000000);

    // Renderizar la escena
    that.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // relación de aspecto de la escena en pixeles
    that.renderer.setPixelRatio(window.devicePixelRatio);
    // Tamaño del render
    that.renderer.setSize(
      that.sceneWidth,
      that.sceneHeight
    );

    // Cargar el contenedor
    that.container = document.getElementById("container");
    that.container.appendChild(that.renderer.domElement);

    // Configuración camara
    that.camera = new THREE.PerspectiveCamera(
      75,
      that.sceneWidth / that.sceneHeight,
      1,
      1000
    );
    // Posición de la camar
    that.camera.position.set(0, 0, 100);

    // Definir luces
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 0, 1);
    that.scene.add(light);

    // Agregar luz de tipo hemisferio
    let hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    hemi.position.set(0,0,5);
    that.scene.add(hemi);

    // Controles de orbita para manipular el movimiento de la escena
    that.controls = new OrbitControls(
      that.camera,
      that.renderer.domElement
    );
    that.controls.update();

    // Crear geometria de cubo
    let cubeGeom = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xee1122 });
    that.cube = new THREE.Mesh(cubeGeom, cubeMaterial);
    that.scene.add(that.cube);


  },
  update: function () {
    // Invocar al metodo que disparara el ciclo infinito del loop
    requestAnimationFrame(that.update);
    that.render();
  },
  render: function () {
    that.controls.update();
    that.cube.rotation.y += 0.025
    that.cube.rotation.x += 0.0025
    that.cube.rotation.z += 0.00025
    that.renderer.render(that.scene, that.camera);
  }
};
index.init();
