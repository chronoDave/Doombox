export default abstract class Controller {
  abstract route(event: unknown): Promise<unknown>;
}
