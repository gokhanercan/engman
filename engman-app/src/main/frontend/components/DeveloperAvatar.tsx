import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import { Avatar } from "@vaadin/react-components/Avatar.js";

interface DeveloperAvatarProps {
    developer: DeveloperM;
}

export default function DeveloperAvatar({developer}: DeveloperAvatarProps) {
    return (
        <Avatar name={`${developer.Name}`} />
    );
}