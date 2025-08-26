## Description
Keycloak adapter client module for NestJS based on the official [keycloak-js](https://www.npmjs.com/package/keycloak-js) package.

## Installation
```
npm install --save @fsdp0/nestjs-client-keycloak keycloak-js
```

## Usage
 * Module
```ts
import { Module } from "@nestjs/common";
import { KeycloakClientModule } from "@fsdp0/nestjs-client-keycloak";

@Module({
    imports: [
        KeycloakClientModule.register({
            url: "https://{{KEYCLOAK_CLIENT_HOSTNAME}}:{{KEYCLOAK_CLIENT_PORT}}",
            realm: "{{KEYCLOAK_CLIENT_REALM}}",
            clientId: "{{KECYCLOAK_CLIENT_ID}}"
        })
    ],
    providers: [...]
})
export class KeycloakAuthModule {}
```

 * Service
```ts
import { Injectable } from "@nestjs/common";
import { KeycloakClientService } from "@fsdp0/nestjs-client-keycloak";

@Injectable()
export class KeycloakAuthService {
    constructor (private readonly keycloakClientService: KeycloakClientService) {}
}
```

## Async Options
 * useFactory
```ts
import { Module } from "@nestjs/common";
import { KeycloakClientModule } from "@fsdp0/nestjs-client-keycloak";

@Module({
    imports: [
        KeycloakClientModule.registerAsync({
            useFactory: () => ({
                url: "https://{{KEYCLOAK_CLIENT_HOSTNAME}}:{{KEYCLOAK_CLIENT_PORT}}",
                realm: "{{KEYCLOAK_CLIENT_REALM}}",
                clientId: "{{KECYCLOAK_CLIENT_ID}}"
            })
        })
    ],
    providers: [...]
})
export class KeycloakAuthModule {}
```
Factory behaves like every other one, inject dependencies through `inject`
```ts
import { Module } from "@nestjs/common";
import { KeycloakClientModule } from "@fsdp0/nestjs-client-keycloak";

@Module({
    imports: [
        KeycloakClientModule.registerAsync({
            imports: [ConfigModule]
            useFactory: async (configService: ConfigService) => ({
                url: "https://{{KEYCLOAK_CLIENT_HOSTNAME}}:{{KEYCLOAK_CLIENT_PORT}}",
                realm: "{{KEYCLOAK_CLIENT_REALM}}",
                clientId: "{{KECYCLOAK_CLIENT_ID}}"
            }),
            inject: [ConfigService]
        })
    ],
    providers: [...]
})
export class KeycloakAuthModule {}
```

 * useClass
```ts
import { Injectable } from "@nestjs/common";
import { KeycloakClientModuleOptions, KeycloakClientOptionFactory } from "@fsdp0/nestjs-client-keycloak";

@Injectable()
export class KeycloakClientConfigService implements KeycloakClientOptionFactory {
    createKeycloakClientOption(): KeycloakClientModuleOptions {
        return {
            url: "https://{{KEYCLOAK_CLIENT_HOSTNAME}}:{{KEYCLOAK_CLIENT_PORT}}",
            realm: "{{KEYCLOAK_CLIENT_REALM}}",
            clientId: "{{KECYCLOAK_CLIENT_ID}}"
        }
    }
}
```

 * useExisting
```ts
import { Module } from "@nestjs/common";
import { KeycloakClientModule } from "@fsdp0/nestjs-client-keycloak";

@Module({
    imports: [
        KeycloakClientModule.registerAsync({
            imports: [ConfigModule],
            useExisting: ConfigService
        })
    ],
    providers: [...]
})
export class KeycloakAuthModule {}
```

## License
This library is distributes under [Apache-2.0 license](http://www.apache.org/licenses/LICENSE-2.0), see LICENSE for more information.

## Author
 * Ray Lee - https://github.com/FSDP0