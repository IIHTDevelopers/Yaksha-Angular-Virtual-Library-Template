import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BookComponent } from './components/book/book.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, BookComponent],
            imports: [FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should have Virtual Library title initially', () => {
            expect(component.title).toEqual('Virtual Library');
        });

        it('should have Virtual Library h1 heading', () => {
            component.title = 'Virtual Library';
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain('Virtual Library');
        });
    });
});
