import { Directionality } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettings, AppTheme, defaults } from '../interfaces/settings';
import { LocalStorageService } from './storage.service';
import { AppDirectionality } from './directionality.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private key = 'ng-matero-settings';

  private readonly notify$ = new BehaviorSubject<Partial<AppSettings>>({});

  get notify() {
    return this.notify$.asObservable();
  }

  private htmlElement!: HTMLHtmlElement;

  options: AppSettings;

  themeColor: Exclude<AppTheme, 'auto'> = 'light';

  constructor(
    private store: LocalStorageService,
    private mediaMatcher: MediaMatcher,
    @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality,
  ) {
    const storedOptions = this.store.get(this.key);
    this.options = Object.assign(defaults, storedOptions);
    this.themeColor = this.getThemeColor();
    this.htmlElement = this.document.querySelector('html')!;
    this.setLanguage(this.options.language);
  }

  reset() {
    this.store.remove(this.key);
  }

  getThemeColor() {
    if (
      this.options.theme === 'auto' &&
      this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isSystemDark = this.mediaMatcher.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      return 'dark';
    } else {
      return this.options.theme as Exclude<AppTheme, 'auto'>;
    }
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  setDirection() {
    this.dir.value = this.options.dir;
    this.htmlElement.dir = this.dir.value;
  }

  setTheme() {
    this.themeColor = this.getThemeColor();

    if (this.themeColor === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  }
  setAgencyLayout() {
    this.options.isAgency = true;
    this.setOptions(this.options);
  }
  setDefaultLayout() {
    this.options.isAgency = false;
    this.setOptions(this.options);
  }
}
