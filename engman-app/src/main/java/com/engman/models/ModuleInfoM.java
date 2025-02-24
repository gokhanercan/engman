package com.engman.models;

import lombok.*;
import jakarta.validation.constraints.NotNull;
import org.aspectj.lang.annotation.RequiredTypes;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
public class ModuleInfoM {
    @NotNull
    @NonNull
    private String name = ""; //TODO: We can't make it non-nullable in Hilla generated code!
    private boolean isEnabled;
}
