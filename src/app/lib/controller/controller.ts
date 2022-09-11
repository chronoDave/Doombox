import type Logger from '../logger';

export type ControllerProps = {
  logger: Logger
};

export default abstract class Controller {
  private readonly _logger: Logger;

  get?(payload: unknown): Promise<unknown>;
  set?(payload: unknown): Promise<unknown>;
  minimize?(payload: unknown): Promise<unknown>;
  maximize?(payload: unknown): Promise<unknown>;
  close?(payload: unknown): Promise<unknown>;
  scan?(payload: unknown): Promise<unknown>;

  constructor(props: ControllerProps) {
    this._logger = props.logger;
  }

  protected _log(message: string, data?: unknown) {
    const raw = data ? `: ${JSON.stringify(data)}` : '';
    const err = new Error(`${message}${raw}`);

    this._logger.error(err);
    return err;
  }
}
