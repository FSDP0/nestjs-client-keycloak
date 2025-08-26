import { Inject, Injectable, Optional } from "@nestjs/common";
import KeycloakAdapter from "keycloak-js";

import { KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN } from "@constants";
import type { KeycloakClientModuleOptions } from "@interfaces";

@Injectable()
export class KeycloakClientService extends KeycloakAdapter {
    constructor(
        @Optional() @Inject(KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN) private readonly options: KeycloakClientModuleOptions
    ) {
        super(options);
    }
}
