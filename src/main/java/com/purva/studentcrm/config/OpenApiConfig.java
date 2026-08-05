package com.purva.studentcrm.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI studentCRMOpenAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("Student CRM System API")

                        .description("Student Admission Management REST API")

                        .version("1.0")

                        .contact(new Contact()

                                .name("Purva Pawar")

                                .email("purva@gmail.com")))

                .externalDocs(new ExternalDocumentation()

                        .description("Student CRM Documentation"));
    }
}