import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
// import { Avatar } from "@hilla/react-components/Avatar.js";
import { AvatarGroup } from "@vaadin/react-components/AvatarGroup.js";
// import { useComputed, useSignal } from '@vaadin/hilla-react-signals';

interface DeveloperGroupAvatarProps {
    developers: DeveloperM[];
}

export default function DeveloperGroupAvatar({developers}: DeveloperGroupAvatarProps) {
    
    const avatars = developers.map((d, index) => ({
          name: `${d.name}`,
          colorIndex: index,
        })
    );
    return (
        <>
            <AvatarGroup items={avatars} maxItemsVisible={10} />
        </>
    );
}