package com.engman;

import com.engman.modules.ModuleHost;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication
@Theme(value = "eng-man")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(com.engman.Application.class, args);
        ModuleHost host = new ModuleHost(); //todo: İNJECT
        host.StartModules();
    }
}
