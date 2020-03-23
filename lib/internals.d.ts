import { InjectableType, ɵComponentType as ComponentType, ɵDirectiveType as DirectiveType, ɵComponentDef as ComponentDef, ɵDirectiveDef as DirectiveDef } from '@angular/core';
export declare function isFunction(target: unknown): boolean;
/**
 * Applied to instances and stores `Subject` instance
 */
export declare const DESTROY: unique symbol;
export declare function markAsDecorated(providerOrDef: InjectableType<unknown> | DirectiveDef<unknown> | ComponentDef<unknown>): void;
export interface UntilDestroyOptions {
    blackList?: string[];
    arrayName?: string;
    checkProperties?: boolean;
}
export declare function ensureClassIsDecorated(instance: any): never | void;
export declare function createSubjectOnTheInstance(instance: any): void;
export declare function completeSubjectOnTheInstance(instance: any): void;
/**
 * As directive and component definitions are considered private API,
 * so those properties are prefixed with Angular's marker for "private"
 */
export declare function getDef<T>(type: DirectiveType<T> | ComponentType<T>): DirectiveDef<T> | ComponentDef<T>;
/**
 * Determines whether the provided `target` is some function
 * decorated with `@Injectable()`
 */
export declare function isInjectableType(target: any): target is InjectableType<unknown>;
