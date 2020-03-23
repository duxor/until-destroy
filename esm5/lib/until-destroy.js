import { getDef, isFunction, completeSubjectOnTheInstance, isInjectableType, markAsDecorated } from './internals';
function unsubscribe(property) {
    property && isFunction(property.unsubscribe) && property.unsubscribe();
}
function unsubscribeIfPropertyIsArrayLike(property) {
    Array.isArray(property) && property.forEach(unsubscribe);
}
function decorateNgOnDestroy(ngOnDestroy, _a) {
    var arrayName = _a.arrayName, checkProperties = _a.checkProperties, blackList = _a.blackList;
    return function () {
        // Invoke the original `ngOnDestroy` if it exists
        ngOnDestroy && ngOnDestroy.call(this);
        // It's important to use `this` instead of caching instance
        // that may lead to memory leaks
        completeSubjectOnTheInstance(this);
        // Check if subscriptions are pushed to some array
        if (arrayName) {
            return unsubscribeIfPropertyIsArrayLike(this[arrayName]);
        }
        // Loop through the properties and find subscriptions
        if (checkProperties) {
            for (var property in this) {
                if (blackList && blackList.includes(property)) {
                    continue;
                }
                unsubscribe(this[property]);
            }
        }
    };
}
/**
 * Services do not have definitions, thus we just have to override the
 * prototype property in Ivy
 */
