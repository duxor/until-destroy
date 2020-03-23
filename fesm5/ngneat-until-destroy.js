import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

function isFunction(target) {
    return typeof target === 'function';
}
/**
 * Applied to instances and stores `Subject` instance
 */
var DESTROY = Symbol('__destroy');
/**
 * Applied to definitions and informs that class is decorated
 */
var DECORATOR_APPLIED = Symbol('__decoratorApplied');
function markAsDecorated(providerOrDef) {
    providerOrDef[DECORATOR_APPLIED] = true;
}
function ensureClassIsDecorated(instance) {
    var constructor = instance.constructor;
    var providerOrDef = isInjectableType(constructor) ? constructor : getDef(constructor);
    var missingDecorator = !providerOrDef[DECORATOR_APPLIED];
    if (missingDecorator) {
        throw new Error('untilDestroyed operator cannot be used inside directives or ' +
            'components or providers that are not decorated with UntilDestroy decorator');
    }
}
function createSubjectOnTheInstance(instance) {
    if (!instance[DESTROY]) {
        instance[DESTROY] = new Subject();
    }
}
function completeSubjectOnTheInstance(instance) {
    if (instance[DESTROY]) {
        instance[DESTROY].next();
        instance[DESTROY].complete();
    }
}
/**
 * As directive and component definitions are considered private API,
 * so those properties are prefixed with Angular's marker for "private"
 */
function getDef(type) {
    return type.ɵcmp || type.ɵdir;
}
/**
 * Determines whether the provided `target` is some function
 * decorated with `@Injectable()`
 */
function isInjectableType(target) {
    return !!target.ɵprov;
}

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
function UntilDestroy(options) {
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

function overrideNonDirectiveInstanceMethod(instance, destroyMethodName) {
    var originalDestroy = instance[destroyMethodName];
    if (isFunction(originalDestroy) === false) {
        throw new Error(instance.constructor.name + " is using untilDestroyed but doesn't implement " + destroyMethodName);
    }
    createSubjectOnTheInstance(instance);
    instance[destroyMethodName] = function () {
        isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
        completeSubjectOnTheInstance(this);
    };
}
function untilDestroyed(instance, destroyMethodName) {
    return function (source) {
        // If `destroyMethodName` is passed then the developer applies
        // this operator to something non-related to Angular DI system
        if (typeof destroyMethodName === 'string') {
            overrideNonDirectiveInstanceMethod(instance, destroyMethodName);
        }
        else {
            ensureClassIsDecorated(instance);
            createSubjectOnTheInstance(instance);
        }
        return source.pipe(takeUntil(instance[DESTROY]));
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { UntilDestroy, untilDestroyed };
//# sourceMappingURL=ngneat-until-destroy.js.map
