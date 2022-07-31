export default abstract class Controller {
  abstract route(action: unknown, payload: unknown): unknown;
}
