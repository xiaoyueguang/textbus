import { Observable } from 'rxjs';

import { KeymapAction } from '../../viewer/input';
import { Commander } from '../../core/_api';
import { SelectionMatchState } from '../matcher/matcher';

export interface Tool<T = any> {
  elementRef: HTMLElement;
  onApply: Observable<T>;
  commander: Commander;
  keymapAction?: KeymapAction | KeymapAction[];

  updateStatus?(selectionMatchState: SelectionMatchState): void;
}
