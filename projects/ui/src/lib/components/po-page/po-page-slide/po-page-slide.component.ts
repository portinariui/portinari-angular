import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { getFocusableElements } from '../../../utils/util';
import { PoPageSlideBaseComponent } from './po-page-slide-base.component';
import { PoPageSlideService } from './po-page-slide.service';

@Component({
  selector: 'po-page-slide',
  templateUrl: './po-page-slide.component.html',
  providers: [],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), group([animate('150ms', style({ opacity: 1 })), query('@shift', animateChild())])]),
      transition(':leave', group([query('@shift', animateChild()), animate('150ms', style({ opacity: 0 }))]))
    ]),
    trigger('shift', [
      transition('void => left', [style({ transform: 'translateX(-50px)' }), animate('300ms ease-out', style({ transform: 'none' }))]),
      transition('left => void', [animate('300ms', style({ transform: 'translateX(-50px)' }))]),
      transition('void => right', [style({ transform: 'translateX(50px)' }), animate('300ms ease-out', style({ transform: 'none' }))]),
      transition('right => void', [animate('300ms', style({ transform: 'translateX(50px)' }))])
    ])
  ]
})
export class PoPageSlideComponent extends PoPageSlideBaseComponent {
  private id = uuid();
  private sourceElement: HTMLElement;
  private focusEvent: EventListener;

  @ViewChild('pageContent', { read: ElementRef, static: false }) pageContent: ElementRef;

  constructor(private poPageSlideService: PoPageSlideService) {
    super();
  }

  public open() {
    // Nao permitir a abertura de dois "po-page-slide" simultâneas.
    if (this.poPageSlideService.isAnyPageActive()) {
      throw new TypeError('It\'s not possible to have two "po-page-slide" simultaneously activated.');
    }

    super.open();

    this.poPageSlideService.activePage(this.id);
    this.sourceElement = document.activeElement as HTMLElement;

    setTimeout(() => this.handleFocus());
  }

  public close() {
    super.close();

    this.poPageSlideService.deactivePage();
    this.removeEventListeners();

    if (this.sourceElement && this.sourceElement.focus) {
      this.sourceElement.focus();
    }
  }

  private handleFocus() {
    const elements = getFocusableElements(this.pageContent.nativeElement);

    this.focusEvent = (event: Event) => {
      const pageElement = this.pageContent.nativeElement;

      // O foco não pode sair da página.
      if (document !== event.target && pageElement !== event.target && !pageElement.contains(event.target)
        && this.poPageSlideService.getAtivePage() === this.id) {
        const firstElement = elements[0] || this.pageContent.nativeElement;
        firstElement.focus();
      }
    };

    const element = (this.hideClose ? elements[0] : elements[1]) || this.pageContent.nativeElement;
    element.focus();

    document.addEventListener('focus', this.focusEvent, true);
  }

  private removeEventListeners() {
    document.removeEventListener('focus', this.focusEvent, true);
  }
}
