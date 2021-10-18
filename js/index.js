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
  cube: undefined,
  ico: undefined,
  torus: undefined,
  cone: undefined,
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
    that.scene.background = new THREE.Color(0x333333);

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
      100000
    );
    // Posición de la camar
    that.camera.position.set(0, 250, 420);

    // Definir luces
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(5, 5, 25);
    that.scene.add(light);

    // Controles de orbita para manipular el movimiento de la escena
    that.controls = new OrbitControls(
      that.camera,
      that.renderer.domElement
    );
    that.controls.update();

    // Crear geometrias
    that.createIco();
    that.createCube();
    that.createTorus();
    that.createCone();
    that.createPlane();
  },
  createIco:function(){
    let icoGeom = new THREE.IcosahedronGeometry(30, 0);
    icoGeom.computeVertexNormals();
    var icoMaterial = new THREE.MeshPhongMaterial({
      color: 0xee1122,
      wireframe: false
    });
    that.ico = new THREE.Mesh(icoGeom, icoMaterial);
    that.ico.position.set(140,40,-100);
    that.scene.add(that.ico);
  },
  createCube:function(){
    let cubeGeom = new THREE.BoxGeometry(40,42,42);
    cubeGeom.computeVertexNormals();
    var cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0xf731b5,
      wireframe: false
    });
    that.cube = new THREE.Mesh(cubeGeom, cubeMaterial);
    that.cube.position.set(-120,40,-100);
    that.scene.add(that.cube);
  },
  createTorus:function(){
    let torusGeom = new THREE.TorusGeometry(25,6,10,10);
    torusGeom.computeVertexNormals();
    var torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x4040c7,
      wireframe: false
    });
    that.torus = new THREE.Mesh(torusGeom, torusMaterial);
    that.torus.position.set(140,40,100);
    that.scene.add(that.torus);
  },
  createCone:function(){
    let coneGeom = new THREE.ConeGeometry(25,50,10);
    coneGeom.computeVertexNormals();
    var coneMaterial = new THREE.MeshPhongMaterial({
      color: 0xc79d27,
      wireframe: false
    });
    that.cone = new THREE.Mesh(coneGeom, coneMaterial);
    that.cone.position.set(-120,40,100);
    that.scene.add(that.cone);
  },
  createPlane: function () {
    const planeGeom = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    planeGeom.rotateX(-Math.PI / 2);
    const materialPlane = new THREE.MeshBasicMaterial({
      color: 0x19A4FA,
      wireframe: false,
      side: THREE.DoubleSide
    });
    const planeMesh = new THREE.Mesh(planeGeom, materialPlane);
    planeMesh.castShadow = true;
    planeMesh.receiveShadow = true;
    that.scene.add(planeMesh);
  },
  update: function () {
    // Invocar al metodo que disparara el ciclo infinito del loop
    requestAnimationFrame(that.update);
    that.render();
  },
  render: function () {
    that.controls.update();
    that.rotatePolygon(that.cube);
    that.rotatePolygon(that.ico);
    that.rotatePolygon(that.torus);
    that.rotatePolygon(that.cone);
    that.renderer.render(that.scene, that.camera);
  },
  rotatePolygon:function(object){
    object.rotation.y += 0.025;
    object.rotation.x += 0.0025;
    object.rotation.z += 0.00025;
  }
};
index.init();
