import {
  Engine,
  Scene,
  MeshBuilder,
  ArcFollowCamera,
  HemisphericLight,
  Vector3,
  Vector2,
} from "@babylonjs/core";
import FrameContext from "./FrameContext";

/**
 * Bootstrap the game.
 * @param {HTMLCanvasElement} canvas The canvas we are bootstrapping.
 * @param {BootstrapCallback} update The update method to invoke.
 */
function bootstrap(canvas, update = () => {}) {
  if (!canvas) {
    throw new Error("Failed to boostrap: canvas undefined.");
  }

  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  const sphere = MeshBuilder.CreateSphere("Sphere", { diameter: 2 }, scene);

  new ArcFollowCamera(
    "DefaultCamera",
    Math.PI / 2,
    Math.PI / 2,
    4,
    sphere,
    scene
  );

  new HemisphericLight("DefaultAmbientLight", new Vector3(1, 1, 0), scene);

  const context = new FrameContext();

  engine.runRenderLoop(() => {
    scene.render();
    update(context);
  });

  window.addEventListener("resize", () => engine.resize());
}

/**
 * The callback invoked during bootstrapping.
 * @callback BootstrapCallback
 * @param {FrameContext} context The frame context undergoing update.
 */

export default bootstrap;
