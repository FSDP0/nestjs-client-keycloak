import { FactoryProvider, Provider } from "@nestjs/common";

import { KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN } from "@constants";

import type {
    KeycloakClientModuleAsyncOptions,
    KeycloakClientModuleOptions,
    KeycloakClientOptionFactory
} from "@interfaces";

/**
 * @function
 *
 * @param           {KeycloakClientModuleAsyncOptions}      options     - Keycloak adapter configuration options
 */
export function createAsyncKeycloakClientOptionProviders(options: KeycloakClientModuleAsyncOptions): Provider[] {
    const providers: Provider[] = [];

    const { useExisting, useFactory } = options;

    if (useExisting || useFactory) {
        return providers;
    }

    const { useClass } = options;

    if (useClass) {
        providers.push({
            provide: useClass,
            useClass
        });
    }

    return providers;
}

/**
 * @function
 *
 * @param           {KeycloakClientModuleAsyncOptions}      options     - Keycloak adapter configuration options
 */
export function createAsyncKeycloakClientOptionProvider(
    options: KeycloakClientModuleAsyncOptions
): FactoryProvider<KeycloakClientModuleOptions> {
    const { useFactory, inject = [] } = options;

    if (useFactory) {
        return {
            provide: KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN,
            useFactory,
            inject
        };
    }

    const { useExisting, useClass } = options;

    if (useExisting) {
        inject.push(useExisting);
    }

    if (useClass) {
        inject.push(useClass);
    }

    return {
        provide: KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN,
        useFactory: async (optionFactory: KeycloakClientOptionFactory) =>
            await optionFactory.createKeycloakClientOption(),
        inject
    };
}
