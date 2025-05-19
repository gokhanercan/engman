package com.engman.services;

import com.engman.core.module.ModuleHost;
import com.engman.core.modules.KanbanModule;
import com.engman.core.modules.TrueColorsModule;
import com.engman.models.ModuleInfoContainerM;
import com.engman.models.ModuleInfoM;
import com.engman.repo.ModuleRepo;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ModuleServiceTest {

    @Test
    void syncModuleSystem_TwoModulesInRuntimeOneModuleInDb_SyncBothSides() {
        //ARRANGE
        ResourcesService mockResourcesService = mock(ResourcesService.class);
        when(mockResourcesService.getDevelopers()).thenReturn(List.of());
        when(mockResourcesService.getSkills()).thenReturn(List.of());
        //db
        ModuleInfoContainerM containerM = new ModuleInfoContainerM();
        containerM.setModules( new HashMap<>(Map.of(
                "Kanban", new ModuleInfoM("Kanban", true)
        )));
        ModuleRepo mockModuleRepo = mock(ModuleRepo.class);
        when(mockModuleRepo.getModules()).thenReturn(Optional.of(containerM));
        //runtime
        ModuleHost moduleHost = new ModuleHost(List.of(new KanbanModule(), new TrueColorsModule()));

        // Act
        var service = new ModuleService(mockResourcesService, mockModuleRepo, moduleHost);      //ctor auto runs sync operation

        // Assert runtime side
        assertEquals(true,moduleHost.getModule("Kanban").getEnabled());
        assertEquals(false,moduleHost.getModule("TrueColors").getEnabled());
        assertEquals(2,moduleHost.getModules().size());

        // Assert db side
        ArgumentCaptor<List<ModuleInfoM>> captor = ArgumentCaptor.forClass(List.class);
        verify(mockModuleRepo,times(1)).OverwriteModules(captor.capture());
        assertEquals(2,captor.getValue().size());
        Optional<ModuleInfoM> kanbanModule = captor.getValue().stream().filter(c -> c.getName().equals("Kanban")).findFirst();
        assertTrue(kanbanModule.get().isEnabled());
        Optional<ModuleInfoM> tcModule = captor.getValue().stream().filter(c -> c.getName().equals("TrueColors")).findFirst();
        assertFalse(tcModule.get().isEnabled());
    }
}