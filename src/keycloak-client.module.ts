import { DynamicModule, Module } from "@nestjs/common";

import type { KeycloakClientModuleAsyncOptions, KeycloakClientModuleOptions } from "./interfaces";

import { KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN } from "./constants";

import { createAsyncKeycloakClientOptionProviders } from "./providers";

import { KeycloakClientService } from "./services";

@Module({
    providers: [KeycloakClientService],
    exports: [KeycloakClientService]
})
export class KeycloakClientModule {
    static register(options: KeycloakClientModuleOptions): DynamicModule {
        return {
            module: KeycloakClientModule,
            providers: [
                {
                    provide: KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN,
                    useValue: options
                }
            ]
        };
    }

    static registerAsync(options: KeycloakClientModuleAsyncOptions): DynamicModule {
        const { imports = [] } = options;

        return {
            module: KeycloakClientModule,
            imports,
            providers: createAsyncKeycloakClientOptionProviders(options)
        };
    }
}
