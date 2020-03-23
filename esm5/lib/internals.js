import { Subject } from 'rxjs';
export function isFunction(target) {
    return typeof target === 'function';
}
/**
 * Applied to instances and stores `Subject` instance
 */
export var DESTROY = Symbol('__destroy');
/**
 * Applied to definitions and informs that class is decorated
 */
var DECORATOR_APPLIED = Symbol('__decoratorApplied');
export function markAsDecorated(providerOrDef) {
    providerOrDef[DECORATOR_APPLIED] = true;
}
export function ensureClassIsDecorated(instance) {
    var constructor = instance.constructor;
    var providerOrDef = isInjectableType(constructor) ? constructor : getDef(constructor);
    var missingDecorator = !providerOrDef[DECORATOR_APPLIED];
    if (missingDecorator) {
        throw new Error('untilDestroyed operator cannot be used inside directives or ' +
            'components or providers that are not decorated with UntilDestroy decorator');
    }
}
export function createSubjectOnTheInstance(instance) {
    if (!instance[DESTROY]) {
        instance[DESTROY] = new Subject();
    }
}
export function completeSubjectOnTheInstance(instance) {
    if (instance[DESTROY]) {
        instance[DESTROY].next();
        instance[DESTROY].complete();
    }
}
/**
 * As directive and component definitions are considered private API,
 * so those properties are prefixed with Angular's marker for "private"
 */
export function getDef(type) {
    return type.ɵcmp || type.ɵdir;
}
/**
 * Determines whether the provided `target` is some function
 * decorated with `@Injectable()`
 */
