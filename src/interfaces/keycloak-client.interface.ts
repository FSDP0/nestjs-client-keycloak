import { ModuleMetadata, Type } from "@nestjs/common";
import { KeycloakConfig } from "keycloak-js";

/**
 * @public
 *
 * @type        {KeycloakConfig}
 *
 * @see         {@link  KeycloakConfig}
 */
export type KeycloakClientModuleOptions = KeycloakConfig;

/**
 * @public
 *
 * @interface
 *
 * @method      createKeycloakClientOption(): Promise<KeycloakClientModuleOptions> | KeycloakClientModuleOptions;
 */
export interface KeycloakClientOptionFactory {
    createKeycloakClientOption(): Promise<KeycloakClientModuleOptions> | KeycloakClientModuleOptions;
}

/**
 * @public
 *
 * @interface
 *
 * @property    [useExisting]
 * @property    [useClass]
 * @property    [useFactory]
 * @property    [inject]
 */
export interface KeycloakClientModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useExisting?: Type<KeycloakClientOptionFactory>;

    useClass?: Type<KeycloakClientOptionFactory>;

    useFactory?: (...args: any[]) => Promise<KeycloakClientModuleOptions> | KeycloakClientModuleOptions;

    inject?: any[];
}
