import { TransitionProps } from "vue";

export type TransitionPropsAndEvents = TransitionProps & {
  onEnter: (el: HTMLElement, done: () => void) => void;
  onLeave: (el: HTMLElement, done: () => void) => void;
  onAppear: (el: HTMLElement, done: () => void) => void;
  onBeforeEnter: (el: HTMLElement) => void;
  onBeforeLeave: (el: HTMLElement) => void;
  onAfterEnter: (el: HTMLElement) => void;
  onAfterLeave: (el: HTMLElement) => void;
  onAfterAppear: (el: HTMLElement) => void;
  onEnterCancelled: (el: HTMLElement) => void;
  onLeaveCancelled: (el: HTMLElement) => void;
  onAppearCancelled: (el: HTMLElement) => void;
};
