import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory(AppComponent);
  const INPUT_SELECTOR = (name: string, input_type: string) => `[data-test="${name}-${input_type}"]`;
  const ERROR_SELECTOR = (name: string, error_type: string) => `[data-test="${name}-${error_type}-error"]`;
  const RESULT_SELECTOR = (result: string) => `[data-test="${result}-result"]`;
  const SUBMIT_BUTTON_SELECTOR = 'submit-button';
  beforeEach(() => spectator = createComponent());

  describe('unhappy flows', () => {
    it('should show name required error', () => {
      spectator.query(INPUT_SELECTOR('name', 'input'))?.setAttribute('value', '');
      spectator.detectChanges();
      const error = spectator.query(ERROR_SELECTOR('name', 'required'));
      console.log(error);
    });
  });
});
