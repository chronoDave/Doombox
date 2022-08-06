import type Logger from '../logger';

export type ControllerProps = {
  logger: Logger
};

export default abstract class Controller {
  private readonly _logger: Logger;

  constructor(props: ControllerProps) {
    this._logger = props.logger;
  }

  protected log(message: string, data?: unknown) {
    const raw = data ? `: ${JSON.stringify(data)}` : '';
    const err = new Error(`${message}${raw}`);

    this._logger.error(err);
    return err;
  }

  abstract route(event: unknown): Promise<unknown>;
}
