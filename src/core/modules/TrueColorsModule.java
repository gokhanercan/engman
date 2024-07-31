package modules;

import domain.common.AssetBase;

/*
True Colors (Personality) theory categorized people into 4 categories and makes behavioral assumptions based on those categories.
https://en.wikipedia.org/wiki/True_Colors_(personality)
See a variant theory here: https://youtu.be/kkATORyBsug?si=cPLeSBHjWT0WrMIc
 */
public class TrueColorsModule extends ModuleBase {     //TODO:Develop module system here. Move module impls. to 'Modules' java module

    @Override
    public void onAssetCreate(AssetBase asset) {
        super.onAssetCreate(asset);
        asset.AddOrUpdateProperty("TrueColor","Blue");      //TODO: That should be the schema, not the actual val.
    }

    @Override
    public void onAssetUpdate(AssetBase asset) {
        asset.AddOrUpdateProperty("TrueColor","Blue");
        super.onAssetUpdate(asset);
    }
}