export function isInjectableType(target) {
    return !!target.ɵprov;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC91bnRpbC1kZXN0cm95LyIsInNvdXJjZXMiOlsibGliL2ludGVybmFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBZTtJQUN4QyxPQUFPLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztBQUN0QyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxPQUFPLEdBQWtCLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUUxRDs7R0FFRztBQUNILElBQU0saUJBQWlCLEdBQWtCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXRFLE1BQU0sVUFBVSxlQUFlLENBQzdCLGFBQXNGO0lBRXJGLGFBQXFCLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbkQsQ0FBQztBQVFELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxRQUFhO0lBQ2xELElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDekMsSUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hGLElBQU0sZ0JBQWdCLEdBQUcsQ0FBRSxhQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFcEUsSUFBSSxnQkFBZ0IsRUFBRTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUNiLDhEQUE4RDtZQUM1RCw0RUFBNEUsQ0FDL0UsQ0FBQztLQUNIO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxRQUFhO0lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7S0FDekM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLDRCQUE0QixDQUFDLFFBQWE7SUFDeEQsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5QjtBQUNILENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsTUFBTSxDQUNwQixJQUF5QztJQUV6QyxPQUFRLElBQXlCLENBQUMsSUFBSSxJQUFLLElBQXlCLENBQUMsSUFBSSxDQUFDO0FBQzVFLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBVztJQUMxQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RhYmxlVHlwZSxcbiAgybVDb21wb25lbnRUeXBlIGFzIENvbXBvbmVudFR5cGUsXG4gIMm1RGlyZWN0aXZlVHlwZSBhcyBEaXJlY3RpdmVUeXBlLFxuICDJtUNvbXBvbmVudERlZiBhcyBDb21wb25lbnREZWYsXG4gIMm1RGlyZWN0aXZlRGVmIGFzIERpcmVjdGl2ZURlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odGFyZ2V0OiB1bmtub3duKSB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIEFwcGxpZWQgdG8gaW5zdGFuY2VzIGFuZCBzdG9yZXMgYFN1YmplY3RgIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjb25zdCBERVNUUk9ZOiB1bmlxdWUgc3ltYm9sID0gU3ltYm9sKCdfX2Rlc3Ryb3knKTtcblxuLyoqXG4gKiBBcHBsaWVkIHRvIGRlZmluaXRpb25zIGFuZCBpbmZvcm1zIHRoYXQgY2xhc3MgaXMgZGVjb3JhdGVkXG4gKi9cbmNvbnN0IERFQ09SQVRPUl9BUFBMSUVEOiB1bmlxdWUgc3ltYm9sID0gU3ltYm9sKCdfX2RlY29yYXRvckFwcGxpZWQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtBc0RlY29yYXRlZChcbiAgcHJvdmlkZXJPckRlZjogSW5qZWN0YWJsZVR5cGU8dW5rbm93bj4gfCBEaXJlY3RpdmVEZWY8dW5rbm93bj4gfCBDb21wb25lbnREZWY8dW5rbm93bj5cbik6IHZvaWQge1xuICAocHJvdmlkZXJPckRlZiBhcyBhbnkpW0RFQ09SQVRPUl9BUFBMSUVEXSA9IHRydWU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW50aWxEZXN0cm95T3B0aW9ucyB7XG4gIGJsYWNrTGlzdD86IHN0cmluZ1tdO1xuICBhcnJheU5hbWU/OiBzdHJpbmc7XG4gIGNoZWNrUHJvcGVydGllcz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVDbGFzc0lzRGVjb3JhdGVkKGluc3RhbmNlOiBhbnkpOiBuZXZlciB8IHZvaWQge1xuICBjb25zdCBjb25zdHJ1Y3RvciA9IGluc3RhbmNlLmNvbnN0cnVjdG9yO1xuICBjb25zdCBwcm92aWRlck9yRGVmID0gaXNJbmplY3RhYmxlVHlwZShjb25zdHJ1Y3RvcikgPyBjb25zdHJ1Y3RvciA6IGdldERlZihjb25zdHJ1Y3Rvcik7XG4gIGNvbnN0IG1pc3NpbmdEZWNvcmF0b3IgPSAhKHByb3ZpZGVyT3JEZWYgYXMgYW55KVtERUNPUkFUT1JfQVBQTElFRF07XG5cbiAgaWYgKG1pc3NpbmdEZWNvcmF0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAndW50aWxEZXN0cm95ZWQgb3BlcmF0b3IgY2Fubm90IGJlIHVzZWQgaW5zaWRlIGRpcmVjdGl2ZXMgb3IgJyArXG4gICAgICAgICdjb21wb25lbnRzIG9yIHByb3ZpZGVycyB0aGF0IGFyZSBub3QgZGVjb3JhdGVkIHdpdGggVW50aWxEZXN0cm95IGRlY29yYXRvcidcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdWJqZWN0T25UaGVJbnN0YW5jZShpbnN0YW5jZTogYW55KTogdm9pZCB7XG4gIGlmICghaW5zdGFuY2VbREVTVFJPWV0pIHtcbiAgICBpbnN0YW5jZVtERVNUUk9ZXSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBsZXRlU3ViamVjdE9uVGhlSW5zdGFuY2UoaW5zdGFuY2U6IGFueSk6IHZvaWQge1xuICBpZiAoaW5zdGFuY2VbREVTVFJPWV0pIHtcbiAgICBpbnN0YW5jZVtERVNUUk9ZXS5uZXh0KCk7XG4gICAgaW5zdGFuY2VbREVTVFJPWV0uY29tcGxldGUoKTtcbiAgfVxufVxuXG4vKipcbiAqIEFzIGRpcmVjdGl2ZSBhbmQgY29tcG9uZW50IGRlZmluaXRpb25zIGFyZSBjb25zaWRlcmVkIHByaXZhdGUgQVBJLFxuICogc28gdGhvc2UgcHJvcGVydGllcyBhcmUgcHJlZml4ZWQgd2l0aCBBbmd1bGFyJ3MgbWFya2VyIGZvciBcInByaXZhdGVcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmPFQ+KFxuICB0eXBlOiBEaXJlY3RpdmVUeXBlPFQ+IHwgQ29tcG9uZW50VHlwZTxUPlxuKTogRGlyZWN0aXZlRGVmPFQ+IHwgQ29tcG9uZW50RGVmPFQ+IHtcbiAgcmV0dXJuICh0eXBlIGFzIENvbXBvbmVudFR5cGU8VD4pLsm1Y21wIHx8ICh0eXBlIGFzIERpcmVjdGl2ZVR5cGU8VD4pLsm1ZGlyO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgYHRhcmdldGAgaXMgc29tZSBmdW5jdGlvblxuICogZGVjb3JhdGVkIHdpdGggYEBJbmplY3RhYmxlKClgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luamVjdGFibGVUeXBlKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEluamVjdGFibGVUeXBlPHVua25vd24+IHtcbiAgcmV0dXJuICEhdGFyZ2V0Lsm1cHJvdjtcbn1cbiJdfQ==