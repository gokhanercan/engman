package com.engman.core.domain;

import lombok.Data;

@Data
public class Field {
    private String name;
    private String value;
    private String ownerModuleName;

    public Field(String name, String value, String ownerModuleName) {
        this.name = name;
        this.value = value;
        this.ownerModuleName = ownerModuleName;
    }
    public Field(String name) {
        this.name = name;
        this.value = "";
        this.ownerModuleName = "-engman-";
    }
    public Field() {
        this.name = "";
        this.value = "";
        this.ownerModuleName = "-engman-";
    }
}
