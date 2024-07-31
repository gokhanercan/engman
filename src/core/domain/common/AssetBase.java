package domain.common;

import java.util.HashMap;
import java.util.Map;

public class AssetBase {
    private Map<String,String> _Properties = new HashMap<>();
    public void AddOrUpdateProperty(String name, String value){
        _Properties.put(name,value);
    }
    public String GetPropertyValueOrNull(String name){
        return _Properties.get(name);
    }
    public String GetPropertyValueOrEmpty(String name){
        return _Properties.getOrDefault(name,"");
    }
}
