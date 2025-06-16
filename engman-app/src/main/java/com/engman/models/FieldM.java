package com.engman.models;

import com.engman.core.domain.Field;
import lombok.Data;

import java.util.HashMap;

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

    public static HashMap<String,Field> toFields(HashMap<String, FieldM> fieldMs) {
        HashMap<String, Field> fields = new HashMap<>();
        for (String key : fieldMs.keySet()) {
            fields.put(key, fieldMs.get(key).toField());
        }
        return fields;
    }
    public static HashMap<String, FieldM> fromFields(HashMap<String, Field> fields) {
        HashMap<String, FieldM> fieldMs = new HashMap<>();
        for (String key : fields.keySet()) {
            fieldMs.put(key, fromField(fields.get(key)));
        }
        return fieldMs;
    }
    public Field toField() {
        return new Field(this.name, this.value, this.ownerModuleName);
    }
    public static FieldM fromField(Field field) {
        return new FieldM(field.getName(), field.getValue(), field.getOwnerModuleName());
    }
}
