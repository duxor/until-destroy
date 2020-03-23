import { Observable } from 'rxjs';
export declare function untilDestroyed(instance: any, destroyMethodName?: string): <T>(source: Observable<T>) => Observable<T>;
