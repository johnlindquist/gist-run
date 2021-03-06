import {inject, customAttribute} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SetFocusEvent} from './focus';

@customAttribute('set-focus')
@inject(Element, EventAggregator)
export class SetFocus {
  constructor(element, eventAggregator) {
    this.element = element;
    this.eventAggregator = eventAggregator;
  }

  handleEvent(e) {
    if (!e.handled && e.name === this.value) {
      e.handled = true;
      setTimeout(() => this.element.focus());
    }
  }

  attached() {
    this.subscription = this.eventAggregator.subscribe(SetFocusEvent, ::this.handleEvent);
  }

  detached() {
    this.subscription.dispose();
  }
}
