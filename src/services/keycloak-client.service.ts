import { Inject, Injectable, Logger, OnModuleInit, Optional } from "@nestjs/common";
import KeycloakAdapter, { KeycloakError } from "keycloak-js";

import { KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN } from "../constants";
import { KeycloakClientModuleOptions } from "../interfaces";

@Injectable()
export class KeycloakClientService extends KeycloakAdapter implements OnModuleInit {
    constructor(
        @Optional() @Inject(KEYCLOAK_CLIENT_MODULE_OPTION_TOKEN) private readonly options: KeycloakClientModuleOptions
    ) {
        const { server } = options;

        super(server);
    }

    async onModuleInit() {
        const { options } = this.options;

        try {
            const authenticated = await this.init(options);

            if (authenticated) {
                Logger.log(`Keycloak authenticated`);
            } else {
                Logger.error(`Keycloak is not authenticated`);
            }
        } catch (error: any) {
            throw new Error(`Error ${error}`);
        }
    }
}
