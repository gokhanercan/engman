import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import { Avatar } from "@vaadin/react-components/Avatar.js";
import { ContextMenu } from "@vaadin/react-components";
import { useState } from "react";

interface DeveloperAvatarProps {
    developer: DeveloperM;
    onDeveloperView?: (developer: DeveloperM) => void;
    onDeveloperMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>,developer: DeveloperM) => Promise<void>;
    onDeveloperMouseLeave?: (developer: DeveloperM) => Promise<void>;
}

export default function DeveloperAvatar({developer,onDeveloperView,onDeveloperMouseOver,onDeveloperMouseLeave}: DeveloperAvatarProps) {
    const ctxItems = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
    const [hoverActive, setHoverActive] = useState<boolean>(false);

    const handleContextMenu = (e: any) => {
        if(e.detail.value.text === 'View'){
            const devName = e.target.querySelector("div").getAttribute("dev-name");
            // alert("You selected:" + devName);
            if(onDeveloperView){
                onDeveloperView(developer);
            }
        }
        else{
            console.log("Not implemented Action: ", e.detail.value.text);
        }
    }
    //rename.
    const handleMouseLeave = async (e: any, developer:DeveloperM) => {
        // console.log("ClosingTime...");
        if(onDeveloperMouseLeave){
            await onDeveloperMouseLeave(developer);
            setHoverActive(false);
        }
    }
    const handleMouseOver = async (e: any, developer:DeveloperM) => {
        console.log("MouseOver");        
        if(onDeveloperMouseOver){
            // console.log("..setting as active");
            await onDeveloperMouseOver(e,developer);
            setHoverActive(true);
            if(hoverActive) {
                // setTimeout(() => {
                //     console.log("Mouse left (with delay)");
                //     //handleMouseLeave(null,developer);
                // }, 2000);
            }
        }
    }

    return (
        <>
            <ContextMenu items={ctxItems} onItemSelected={handleContextMenu} >
                <div className="border border-primary rounded-circle p-1 m-1"
                     dev-name={developer.name}
                     onClick={() => onDeveloperView && onDeveloperView(developer)}
                     onMouseOver={(e) => handleMouseOver(e,developer) }
                     onMouseLeave={(e) => handleMouseLeave(e,developer)}
                    //  onMouseOut={(e) => handleMouseLeave(e,developer)} 
                    //  onPointerLeave={(e) => handleMouseLeave(e,developer) }
                     >
                    <Avatar name={`${developer.name}`} />
                </div>
                <span>{hoverActive==true ? "active" : "passive"}</span>
            </ContextMenu>
            
        </>
    );

}