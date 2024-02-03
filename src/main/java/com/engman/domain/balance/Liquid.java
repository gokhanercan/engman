package com.engman.domain.balance;

public class Liquid implements ITransferrable {

    protected Integer _Amount = 0;
    public Liquid(Integer amount) {
        _Amount = amount;
    }

    @Override
    public Integer Transfer(Integer tAmount) {
        _Amount = _Amount + tAmount;
        return _Amount;
    }

    @Override
    public Integer GetCurrent() {
        return _Amount;
    }
}
