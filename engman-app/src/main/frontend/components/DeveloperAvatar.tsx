import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import { Avatar } from "@vaadin/react-components/Avatar.js";
import { ContextMenu } from "@vaadin/react-components";

interface DeveloperAvatarProps {
    developer: DeveloperM;
    onDeveloperView?: (developer: DeveloperM) => void;
}

export default function DeveloperAvatar({developer,onDeveloperView}: DeveloperAvatarProps) {
    const ctxItems = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];

    const handleContextMenu = (e: any) => {
        console.log("selected", e);
        console.log("target", e.target);
        if(e.detail.value.text === 'View'){
            const devName = e.target.querySelector("div").getAttribute("dev-name");
            // alert("You selected:" + devName);
            onDeveloperView && onDeveloperView(developer);
        }
        else{
            console.log("Not implemented Action: ", e.detail.value.text);
        }
    }

    return (
        <>
            <ContextMenu items={ctxItems} onItemSelected={handleContextMenu}>
                <div dev-name={developer.name}>
                    <Avatar name={`${developer.name}`} />
                </div>
            </ContextMenu>
            
        </>
    );

}