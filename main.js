import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 10;

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const group1 = createXYslabWithMesh(0);
scene.add(group1)
const group2 = createXYslabWithMesh(1);
scene.add(group2)
const group3 = createXYslabWithMesh(2);
scene.add(group3)

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function createXYslabWithMesh(z) {
  const group = new THREE.Group();

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      const color = new THREE.Color( x * 0.1, y * 0.1, 0.5);
      const material = new THREE.MeshBasicMaterial({ color: color});
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = x - 1;
      mesh.position.y = y - 1;
      mesh.position.z = z - 1;
      group.add(mesh);
    }
  }
  return group;
}

function animation( time ) {
  group1.rotation.z = time / 500;
  group2.rotation.z = time / 200;
  group3.rotation.z = time / 1000;

  group1.rotation.y = time / 500;
  group2.rotation.y = time / 500;
  group3.rotation.y = time / 500;

  group1.rotation.x = time / 500;
  group2.rotation.x = time / 500;
  group3.rotation.x = time / 500;

  renderer.render( scene, camera );
}
