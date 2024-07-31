package modules;

import domain.common.AssetBase;

public interface IModule {
    void onAssetCreate(AssetBase asset);
    void onAssetUpdate(AssetBase asset);
}