function decorateProvider(type, options) {
    type.prototype.ngOnDestroy = decorateNgOnDestroy(type.prototype.ngOnDestroy, options);
    markAsDecorated(type);
}
function decorateDirective(type, options) {
    var def = getDef(type);
    def.onDestroy = decorateNgOnDestroy(def.onDestroy, options);
    markAsDecorated(def);
}
export function UntilDestroy(options) {
    if (options === void 0) { options = {}; }
    return function (target) {
        if (isInjectableType(target)) {
            decorateProvider(target, options);
        }
        else {
            decorateDirective(target, options);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW50aWwtZGVzdHJveS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdW50aWwtZGVzdHJveS8iLCJzb3VyY2VzIjpbImxpYi91bnRpbC1kZXN0cm95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUVWLDRCQUE0QixFQUM1QixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNoQixNQUFNLGFBQWEsQ0FBQztBQUVyQixTQUFTLFdBQVcsQ0FBQyxRQUFhO0lBQ2hDLFFBQVEsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN6RSxDQUFDO0FBRUQsU0FBUyxnQ0FBZ0MsQ0FBQyxRQUFlO0lBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FDMUIsV0FBNEMsRUFDNUMsRUFBOEQ7UUFBNUQsd0JBQVMsRUFBRSxvQ0FBZSxFQUFFLHdCQUFTO0lBRXZDLE9BQU87UUFDTCxpREFBaUQ7UUFDakQsV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEMsMkRBQTJEO1FBQzNELGdDQUFnQztRQUNoQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQyxrREFBa0Q7UUFDbEQsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQscURBQXFEO1FBQ3JELElBQUksZUFBZSxFQUFFO1lBQ25CLEtBQUssSUFBTSxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUMzQixJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM3QyxTQUFTO2lCQUNWO2dCQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNGO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsSUFBNkIsRUFBRSxPQUE0QjtJQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLElBQXFELEVBQ3JELE9BQTRCO0lBRTVCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixHQUFXLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQWlDO0lBQWpDLHdCQUFBLEVBQUEsWUFBaUM7SUFDNUQsT0FBTyxVQUFDLE1BQVc7UUFDakIsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RhYmxlVHlwZSxcbiAgybVDb21wb25lbnRUeXBlIGFzIENvbXBvbmVudFR5cGUsXG4gIMm1RGlyZWN0aXZlVHlwZSBhcyBEaXJlY3RpdmVUeXBlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBnZXREZWYsXG4gIGlzRnVuY3Rpb24sXG4gIFVudGlsRGVzdHJveU9wdGlvbnMsXG4gIGNvbXBsZXRlU3ViamVjdE9uVGhlSW5zdGFuY2UsXG4gIGlzSW5qZWN0YWJsZVR5cGUsXG4gIG1hcmtBc0RlY29yYXRlZFxufSBmcm9tICcuL2ludGVybmFscyc7XG5cbmZ1bmN0aW9uIHVuc3Vic2NyaWJlKHByb3BlcnR5OiBhbnkpOiB2b2lkIHtcbiAgcHJvcGVydHkgJiYgaXNGdW5jdGlvbihwcm9wZXJ0eS51bnN1YnNjcmliZSkgJiYgcHJvcGVydHkudW5zdWJzY3JpYmUoKTtcbn1cblxuZnVuY3Rpb24gdW5zdWJzY3JpYmVJZlByb3BlcnR5SXNBcnJheUxpa2UocHJvcGVydHk6IGFueVtdKTogdm9pZCB7XG4gIEFycmF5LmlzQXJyYXkocHJvcGVydHkpICYmIHByb3BlcnR5LmZvckVhY2godW5zdWJzY3JpYmUpO1xufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZU5nT25EZXN0cm95KFxuICBuZ09uRGVzdHJveTogKCgpID0+IHZvaWQpIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgeyBhcnJheU5hbWUsIGNoZWNrUHJvcGVydGllcywgYmxhY2tMaXN0IH06IFVudGlsRGVzdHJveU9wdGlvbnNcbikge1xuICByZXR1cm4gZnVuY3Rpb24odGhpczogYW55KSB7XG4gICAgLy8gSW52b2tlIHRoZSBvcmlnaW5hbCBgbmdPbkRlc3Ryb3lgIGlmIGl0IGV4aXN0c1xuICAgIG5nT25EZXN0cm95ICYmIG5nT25EZXN0cm95LmNhbGwodGhpcyk7XG5cbiAgICAvLyBJdCdzIGltcG9ydGFudCB0byB1c2UgYHRoaXNgIGluc3RlYWQgb2YgY2FjaGluZyBpbnN0YW5jZVxuICAgIC8vIHRoYXQgbWF5IGxlYWQgdG8gbWVtb3J5IGxlYWtzXG4gICAgY29tcGxldGVTdWJqZWN0T25UaGVJbnN0YW5jZSh0aGlzKTtcblxuICAgIC8vIENoZWNrIGlmIHN1YnNjcmlwdGlvbnMgYXJlIHB1c2hlZCB0byBzb21lIGFycmF5XG4gICAgaWYgKGFycmF5TmFtZSkge1xuICAgICAgcmV0dXJuIHVuc3Vic2NyaWJlSWZQcm9wZXJ0eUlzQXJyYXlMaWtlKHRoaXNbYXJyYXlOYW1lXSk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBwcm9wZXJ0aWVzIGFuZCBmaW5kIHN1YnNjcmlwdGlvbnNcbiAgICBpZiAoY2hlY2tQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHRoaXMpIHtcbiAgICAgICAgaWYgKGJsYWNrTGlzdCAmJiBibGFja0xpc3QuaW5jbHVkZXMocHJvcGVydHkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB1bnN1YnNjcmliZSh0aGlzW3Byb3BlcnR5XSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFNlcnZpY2VzIGRvIG5vdCBoYXZlIGRlZmluaXRpb25zLCB0aHVzIHdlIGp1c3QgaGF2ZSB0byBvdmVycmlkZSB0aGVcbiAqIHByb3RvdHlwZSBwcm9wZXJ0eSBpbiBJdnlcbiAqL1xuZnVuY3Rpb24gZGVjb3JhdGVQcm92aWRlcih0eXBlOiBJbmplY3RhYmxlVHlwZTx1bmtub3duPiwgb3B0aW9uczogVW50aWxEZXN0cm95T3B0aW9ucyk6IHZvaWQge1xuICB0eXBlLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGRlY29yYXRlTmdPbkRlc3Ryb3kodHlwZS5wcm90b3R5cGUubmdPbkRlc3Ryb3ksIG9wdGlvbnMpO1xuICBtYXJrQXNEZWNvcmF0ZWQodHlwZSk7XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlRGlyZWN0aXZlKFxuICB0eXBlOiBEaXJlY3RpdmVUeXBlPHVua25vd24+IHwgQ29tcG9uZW50VHlwZTx1bmtub3duPixcbiAgb3B0aW9uczogVW50aWxEZXN0cm95T3B0aW9uc1xuKTogdm9pZCB7XG4gIGNvbnN0IGRlZiA9IGdldERlZih0eXBlKTtcbiAgKGRlZiBhcyBhbnkpLm9uRGVzdHJveSA9IGRlY29yYXRlTmdPbkRlc3Ryb3koZGVmLm9uRGVzdHJveSwgb3B0aW9ucyk7XG4gIG1hcmtBc0RlY29yYXRlZChkZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVW50aWxEZXN0cm95KG9wdGlvbnM6IFVudGlsRGVzdHJveU9wdGlvbnMgPSB7fSk6IENsYXNzRGVjb3JhdG9yIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSkgPT4ge1xuICAgIGlmIChpc0luamVjdGFibGVUeXBlKHRhcmdldCkpIHtcbiAgICAgIGRlY29yYXRlUHJvdmlkZXIodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVjb3JhdGVEaXJlY3RpdmUodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG59XG4iXX0=