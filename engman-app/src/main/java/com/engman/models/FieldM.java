package com.engman.models;

import lombok.Data;

@Data
public class FieldM {
    private String name;
    private String value;
    private String ownerModuleName;

    public FieldM(String name, String value, String ownerModuleName) {
        this.name = name;
        this.value = value;
        this.ownerModuleName = ownerModuleName;
    }
    public FieldM(String name) {
        this.name = name;
        this.value = "";
        this.ownerModuleName = "-engman-";
    }
    public FieldM() {
        this.name = "";
        this.value = "";
        this.ownerModuleName = "-engman-";
    }
}
