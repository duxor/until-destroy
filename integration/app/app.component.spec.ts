import { ɵivyEnabled as ivyEnabled, Component, Directive, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

describe('until-destroy runtime behavior', () => {
  it('ivy has to be enabled', () => {
    // This assertion has to be performed as we have to
    // be sure that we're running these tests with the Ivy engine
    expect(ivyEnabled).toBeTruthy();
  });

  it('should unsubscribe from the component property', () => {
    // Arrange
    @UntilDestroy({ checkProperties: true })
    @Component({ template: '' })
    class MockComponent {
      disposed = false;

      subscription = new Subject()
        .pipe(
          finalize(() => {
            this.disposed = true;
          })
        )
        .subscribe();
    }

    // Act
    TestBed.configureTestingModule({
      declarations: [MockComponent]
    });

    const fixture = TestBed.createComponent(MockComponent);

    // Assert
    expect(fixture.componentInstance.disposed).toBeFalsy();
    fixture.destroy();
    expect(fixture.componentInstance.disposed).toBeTruthy();
  });

  it('should unsubscribe from the directive property', () => {
    // Arrange
    @Component({
      template: '<div test></div>'
    })
    class MockComponent {}

    @UntilDestroy({ checkProperties: true })
    @Directive({ selector: '[test]' })
    class MockDirective {
      disposed = false;

      subscription = new Subject()
        .pipe(
          finalize(() => {
            this.disposed = true;
          })
        )
        .subscribe();
    }

    // Act
    TestBed.configureTestingModule({
      declarations: [MockComponent, MockDirective]
    });

    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    const elementWithDirective = fixture.debugElement.query(By.directive(MockDirective));
    const directive = elementWithDirective.injector.get(MockDirective);
    fixture.destroy();

    // Assert
    expect(directive.disposed).toBeTruthy();
  });

  it('should loop an array of subscriptions and unsubscribe', () => {
    // Arrange
    @UntilDestroy({ arrayName: 'subscriptions' })
    @Component({ template: '' })
    class MockComponent {
      disposed = false;

      subscriptions = [
        new Subject()
          .pipe(
            finalize(() => {
              this.disposed = true;
            })
          )
          .subscribe()
      ];
    }

    // Act
    TestBed.configureTestingModule({
      declarations: [MockComponent]
    });

    const fixture = TestBed.createComponent(MockComponent);

    // Assert
    expect(fixture.componentInstance.disposed).toBeFalsy();
    fixture.destroy();
    expect(fixture.componentInstance.disposed).toBeTruthy();
  });

  it('should complete the stream using the "untilDestroyed" operator', () => {
    // Arrange
    @UntilDestroy()
    @Component({ template: '' })
    class MockComponent {
      disposed = false;

      constructor() {
        new Subject()
          .pipe(
            untilDestroyed(this),
            finalize(() => {
              this.disposed = true;
            })
          )
          .subscribe();
      }
    }

    // Act
    TestBed.configureTestingModule({
      declarations: [MockComponent]
    });

    const fixture = TestBed.createComponent(MockComponent);

    // Assert
    expect(fixture.componentInstance.disposed).toBeFalsy();
    fixture.destroy();
    expect(fixture.componentInstance.disposed).toBeTruthy();
  });

  it('should unsubscribe from the provider property', () => {
    // Arrange
    @UntilDestroy({ checkProperties: true })
    @Injectable()
    class MockService {
      disposed = false;

      subscription = new Subject()
        .pipe(
          finalize(() => {
            this.disposed = true;
          })
        )
        .subscribe();
    }

    @Component({
      template: '',
      providers: [MockService]
    })
    class MockComponent {
      constructor(mockService: MockService) {}
    }

    // Act
    TestBed.configureTestingModule({
      declarations: [MockComponent]
    });

    const fixture = TestBed.createComponent(MockComponent);
    const service = fixture.componentRef.injector.get(MockService);

    // Assert
    expect(service.disposed).toBeFalsy();
    fixture.destroy();
    expect(service.disposed).toBeTruthy();
  });

  it('should complete the stream on provider', () => {
    // Arrange
    @UntilDestroy()
    @Injectable()
    class MockService {
      disposed = false;

      constructor() {
        new Subject()
          .pipe(
            untilDestroyed(this),
            finalize(() => {
              this.disposed = true;
            })
          )
          .subscribe();
      }
    }

    @Component({
      template: '',
      providers: [MockService]
    })
    class MockComponent {
      constructor(mockService: MockService) {}
    }

    // Act
    TestBed.configureTestingModule({
      declarations: [MockComponent]
    });

    const fixture = TestBed.createComponent(MockComponent);
    const service = fixture.componentRef.injector.get(MockService);

    // Assert
    expect(service.disposed).toBeFalsy();
    fixture.destroy();
    expect(service.disposed).toBeTruthy();
  });
});
