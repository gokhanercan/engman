package com.engman.core.domain.balance;

public interface ITransferrable {

    //On every iteration/hit/scale
    Integer Transfer(Integer bit);
    Integer GetCurrent();
}

/*
Project     -> Scope+++
Budget      -> Budget--
Developer   -> Revenue--
Skill       ->
 */